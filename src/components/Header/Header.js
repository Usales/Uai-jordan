import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ bgColor }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((open) => !open);
  }
  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="app-header" style={{ background: bgColor || '#D72B3D' }}>
      <nav className="nav-container">
        <Link to="/" className="brand-title" onClick={closeMenu}>UAI-JORDAN</Link>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }}></span>
          <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }}></span>
        </button>
        <ul className={`nav-menu${menuOpen ? ' open' : ''}`} onClick={closeMenu}>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/loja">Loja</Link></li>
          <li><Link to="/sobre">Sobre nós</Link></li>
          <li><Link to="/contato">Contato</Link></li>
          <li><Link to="/politica-troca">Política de Troca</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/minha-conta">Minha Conta</Link></li>
        </ul>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/carrinho" onClick={closeMenu}>
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