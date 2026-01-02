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
    const usuarioAtual = JSON.parse(user);
    setUsuario(usuarioAtual);
    
    // Busca pedidos do localStorage do usuário logado
    const todosPedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const pedidosDoUsuario = todosPedidos
      .filter(pedido => pedido.usuarioEmail === usuarioAtual.email)
      .sort((a, b) => {
        // Ordena por ID (timestamp) decrescente - mais recentes primeiro
        return parseInt(b.id) - parseInt(a.id);
      });
    
    setPedidos(pedidosDoUsuario);
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
      'aguardando-pagamento': { label: 'Aguardando pagamento', icon: '⏳', cor: '#f59e0b' },
      'em-separacao': { label: 'Em separação', icon: '📦', cor: '#d97706' },
      'em-transporte': { label: 'Em transporte', icon: '🚚', cor: '#0284c7' },
      'entregue': { label: 'Entregue', icon: '✅', cor: '#059669' },
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
            className={`filtro-btn ${filtro === 'aguardando-pagamento' ? 'active' : ''}`}
            onClick={() => setFiltro('aguardando-pagamento')}
          >
            Aguardando pagamento
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

