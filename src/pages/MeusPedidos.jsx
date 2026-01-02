import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MeusPedidos.css';

function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [busca, setBusca] = useState('');
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('usuarioLogado');
    if (!user) {
      navigate('/minha-conta');
      return;
    }
    setUsuario(JSON.parse(user));
    
    // Mock de pedidos - em produção viria de uma API
    const pedidosMock = [
      {
        id: '1234',
        data: '12/01/2026',
        status: 'entregue',
        total: 299.90,
        itens: [{ nome: 'Air Jordan 1', tamanho: '42', preco: 299.90 }],
        pagamento: 'Cartão de Crédito',
        endereco: 'Rua X, nº Y - Bom Despacho/MG'
      },
      {
        id: '1235',
        data: '15/01/2026',
        status: 'em-transporte',
        total: 1299.00,
        itens: [{ nome: 'Uai Jordan 1 UNC', tamanho: '40', preco: 1299.00 }],
        pagamento: 'PIX',
        endereco: 'Rua X, nº Y - Bom Despacho/MG'
      },
      {
        id: '1236',
        data: '18/01/2026',
        status: 'em-separacao',
        total: 1599.00,
        itens: [{ nome: 'Uai Jordan 3', tamanho: '41', preco: 1599.00 }],
        pagamento: 'Cartão de Crédito',
        endereco: 'Rua X, nº Y - Bom Despacho/MG'
      }
    ];
    setPedidos(pedidosMock);
  }, [navigate]);

  const pedidosFiltrados = pedidos.filter(pedido => {
    const matchFiltro = filtro === 'todos' || pedido.status === filtro;
    const matchBusca = !busca || 
      pedido.id.includes(busca) || 
      pedido.data.includes(busca);
    return matchFiltro && matchBusca;
  });

  function getStatusInfo(status) {
    const statusMap = {
      'entregue': { label: 'Entregue', icon: '✅', cor: '#059669' },
      'em-transporte': { label: 'Em transporte', icon: '🚚', cor: '#0284c7' },
      'em-separacao': { label: 'Em separação', icon: '📦', cor: '#d97706' },
      'cancelado': { label: 'Cancelado', icon: '❌', cor: '#dc2626' }
    };
    return statusMap[status] || { label: status, icon: '📋', cor: '#666' };
  }

  return (
    <div className="meus-pedidos-page">
      <div className="pedidos-container">
        <div className="pedidos-header">
          <Link to="/minha-conta" className="back-link">← Voltar para Minha Conta</Link>
          <h1>Meus Pedidos</h1>
        </div>

        <div className="busca-section">
          <div className="busca-box">
            <input
              type="text"
              placeholder="Buscar por Nº do pedido, data..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="busca-input"
            />
          </div>
        </div>

        <div className="filtros-section">
          <button
            className={`filtro-btn ${filtro === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltro('todos')}
          >
            Todos
          </button>
          <button
            className={`filtro-btn ${filtro === 'em-separacao' ? 'active' : ''}`}
            onClick={() => setFiltro('em-separacao')}
          >
            Em separação
          </button>
          <button
            className={`filtro-btn ${filtro === 'em-transporte' ? 'active' : ''}`}
            onClick={() => setFiltro('em-transporte')}
          >
            Em transporte
          </button>
          <button
            className={`filtro-btn ${filtro === 'entregue' ? 'active' : ''}`}
            onClick={() => setFiltro('entregue')}
          >
            Entregues
          </button>
          <button
            className={`filtro-btn ${filtro === 'cancelado' ? 'active' : ''}`}
            onClick={() => setFiltro('cancelado')}
          >
            Cancelados
          </button>
        </div>

        <div className="pedidos-list">
          {pedidosFiltrados.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum pedido encontrado.</p>
            </div>
          ) : (
            pedidosFiltrados.map(pedido => {
              const statusInfo = getStatusInfo(pedido.status);
              return (
                <Link
                  key={pedido.id}
                  to={`/minha-conta/pedidos/${pedido.id}`}
                  className="pedido-card"
                >
                  <div className="pedido-header">
                    <div>
                      <span className="pedido-id">Pedido #{pedido.id}</span>
                      <span className="pedido-data">{pedido.data}</span>
                    </div>
                    <div className="pedido-status" style={{ color: statusInfo.cor }}>
                      {statusInfo.icon} {statusInfo.label}
                    </div>
                  </div>
                  <div className="pedido-info">
                    <div className="pedido-detalhes">
                      <span>Pagamento: {pedido.pagamento}</span>
                      <span className="pedido-total">Total: R$ {pedido.total.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                  <div className="pedido-action">
                    Ver detalhes →
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default MeusPedidos;

