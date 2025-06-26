import React, { useState, useEffect } from 'react';
import './CarrosselTenis.css';

const tenisData = [
  {
    nome: 'Uai Jordan 1 UNC',
    descricao: 'O clássico que revolucionou o basquete e a cultura sneaker. Cabedal em couro premium, cores icônicas e conforto lendário.',
    valor: 'R$ 1.299,00',
    imagem: '/imagens/air-1.png',
    corFundo: '#D72B3D',
    corNavbar: '#D72B3D',
  },
  {
    nome: 'Uai Jordan 2',
    descricao: 'Design sofisticado, materiais de alta qualidade e uma silhueta que marcou época. Ideal para quem busca exclusividade.',
    valor: 'R$ 1.499,00',
    imagem: '/imagens/air-2.png',
    corFundo: '#C299D3',
    corNavbar: '#C299D3',
  },
  {
    nome: 'Uai Jordan 3',
    descricao: 'Primeiro Jordan com o famoso "elephant print" e tecnologia de amortecimento visível. Um ícone dos anos 80.',
    valor: 'R$ 1.599,00',
    imagem: '/imagens/air-3.png',
    corFundo: '#CC9039',
    corNavbar: '#CC9039',
  },
  {
    nome: 'Uai Jordan 4',
    descricao: 'Reconhecido pelo design arrojado e detalhes em mesh. Muito desejado por colecionadores e fãs de streetwear.',
    valor: 'R$ 1.699,00',
    imagem: '/imagens/air-4.png',
    corFundo: '#00863B',
    corNavbar: '#00863B',
  },
  {
    nome: 'Uai Jordan 5',
    descricao: 'Inspirado em caças da Segunda Guerra, traz detalhes translúcidos e muita personalidade para o seu visual.',
    valor: 'R$ 1.799,00',
    imagem: '/imagens/air-5.png',
    corFundo: '#BCF002',
    corNavbar: '#BCF002',
  },
];

function CarrosselTenis({ onChange, onColorChange, onComprar }) {
  const [indice, setIndice] = useState(0);
  const [animando, setAnimando] = useState(false);
  const [direcao, setDirecao] = useState('right');
  const [proximoIndice, setProximoIndice] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext('right', true);
    }, 4000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [indice]);

  useEffect(() => {
    if (onChange) onChange(tenisData[indice]);
    if (typeof onColorChange === 'function') onColorChange(tenisData[indice]);
  }, [indice, onChange, onColorChange]);

  function handleNext(dir = 'right', auto = false) {
    if (animando) return;
    setDirecao(dir);
    setAnimando(true);
    let novoIndice;
    if (dir === 'right') {
      novoIndice = (indice + 1) % tenisData.length;
    } else {
      novoIndice = (indice - 1 + tenisData.length) % tenisData.length;
    }
    setProximoIndice(novoIndice);
    setTimeout(() => {
      setIndice(novoIndice);
      setAnimando(false);
      setProximoIndice(null);
    }, 400); // duração da animação
  }

  function handlePrev() {
    handleNext('left');
  }

  return (
    <div className="carrossel-tenis" style={{ background: tenisData[indice].corFundo }}>
      <div className={`carrossel-info${animando ? ` info-${direcao}` : ''}`} key={indice}>
        <h2 className="carrossel-nome">{tenisData[indice].nome}</h2>
        <p className="carrossel-descricao">{tenisData[indice].descricao}</p>
        <span className="carrossel-valor">{tenisData[indice].valor}</span>
        <div className="carrossel-estrelas">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="estrela">★</span>
          ))}
        </div>
        <button className="carrossel-comprar" onClick={() => onComprar && onComprar(tenisData[indice])}>Comprar</button>
      </div>
      <div className="carrossel-content">
        <button className="carrossel-btn left" onClick={handlePrev}>&lt;</button>
        <div className="carrossel-anim-wrapper">
          {/* Slide atual */}
          <div
            className={`tenis-flutuante ${animando ? `sai-${direcao}` : ''}`}
            key={indice}
            style={{ zIndex: animando ? 1 : 2 }}
          >
            <div className="tenis-esfera">
            </div>
            <img src={tenisData[indice].imagem} alt={tenisData[indice].nome} />
            <div className="tenis-sombra"></div>
          </div>
          {/* Slide novo */}
          {animando && proximoIndice !== null && (
            <div
              className={`tenis-flutuante entra-${direcao}`}
              key={proximoIndice}
              style={{ zIndex: 2 }}
            >
              <div className="tenis-esfera">
                <span className="esfera-menor esfera-menor-1"></span>
                <span className="esfera-menor esfera-menor-2"></span>
                <span className="esfera-menor esfera-menor-3"></span>
              </div>
              <img src={tenisData[proximoIndice].imagem} alt={tenisData[proximoIndice].nome} />
              <div className="tenis-sombra"></div>
            </div>
          )}
        </div>
        <button className="carrossel-btn right" onClick={() => handleNext('right')}>&gt;</button>
      </div>
      <div className="carrossel-indicadores">
        {tenisData.map((_, i) => (
          <span key={i} className={i === indice ? 'ativo' : ''}></span>
        ))}
      </div>
    </div>
  );
}

export default CarrosselTenis; 