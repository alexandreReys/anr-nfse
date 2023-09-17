//======================================================================================
// Primeiro, crie um novo arquivo chamado generatePDF.js em sua pasta pages/api:
//======================================================================================
// Pode ser um endpoint em Next.js API routes ou outro backend
export default async function handler(req, res) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('URL_DA_SUA_PAGINA_AQUI', { waitUntil: 'networkidle0' });

  // Oculta elementos que não serão impressos
  await page.evaluate(() => {
    // exemplo: oculta a barra de navegação
    document.querySelector('nav').style.display = 'none';
  });

  const pdf = await page.pdf({ format: 'A4' });

  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=lista_de_motoristas.pdf');
  res.send(pdf);
}

//======================================================================================
// src/components/MostoristasLista.tsx
//======================================================================================
// Importações existentes
import axios from 'axios';
import { saveAs } from 'file-saver';

// ... seu código existente

const handlePrintClick = async () => {
  try {
    const { data } = await axios.get('/api/generatePDF', { responseType: 'blob' });
    const pdfBlob = new Blob([data], { type: 'application/pdf' });
    saveAs(pdfBlob, 'lista_de_motoristas.pdf');
  } catch (err) {
    console.error('Falha ao gerar o PDF:', err);
  }
};

// ... seu código existente

return (
  <div className="max-w-7xl mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">Lista de Motoristas</h1>
    <button className="bg-green-500 text-white p-2 rounded mb-4" onClick={handlePrintClick}>
      Imprimir
    </button>
    {/* ... resto do seu código */}
  </div>
);

//======================================================================================

npm install axios file-saver

//======================================================================================

