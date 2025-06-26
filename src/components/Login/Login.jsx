import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (!usuario) {
      setErro('E-mail ou senha inválidos.');
      return;
    }
    // Salva usuário logado
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    setMensagem('Login realizado com sucesso!');
    setEmail(''); setSenha('');
    setTimeout(() => navigate('/minha-conta'), 800);
  };

  return (
    <div className="login-outer">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
          <button type="submit">Entrar</button>
          {erro && <div className="login-erro">{erro}</div>}
          {mensagem && <div className="login-sucesso">{mensagem}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login; 