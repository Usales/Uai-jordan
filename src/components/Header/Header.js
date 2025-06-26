import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ bgColor }) {
  return (
    <header className="app-header" style={{ background: bgColor || '#D72B3D' }}>
      <nav className="nav-container">
        <Link to="/" className="brand-title">UAI-JORDAN</Link>
        <ul className="nav-menu">
          <li><Link to="/loja">Loja</Link></li>
          <li><Link to="/sobre">Sobre nós</Link></li>
        </ul>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/carrinho">
            <button 
              className="cart-button"
              style={{ background: '#fff', color: bgColor || '#D72B3D' }}
            >
              Carrinho
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header; 