import React, { useState, useEffect } from 'react';
import './Loja.css';
import CardProduto from '../CardProduto/CardProduto';
import ModalProduto from '../ModalProduto/ModalProduto';

const Loja = () => {
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        // Simula o carregamento dos dados dos produtos
        const todosProdutos = [
            {
                id: 1,
                nome: 'Air Jordan 1 High "Black and White"',
                preco: 'R$ 1.199,99',
                fotos: [
                    '/imagens/imagens-loja/air-preto-foto-1.avif',
                    '/imagens/imagens-loja/air-preto-foto-2.avif',
                    '/imagens/imagens-loja/air-preto-foto-3.avif',
                    '/imagens/imagens-loja/air-preto-foto-4.avif',
                    '/imagens/imagens-loja/air-preto-foto-5.avif',
                    '/imagens/imagens-loja/air-preto-foto-6.avif',
                ],
            },
            {
                id: 2,
                nome: 'Air Jordan 1 Mid "Reimagined"',
                preco: 'R$ 1.299,99',
                fotos: [
                    '/imagens/imagens-loja/air-reimagined-foto-1.avif',
                    '/imagens/imagens-loja/air-reimagined-foto-2.avif',
                    '/imagens/imagens-loja/air-reimagined-foto-3.avif',
                    '/imagens/imagens-loja/air-reimagined-foto-4.avif',
                    '/imagens/imagens-loja/air-reimagined-foto-5.avif',
                    '/imagens/imagens-loja/air-reimagined-foto-6.avif',
                ],
            },
            {
                id: 3,
                nome: 'Air Jordan 1 Low "University Blue"',
                preco: 'R$ 999,99',
                fotos: [
                    '/imagens/imagens-loja/air-lowlow-foto-1.avif',
                    '/imagens/imagens-loja/air-lowlow-foto-2.avif',
                    '/imagens/imagens-loja/air-lowlow-foto-3.avif',
                    '/imagens/imagens-loja/air-lowlow-foto-4.avif',
                    '/imagens/imagens-loja/air-lowlow-foto-5.avif',
                    '/imagens/imagens-loja/air-lowlow-foto-6.avif',
                ],
            },
            {
                id: 4,
                nome: 'Air Jordan 1 Mid "Bred"',
                preco: 'R$ 1.349,99',
                fotos: [
                    '/imagens/imagens-loja/air-redhat-foto-1.avif',
                    '/imagens/imagens-loja/air-redhat-foto-2.avif',
                    '/imagens/imagens-loja/air-redhat-foto-3.avif',
                    '/imagens/imagens-loja/air-redhat-foto-4.avif',
                    '/imagens/imagens-loja/air-redhat-foto-5.jpg',
                    '/imagens/imagens-loja/air-redhat-foto-6.avif',
                ],
            },
            {
                id: 5,
                nome: 'Air Jordan 1 Low "Pinky"',
                preco: 'R$ 1.099,99',
                fotos: [
                    '/imagens/imagens-loja/air-pinky-foto-1.avif',
                    '/imagens/imagens-loja/air-pinky-foto-2.avif',
                    '/imagens/imagens-loja/air-pinky-foto-3.avif',
                    '/imagens/imagens-loja/air-pinky-foto-4.avif',
                    '/imagens/imagens-loja/air-pinky-foto-5.avif',
                    '/imagens/imagens-loja/air-pinky-foto-6.avif',
                ],
            },
            {
                id: 6,
                nome: 'Air Jordan 1 Mid "Ivory"',
                preco: 'R$ 1.249,99',
                fotos: [
                    '/imagens/imagens-loja/air-ivory-foto-1.avif',
                    '/imagens/imagens-loja/air-ivory-foto-2.avif',
                    '/imagens/imagens-loja/air-ivory-foto-3.avif',
                    '/imagens/imagens-loja/air-ivory-foto-4.avif',
                    '/imagens/imagens-loja/air-ivory-foto-5.avif',
                    '/imagens/imagens-loja/air-ivory-foto-6.avif',
                ],
            },
             {
                id: 7,
                nome: 'Air Jordan 3 "White Cement"',
                preco: 'R$ 1.799,99',
                fotos: [
                    '/imagens/imagens-loja/air-cimento-foto-1.avif',
                    '/imagens/imagens-loja/air-cimento-foto-2.jpg',
                    '/imagens/imagens-loja/air-cimento-foto-3.avif',
                    '/imagens/imagens-loja/air-cimento-foto-4.avif',
                    '/imagens/imagens-loja/air-cimento-foto-5.avif',
                    '/imagens/imagens-loja/air-cimento-foto-6.avif',
                ],
            },
             {
                id: 8,
                nome: 'Air Jordan 1 Mid "Infrared 23"',
                preco: 'R$ 1.399,99',
                fotos: [
                    '/imagens/imagens-loja/air-blackred-foto-1.avif',
                    '/imagens/imagens-loja/air-blackred-foto-2.jpg',
                    '/imagens/imagens-loja/air-blackred-foto-3.avif',
                    '/imagens/imagens-loja/air-blackred-foto-4.jpg',
                    '/imagens/imagens-loja/air-blackred-foto-5.avif',
                    '/imagens/imagens-loja/air-blackred-foto-6.avif',
                ],
            },
            {
                id: 9,
                nome: 'Air Jordan 1 Low "Triple Black"',
                preco: 'R$ 999,99',
                fotos: [
                    '/imagens/imagens-loja/air-black-foto-1.avif',
                    '/imagens/imagens-loja/air-black-foto-2.avif',
                    '/imagens/imagens-loja/air-black-foto-3.avif',
                    '/imagens/imagens-loja/air-black-foto-4.avif',
                    '/imagens/imagens-loja/air-black-foto-5.avif',
                    '/imagens/imagens-loja/air-black-foto-6.avif',
                ],
            },
            {
                id: 10,
                nome: 'Air Jordan 1 Low "Aluminum"',
                preco: 'R$ 1.049,99',
                fotos: [
                    '/imagens/imagens-loja/air-low-foto-1.avif',
                    '/imagens/imagens-loja/air-low-foto-2.avif',
                    '/imagens/imagens-loja/air-low-foto-3.avif',
                    '/imagens/imagens-loja/air-low-foto-4.avif',
                    '/imagens/imagens-loja/air-low-foto-5.avif',
                    '/imagens/imagens-loja/air-low-foto-6.avif',
                ],
            },
        ];
        setProdutos(todosProdutos);
    }, []);

    const handleAbrirModal = (produto) => {
        setProdutoSelecionado(produto);
    };

    const handleFecharModal = () => {
        setProdutoSelecionado(null);
    };

    return (
        <>
            <div className="loja-container fade-in-up">
                <h1 className="loja-titulo">Nossos Produtos</h1>
                <div className="produtos-grid">
                    {produtos.map(produto => (
                        <CardProduto key={produto.id} produto={produto} onVerDetalhes={handleAbrirModal} />
                    ))}
                </div>
            </div>
            {produtoSelecionado && <ModalProduto produto={produtoSelecionado} onClose={handleFecharModal} />}
        </>
    );
};

export default Loja; 