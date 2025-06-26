import React, { useEffect, useState } from 'react';
import './Carrinho.css';

const Carrinho = () => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    let carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho') || '[]');
    // Corrigir itens que tenham 'valor' ao invés de 'preco'
    let alterado = false;
    carrinhoSalvo = carrinhoSalvo.map(item => {
      if (!item.preco && item.valor) {
        alterado = true;
        return { ...item, preco: item.valor };
      }
      return item;
    });
    if (alterado) {
      localStorage.setItem('carrinho', JSON.stringify(carrinhoSalvo));
    }
    setItens(carrinhoSalvo);
  }, []);

  const atualizarQuantidade = (index, novaQtd) => {
    const novosItens = [...itens];
    novosItens[index].quantidade = novaQtd;
    setItens(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
  };

  const atualizarTamanho = (index, novoTamanho) => {
    const novosItens = [...itens];
    novosItens[index].tamanho = novoTamanho;
    setItens(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
  };

  const removerItem = (index) => {
    const novosItens = itens.filter((_, i) => i !== index);
    setItens(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
  };

  const total = itens.reduce((acc, item) => {
    const precoNum = Number(item.preco.replace(/[^\d,]/g, '').replace(',', '.'));
    return acc + precoNum * item.quantidade;
  }, 0);

  const finalizarCompra = () => {
    if (itens.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    const mensagem = itens.map(item =>
      `Produto: ${item.nome}\nTamanho: ${item.tamanho}\nQtd: ${item.quantidade}`
    ).join('\n---\n');
    const totalMsg = `Total: R$ ${isNaN(total) ? '0,00' : total.toFixed(2).replace('.', ',')}`;
    const texto = encodeURIComponent(mensagem + '\n' + totalMsg);
    const url = `https://api.whatsapp.com/send?phone=5537991397943&text=${texto}`;
    window.open(url, '_blank');
  };

  return (
    <div className="carrinho-container">
      <h2>Meu Carrinho</h2>
      {itens.length === 0 ? (
        <p className="carrinho-vazio">Seu carrinho está vazio.</p>
      ) : (
        <div className="carrinho-lista">
          {itens.map((item, idx) => (
            <div className="carrinho-item" key={idx}>
              <img src={item.imagem} alt={item.nome} className="carrinho-img" />
              <div className="carrinho-info">
                <h3>{item.nome}</h3>
                <div className="carrinho-opcoes">
                  <label>
                    Tamanho:
                    <select value={item.tamanho} onChange={e => atualizarTamanho(idx, e.target.value)}>
                      {[...Array(11)].map((_, i) => (
                        <option key={i} value={34 + i}>{34 + i}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Qtd:
                    <input type="number" min="1" max="10" value={item.quantidade} onChange={e => atualizarQuantidade(idx, Number(e.target.value))} />
                  </label>
                </div>
                <div className="carrinho-preco">Preço: {item.preco}</div>
                <button className="carrinho-remover" onClick={() => removerItem(idx)}>Remover</button>
              </div>
            </div>
          ))}
          <div className="carrinho-total">Total: R$ {total.toFixed(2).replace('.', ',')}</div>
          <button 
            className="carrinho-finalizar"
            style={{marginTop: '16px', padding: '12px 24px', fontSize: '1rem', background: '#25d366', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'}}
            onClick={finalizarCompra}
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrinho; 