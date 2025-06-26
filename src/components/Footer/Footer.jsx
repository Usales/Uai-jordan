import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>Sobre o Projeto</h3>
          <ul>
            <li className="footer-projeto">Projeto feito em React, Javascript e CSS. Feito como pedido para um cliente, trabalho como freelancer de 3 semanas</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Links Úteis</h3>
          <ul>
            <li><a href="https://salesportifolio.netlify.app/">Portifolio</a></li>
            <li><a href="https://github.com/Usales">Github</a></li>
            <li><a href="https://www.linkedin.com/in/gabriel-henriques-sales-43953b218/">Linkedin</a></li>
            <li><a href="https://br.pinterest.com/search/my_pins/?q=air%20jordan&rs=typed">Imagens | Produtos</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Contato</h3>
          <ul>
            <li>Email: GabrielHenriqueslsales1@gmail.com</li>
            <li>Whatsapp: (62) 99522-7774</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
