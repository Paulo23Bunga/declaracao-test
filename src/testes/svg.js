import React from 'react';
import Papa from 'papaparse';

const ProductTable = () => {
  const products = [
    { name: 'Produto A', price: 20.99 },
    { name: 'Produto B', price: 15.49 },
    { name: 'Produto C', price: 25.99 },
    // Adicione mais produtos conforme necessário
  ];

  const generateCSV = () => {
    const csvData = [];
    
    // Adiciona cabeçalhos
    csvData.push(['Nome do Produto', 'Preço']);

    // Adiciona dados da tabela
    products.forEach(product => {
      csvData.push([product.name, product.price.toFixed(2)]);
    });

    // Gera o arquivo CSV
    const csv = Papa.unparse(csvData);

    // Cria um objeto Blob e um link para fazer o download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'tabela_de_produtos.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Seu navegador não suporta download automático. Por favor, clique com o botão direito e escolha "Salvar como...".');
    }
  };

  return (
    <div>
      <h1>Tabela de Produtos</h1>
      <table>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generateCSV}>Gerar CSV</button>
    </div>
  );
};

export default ProductTable;
