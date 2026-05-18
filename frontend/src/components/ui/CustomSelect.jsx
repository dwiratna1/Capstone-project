import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ options, value, onChange, placeholder = "Pilih salah satu" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 rounded-lg border bg-white flex items-center justify-between outline-none transition-all text-sm ${
          isOpen ? 'border-[#0092B3] ring-1 ring-[#0092B3]' : 'border-zinc-300 focus:border-[#0092B3] focus:ring-1 focus:ring-[#0092B3]'
        }`}
      >
        <span className={value ? "text-zinc-900" : "text-zinc-400"}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-zinc-200 rounded-xl shadow-lg max-h-60 overflow-auto py-1.5 animate-in fade-in zoom-in-95 duration-100">
          {options.map((opt, i) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const label = typeof opt === 'object' ? opt.label : opt;
            const isSelected = val === value;
            
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onChange(val);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                  isSelected ? 'bg-[#F0FAFC] text-[#0092B3] font-medium' : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <span>{label}</span>
                {isSelected && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
