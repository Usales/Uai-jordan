import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MinhaConta.css';

function LoginSimples({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

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
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    setMensagem('Login realizado com sucesso!');
    setEmail('');
    setSenha('');
    setTimeout(() => {
      if (onLogin) onLogin();
    }, 800);
  };

  return (
    <div className="login-simples">
      <h2>Bem-vindo de volta</h2>
      <p className="login-subtitle">Acesse sua conta para continuar</p>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email-login">Email</label>
          <input
            type="email"
            id="email-login"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha-login">Senha</label>
          <input
            type="password"
            id="senha-login"
            placeholder="••••••••"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <a href="#" className="forgot-link">Esqueceu sua senha?</a>
        </div>
        <button type="submit" className="btn-primary">Entrar</button>
        {erro && <div className="login-erro">{erro}</div>}
        {mensagem && <div className="login-sucesso">{mensagem}</div>}
      </form>
    </div>
  );
}

function CadastroForm({ onConcluir }) {
  const [form, setForm] = useState({
    nome: '', email: '', senha: '', endereco: '', telefone: '', cpf: ''
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setSucesso('');
    if (!form.nome || !form.email || !form.senha || !form.endereco || !form.telefone || !form.cpf) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (form.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.some(u => u.email === form.email)) {
      setErro('E-mail já cadastrado.');
      return;
    }
    usuarios.push(form);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    setSucesso('Cadastro realizado com sucesso! Faça login para continuar.');
    setForm({ nome: '', email: '', senha: '', endereco: '', telefone: '', cpf: '' });
    setTimeout(() => {
      setSucesso('');
      if (onConcluir) onConcluir();
    }, 1500);
  }

  return (
    <form onSubmit={handleSubmit} className="cadastro-form">
      <h2>Criar conta</h2>
      <p className="cadastro-subtitle">Preencha seus dados para começar</p>
      <div className="form-group">
        <label htmlFor="nome">Nome completo</label>
        <input type="text" name="nome" id="nome" placeholder="Seu nome completo" value={form.nome} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="email-cad">Email</label>
        <input type="email" name="email" id="email-cad" placeholder="seu@email.com" value={form.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="senha-cad">Senha</label>
        <input type="password" name="senha" id="senha-cad" placeholder="Mínimo 6 caracteres" value={form.senha} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="endereco">Endereço completo</label>
        <input type="text" name="endereco" id="endereco" placeholder="Rua, número, bairro" value={form.endereco} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="telefone">Telefone</label>
        <input type="text" name="telefone" id="telefone" placeholder="(00) 00000-0000" value={form.telefone} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="cpf">CPF</label>
        <input type="text" name="cpf" id="cpf" placeholder="000.000.000-00" value={form.cpf} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn-primary">Concluir Cadastro</button>
      {erro && <div className="login-erro">{erro}</div>}
      {sucesso && <div className="login-sucesso">{sucesso}</div>}
    </form>
  );
}

const inputStyle = {
  padding: '12px',
  borderRadius: 8,
  border: '1px solid #ccc',
  fontSize: '1rem',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box'
};

function MinhaConta() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [loginKey, setLoginKey] = useState(0);
  const [editando, setEditando] = useState(false);
  const [dadosEdit, setDadosEdit] = useState({ nome: '', email: '', endereco: '', telefone: '', cpf: '' });

  useEffect(() => {
    const user = localStorage.getItem('usuarioLogado');
    if (user) {
      const u = JSON.parse(user);
      setUsuario(u);
      setDadosEdit({
        nome: u.nome || '',
        email: u.email || '',
        endereco: u.endereco || '',
        telefone: u.telefone || '',
        cpf: u.cpf || ''
      });
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioLogado');
    setUsuario(null);
    setLoginKey(k => k + 1);
  }

  if (!usuario) {
    return (
      <div className="minha-conta-page">
        <div className="auth-card">
          <img src="/imagens/logo.png" alt="UAI-JORDAN" className="auth-logo" />
          <h1>Minha Conta</h1>
          {!mostrarCadastro ? (
            <>
              <LoginSimples
                key={loginKey}
                onLogin={() => {
                  const user = localStorage.getItem('usuarioLogado');
                  if (user) setUsuario(JSON.parse(user));
                }}
              />
              <div className="auth-divider">
                <span>Não tem conta?</span>
              </div>
              <button onClick={() => setMostrarCadastro(true)} className="btn-secondary">
                Criar conta
              </button>
            </>
          ) : (
            <>
              <CadastroForm onConcluir={() => setMostrarCadastro(false)} />
              <div className="auth-divider">
                <span>Já tem conta?</span>
              </div>
              <button onClick={() => setMostrarCadastro(false)} className="btn-secondary">
                Fazer login
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  function formatarCPF(cpf) {
    if (!cpf) return 'Não cadastrado';
    if (cpf.length < 11) return cpf;
    return `***.***.${cpf.slice(-3)}-${cpf.slice(-2)}`;
  }

  // Busca pedidos recentes do localStorage
  const todosPedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
  const pedidosRecentes = todosPedidos
    .filter(pedido => pedido.usuarioEmail === usuario.email)
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 2); // Mostra apenas os 2 mais recentes

  function getStatusInfo(status) {
    const statusMap = {
      'aguardando-pagamento': { label: 'Aguardando pagamento', icon: '⏳', cor: '#f59e0b' },
      'aguardando-confirmacao-pix': { label: 'Aguardando confirmação PIX', icon: '💳', cor: '#32bcad' },
      'em-separacao': { label: 'Em separação', icon: '📦', cor: '#d97706' },
      'em-transporte': { label: 'Em transporte', icon: '🚚', cor: '#0284c7' },
      'entregue': { label: 'Entregue', icon: '✅', cor: '#059669' },
      'cancelado': { label: 'Cancelado', icon: '❌', cor: '#dc2626' }
    };
    return statusMap[status] || { label: status, icon: '📋', cor: '#666' };
  }

  // Painel do usuário autenticado
  return (
    <div className="minha-conta-page">
      <div className="conta-wrapper">
        <div className="conta-header">
          <h1>👤 Minha Conta</h1>
          <p className="conta-welcome">Bem-vindo, {usuario.nome}</p>
        </div>

        <div className="conta-grid">
          <div className="conta-card">
            <h2>📋 Meus Dados</h2>
            {!editando ? (
              <div className="dados-list">
                <div className="dado-item">
                  <span className="dado-label">Nome:</span>
                  <span className="dado-value">{usuario.nome}</span>
                </div>
                <div className="dado-item">
                  <span className="dado-label">Email:</span>
                  <span className="dado-value">{usuario.email}</span>
                </div>
                <div className="dado-item">
                  <span className="dado-label">Telefone:</span>
                  <span className="dado-value">{usuario.telefone || <span className="nao-cadastrado">Não cadastrado</span>}</span>
                </div>
                <div className="dado-item">
                  <span className="dado-label">CPF:</span>
                  <span className="dado-value">{formatarCPF(usuario.cpf)}</span>
                </div>
                <div className="dado-item">
                  <span className="dado-label">Endereço:</span>
                  <span className="dado-value">{usuario.endereco || <span className="nao-cadastrado">Não cadastrado</span>}</span>
                </div>
                <div className="conta-actions">
                  <button onClick={() => setEditando(true)} className="btn-primary">Editar dados</button>
                  <button className="btn-secondary">Alterar senha</button>
                </div>
              </div>
            ) : (
              <form onSubmit={e => {
                e.preventDefault();
                setUsuario({ ...usuario, ...dadosEdit });
                localStorage.setItem('usuarioLogado', JSON.stringify({ ...usuario, ...dadosEdit }));
                setEditando(false);
              }} className="edit-form">
                <div className="form-group">
                  <label>Nome completo</label>
                  <input type="text" name="nome" value={dadosEdit.nome} onChange={e => setDadosEdit({ ...dadosEdit, nome: e.target.value })} style={inputStyle} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={dadosEdit.email} onChange={e => setDadosEdit({ ...dadosEdit, email: e.target.value })} style={inputStyle} />
                </div>
                <div className="form-group">
                  <label>Endereço completo</label>
                  <input type="text" name="endereco" value={dadosEdit.endereco} onChange={e => setDadosEdit({ ...dadosEdit, endereco: e.target.value })} style={inputStyle} />
                </div>
                <div className="form-group">
                  <label>Telefone</label>
                  <input type="text" name="telefone" value={dadosEdit.telefone} onChange={e => setDadosEdit({ ...dadosEdit, telefone: e.target.value })} style={inputStyle} />
                </div>
                <div className="form-group">
                  <label>CPF</label>
                  <input type="text" name="cpf" value={dadosEdit.cpf} onChange={e => setDadosEdit({ ...dadosEdit, cpf: e.target.value })} style={inputStyle} />
                </div>
                <div className="edit-actions">
                  <button type="submit" className="btn-primary">Salvar</button>
                  <button type="button" className="btn-cancel" onClick={() => setEditando(false)}>Cancelar</button>
                </div>
              </form>
            )}
          </div>

          <div className="conta-card">
            <h2>📦 Meus Pedidos</h2>
            <div className="pedidos-resumo">
              {pedidosRecentes.map(pedido => {
                const statusInfo = getStatusInfo(pedido.status);
                return (
                  <Link
                    key={pedido.id}
                    to={`/minha-conta/pedidos/${pedido.id}`}
                    className="pedido-mini-card"
                  >
                    <div className="pedido-mini-header">
                      <span className="pedido-mini-id">Pedido #{pedido.id}</span>
                      <span className="pedido-mini-status" style={{ color: statusInfo.cor }}>
                        {statusInfo.icon} {statusInfo.label}
                      </span>
                    </div>
                    <div className="pedido-mini-info">
                      <span className="pedido-mini-data">Data: {pedido.data}</span>
                      <span className="pedido-mini-total">Total: R$ {pedido.total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="pedido-mini-action">Ver detalhes →</div>
                  </Link>
                );
              })}
            </div>
            <Link to="/minha-conta/pedidos" className="btn-ver-todos">
              Ver todos os pedidos
            </Link>
          </div>
        </div>

        <div className="conta-logout">
          <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
      </div>
    </div>
  );
}

export default MinhaConta;
