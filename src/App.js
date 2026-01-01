import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loja from './components/Loja/Loja';
import Sobre from './components/Sobre/Sobre';
import Carrinho from './components/Carrinho/Carrinho';
import MinhaConta from './pages/MinhaConta';
import Login from './pages/Login';
// Novas páginas
import Home from './pages/Home';
import Contato from './pages/Contato';
import PoliticaTroca from './pages/PoliticaTroca';
import FAQ from './pages/FAQ';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Header noSticky={isHomePage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/minha-conta" element={<MinhaConta />} />
        <Route path="/login" element={<Login />} />
        <Route path="/politica-troca" element={<PoliticaTroca />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
