import React, { useState } from 'react';
import './Contato.css';

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
    <div className="contato-page">
      <div className="contato-container fade-in-up">
        <h1>Contato</h1>
        <p className="contato-subtitle">Tem alguma dúvida? Fale com a gente.</p>
        <form onSubmit={handleSubmit} className="contato-form">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Seu melhor email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mensagem">Mensagem:</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={4}
              value={form.mensagem}
              onChange={handleChange}
              placeholder="Como podemos te ajudar?"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="contato-button">
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        {status && (
          <p className={`status-message ${status.type}`}>{status.msg}</p>
        )}
      </div>
    </div>
  );
}

export default Contato;
