import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './DetalhesPedido.css';

function DetalhesPedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      'aguardando-confirmacao-pix': { label: 'Aguardando confirmação PIX', icon: '💳', cor: '#32bcad', bg: '#d1fae5' },
      'em-separacao': { label: 'Em separação', icon: '📦', cor: '#d97706', bg: '#fef3c7' },
      'em-transporte': { label: 'Em transporte', icon: '🚚', cor: '#0284c7', bg: '#dbeafe' },
      'entregue': { label: 'Entregue', icon: '✅', cor: '#059669', bg: '#d1fae5' },
      'cancelado': { label: 'Cancelado', icon: '❌', cor: '#dc2626', bg: '#fee2e2' }
    };
    return statusMap[status] || { label: status, icon: '📋', cor: '#666', bg: '#f3f4f6' };
  }

  const handleMostrarConfirmacao = () => {
    setIsLoading(true);
    // Simula um pequeno delay para mostrar o loading
    setTimeout(() => {
      setIsLoading(false);
      setMostrarConfirmacao(true);
    }, 1000);
  };

  const handleConfirmarPagamentoPix = () => {
    // Atualiza o status do pedido no localStorage
    const todosPedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const pedidosAtualizados = todosPedidos.map(p => {
      if (p.id === pedido.id) {
        return {
          ...p,
          status: 'aguardando-confirmacao-pix',
          pagamento: 'PIX',
          dataConfirmacaoPix: new Date().toISOString()
        };
      }
      return p;
    });
    localStorage.setItem('pedidos', JSON.stringify(pedidosAtualizados));
    
    // Atualiza o estado local
    setPedido({
      ...pedido,
      status: 'aguardando-confirmacao-pix',
      pagamento: 'PIX'
    });
  };

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

        {pedido.status === 'aguardando-pagamento' ? (
          <div className="pix-payment-box">
            <h3>Realizar pagamento via PIX</h3>

            <div className="pix-info">
              <div className="pix-icon-wrapper">
                {mostrarConfirmacao ? (
                  <svg className="pix-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#32bcad"/>
                  </svg>
                ) : (
                  <svg className="pix-icon loading-spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#32bcad" strokeWidth="2" strokeLinecap="round" strokeDasharray="62.83" strokeDashoffset="47.12" fill="none" opacity="0.3"/>
                    <circle cx="12" cy="12" r="10" stroke="#32bcad" strokeWidth="2" strokeLinecap="round" strokeDasharray="62.83" strokeDashoffset="47.12" fill="none">
                      <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                )}
              </div>
              <div>
                <p className="pix-cnpj-label">Envie o PIX para:</p>
                <p className="pix-cnpj-value"><strong>CNPJ:</strong> 62.164.737/0001-05</p>
                <p className="pix-total-value">Valor: <strong>R$ {pedido.total.toFixed(2).replace('.', ',')}</strong></p>
                <p className="pix-hint">
                  Realize o pagamento via PIX no valor acima e clique no botão abaixo para confirmar.
                </p>
              </div>
            </div>

            {!mostrarConfirmacao ? (
              <>
                <button 
                  className="btn-action pix-secondary" 
                  onClick={handleMostrarConfirmacao}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processando...' : 'Já realizei o pagamento via PIX'}
                </button>
                <p className="pix-warning">
                  Após realizar o pagamento, clique no botão acima para confirmar.
                  <br />
                  A compra será aprovada em até <strong>24 horas</strong> após a confirmação.
                </p>
              </>
            ) : (
              <>
                <div className="pix-confirmacao-box">
                  <p className="pix-confirmacao-text">
                    Confirme que você já realizou o pagamento via PIX no valor de <strong>R$ {pedido.total.toFixed(2).replace('.', ',')}</strong> para o CNPJ <strong>62.164.737/0001-05</strong>.
                  </p>
                </div>
                <button className="btn-action pix" onClick={handleConfirmarPagamentoPix}>
                  Confirmar pagamento via PIX
                </button>
                <p className="pix-warning">
                  Ao confirmar, seu pedido será atualizado e aprovado em até <strong>24 horas</strong>.
                </p>
              </>
            )}
          </div>
        ) : pedido.status === 'aguardando-confirmacao-pix' ? (
          <div className="pix-payment-box success">
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h3>Pagamento confirmado</h3>
              <p>Seu pedido será aprovado em até <strong>24 horas</strong>.</p>
              <p className="success-detail">O comprovante foi gerado automaticamente.</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DetalhesPedido;

