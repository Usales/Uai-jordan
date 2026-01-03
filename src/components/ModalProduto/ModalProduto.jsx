import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ModalProduto.css';

const ModalProduto = ({ produto, onClose }) => {
    const [fotoPrincipal, setFotoPrincipal] = useState(0);
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
    const [mensagemErro, setMensagemErro] = useState('');
    const [descricaoExpandida, setDescricaoExpandida] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const galeriaRef = useRef(null);

    const tamanhos = [
        '34', '35', '36', '37', '38', '39', 
        '40', '41', '42', '43', '44'
    ];

    // Descrição padrão se não existir
    const descricaoCompleta = produto.descricao || 'Inspirado em caças da Segunda Guerra, traz detalhes translúcidos e muita personalidade para o seu visual.';
    const descricaoCurta = descricaoCompleta.length > 120 
        ? descricaoCompleta.substring(0, 120) + '...' 
        : descricaoCompleta;
    const mostraVerMais = descricaoCompleta.length > 120;

    // Avaliações (mock data)
    const avaliacoes = produto.avaliacoes || { estrelas: 5, quantidade: 128 };

    function handleComprar() {
        if (!tamanhoSelecionado) {
            setMensagemErro('Selecione um tamanho antes de comprar!');
            return;
        }
        setMensagemErro('');
        
        // Estrutura do item do carrinho
        const item = {
            id: produto.id || produto.nome,
            nome: produto.nome,
            imagem: produto.fotos[0],
            preco: produto.preco,
            tamanho: tamanhoSelecionado,
            quantidade: 1
        };
        
        // Adiciona ao carrinho
        let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        // Verifica se já existe o mesmo produto e tamanho
        const idx = carrinho.findIndex(p => p.id === item.id && p.tamanho === item.tamanho);
        if (idx !== -1) {
            carrinho[idx].quantidade += 1;
        } else {
            carrinho.push(item);
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        // Fecha o modal após adicionar
        onClose();
    }

    function proximaFoto() {
        setFotoPrincipal((prev) => (prev + 1) % produto.fotos.length);
    }

    function fotoAnterior() {
        setFotoPrincipal((prev) => (prev - 1 + produto.fotos.length) % produto.fotos.length);
    }

    // Swipe touch handlers
    const minSwipeDistance = 50;

    function onTouchStart(e) {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }

    function onTouchMove(e) {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    function onTouchEnd() {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            proximaFoto();
        }
        if (isRightSwipe) {
            fotoAnterior();
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-body">
                    <div 
                        className="modal-galeria"
                        ref={galeriaRef}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <button 
                            className="modal-nav-btn modal-nav-prev"
                            onClick={fotoAnterior}
                            aria-label="Foto anterior"
                        >
                            <FaChevronLeft />
                        </button>
                        <div className="modal-foto-container">
                            <img 
                                src={produto.fotos[fotoPrincipal]} 
                                alt={produto.nome} 
                                className="modal-foto-principal" 
                            />
                        </div>
                        <button 
                            className="modal-nav-btn modal-nav-next"
                            onClick={proximaFoto}
                            aria-label="Próxima foto"
                        >
                            <FaChevronRight />
                        </button>
                        <div className="modal-miniaturas">
                            {produto.fotos.map((foto, index) => (
                                <img
                                    key={index}
                                    src={foto}
                                    alt={`Miniatura ${index + 1}`}
                                    className={`modal-miniatura ${index === fotoPrincipal ? 'ativa' : ''}`}
                                    onClick={() => setFotoPrincipal(index)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="modal-sidebar">
                        <h2 className="modal-nome">{produto.nome}</h2>
                        
                        <div className="modal-descricao-wrapper">
                            <p className={`modal-descricao ${descricaoExpandida ? 'expandida' : ''}`}>
                                {descricaoExpandida ? descricaoCompleta : descricaoCurta}
                            </p>
                            {mostraVerMais && (
                                <button 
                                    className="modal-ver-mais"
                                    onClick={() => setDescricaoExpandida(!descricaoExpandida)}
                                >
                                    {descricaoExpandida ? 'Ver menos' : 'Ver mais'}
                                </button>
                            )}
                        </div>

                        <div className="modal-avaliacoes">
                            <div className="modal-estrelas">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar 
                                        key={i} 
                                        className={i < avaliacoes.estrelas ? 'estrela-preenchida' : 'estrela-vazia'} 
                                    />
                                ))}
                            </div>
                            <span className="modal-avaliacoes-count">({avaliacoes.quantidade} avaliações)</span>
                        </div>
                        
                        <div className="modal-preco-wrapper">
                            <p className="modal-preco">{produto.preco}</p>
                            <span className="modal-parcelamento">em até 10x sem juros</span>
                        </div>
                        
                        <div className="modal-tamanhos">
                            <h3 className="tamanhos-titulo">Selecionar Tamanho</h3>
                            <div className="tamanhos-grid">
                                {tamanhos.map(tamanho => (
                                    <button 
                                        key={tamanho}
                                        className={`tamanho-botao ${tamanho === tamanhoSelecionado ? 'selecionado' : ''}`}
                                        onClick={() => { setTamanhoSelecionado(tamanho); setMensagemErro(''); }}
                                    >
                                        {tamanho}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {mensagemErro && (
                            <div className="modal-erro">{mensagemErro}</div>
                        )}
                    </div>
                </div>
                
                <button 
                    className="modal-comprar-fixed" 
                    onClick={handleComprar} 
                    disabled={!tamanhoSelecionado}
                >
                    Comprar agora
                </button>
            </div>
        </div>
    );
};

export default ModalProduto; 