import { useState, useEffect, use } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save, MapPin } from 'lucide-react';
import { useClients } from '../context/ClientContext';
import { clientService } from '../services/clientService';
import { v4 as uuidv4 } from 'uuid';
import LoadingCircule from '../common/LoadingCircule';
import { IMaskInput } from 'react-imask';

export default function ClientFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { saveClient } = useClients();
  
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [errorEmail, setErrorEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addresses: []
  });



  useEffect(() => {
    if (id) {
      clientService.getClientById(id).then(client => {
        if (client) {
          setFormData(client);
        } else {
          setError('Cliente no encontrado');
        }
        setLoading(false);
      }).catch(() => {
        setError('Error cargando cliente');
        setLoading(false);
      });
    }
  }, [id]);



  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return "Formato de correo inválido (ej: juan@ejemplo.com)";
    } 
    return ""; 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email') {
      const mensajeError = validarEmail(value);
      setErrorEmail(mensajeError);
    }
  };

  const handleAddressChange = (index, field, value) => {
    setFormData(prev => {
      const newAddresses = [...prev.addresses];
      newAddresses[index] = { ...newAddresses[index], [field]: value };
      return { ...prev, addresses: newAddresses };
    });
  };

  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, { id: uuidv4(), street: '', city: '', state: '', zipCode: '' }]
    }));
  };

  const removeAddress = (index) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Nombre y Email son requeridos');
      return;
    }
    
    setSaving(true);
    setError(null);
    try {
      await saveClient(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error guardando cliente');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingCircule />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 bg-white rounded-full border border-slate-200 text-slate-500 hover:text-brand-500 hover:border-brand-200 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {id ? 'Editar Cliente' : 'Nuevo Cliente'}
          </h1>
          <p className="text-sm text-slate-500">
            {id ? 'Actualizar detalles del cliente y sus direcciones.' : 'Agregar un nuevo cliente a tu lista.'}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">1</div>
            Informacion Personal
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Nombre Completo *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Juan Perez"
               className={`w-full px-4 py-2.5 bg-slate-50 border rounded-lg outline-none transition-all focus:bg-white focus:ring-2 
          ${error && !formData.name 
            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' // Estilo si hay error
            : 'border-slate-200 focus:ring-brand-500/20 focus:border-brand-500' // Estilo normal
          }`}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Correo Electrónico *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}d
                placeholder="juan@ejemplo.com"
                className={`w-full px-4 py-2.5 bg-slate-50 border rounded-lg outline-none transition-all focus:bg-white focus:ring-2 
          ${error && !formData.email 
            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' // Estilo si hay error
            : 'border-slate-200 focus:ring-brand-500/20 focus:border-brand-500' // Estilo normal
          }`}
              />
              {errorEmail && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center">
          <span className="mr-1">⚠️</span> {errorEmail}
        </p>
      )}
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Número de Teléfono</label>
              <IMaskInput
                mask="+1 (000) 000-0000"
                value={formData.phone}
                type="tel"
                name="phone"
                unmask={false}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                placeholder="+1 (829) 289-3912"
              />
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">2</div>
              Direcciones
            </h2>
            <button
              type="button"
              onClick={addAddress}
              className="text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Plus size={16} /> Agregar Dirección
            </button>
          </div>

          <div className="space-y-4">
            {formData.addresses.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <MapPin className="mx-auto text-slate-400 mb-2" size={24} />
                <p className="text-slate-500 text-sm">No se han agregado direcciones aún.</p>
              </div>
            ) : (
              formData.addresses.map((address, index) => (
                <div key={address.id || index} className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative group">
                  <button
                    type="button"
                    onClick={() => removeAddress(index)}
                    className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Eliminar dirección"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Dirección {index + 1}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-500">Calle</label>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-sm"
                        placeholder="Ensanche Ozama #123"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-500">Ciudad</label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-sm"
                        placeholder="Santo Domingo"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-500">Estado/Provincia</label>
                        <input
                          type="text"
                          value={address.state}
                          onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-sm"
                          placeholder="Distrito Nacional"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-500">Codigo Postal</label>
                        <input
                          type="text"
                          value={address.zipCode}
                          onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-sm"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-500 hover:bg-brand-600 disabled:opacity-70 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow active:scale-95"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Save size={20} />
            )}
            <span>{id ? 'Actualizar Cliente' : 'Guardar Cliente'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
