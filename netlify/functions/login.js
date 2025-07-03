exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido' })
    };
  }

  const { email, senha } = JSON.parse(event.body || '{}');
  if (!email || !senha) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Preencha todos os campos.' })
    };
  }

  // Simula autenticação (em produção, verificaria no banco)
  // Aqui, apenas retorna sucesso
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Login realizado com sucesso!', nome: 'João da Silva', email }}
  };
}; 