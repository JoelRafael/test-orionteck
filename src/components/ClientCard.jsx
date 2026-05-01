import { Phone, Mail, Edit, Trash2, Building } from 'lucide-react';
import { Link } from 'react-router-dom';



export default function ClientCard({ client, onDeleteClick }) {

  const handleDelete = () => {
    onDeleteClick(client);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-all hover:shadow-md group flex flex-col h-full relative overflow-hidden">
    
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center font-bold text-lg">
            {client.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-900 group-hover:text-brand-600 transition-colors">
              {client.name}
            </h3>
            <span className="text-xs text-slate-400">ID: {client.id.split('-')[0]}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link 
            to={`/edit/${client.id}`}
            className="p-2 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
            title="Editar Cliente"
          >
            <Edit size={18} />
          </Link>
          <button 
            onClick={handleDelete}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar Cliente"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-6 flex-grow">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Mail size={16} className="text-slate-400" />
          <span className="truncate">{client.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Phone size={16} className="text-slate-400" />
          <span>{client.phone}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Building size={16} />
            <span>Direcciones</span>
          </div>
          <span className="bg-slate-100 text-slate-600 font-medium px-2.5 py-0.5 rounded-full text-xs">
            {client.addresses?.length || 0}
          </span>
        </div>
      </div>

    </div>
  );
}
