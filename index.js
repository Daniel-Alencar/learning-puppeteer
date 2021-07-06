const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

async function currencyConverter() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
  });
  const page = await browser.newPage();

  const moedaBase = readlineSync.question("Informe uma moeda base: ") || 'dólar';
  const moedaFinal = readlineSync.question("Informe uma moeda desejada: ") || 'real';
  const url = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}`;

  await page.goto(url);
  const resultado = await page.evaluate(() => {
    return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
  });
  console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`);

  await browser.close();
}

currencyConverter();
