import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import TelaInicio from './components/TelaInicio/TelaInicio';
import Loja from './components/Loja/Loja';
import Sobre from './components/Sobre/Sobre';
import Login from './components/Login/Login';
import Cadastro from './components/Cadastro/Cadastro';
import Carrinho from './components/Carrinho/Carrinho';
import MinhaConta from './components/MinhaConta/MinhaConta';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [headerColor, setHeaderColor] = useState('#D72B3D');

  return (
    <div className="App">
      <BrowserRouter>
        <Header bgColor={headerColor} />
        <main>
          <Routes>
            <Route path="/" element={<TelaInicio onHeaderColorChange={setHeaderColor} />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/minha-conta" element={<MinhaConta />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
