import React, { useEffect, useState } from 'react';
import './MinhaConta.css';
import { useNavigate } from 'react-router-dom';

function DadosUsuario({ usuario, onAtualizar }) {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [mensagem, setMensagem] = useState('');

  const handleSalvar = () => {
    if (!nome || !email) {
      setMensagem('Preencha todos os campos.');
      return;
    }
    // Atualiza no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const idx = usuarios.findIndex(u => u.email === usuario.email);
    if (idx !== -1) {
      usuarios[idx].nome = nome;
      usuarios[idx].email = email;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuarioLogado', JSON.stringify({ ...usuarios[idx], senha: usuario.senha }));
      setMensagem('Dados atualizados com sucesso!');
      setEditando(false);
      if (onAtualizar) onAtualizar({ ...usuarios[idx], senha: usuario.senha });
    }
  };

  const handleCancelar = () => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setEditando(false);
    setMensagem('');
  };

  return (
    <div className="minha-conta-dados">
      <h3>Dados Pessoais</h3>
      {editando ? (
        <>
          <label>Nome:<input type="text" value={nome} onChange={e => setNome(e.target.value)} /></label>
          <label>Email:<input type="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
          <div className="minha-conta-dados-botoes">
            <button onClick={handleSalvar}>Salvar</button>
            <button onClick={handleCancelar} className="cancelar">Cancelar</button>
          </div>
          {mensagem && <div className="minha-conta-msg-sucesso">{mensagem}</div>}
        </>
      ) : (
        <>
          <p><strong>Nome:</strong> {nome}</p>
          <p><strong>Email:</strong> {email}</p>
          <button onClick={() => setEditando(true)} className="minha-conta-editar">Editar</button>
          {mensagem && <div className="minha-conta-msg-sucesso">{mensagem}</div>}
        </>
      )}
    </div>
  );
}

function MeusPedidos() {
  // Buscar pedidos reais do localStorage
  const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
  return (
    <div className="minha-conta-pedidos">
      <h3>Meus Pedidos</h3>
      {pedidos.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.data}</td>
                <td>{p.total}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const MinhaConta = () => {
  const [usuario, setUsuario] = useState(null);
  const [aba, setAba] = useState('dados');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!user) {
      navigate('/login');
    } else {
      setUsuario(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/');
  };

  if (!usuario) return null;

  return (
    <div className="minha-conta-dashboard">
      <aside className="minha-conta-menu">
        <button className={aba === 'dados' ? 'ativo' : ''} onClick={() => setAba('dados')}>Dados</button>
        <button className={aba === 'pedidos' ? 'ativo' : ''} onClick={() => setAba('pedidos')}>Pedidos</button>
        <button className="logout-btn" onClick={handleLogout}>Sair</button>
      </aside>
      <section className="minha-conta-conteudo">
        {aba === 'dados' && <DadosUsuario usuario={usuario} onAtualizar={setUsuario} />}
        {aba === 'pedidos' && <MeusPedidos />}
      </section>
    </div>
  );
};

export default MinhaConta; 