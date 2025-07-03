import React, { useState } from 'react';

function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/.netlify/functions/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: data.message });
        setForm({ nome: '', email: '', mensagem: '' });
      } else {
        setStatus({ type: 'error', msg: data.message });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Erro ao enviar. Tente novamente.' });
    }
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
      <div className="contato-container fade-in-up" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2.5rem 1.5rem', maxWidth: 500, width: '100%', margin: '2.5rem auto', minHeight: 350 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 24, color: '#D72B3D', fontFamily: 'Bebas Neue, Arial, sans-serif', fontSize: '2rem', letterSpacing: 1 }}>Contato</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 500 }}>Nome:<br />
              <input type="text" name="nome" value={form.nome} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} required />
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 500 }}>Email:<br />
              <input type="email" name="email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} required />
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 500 }}>Mensagem:<br />
              <textarea name="mensagem" rows={4} value={form.mensagem} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} required />
            </label>
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', background: '#D72B3D', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 18, cursor: 'pointer', marginTop: 8 }}>{loading ? 'Enviando...' : 'Enviar'}</button>
        </form>
        {status && (
          <p style={{ color: status.type === 'success' ? 'green' : 'red', marginTop: '1.5rem', textAlign: 'center' }}>{status.msg}</p>
        )}
      </div>
    </div>
  );
}

export default Contato; 