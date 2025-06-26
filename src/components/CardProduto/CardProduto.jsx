import React, { useState } from 'react';
import './CardProduto.css';

const CardProduto = ({ produto, onVerDetalhes }) => {
    const [fotoPrincipal, setFotoPrincipal] = useState(produto.fotos[0]);
    const [mensagem, setMensagem] = useState('');

    const handleAdicionarCarrinho = () => {
        // Estrutura do item do carrinho
        const item = {
            id: produto.id || produto.nome,
            nome: produto.nome,
            imagem: produto.fotos[0],
            preco: produto.preco,
            tamanho: '38', // tamanho padrão
            quantidade: 1
        };
        let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        // Verifica se já existe o mesmo produto e tamanho
        const idx = carrinho.findIndex(p => p.id === item.id && p.tamanho === item.tamanho);
        if (idx !== -1) {
            carrinho[idx].quantidade += 1;
        } else {
            carrinho.push(item);
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        setMensagem('Produto adicionado ao carrinho!');
        setTimeout(() => setMensagem(''), 1800);
    };

    return (
        <div className="card-produto">
            <div className="card-imagem-container">
                <img src={fotoPrincipal} alt={produto.nome} className="card-foto-principal" />
                <div className="card-fotos-miniaturas">
                    {produto.fotos.map((foto, index) => (
                        <img
                            key={index}
                            src={foto}
                            alt={`${produto.nome} miniatura ${index + 1}`}
                            className="card-foto-miniatura"
                            onMouseEnter={() => setFotoPrincipal(foto)}
                        />
                    ))}
                </div>
            </div>
            <div className="card-info">
                <h3 className="card-nome">{produto.nome}</h3>
                <p className="card-preco">{produto.preco}</p>
                <button className="card-botao-comprar" onClick={handleAdicionarCarrinho}>Comprar</button>
                <button className="card-botao-detalhes" onClick={() => onVerDetalhes(produto)}>Ver Detalhes</button>
                {mensagem && <div className="card-mensagem-carrinho">{mensagem}</div>}
            </div>
        </div>
    );
};

export default CardProduto; 