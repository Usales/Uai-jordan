import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaStore, FaInfoCircle, FaEnvelope, FaExchangeAlt, FaQuestionCircle, FaUser } from 'react-icons/fa';
import './Header.css';

function Header({ bgColor, noSticky }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((open) => !open);
  }
  function closeMenu() {
    setMenuOpen(false);
  }

  // Fechar menu ao pressionar ESC
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    }
    if (menuOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [menuOpen]);

  // Prevenir scroll do body quando menu aberto (mobile)
  useEffect(() => {
    if (menuOpen && window.innerWidth <= 900) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const menuItems = [
    { path: '/', label: 'Início', icon: <FaHome /> },
    { path: '/loja', label: 'Loja', icon: <FaStore /> },
    { path: '/sobre', label: 'Sobre nós', icon: <FaInfoCircle /> },
    { path: '/contato', label: 'Contato', icon: <FaEnvelope /> },
    { path: '/politica-troca', label: 'Política de Troca', icon: <FaExchangeAlt /> },
    { path: '/faq', label: 'FAQ', icon: <FaQuestionCircle /> },
    { path: '/minha-conta', label: 'Minha Conta', icon: <FaUser /> },
  ];

  return (
    <>
      <header className={`app-header${noSticky ? ' no-sticky' : ''}`} style={{ background: bgColor || '#C51F1F' }}>
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
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  <span className="nav-menu-text">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/carrinho" onClick={closeMenu}>
              <button 
                className="cart-button"
                style={{ background: '#fff', color: bgColor || '#C51F1F' }}
              >
                Carrinho
              </button>
            </Link>
          </div>
        </nav>
      </header>
      
      {/* Bottom Sheet Overlay (mobile) */}
      {menuOpen && (
        <>
          <div className="bottom-sheet-overlay" onClick={closeMenu}></div>
          <div className={`bottom-sheet${menuOpen ? ' open' : ''}`}>
            <div className="bottom-sheet-handle" onClick={closeMenu}></div>
            <ul className="bottom-sheet-menu" onClick={closeMenu}>
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={location.pathname === item.path ? 'active' : ''}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default Header;