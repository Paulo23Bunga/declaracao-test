import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Papa from 'papaparse';


const App = () => {

  const products = [
    { name: 'Vencimento', price: 20.99 },
    { name: 'Subsídio de Transporte', price: 15.49 },
    { name: 'Subsídio de Alimentação', price: 25.99 },
    // Adicione mais produtos conforme necessário
  ];

  let corpo = document.getElementById("corpo");
  const imprime = ()=>{
    $(".pdf-gera").addClass('d-none');
    $(".csv-gera").addClass('d-none');
    $(".imprime-gera").addClass('d-none');
    window.print(corpo);
    $(".pdf-gera").removeClass('d-none');
    $(".csv-gera").removeClass('d-none');
    $(".imprime-gera").removeClass('d-none');
  }
  const generatePDF = () => {
    html2canvas(document.getElementById('corpo')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save('declaração.pdf');
    });
  };

  const generateCSV = () => {
    const csvData = [];
    
    // Adiciona cabeçalhos
    csvData.push(['ABON.F', 'Total Suplem']);

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
      link.setAttribute('download', 'declaração.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Seu navegador não suporta download automático. Por favor, clique com o botão direito e escolha "Salvar como...".');
    }
  };

  return (
    <div className="App">
       <button class='gerador imprime-gera' type="button" name="button" id="gerarPDF" onClick={imprime}>
    <i class="bi bi-printer text-white"></i>
  </button>
    <div class="container-fluid" id="corpo">
  <header className="aplica" >

  </header>
  <article>
    <div class="pagetitle text-center position-relative">
      <div class="" id="originalText">
          <h5>Original</h5>
      </div>

    
    </div>
     <form class="container-fluid container-md">
      <div class="row">
        <legend><strong>Recibo de Suplemento Remuneratório</strong></legend>
        <div class="reciboRem" id="reciboRem"></div>
      </div>

      <div class="row mb-3 suplem">
        <div class="col-sm-6 row">
            <div class="col-6">
              <h6>Periodo</h6>
              <h6>Data Fechamento</h6>
              <h6>Suplemento</h6>
            </div>
            <div class="col-6">
              <p>Junho</p>
              <p>25-06-2023</p>
              <p>10.000.00</p>
            </div>
        </div>
        <div class="col-sm-6 row">
          <div class="col-6">
            <h6>Nome</h6>
            <h6>Função / Cargo</h6>
            <h6>IBAN</h6>
          </div>
          <div class="col-6">
            <p>Paulo Pinto Ernesto Bunga</p>
            <p>Tecnico Superio de 2ª Clase</p>
            <p>AO00000000000</p>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="table-responsive">
          <table class="table table-borderless">

<thead class="suplem-thead">
<tr class="" >
  <th scope="col">Alim</th>
  <th scope="col">Transp</th>
  <th scope="col">ABON.F</th>
  <th scope="col">SDF</th>
  <th scope="col">INSS</th>
  <th scope="col">IRT</th>
  <th scope="col">Total Suplem</th>
</tr>
</thead>
<tbody>
<tr>
  <th colspan="6"></th>
  <td>10.000.00</td>
</tr>
    <tr class="suplem-lista">
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td class="text-center"><b>Descontos</b></td>
    <td class="text-center"><b>Suplemento</b></td>

  </tr>
  <tr class="lista-suplem">
    <th scope="row">N-001</th>
    <td colspan="4">Vencimento</td>
    <td ><span class="float-end">00,00</span></td>
    <td><span class="float-end">10.000.00</span></td>
  </tr>
  <tr class="lista-suplem">
    <th scope="row">N-002</th>
    <td colspan="4">Subsídio de Transporte</td>
    <td ><span class="float-end">00,00</span></td>
    <td><span class="float-end">000,00</span></td>
  </tr>
  <tr class="lista-suplem">
    <th scope="row">N-003</th>
    <td colspan="4">Subsídio de Alimentação</td>
    <td ><span class="float-end">00,00</span></td>
    <td><span class="float-end">000.00</span></td>
  </tr>
  <tr class="lista-suplem">
    <th scope="row">N-004</th>
    <td colspan="4">IRT</td>
    <td ><span class="float-end">00,00</span></td>
    <td><span class="float-end">00.00</span></td>
  </tr>
  <tr class="lista-suplem">
    <th scope="row">N-005</th>
    <td colspan="4">INSS</td>
    <td ><span class="float-end">00,00</span></td>
    <td><span class="float-end">000.00</span></td>
  </tr>
  <tr class="lista-suplem">
    <th scope="row">N-006</th>
    <td colspan="4">Adiantamento</td>
    <td ><span class="float-end">00,00</span></td>
    <td><span class="float-end">000,00</span></td>
  </tr>


</tbody>
</table>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-borderless">

<tbody class="tb-total">
  <tr class="total-tb">
    <td ></td>
    <td></td>
    <td></td>
    <th>Total de Venc. <span class="float-end mx-4">00.00</span> </th>
    <th><span class="float-end">10.000,00</span></th>
  </tr>
  <tr class="total-tb">
    <td ></td>
    <td></td>
    <td></td>
    <th>Total de Desc. <span class="float-end mx-4">00.00</span> </th>
    <th> <span class="float-end">00,00</span> </th>
  </tr>
  <tr class="">
    <td ></td>
    <td></td>
    <td></td>
    <th>Total Líquido. <span class="float-end mx-4">00.00</span> </th>
    <th><span class="float-end">10.000,00</span></th>
  </tr>
  <tr>
    <th colspan="3">Valor Total Por Extenso: Dois mil kwanzas</th>

    <td></td>
      <td></td>
  </tr>
</tbody>
</table>
      </div>
      <div class="row lista" >
          <div class="col-6">
            <p class="text-center">Declaro que recebi a quantia constante neste recibo</p>
              <div class="mb-3">

                  <label for="inputEmail3" class="form-label text-center w-100 label3">Assinatura</label>
                  <div class="">
                   
                  </div>
                </div>
          </div>
          <div class="col-6">
              <div class="mb-3">
                  <label for="inputEmail3" class="form-label w-100 label3">Obs:</label>
                  <p>Pagamento Efetuado por TranferÊncia Bancária</p>
                  <p>Pagamento Efetuado Akz</p>
                </div>

          </div>
      </div>

    </form>
    <div class="d-flex justify-content-between align-items-center flex-wrap"  id="rodape">
      <div class="conteudo">
        <div class="d-flex align-items-center">
          <div class=""><i class="bi bi-geo-alt-fill carta" ></i></div>
          <div class="">
            <p>Rua Marien Ngouabi, Predio nº 85 Edficio Estrela da  Maianga, Apto 1 - 2º Andar, Mainga, LUANDA - ANGOLA
            </p>
          </div>
        </div>
      </div>
      <div class="conteudo">
        <div class="d-flex align-items-center">
          <div class=""><i class="bi bi-telephone-fill carta" ></i></div>
          <div class="">
            <p>(+244) 927 148 025
            </p>
          </div>
        </div>
      </div>
      <div class="conteudo">
        <div class="d-flex align-items-center">
          <div class=""><i class="bi bi-envelope carta" ></i></div>
          <div class="">
            <p class=""> paulobunga16@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div class="conteudo"><p><b>NIF: </b>123456789</p></div>
      <div class="conteudo"><p><b>Paulo  "O meu e teu"</b></p></div>
      <div class="conteudo">
        <i class="bi bi-facebook sociais" ></i>
        <i class="bi bi-instagram sociais" ></i>
        <i class="bi bi-twitter sociais" ></i>
        <i class="bi bi-linkedin sociais" ></i>
      </div>
    </div>
  </article>

  <footer className='rodape' ></footer>
</div>
<button class='btn btn-success rounded-circle gerador csv-gera' onClick={generateCSV}><i class="bi bi-filetype-csv text-white"></i></button>
      <button class='btn btn-primary rounded-circle gerador pdf-gera' onClick={generatePDF}><i class="bi bi-filetype-pdf text-light"></i></button>
    </div>

    
  );
};

export default App;
