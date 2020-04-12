/*
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/
import faker from 'faker';
import puppeteer from 'puppeteer';
import App from './App';

let browser:any;
let page:any;

const delay=(timeout:number)=> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
});

const passwordSelector ='[data-hook="password"]';
const loginSelector ='[data-hook="login"]';

test("renders login page requiring password ", async () => {
  console.log('iamhere')
  await page.waitForSelector('.container');
  console.log('Container loaded')
  const password = await page.$(passwordSelector)
  // const password = await page.$eval(passwordSelector, (e:any) => e);
  console.log('passwordbox', password)
  await delay(2000)
  expect(password).toBe("");


  password.value ="kevin";

  const button = await page.$eval(loginSelector, (e:any) => e.click());
  

});
/*
test("renders learn react link", async () => {
  await page.waitForSelector(".App");

  const header = await page.$eval(".App-header>p", (e:any) => e.innerHTML);
  expect(header).toBe(`Edit <code>src/App.js</code> and save to reload.`);

  const link = await page.$eval(".App-header>a", (e:any) => {
    return {
      innerHTML: e.innerHTML,
      href: e.href
    };
  });
  expect(link.innerHTML).toBe(`Learn React`);
  expect(link.href).toBe("https://reactjs.org/");
});
*/
// 4
afterAll(async () => {
  if(browser){
    // console.log('browseris ', browser)
    await delay(4000)
    browser.close();
  }else {console.log('no browserw')}
});
/*
const person = {
  name: faker.name.firstName() + ' ' + faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};

describe('H1 Text', () => {
  test('h1 loads correctly', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.App-title');

    const html = await page.$eval('.App-title', (e:any):string => e.innerHTML);
    expect(html).toBe('Welcome to React');

    browser.close();
  }, 16000);
});
*/