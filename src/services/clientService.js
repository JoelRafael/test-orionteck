import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = import.meta.env.VITE_APP_STORAGE_KEY;

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const clientService = {
  
  async getClients() {
    await delay();
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  async getClientById(id) {
    await delay();
    const clients = await this.getClients();
    return clients.find(c => c.id === id);
  },

  async saveClient(clientData) {
    await delay(800);
    const clients = await this.getClients();
    
    if (clientData.id) {
      // Update
      const index = clients.findIndex(c => c.id === clientData.id);
      if (index === -1) throw new Error('Client not found');
      clients[index] = { ...clientData, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
      return clients[index];
    } else {
      // Create
      const newClient = {
        ...clientData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      
      if (newClient.addresses) {
        newClient.addresses = newClient.addresses.map(addr => ({
          ...addr,
          id: addr.id || uuidv4()
        }));
      }

      clients.push(newClient);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
      return newClient;
    }
  },

  async deleteClient(id) {
    await delay(600);
    const clients = await this.getClients();
    const filtered = clients.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return id;
  }
};
