import React, { useState } from 'react';

function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/.netlify/functions/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: data.message });
        setForm({ nome: '', email: '', senha: '' });
      } else {
        setStatus({ type: 'error', msg: data.message });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Erro ao cadastrar. Tente novamente.' });
    }
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 400, margin: '0 auto' }}>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nome:<br />
            <input type="text" name="nome" value={form.nome} onChange={handleChange} style={{ width: '100%' }} required />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:<br />
            <input type="email" name="email" value={form.email} onChange={handleChange} style={{ width: '100%' }} required />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Senha:<br />
            <input type="password" name="senha" value={form.senha} onChange={handleChange} style={{ width: '100%' }} required />
          </label>
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
      </form>
      {status && (
        <p style={{ color: status.type === 'success' ? 'green' : 'red', marginTop: '1rem' }}>{status.msg}</p>
      )}
    </div>
  );
}

export default Cadastro; 