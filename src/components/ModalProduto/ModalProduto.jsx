import React, { useState } from 'react';
import './ModalProduto.css';

const ModalProduto = ({ produto, onClose }) => {
    const [fotoPrincipal, setFotoPrincipal] = useState(produto.fotos[0]);
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
    const [mensagemErro, setMensagemErro] = useState('');

    const tamanhos = [
        '34', '35', '36', '37', '38', '39', 
        '40', '41', '42', '43', '44'
    ];

    function handleComprar() {
        if (!tamanhoSelecionado) {
            setMensagemErro('Selecione um tamanho antes de comprar!');
            return;
        }
        setMensagemErro('');
        // Aqui você pode adicionar ao carrinho normalmente
        // ...
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-body">
                    <div className="modal-galeria">
                        <img src={fotoPrincipal} alt={produto.nome} className="modal-foto-principal" />
                        <div className="modal-miniaturas">
                            {produto.fotos.map((foto, index) => (
                                <img
                                    key={index}
                                    src={foto}
                                    alt={`Miniatura ${index + 1}`}
                                    className={`modal-miniatura ${foto === fotoPrincipal ? 'ativa' : ''}`}
                                    onMouseEnter={() => setFotoPrincipal(foto)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="modal-sidebar">
                        <h2 className="modal-nome">{produto.nome}</h2>
                        <p className="modal-preco">{produto.preco}</p>
                        
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
                        {mensagemErro && <div style={{color:'#b71c2b', marginTop:8, fontWeight:'bold'}}>{mensagemErro}</div>}
                        <button className="modal-comprar" onClick={handleComprar} disabled={!tamanhoSelecionado} style={{opacity: !tamanhoSelecionado ? 0.6 : 1}}>Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProduto; 