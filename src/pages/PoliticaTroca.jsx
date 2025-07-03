import React from 'react';

function PoliticaTroca() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
      <div className="politica-container fade-in-up" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2.5rem 1.5rem', maxWidth: 700, width: '100%', margin: '2.5rem auto', minHeight: 350 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 24, color: '#D72B3D', fontFamily: 'Bebas Neue, Arial, sans-serif', fontSize: '2rem', letterSpacing: 1 }}>📦 Política de Troca e Devolução</h1>
        <p style={{ marginBottom: 18, fontWeight: 500, textAlign: 'center' }}>Veja aqui as regras para troca e devolução de produtos comprados na Uai-Jordan.</p>
        <p style={{ marginBottom: 18 }}>
          Queremos que você tenha a melhor experiência possível com a gente. Por isso, caso precise trocar ou devolver um produto, fique tranquilo: nosso processo é simples e transparente.
        </p>
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontWeight: 700, color: '#D72B3D' }}>📅 Prazo para Troca ou Devolução</span>
          <p style={{ margin: '6px 0 0 0' }}>
            O prazo para solicitar <strong>troca ou devolução</strong> é de até <strong>7 dias corridos</strong> após o recebimento do produto, conforme previsto no Código de Defesa do Consumidor.
          </p>
        </div>
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontWeight: 700, color: '#D72B3D' }}>📦 Condições do Produto</span>
          <p style={{ margin: '6px 0 0 0' }}>
            O item deve estar <strong>sem sinais de uso</strong>, com <strong>etiquetas intactas</strong>, acompanhado de todos os <strong>acessórios e embalagens originais</strong>.<br/>
            Produtos com indícios de uso, lavagem, mau uso ou danos <strong>não serão aceitos</strong>.
          </p>
        </div>
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontWeight: 700, color: '#D72B3D' }}>💬 Como Solicitar</span>
          <p style={{ margin: '6px 0 0 0' }}>
            Para iniciar o processo, entre em contato com nossa equipe pelo <strong>formulário de atendimento</strong> disponível no site ou pelo nosso <strong>WhatsApp</strong>.<br/>
            Informe o número do pedido, motivo da troca ou devolução e, se possível, anexe fotos do produto.
          </p>
        </div>
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontWeight: 700, color: '#D72B3D' }}>🔄 Opções Disponíveis</span>
          <ul style={{ listStyle: 'none', paddingLeft: 0, margin: '6px 0 0 0' }}>
            <li style={{ marginBottom: 6 }}>• Troca pelo mesmo produto (caso disponível em estoque).</li>
            <li style={{ marginBottom: 6 }}>• Vale-compras para usar em futuras compras.</li>
            <li style={{ marginBottom: 6 }}>• Estorno ou reembolso, conforme a forma de pagamento utilizada.</li>
          </ul>
        </div>
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontWeight: 700, color: '#D72B3D' }}>🚚 Custos de Envio</span>
          <p style={{ margin: '6px 0 0 0' }}>
            Se o erro for nosso (produto errado, defeito de fábrica etc.), o custo de envio será <strong>inteiramente por nossa conta</strong>.<br/>
            Em casos de arrependimento, os custos de frete poderão ser repassados ao cliente.
          </p>
        </div>
        <div style={{ marginBottom: 0 }}>
          <span style={{ fontWeight: 700, color: '#D72B3D' }}>❗Importante</span>
          <p style={{ margin: '6px 0 0 0' }}>
            Solicitações fora do prazo ou que não cumprirem as condições descritas acima <strong>não serão aceitas</strong>.<br/>
            Produtos comprados em <strong>promoções</strong> ou <strong>liquidações</strong> poderão ter regras específicas de troca — consulte no momento da compra.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PoliticaTroca;
