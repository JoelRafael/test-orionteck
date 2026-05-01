import { useEffect, useState } from 'react';

export default function Loading({ counter = 4 }) {

    const [values, setValues] = useState([]);

    useEffect(() => {

        setValues(Array.from({ length: counter }, (_, i) => i + 1));
   

    }, [counter]);

    return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    
          {values.map((value) => (
            <div key={value} className="bg-white rounded-2xl border border-slate-100 p-6 h-[220px] animate-pulse">
              <div className="flex gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-slate-200 rounded w-full"></div>
                <div className="h-3 bg-slate-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
    )
}