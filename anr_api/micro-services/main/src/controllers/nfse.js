const axios = require('axios');
import fetch from 'node-fetch';
import fs from 'fs';
const path = require('path');
import * as utils from '../utils';
import { ErrorsMapped } from '../config/errors-mapped';

////////////////////////////////////////////////////////////////////////
//  ENDPOINTS
////////////////////////////////////////////////////////////////////////

// export const pdf_fetch = async (req, res, next) => {
//   try {
//     const idNfse = req.params.idNfse;

//     const response = await fetch(
//       `https://api.sandbox.plugnotas.com.br/nfse/pdf/${idNfse}`, 
//       { 
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': '2da392a6-79d2-4304-a8b7-959572c7e44d'
//         }
//       }
//     );

//     const data = await response.buffer();

//     // const filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'nfse.pdf');
//     // fs.writeFileSync(filePath, data);
//     // console.log('filePath', filePath);

//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename="nfse.pdf"');
//     res.sendFile(filePath, err => {
//       if (err) {
//           res.status(500).send({
//               message: "Erro ao baixar o arquivo."
//           });
//       }
//   });
//   } catch (error) {
//     ErrorsMapped.Custom.message = error;
//     return utils.sendError(ErrorsMapped.Custom, next);
//   }
// };

export const pdf = async (req, res, next) => {
  await downloadPDF((error, data) => {
    if (error) {
      console.log('Erro ao baixar o PDF:', error);
      res.status(500).send('Erro ao baixar o PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', Buffer.from(data).length);
      res.setHeader('Content-Disposition', 'attachment; filename=file.pdf');

      const encodedPDF = Buffer.from(data).toString('base64');
      const encodedString = Buffer.from(data).toString();

      res.status(200).end(data);
      // res.status(200).send({
      //   statusCode: 200,
      //   headers: { 
      //       'Content-Type': 'application/pdf',
      //       'Content-Disposition': 'attachment; filename=file.pdf'
      //   },
      //   body: encodedPDF,
      //   isBase64Encoded: true
      // });
    };
  });
}

function downloadPDF(callback) {     // Exemplo tecnospeed
  const idNota = '5eef8cbc1666445f0598c958';
  var config = {
    method: 'get',
    url: `https://api.sandbox.plugnotas.com.br/nfse/pdf/${idNota}`,
    headers: {
      'x-api-key': '2da392a6-79d2-4304-a8b7-959572c7e44d',
      'Content-type': 'applcation/pdf',
    },
    responseType: 'arraybuffer',
  }
  
  axios(config)
    .then(function (response) {
      fs.writeFile(`${idNota}.pdf`, response.data, err => {
        if (err) {
          console.log(err)
          return callback(err, null);
        }
        console.log('PDF Salvo com Sucesso !')
        return callback(null, response.data);
      })
    })
    .catch(function (error) {
      console.log(error)
      return callback(error, null);
    })
}

// curl -H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFsZUBnbWFpbC5jb20iLCJpZCI6IjE5MzE0ODU3MTg3MDQxMzMiLCJyb2xlIjoiIn0.L9W0sOM9ElLmv5CcT6Y36ADsK3UBvBkAF4eypidgPRE" -o output.pdf http://localhost:3000/api/v1/nfse/pdf/5eef8cbc1666445f0598c958



// export const nfsePdf = async (req, res, next) => {
//   const pdfFilePath = path.resolve(__dirname, '..', '..', '..', '..', '..', 'meu-arquivo.pdf');
//   if (!fs.existsSync(pdfFilePath)) {
//     res.status(500).send({message: "Erro ao baixar o arquivo."});
//   }
  
//   res.sendFile(pdfFilePath);
// };

// app.get('/pdf', async (req, res) => {
//   const pdfFilePath = path.resolve(__dirname, '..', '..', '..', '..', 'meu-arquivo.pdf');

//   if (!fs.existsSync(pdfFilePath)) {
//       return res.status(500).send({ message: "Erro ao baixar o arquivo." });
//   }

//   try {
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', 'attachment; filename ="file.pdf"');
//       res.setHeader('Content-Transfer-Encoding', 'binary');
      
//       // const data = await fs.promises.readFile(pdfFilePath);
//       // res.send(data.toString('base64'));
//       // return fs.createReadStream(pdfFilePath).pipe(res);

//       res.sendFile(pdfFilePath);
      
//   } catch (error) {
//       return res.status(500).send({ message: "Erro ao ler o arquivo." });
//   }
// });


// export default async function handler(req, res) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('URL_DA_SUA_PAGINA_AQUI', { waitUntil: 'networkidle0' });

//   // Oculta elementos que não serão impressos
//   await page.evaluate(() => {
//     // exemplo: oculta a barra de navegação
//     document.querySelector('nav').style.display = 'none';
//   });

//   const pdf = await page.pdf({ format: 'A4' });

//   await browser.close();

//   res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader('Content-Disposition', 'inline; filename=lista_de_motoristas.pdf');
//   res.send(pdf);
// }