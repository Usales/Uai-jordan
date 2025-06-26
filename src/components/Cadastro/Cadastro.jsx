import React, { useState } from 'react';
import './Cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    // Verifica se o e-mail já está cadastrado
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.some(u => u.email === email)) {
      setErro('E-mail já cadastrado.');
      return;
    }
    // Salva o novo usuário
    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    setMensagem('Cadastro realizado com sucesso! Faça login para continuar.');
    setNome(''); setEmail(''); setSenha(''); setConfirmarSenha('');
  };

  return (
    <div className="cadastro-outer">
      <div className="cadastro-container">
        <h2>Cadastro</h2>
        <form className="cadastro-form" onSubmit={handleCadastro}>
          <input type="text" placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} />
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
          <input type="password" placeholder="Confirmar senha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} />
          <button type="submit">Cadastrar</button>
          {erro && <div className="cadastro-erro">{erro}</div>}
          {mensagem && <div className="cadastro-sucesso">{mensagem}</div>}
        </form>
      </div>
    </div>
  );
};

export default Cadastro; 