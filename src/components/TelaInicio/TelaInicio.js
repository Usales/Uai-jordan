import React, { useState, useEffect, useRef } from 'react';
import CarrosselTenis from './CarrosselTenis';
import Footer from '../Footer/Footer';
import './TelaInicio.css';

// Importar os dados dos tênis
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

function useScrollFadeIn() {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onIntersect = ([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('fade-in-up');
        observer.disconnect();
      }
    };
    const observer = new window.IntersectionObserver(onIntersect, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function TelaInicio({ onHeaderColorChange }) {
  const [modalProduto, setModalProduto] = useState(null);
  const featuresRef = useScrollFadeIn();
  const produtosRef = useScrollFadeIn();
  const footerRef = useScrollFadeIn();
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    setShowFade(true);
  }, []);

  function handleColorChange(tenis) {
    if (typeof onHeaderColorChange === 'function') {
      onHeaderColorChange(tenis.corFundo);
    }
  }

  function abrirModal(produto) {
    setModalProduto(produto);
  }

  function fecharModal() {
    setModalProduto(null);
  }

  return (
    <div className={`tela-inicio${showFade ? ' fade-in-up' : ''}`}>
      <CarrosselTenis onColorChange={handleColorChange} onComprar={abrirModal} />
      <section className="features-section" ref={featuresRef}>
        <div className="container">
          <h2 className="section-title">Por que escolher a UAI-JORDAN?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Entrega Rápida</h3>
              <p>Receba seus produtos em até 24h</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Produtos Originais</h3>
              <p>100% Mineiros</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Qualidade Premium</h3>
              <p>Os melhores materiais do mercado</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Compra Segura</h3>
              <p>Pagamento seguro e protegido</p>
            </div>
          </div>
        </div>
      </section>
      <section className="products-preview" style={{ background: '#f3f3f3' }} ref={produtosRef}>
        <div className="container">
          <h2 className="section-title">Produtos em Destaque</h2>
          <div className="products-grid">
            {tenisData.map((tenis, i) => (
              <div className="product-card" key={i}>
                <div className="product-image">
                  <img src={tenis.imagem} alt={tenis.nome} style={{ width: '180px', height: 'auto' }} />
                </div>
                <div className="product-info">
                  <h3>{tenis.nome}</h3>
                  <p className="product-desc">{tenis.descricao}</p>
                  <p className="product-price">{tenis.valor}</p>
                  <button className="btn-product" onClick={() => abrirModal(tenis)}>Ver Detalhes</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {modalProduto && (
        <div className="modal-produto-overlay" onClick={fecharModal}>
          <div className="modal-produto" onClick={e => e.stopPropagation()}>
            <div className="modal-produto-img">
              <img src={modalProduto.imagem} alt={modalProduto.nome} />
            </div>
            <div className="modal-produto-sidebar">
              <h2>{modalProduto.nome}</h2>
              <p>{modalProduto.descricao}</p>
              <div className="modal-produto-estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="estrela">★</span>
                ))}
              </div>
              <div className="modal-produto-cores">
                {tenisData.map((tenis, idx) => (
                  <img
                    key={idx}
                    src={tenis.imagem}
                    alt={tenis.nome}
                    className={`modal-produto-cor-img${tenis.nome === modalProduto.nome ? ' selecionado' : ''}`}
                    style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: '50%', border: tenis.nome === modalProduto.nome ? '2px solid #D72B3D' : '2px solid #ccc', marginRight: 8, cursor: 'pointer', background: '#fff' }}
                    onClick={() => setModalProduto(tenis)}
                  />
                ))}
              </div>
              <div className="modal-produto-tamanhos">
                {[...Array(11)].map((_, i) => (
                  <button key={i} className="modal-produto-tamanho">{34 + i}</button>
                ))}
              </div>
              <button className="modal-produto-comprar">Comprar</button>
              <button className="modal-fechar" onClick={fecharModal} title="Fechar">×</button>
            </div>
          </div>
        </div>
      )}
      <div ref={footerRef}><Footer /></div>
    </div>
  );
}

export default TelaInicio; 