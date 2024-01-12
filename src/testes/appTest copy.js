import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const App = () => {
  const products = [
    { name: 'Produto A', price: 20.99 },
    { name: 'Produto B', price: 15.49 },
    { name: 'Produto C', price: 25.99 },
    // Adicione mais produtos conforme necessário
  ];

  const generatePDF = () => {
    html2canvas(document.getElementById('table-to-print')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save('tabela_de_produtos.pdf');
    });
  };

  return (
    <div>
      <h1>Tabela de Produtos</h1>
      <table id="table-to-print">
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
      <button onClick={generatePDF}>Gerar PDF</button>
    </div>
  );
};

export default App;
