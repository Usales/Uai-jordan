import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Cadastro, { CadastroBotaoVerde } from '../components/Cadastro/Cadastro';

function LoginSimples({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  // const navigate = useNavigate();

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
    setEmail(''); setSenha('');
    setTimeout(() => {
      if (onLogin) onLogin();
    }, 800);
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin} style={{ maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} style={inputStyle} />
        <button type="submit" style={{ background: '#D72B3D', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: 8 }}>Entrar</button>
        {erro && <div className="login-erro" style={{ color: '#b71c2b', marginTop: 8 }}>{erro}</div>}
        {mensagem && <div className="login-sucesso" style={{ color: '#00863B', marginTop: 8 }}>{mensagem}</div>}
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
    setErro(''); setSucesso('');
    // Validação simples
    if (!form.nome || !form.email || !form.senha || !form.endereco || !form.telefone || !form.cpf) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (form.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    // Salvar usuário no localStorage
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
      <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} style={inputStyle} />
      <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} style={inputStyle} />
      <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} style={inputStyle} />
      <input type="text" name="endereco" placeholder="Endereço completo" value={form.endereco} onChange={handleChange} style={inputStyle} />
      <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} style={inputStyle} />
      <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} style={inputStyle} />
      <button type="submit" style={{ background: '#00863B', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: 8 }}>Concluir Cadastro</button>
      {erro && <div style={{ color: '#b71c2b', marginTop: 8 }}>{erro}</div>}
      {sucesso && <div style={{ color: '#00863B', marginTop: 8 }}>{sucesso}</div>}
    </form>
  );
}

const inputStyle = {
  padding: '12px', borderRadius: 8, border: '1px solid #ccc', fontSize: '1rem', outline: 'none', width: '100%'
};

function MinhaConta() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [loginKey, setLoginKey] = useState(0);
  // const navigate = useNavigate();
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
    // navigate('/minha-conta');
  }

  if (!usuario) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '36px 28px 28px 28px', maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Bebas Neue, Arial, sans-serif', fontSize: '2.2rem', color: '#D72B3D', marginBottom: 18, letterSpacing: 1 }}>Minha Conta</h1>
          {!mostrarCadastro ? (
            <>
              <LoginSimples
                key={loginKey}
                onLogin={() => {
                  const user = localStorage.getItem('usuarioLogado');
                  if (user) setUsuario(JSON.parse(user));
                }}
              />
              <button onClick={() => setMostrarCadastro(true)} style={{ marginTop: 24, background: '#00863B', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>Cadastrar</button>
            </>
          ) : (
            <CadastroForm onConcluir={() => setMostrarCadastro(false)} />
          )}
        </div>
      </div>
    );
  }

  // Painel do usuário autenticado
  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
      <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 32px rgba(0,0,0,0.10)', padding: '48px 36px 36px 36px', maxWidth: 520, width: '100%', transition: 'box-shadow 0.2s' }}>
        <h1 style={{ fontFamily: 'Bebas Neue, Arial, sans-serif', fontSize: '2.4rem', color: '#D72B3D', marginBottom: 24, letterSpacing: 1, textAlign: 'center', marginTop: 0 }}>Minha Conta</h1>
        <div style={{ marginBottom: 32, fontSize: '1.1rem', color: '#333', textAlign: 'left', background: '#fafbfc', borderRadius: 12, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, Arial, sans-serif', fontSize: '1.5rem', color: '#D72B3D', marginBottom: 18 }}>Bem-vindo, {usuario.nome}!</h2>
          <h3 style={{ fontFamily: 'Bebas Neue, Arial, sans-serif', fontSize: '1.2rem', color: '#222', marginBottom: 16 }}>Seus Dados</h3>
          {!editando ? (
            <>
              <p><b>Nome:</b> {usuario.nome}</p>
              <p><b>Email:</b> {usuario.email}</p>
              <p><b>Endereço:</b> {usuario.endereco || <span style={{ color: '#888' }}>Não cadastrado</span>}</p>
              <p><b>Telefone:</b> {usuario.telefone || <span style={{ color: '#888' }}>Não cadastrado</span>}</p>
              <p><b>CPF:</b> {usuario.cpf || <span style={{ color: '#888' }}>Não cadastrado</span>}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
                <button onClick={() => setEditando(true)} style={{ background: '#00863B', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>Editar Dados</button>
              </div>
            </>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setUsuario({ ...usuario, ...dadosEdit }); localStorage.setItem('usuarioLogado', JSON.stringify({ ...usuario, ...dadosEdit })); setEditando(false); }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input type="text" name="nome" placeholder="Nome completo" value={dadosEdit.nome} onChange={e => setDadosEdit({ ...dadosEdit, nome: e.target.value })} style={inputStyle} />
              <input type="email" name="email" placeholder="E-mail" value={dadosEdit.email} onChange={e => setDadosEdit({ ...dadosEdit, email: e.target.value })} style={inputStyle} />
              <input type="text" name="endereco" placeholder="Endereço completo" value={dadosEdit.endereco} onChange={e => setDadosEdit({ ...dadosEdit, endereco: e.target.value })} style={inputStyle} />
              <input type="text" name="telefone" placeholder="Telefone" value={dadosEdit.telefone} onChange={e => setDadosEdit({ ...dadosEdit, telefone: e.target.value })} style={inputStyle} />
              <input type="text" name="cpf" placeholder="CPF" value={dadosEdit.cpf} onChange={e => setDadosEdit({ ...dadosEdit, cpf: e.target.value })} style={inputStyle} />
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="submit" style={{ background: '#00863B', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>Salvar</button>
                <button type="button" style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setEditando(false)}>Cancelar</button>
              </div>
            </form>
          )}
        </div>
        <div style={{ fontSize: '1.1rem', color: '#333', textAlign: 'left', background: '#fafbfc', borderRadius: 12, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'Bebas Neue, Arial, sans-serif', fontSize: '1.5rem', color: '#D72B3D', marginBottom: 18 }}>Pedidos Recentes</h2>
          <ul style={{ paddingLeft: 18 }}>
            <li>Pedido #1234 - Entregue</li>
            <li>Pedido #1235 - Em separação</li>
          </ul>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button onClick={handleLogout} style={{ background: '#b71c2b', color: '#fff', border: 'none', borderRadius: 8, padding: '16px 0', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', width: '100%', maxWidth: 320, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>Sair</button>
        </div>
      </div>
    </div>
  );
}

export default MinhaConta; 