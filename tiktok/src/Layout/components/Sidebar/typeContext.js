import React, { createContext, useState } from 'react';

export const TypeContext = createContext();

export const TypeProvider = ({ children }) => {
  const [type, setType] = useState('');

  return (
    <TypeContext.Provider value={{ type, setType }}>
      {children}
    </TypeContext.Provider>
  );
};