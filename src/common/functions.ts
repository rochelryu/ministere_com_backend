import * as cheerio from 'cheerio';
import axios from 'axios';
import { HttpClient } from 'urllib';

export function generateRecovery(): number {
  const initial = [1, 1, 1, 1, 1, 1, 1, 1];
  return parseInt(
    initial.map((value) => value * Math.floor(Math.random() * 10)).join(''),
    10,
  );
}

export async function getInfoInAip(searchText: string) {
  const url = `https://www.aip.ci/?s=${searchText}`; // URL we're scraping
  console.log(url);
  const httpclient = new HttpClient();

  return new Promise(async (next) => {
    await httpclient
      .request(url, {
        headers: { Accept: '*/*' },
        method: 'GET',
      })
      .then(
        // Once we have data returned ...
        async (response) => {
          const html = response.data;
          const $ = cheerio.load(html);
          const articles = $('article.entry');
          const result: any[] = [];
          articles.each((index, article) => {
            const link = $(article)
              .find('a.entry-featured-img-link')
              .attr('href');
            const picture = $(article)
              .find('a.entry-featured-img-link img')
              .attr('src');
            const title = $(article)
              .find('div.entry-grid-content h2.entry-title')
              .text().trim();
            const sub_title = $(article)
              .find('div.entry-byline div.entry-byline-block.entry-byline-cats')
              .text()
              .replace('In:', '').trim();
            const content = $(article).find('div.entry-summary').text();
            result.push({
              content,
              link,
              picture,
              sub_title,
              title,
              id: generateRecovery(),
            });
          });
          next({ etat: true, result });
        },
      )
      .catch((error) => {
        console.log(error.message);
        next({ etat: false, error });
      });
  });
}
