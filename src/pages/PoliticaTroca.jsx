import React from 'react';
import { Link } from 'react-router-dom';
import './PoliticaTroca.css';

function PoliticaTroca() {
  const handleWhatsApp = () => {
    const texto = encodeURIComponent('Olá! Gostaria de solicitar uma troca ou devolução.');
    const url = `https://api.whatsapp.com/send?phone=5537991397943&text=${texto}`;
    window.open(url, '_blank');
  };

  return (
    <div className="politica-page">
      <div className="policy-card">
        <h1>Política de Troca e Devolução</h1>
        <p className="subtitle">
          Veja aqui as regras para troca e devolução de produtos comprados na Uai-Jordan.
        </p>
        
        <p className="intro">
          Queremos que você tenha a melhor experiência possível com a gente. Por isso, caso precise trocar ou devolver um produto, fique tranquilo: nosso processo é simples e transparente.
        </p>

        <div className="section">
          <h3>Prazo para Troca ou Devolução</h3>
          <p>
            O prazo para solicitar <strong>troca ou devolução</strong> é de até <strong>7 dias corridos</strong> após o recebimento do produto, conforme previsto no Código de Defesa do Consumidor.
          </p>
        </div>

        <div className="section">
          <h3>Condições do Produto</h3>
          <p>
            O item deve estar <strong>sem sinais de uso</strong>, com <strong>etiquetas intactas</strong>, acompanhado de todos os <strong>acessórios e embalagens originais</strong>.
          </p>
          <p>
            Produtos com indícios de uso, lavagem, mau uso ou danos <strong>não serão aceitos</strong>.
          </p>
        </div>

        <div className="section">
          <h3>Como Solicitar</h3>
          <p>
            Para iniciar o processo, entre em contato com nossa equipe pelo <strong>formulário de atendimento</strong> disponível no site ou pelo nosso <strong>WhatsApp</strong>.
          </p>
          <p>
            Informe o número do pedido, motivo da troca ou devolução e, se possível, anexe fotos do produto.
          </p>
        </div>

        <div className="section">
          <h3>Opções Disponíveis</h3>
          <ul>
            <li>Troca pelo mesmo produto (caso disponível em estoque).</li>
            <li>Vale-compras para usar em futuras compras.</li>
            <li>Estorno ou reembolso, conforme a forma de pagamento utilizada.</li>
          </ul>
        </div>

        <div className="section">
          <h3>Custos de Envio</h3>
          <p>
            Se o erro for nosso (produto errado, defeito de fábrica etc.), o custo de envio será <strong>inteiramente por nossa conta</strong>.
          </p>
          <p>
            Em casos de arrependimento, os custos de frete poderão ser repassados ao cliente.
          </p>
        </div>

        <div className="section">
          <h3>Importante</h3>
          <p>
            Solicitações fora do prazo ou que não cumprirem as condições descritas acima <strong>não serão aceitas</strong>.
          </p>
          <p>
            Produtos comprados em <strong>promoções</strong> ou <strong>liquidações</strong> poderão ter regras específicas de troca — consulte no momento da compra.
          </p>
        </div>

        <div className="cta-box">
          <h3>Precisa solicitar troca ou devolução?</h3>
          <div className="cta-buttons">
            <button className="cta-button primary" onClick={handleWhatsApp}>
              Falar no WhatsApp
            </button>
            <Link to="/contato" className="cta-button outline">
              Formulário de Atendimento
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoliticaTroca;
