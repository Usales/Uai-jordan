import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
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
            <li>
              <a href="https://salesportifolio.netlify.app/" target="_blank" rel="noopener noreferrer">
                <FaGithub style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Portfólio
              </a>
            </li>
            <li>
              <a href="https://github.com/Usales" target="_blank" rel="noopener noreferrer">
                <FaGithub style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Github
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/gabriel-henriques-sales-43953b218/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Linkedin
              </a>
            </li>
            <li>
              <a href="https://br.pinterest.com/search/my_pins/?q=air%20jordan&rs=typed" target="_blank" rel="noopener noreferrer">
                Imagens | Produtos
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Contato</h3>
          <ul>
            <li>
              <a href="mailto:GabrielHenriqueslsales1@gmail.com">
                <FaEnvelope style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Email: GabrielHenriqueslsales1@gmail.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/5562995227774" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Whatsapp: (62) 99522-7774
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
