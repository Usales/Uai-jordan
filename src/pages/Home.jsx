import React from 'react';
import TelaInicio from '../components/TelaInicio/TelaInicio';

function Home() {
  return (
    <div>
      <TelaInicio />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Bem-vindo à Uai-Jordan!</h1>
        <p>Seu e-commerce de tênis exclusivos. Confira nossos lançamentos e promoções!</p>
      </div>
    </div>
  );
}

export default Home; 