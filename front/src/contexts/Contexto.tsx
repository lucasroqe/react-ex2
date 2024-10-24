import React, { createContext, useContext, useEffect, useState } from 'react';
import RGB from '../services/RGB';

interface ColorContextType {
  rgb: { r: number; g: number; b: number };
  setColor: (r: number, g: number, b: number) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  const setColor = (r: number, g: number, b: number) => {
    console.log(r, g, b)
    setRgb({ r: Math.min(Math.max(r, 0), 255), g: Math.min(Math.max(g, 0), 255), b: Math.min(Math.max(b, 0), 255) });
  };

  useEffect(()=>{
    get();
  }, []);

  const get = async () => {
    const res = await RGB.get(undefined);
    console.log(res);
    
    
  };

  return (
    <ColorContext.Provider value={{ rgb, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};