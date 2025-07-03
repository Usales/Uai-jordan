exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido' })
    };
  }

  const { nome, email, mensagem } = JSON.parse(event.body || '{}');

  // Aqui você pode salvar em banco, enviar e-mail, etc. Por enquanto, só simula sucesso.
  if (!nome || !email || !mensagem) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Preencha todos os campos.' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Mensagem recebida com sucesso! Em breve entraremos em contato.' })
  };
}; 