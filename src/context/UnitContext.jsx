import React, { createContext, useContext, useState } from 'react';

// Create a context
const UnitContext = createContext();

// Create a provider component
const UnitProvider = ({ children }) => {
    const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

    return (
        <UnitContext.Provider value={{ unit, setUnit }}>
            {children}
        </UnitContext.Provider>
    );
};

// Custom hook to use the UnitContext
const useUnit = () => useContext(UnitContext);

export { UnitProvider, useUnit };
