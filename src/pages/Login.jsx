import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/.netlify/functions/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: data.message });
        localStorage.setItem('usuario', JSON.stringify({ nome: data.nome, email: data.email }));
        setForm({ email: '', senha: '' });
        setTimeout(() => {
          navigate('/minha-conta');
        }, 1000);
      } else {
        setStatus({ type: 'error', msg: data.message });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Erro ao logar. Tente novamente.' });
    }
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="login-page">
      <div className="auth-card">
        <img src="/imagens/logo.png" alt="UAI-JORDAN" className="auth-logo" />
        <h1>Bem-vindo de volta</h1>
        <p>Acesse sua conta para continuar</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <Link to="/esqueci-senha" className="forgot-link">Esqueceu sua senha?</Link>
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {status && (
          <div className={`status-message ${status.type}`}>
            {status.msg}
          </div>
        )}

        <div className="auth-divider">
          <span>Não tem conta?</span>
        </div>

        <Link to="/minha-conta" className="btn-secondary">
          Criar conta
        </Link>
      </div>
    </div>
  );
}

export default Login;
