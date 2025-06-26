import React, { useState } from 'react';
import Header from './components/Header/Header';
import TelaInicio from './components/TelaInicio/TelaInicio';
import './App.css';

function App() {
  const [headerColor, setHeaderColor] = useState('#D72B3D');

  return (
    <div className="App">
      <Header bgColor={headerColor} />
      <TelaInicio onHeaderColorChange={setHeaderColor} />
    </div>
  );
}

export default App;
