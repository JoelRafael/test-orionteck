import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-brand-500 text-white p-2 rounded-lg group-hover:bg-brand-600 transition-colors">
                <Users size={24} />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                Test Orion<span className="text-brand-500">Tek</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
