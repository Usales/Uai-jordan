import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loja from './components/Loja/Loja';
import Sobre from './components/Sobre/Sobre';
import Carrinho from './components/Carrinho/Carrinho';
import MinhaConta from './components/MinhaConta/MinhaConta';
import Cadastro from './components/Cadastro/Cadastro';
import Login from './components/Login/Login';
// Novas páginas
import Home from './pages/Home';
import Contato from './pages/Contato';
import PoliticaTroca from './pages/PoliticaTroca';
import FAQ from './pages/FAQ';
import RastrearPedido from './pages/RastrearPedido';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/minha-conta" element={<MinhaConta />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/politica-troca" element={<PoliticaTroca />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/rastrear-pedido" element={<RastrearPedido />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
