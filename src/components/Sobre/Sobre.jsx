import React from 'react';
import './Sobre.css';

const Sobre = () => {
  return (
    <div className="sobre-container">
      <div className="sobre-img-box">
        <img src="/imagens/logo.png" alt="Logo UAI Calçados" className="sobre-img" />
      </div>
      <div className="sobre-texto">
        <h1>🥾 Sobre a UAI Calçados</h1>
        <p>
          A UAI Calçados nasceu da paixão por estilo, conforto e atitude. Somos uma loja que acredita que um bom par de calçados transforma não só o visual, mas também a confiança de quem usa. Com novidades toda semana, oferecemos o que há de mais atual em moda e tendências — sempre com aquele toque mineiro que é a nossa marca registrada.
        </p>
        <p>
          Atendemos com carinho diretamente da nossa loja física em Bom Despacho/MG, e com entrega grátis na cidade, facilitamos o seu acesso ao que há de melhor em calçados casuais, estilosos e de qualidade. Aqui, você encontra o modelo ideal para expressar sua identidade — do básico ao ousado.
        </p>
      </div>
    </div>
  );
};

export default Sobre; 