import React from 'react';
import './Sobre.css';

const Sobre = () => {
  return (
    <div className="sobre-container fade-in-up">
      <div className="sobre-content">
        <div className="sobre-img-box">
          <img src="/imagens/logo.png" alt="Logo UAI Calçados" className="sobre-img" />
        </div>
        <div className="sobre-texto">
          <h1>Sobre a UAI Calçados</h1>
          
          <div className="sobre-highlights">
            <div className="highlight-item">
              <span className="highlight-icon">✦</span>
              <div>
                <h3>Estilo</h3>
                <p>O que há de mais atual em moda e tendências</p>
              </div>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">✦</span>
              <div>
                <h3>Conforto</h3>
                <p>Calçados que transformam confiança e bem-estar</p>
              </div>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">✦</span>
              <div>
                <h3>Identidade Mineira</h3>
                <p>Aquele toque mineiro que é a nossa marca registrada</p>
              </div>
            </div>
          </div>

          <div className="sobre-section">
            <h2>Nossa História</h2>
            <p>
              A <strong>UAI Calçados</strong> nasceu da paixão por estilo, conforto e atitude. Somos uma loja que acredita que um bom par de calçados transforma não só o visual, mas também a confiança de quem usa.
            </p>
          </div>

          <div className="sobre-section">
            <h2>O Que Oferecemos</h2>
            <p>
              Com <strong>novidades toda semana</strong>, oferecemos o que há de mais atual em moda e tendências — sempre com aquele toque mineiro que é a nossa marca registrada.
            </p>
          </div>

          <div className="sobre-section">
            <h2>Nossa Localização</h2>
            <p>
              Atendemos com carinho diretamente da nossa <strong>loja física em Bom Despacho/MG</strong>, e com <strong>entrega grátis na cidade</strong>, facilitamos o seu acesso ao que há de melhor em calçados casuais, estilosos e de qualidade.
            </p>
          </div>

          <div className="sobre-cta">
            <p>Encontre o modelo ideal para expressar sua identidade — do básico ao ousado.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
