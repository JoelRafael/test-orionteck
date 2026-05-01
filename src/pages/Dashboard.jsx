import { Link } from 'react-router-dom';
import { Plus, Users, Search } from 'lucide-react';
import { useClients } from '../context/ClientContext';
import ClientCard from '../components/ClientCard';
import LoadingClient from '../common/LoadingClient';
import CardAlert from '../common/CardAlert';
import { useState } from 'react';

export default function Dashboard() {
  const { clients, loading, removeClient } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [clientToDelete, setClientToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!clientToDelete) return;
    const id = clientToDelete.id;
    setClientToDelete(null);
    setIsDeleting(true);
    try {
      await removeClient(id);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clientes</h1>
          <p className="text-slate-500 text-sm mt-1">Maneja y administra tu lista de clientes y sus direcciones.</p>
        </div>
        <Link 
          to="/new" 
          className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow active:scale-95"
        >
          <Plus size={20} />
          <span>Nuevo Cliente</span>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
        <Search className="text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Buscar nombre o email..." 
          className="flex-grow bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        
          <LoadingClient counter={4} />

      ) : filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClients.map(client => (
            <ClientCard 
              key={client.id} 
              client={client} 
              onDeleteClick={setClientToDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 border-dashed">
          <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="text-brand-500" size={32} />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">No se encontraron clientes</h3>
          <p className="text-slate-500 text-sm mb-6">
            {searchTerm ? 'Ajusta tu término de búsqueda.' : 'Parece que aún no has agregado ningún cliente. ¡Comienza creando tu primera entrada!'}
          </p>
          {!searchTerm && (
            <Link 
              to="/new" 
              className="text-brand-600 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-lg font-medium transition-colors"
            >
             Crea tu primer cliente
            </Link>
          )}
        </div>
      )}

      {isDeleting && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
        </div>
      )}

      <CardAlert 
        isOpen={!!clientToDelete} 
        onClose={() => setClientToDelete(null)} 
        confirmUpdate={confirmDelete}
        message1="¿Eliminar cliente?"
        message2={`¿Estás seguro de que quieres eliminar a ${clientToDelete?.name}? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
