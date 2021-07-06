const puppeteer = require('puppeteer');

async function loginUnsplash() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('https://unsplash.com/');

  // Clica no botão de login
  await page.click('[href="/login"]');

  // Digita o email e a senha no campos corretos e loga
  await page.type('[name="user[email]"]', process.env.UNSPLASH_EMAIL);
  await page.type('[name="user[password]"]', process.env.UNSPLASH_PASSWORD);
  await page.click('[type="submit"]');

  await page.waitForNavigation();
  
  // Vai para uma foto qualquer
  await page.goto('https://unsplash.com/photos/1owvL93fHrQ');

  // Dá um 'gostei' na foto se a foto não estiver com o gostei
  const notLiked = await page.evaluate(() => {
    return document.querySelector('._3jtP1._3d86A._1CBrG._1WPby.xLon9.hhSId._1EJJ-._3hx1p') 
            ? false
            : true;
  });

  if(notLiked) {
    await page.click('[title="Like photo"]');
  }
  
  await browser.close();
}

loginUnsplash();
