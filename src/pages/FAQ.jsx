import React from 'react';

const cardStyle = {
  background: '#fff',
  borderRadius: 10,
  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  padding: '1.2rem 1rem',
  marginBottom: 18,
  borderLeft: '5px solid #D72B3D',
  minWidth: 0,
};

function FAQ() {
  return (
    <div style={{ background: '#e6e4e4', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2.5rem 1.5rem', maxWidth: 700, margin: '2.5rem auto', minHeight: 350 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24, color: '#D72B3D' }}>❓ Perguntas Frequentes (FAQ)</h1>
      <p style={{ marginBottom: 24, fontWeight: 500 }}>
        Tem alguma dúvida? A gente te ajuda! Confira abaixo as respostas para as perguntas mais comuns sobre a sua experiência de compra na Uai-Jordan.
      </p>
      <div style={cardStyle}>
        <div style={{ fontWeight: 700, color: '#D72B3D', fontSize: 18, marginBottom: 6 }}>💳 Quais formas de pagamento são aceitas?</div>
        <div>
          Aceitamos as principais formas de pagamento para sua comodidade:<br/>
          <span style={{ display: 'block', marginLeft: 12 }}>• Cartão de crédito (com possibilidade de parcelamento);</span>
          <span style={{ display: 'block', marginLeft: 12 }}>• Cartão de débito;</span>
          <span style={{ display: 'block', marginLeft: 12 }}>• Pix (com confirmação rápida e segura).</span><br/>
          Todas as transações são protegidas por tecnologia de criptografia, garantindo sua segurança durante o pagamento.
        </div>
      </div>
      <div style={cardStyle}>
        <div style={{ fontWeight: 700, color: '#D72B3D', fontSize: 18, marginBottom: 6 }}>📦 Como faço para rastrear meu pedido?</div>
        <div>
          Após a confirmação da sua compra, você receberá um e-mail com o código de rastreio e o link para acompanhar a entrega.<br/>
          Você também pode acessar diretamente a página <b>Rastrear Pedido</b> no nosso site e inserir o código para acompanhar em tempo real o trajeto do seu produto.
        </div>
      </div>
      <div style={cardStyle}>
        <div style={{ fontWeight: 700, color: '#D72B3D', fontSize: 18, marginBottom: 6 }}>🔁 Posso trocar meu produto?</div>
        <div>
          Sim! Garantimos seu direito de troca.<br/>
          Você pode solicitar a troca em até 7 dias corridos após o recebimento do pedido.<br/>
          Basta conferir nossa <b>Política de Troca e Devolução</b> para saber todos os detalhes e iniciar o processo com facilidade.
        </div>
      </div>
      <div style={cardStyle}>
        <div style={{ fontWeight: 700, color: '#D72B3D', fontSize: 18, marginBottom: 6 }}>🕒 Qual o prazo de entrega?</div>
        <div>
          O prazo de entrega varia de acordo com sua localização e a forma de envio escolhida no momento da compra.<br/>
          Você poderá visualizar o prazo estimado na finalização do pedido e no acompanhamento do rastreamento.
        </div>
      </div>
      <div style={cardStyle}>
        <div style={{ fontWeight: 700, color: '#D72B3D', fontSize: 18, marginBottom: 6 }}>🧾 Receberei nota fiscal?</div>
        <div>
          Sim! Todos os pedidos são enviados com Nota Fiscal Eletrônica (NF-e), que será encaminhada por e-mail assim que a compra for confirmada.
        </div>
      </div>
      <div style={cardStyle}>
        <div style={{ fontWeight: 700, color: '#D72B3D', fontSize: 18, marginBottom: 6 }}>❌ Posso cancelar minha compra?</div>
        <div>
          Sim, desde que a solicitação seja feita em até 7 dias corridos após o recebimento do produto e ele esteja sem uso.<br/>
          Em caso de cancelamento antes do envio, entre em contato com nossa equipe o mais rápido possível para agilizarmos o processo.
        </div>
      </div>
    </div>
  );
}

export default FAQ; 