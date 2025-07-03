import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MinhaConta() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user) setUsuario(JSON.parse(user));
  }, []);

  function handleLogout() {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  }

  if (!usuario) {
    return (
      <div style={{ padding: '2rem', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <h1>Minha Conta</h1>
        <p>Você não está logado.</p>
        <Link to="/login">Fazer login</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
      <h1>Minha Conta</h1>
      <button onClick={handleLogout} style={{ float: 'right', marginTop: '-2.5rem', marginBottom: '1rem' }}>Sair</button>
      <h2>Dados do Usuário</h2>
      <p><b>Nome:</b> {usuario.nome}</p>
      <p><b>Email:</b> {usuario.email}</p>
      <h2>Pedidos Recentes</h2>
      <ul>
        <li>Pedido #1234 - Entregue</li>
        <li>Pedido #1235 - Em separação</li>
      </ul>
    </div>
  );
}

export default MinhaConta; 