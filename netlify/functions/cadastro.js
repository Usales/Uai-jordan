exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido' })
    };
  }

  const { nome, email, senha } = JSON.parse(event.body || '{}');
  if (!nome || !email || !senha) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Preencha todos os campos.' })
    };
  }

  // Simula cadastro (em produção, salvaria em banco)
  // Aqui, apenas retorna sucesso
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Cadastro realizado com sucesso!' })
  };
}; 