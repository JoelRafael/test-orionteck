import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { clientService } from '../services/clientService';

const ClientContext = createContext(null);

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientService.getClients();
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setClients(data);
    } catch (err) {
      setError('Cliente no encontrado');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const saveClient = async (clientData) => {
    try {
      const savedClient = await clientService.saveClient(clientData);
      setClients(prev => {
        const exists = prev.find(c => c.id === savedClient.id);
        if (exists) {
          return prev.map(c => c.id === savedClient.id ? savedClient : c);
        }
        return [savedClient, ...prev];
      });
      return savedClient;
    } catch (err) {
      setError(err.message || 'No se pudo guardar el cliente');
      throw err;
    }
  };

  const removeClient = async (id) => {
    try {
      await clientService.deleteClient(id);
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError('No se pudo eliminar el cliente');
      throw err;
    }
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        loading,
        error,
        fetchClients,
        saveClient,
        removeClient
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClients debe usarse dentro de un ClientProvider');
  }
  return context;
};
