import React, { useState } from 'react';

function RastrearPedido() {
  const [codigo, setCodigo] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/.netlify/functions/rastrearPedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: data.status });
      } else {
        setStatus({ type: 'error', msg: data.message });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Erro ao rastrear. Tente novamente.' });
    }
    setLoading(false);
  }

  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2.5rem 1.5rem', maxWidth: 500, margin: '2.5rem auto', minHeight: 350 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24, color: '#D72B3D' }}>Rastrear Pedido</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o código do pedido"
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
          style={{ width: '100%', marginBottom: '1.2rem', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          required
        />
        <button type="submit" disabled={loading} style={{ width: '100%', background: '#D72B3D', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 18, cursor: 'pointer', marginTop: 8 }}>{loading ? 'Rastreando...' : 'Rastrear'}</button>
      </form>
      {status && (
        <p style={{ color: status.type === 'success' ? 'green' : 'red', marginTop: '1.5rem', textAlign: 'center', fontWeight: 500 }}>{status.msg}</p>
      )}
    </div>
  );
}

export default RastrearPedido; 