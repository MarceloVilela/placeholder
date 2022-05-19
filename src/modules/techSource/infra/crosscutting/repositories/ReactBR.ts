import { JSDOM } from 'jsdom';

import IReactBRRepository from '@modules/techSource/repositories/IReactBRRepository';
import ReactBRData from '../schemas/ReactBR';

class ReactBR implements IReactBRRepository {

  getOriginUrl(): string {
    return 'https://github.com/react-brasil/empresas-que-usam-react-no-brasil/blob/master/README.md';
  }

  async listCompanies(): Promise<ReactBRData[]> {
    const response = await JSDOM.fromURL(this.getOriginUrl());
    //const response = await JSDOM.fromFile('./src/modules/techSource/infra/crosscutting/repositories/html.html');
    const { document } = response.window;

    const getContent = (trCompany: Element) => {
      return {
        name: trCompany.querySelector("td:nth-of-type(1)")?.textContent,
        address: trCompany.querySelector("td:nth-of-type(2)")?.textContent,
        techs: trCompany.querySelector("td:nth-of-type(3)")?.textContent,
        url: trCompany.querySelector("td:nth-of-type(1) a")?.getAttribute("href")
      }
    }


    const tbody = document.querySelector("table:nth-of-type(1) tbody")
    const lines = [...tbody!.querySelectorAll("tr")]

    const companies = lines
      .map(el => getContent(el))
      .map(({ name, address, techs, url }) => ({
        name: String(name),
        address: String(address),
        techs: String(techs),
        url: String(url),
      }))
      .filter(({ techs }) => techs !== 'undefined');

    return companies;
  }
}

export default ReactBR;
