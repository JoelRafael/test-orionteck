import { AlertTriangle } from 'lucide-react';

export default function CardAlert({isOpen, onClose, confirmUpdate, message1, message2}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{message1}</h3>
        <p className="text-sm text-slate-500 mb-6">{message2}</p>
        <div className="flex gap-3 justify-center">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            No
          </button>
          <button 
            onClick={confirmUpdate}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  );
}
