import React from 'react';
import './Header.css';

function Header({ bgColor }) {
  return (
    <header className="app-header" style={{ background: bgColor || '#D72B3D' }}>
      <nav className="nav-container">
        <h1 className="brand-title">UAI-JORDAN</h1>
        
        <ul className="nav-menu">
          <li><a href="/loja">Loja</a></li>
          <li><a href="/sobre">Sobre nós</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/cadastro">Cadastro</a></li>
        </ul>
        
        <button 
          className="cart-button"
          style={{ background: '#fff', color: bgColor || '#D72B3D' }}
        >
          Carrinho
        </button>
      </nav>
    </header>
  );
}

export default Header; 