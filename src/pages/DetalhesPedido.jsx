import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './DetalhesPedido.css';

function DetalhesPedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('usuarioLogado');
    if (!user) {
      navigate('/minha-conta');
      return;
    }

    const usuarioAtual = JSON.parse(user);
    
    // Busca pedidos do localStorage
    const todosPedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const pedidoEncontrado = todosPedidos.find(
      p => p.id === id && p.usuarioEmail === usuarioAtual.email
    );

    if (pedidoEncontrado) {
      setPedido(pedidoEncontrado);
    } else {
      navigate('/minha-conta/pedidos');
    }
  }, [id, navigate]);

  if (!pedido) {
    return <div className="detalhes-pedido-page">Carregando...</div>;
  }

  function getStatusInfo(status) {
    const statusMap = {
      'aguardando-pagamento': { label: 'Aguardando pagamento', icon: '⏳', cor: '#f59e0b', bg: '#fef3c7' },
      'em-separacao': { label: 'Em separação', icon: '📦', cor: '#d97706', bg: '#fef3c7' },
      'em-transporte': { label: 'Em transporte', icon: '🚚', cor: '#0284c7', bg: '#dbeafe' },
      'entregue': { label: 'Entregue', icon: '✅', cor: '#059669', bg: '#d1fae5' },
      'cancelado': { label: 'Cancelado', icon: '❌', cor: '#dc2626', bg: '#fee2e2' }
    };
    return statusMap[status] || { label: status, icon: '📋', cor: '#666', bg: '#f3f4f6' };
  }

  const statusInfo = getStatusInfo(pedido.status);

  return (
    <div className="detalhes-pedido-page">
      <div className="detalhes-container">
        <Link to="/minha-conta/pedidos" className="back-link">← Voltar para Meus Pedidos</Link>
        
        <div className="pedido-header-detalhes">
          <div>
            <h1>Pedido #{pedido.id}</h1>
            <p className="pedido-data-detalhes">Data: {pedido.data}</p>
          </div>
          <div className="status-badge" style={{ background: statusInfo.bg, color: statusInfo.cor }}>
            {statusInfo.icon} {statusInfo.label}
          </div>
        </div>

        <div className="detalhes-section">
          <h2>Endereço de entrega</h2>
          <p>{pedido.endereco}</p>
        </div>

        <div className="detalhes-section">
          <h2>Forma de pagamento</h2>
          <p>{pedido.pagamento}</p>
        </div>

        {pedido.codigoRastreamento && (
          <div className="detalhes-section">
            <h2>Código de rastreamento</h2>
            <p className="codigo-rastreamento">{pedido.codigoRastreamento}</p>
          </div>
        )}

        <div className="detalhes-section">
          <h2>Itens do pedido</h2>
          <div className="itens-list">
            {pedido.itens.map((item, index) => (
              <div key={index} className="item-card">
                <div className="item-info">
                  <span className="item-nome">{item.nome}</span>
                  <span className="item-detalhes">Tamanho: {item.tamanho} | Qtd: {item.quantidade}</span>
                </div>
                <span className="item-preco">R$ {item.preco.toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="total-section">
          <div className="total-line">
            <span>Total:</span>
            <span className="total-valor">R$ {pedido.total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        <div className="acoes-section">
          <button className="btn-action">Baixar comprovante</button>
          <Link to="/politica-troca" className="btn-action secondary">
            Solicitar troca/devolução
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetalhesPedido;

