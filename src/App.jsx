import React from 'react';
import WeatherApp from './components/WeatherApp';
import { UnitProvider } from './context/UnitContext';
import './App.css'; // Import the CSS file

const App = () => (
    <UnitProvider>
        <div className="container">
            <WeatherApp />
        </div>
    </UnitProvider>
);

export default App;
