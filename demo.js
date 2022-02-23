const fs = require('fs');
const { createInstance } = require('./index.js');

async function run() {
  console.time('export');
  // create working instance
  const instance = await createInstance({
    // this is a demo key just for that project
    // (!) please don't use it in your projects
    // to create your own API key please go here: https://polotno.dev/cabinet
    key: 'nFA5H9elEytDyPyvKL7T',
  });

  // load sample json
  const json = JSON.parse(
    fs.readFileSync('./test-data/polotno_large_private.json')
  );

  // json.pages.forEach((page, index) => {
  const pdfBase64 = await instance.jsonToPDFBase64(json, {
    parallel: 4,
    quality: 0.8,
  });
  fs.writeFileSync('out.pdf', pdfBase64, 'base64');
  console.timeEnd('export');
  // close instance
  instance.close();
}

run();
