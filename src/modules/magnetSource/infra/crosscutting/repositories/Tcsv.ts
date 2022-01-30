import axios from 'axios';
//import { JSDOM } from 'jsdom';

import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ISearchParams from '@modules/magnetSource/dtos/ISearchParams';
import Result from '@modules/magnetSource/repositories/schemas/Result';

class Tcsv implements IEngineRepository {
  getOriginUrl(): string {
    return 'https://torrents-csv.ml/';
  }


  async parseResults(document: Document) {
    return [];
  }

  async search({ search_query }: ISearchParams): Promise<Result[]> {
    const url = `${this.getOriginUrl()}/service/search?q=${search_query}`;

    const { data } = await axios.get(url);

    const results = data.map(item => ({
      link: `magnet:?xt=urn:btih:${item.infohash}&dn=${item.infohash}`,
      name: item.name,
      size: `${item.size_bytes} B`,
      seeds: item.seeders,
      leech: item.leechers,
      engine_url: this.getOriginUrl(),
      desc_link: this.getOriginUrl()
    }))

    return results;
  }
}

export default Tcsv;
