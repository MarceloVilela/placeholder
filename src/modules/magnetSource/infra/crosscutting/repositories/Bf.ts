import { JSDOM } from 'jsdom';

import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ISearchParams from '@modules/magnetSource/dtos/ISearchParams';
import IShowDetailMagnetDTO from '@modules/magnetSource/dtos/IShowDetailMagnetDTO';
import Answer from '@modules/magnetSource/repositories/schemas/Answer';
import ITrendDTO from '@modules/magnetSource/dtos/ITrendDTO';

class Bf implements IEngineRepository {
  getOriginUrl(): string {
    return 'https://baixarfilmetorrent.net';
  }

  async detail({ url }: IShowDetailMagnetDTO): Promise<Answer> {
    const response = await JSDOM.fromURL(url);
    //const response = await JSDOM.fromFile('./src/assets/fakes/html/magnet-source/detail/bf-detail.html');

    const { document } = response.window;

    const name = document.querySelector('meta[property="og:title"]')?.getAttribute('content')
    const desc_link = document.querySelector('meta[property="og:url"]')?.getAttribute('content')
    const thumb = document.querySelector('.entry-content img.alignleft')?.getAttribute('src')

    const getLinks = (link: Element) => {
      let th = String(link.closest('table')?.querySelector('th')?.textContent);
      let text = String(link.closest('tr')?.querySelector('td')?.textContent) + th;
      text = text.replace(String(link.textContent), "")
      return { url: String(link.getAttribute('href')), text: String(text), type: 'magnet' }
    }

    const links = [...document.querySelectorAll('a[href^="magnet"]')]
      .map(el => getLinks(el))

    return { name: String(name), thumb: String(thumb), links, engine_url: this.getOriginUrl(), desc_link: String(desc_link) };
  }

  async parseResults(document: Document, selector: string) {

    const getContent = async (art: Element) => {
      //const { links } = await this.detail(String(art.querySelector('a')?.getAttribute('href')))

      return {
        name: String(art.querySelector('a')
          ?.getAttribute('title')
          ?.replace(/\n|\r|\t/g, '')
          ?.replace(/\\n|\\r|\\t/g, '')
          ?.replace(/\s{2,}/g, '')),
        thumb: String(art.querySelector('img')?.getAttribute('src')),
        links: [],
        engine_url: this.getOriginUrl(),
        desc_link: String(art.querySelector('a')?.getAttribute('href')),
      }
    };

    const elements = [...document.querySelectorAll(selector)];
    let contents = [];

    for (let i = 0; i < elements.length; i++) {
      contents.push(await getContent(elements[i]));
    }

    return contents;
  }

  async search({ search_query }: ISearchParams): Promise<Answer[]> {
    const url = `${this.getOriginUrl()}/?s=${search_query}`
    const response = await JSDOM.fromURL(url);
    //const response = await JSDOM.fromFile('./src/modules/magnetSource/infra/crosscutting/repositories/bf.html');

    const { document } = response.window;

    const results = await this.parseResults(document, '.listagem .item');

    return results;
  }

  async top(): Promise<ITrendDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(url);
    //const response = await JSDOM.fromFile('./src/modules/magnetSource/infra/crosscutting/repositories/bf.html');
    console.log(url);

    const { document } = response.window;
    const recents = await this.parseResults(document, '.listagem .item');
    const top = await this.parseResults(document, '.scroll .item');

    return { top, recents };
  }
}

export default Bf;
