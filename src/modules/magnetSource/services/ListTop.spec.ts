import { JSDOM } from 'jsdom';
import path from 'path';

import './validations'

import ListTopService from './ListTop';

import MagnetFakesSources from '@modules/magnetSource/infra/crosscutting/repositories';
//import MagnetFakesSources from '@modules/magnetSource/repositories/fakes';

const filePath = path.resolve('src', 'assets', 'mock', 'magnet-source', 'engine', '%s');

let listTop: ListTopService;

describe('@magnetSource/ListTop', () => {
  beforeAll(() => {
    const sources = Object.values(MagnetFakesSources).map((Source) => (
      new Source()
    ));

    listTop = new ListTopService(
      sources
    );

    jest.setTimeout(10000);
  });

  //link, name, size, seeds, leech, engine_url, desc_link
  it('should be able to list results by ct engine', async () => {
    const results = await listTop.execute({
      url: 'comandotorrent',
    });

    expect.toContainMagnetAnswers(results.recents);
    expect.toContainMagnetAnswers(results.top);
  });

  it('should be able to list results by mt engine', async () => {
    const results = await listTop.execute({
      url: 'megatorrentshd',
    });

    expect.toContainMagnetAnswers(results.recents);
    expect.toContainMagnetAnswers(results.top);
  });

  it('should be able to list results by ob engine', async () => {
    const results = await listTop.execute({
      url: 'ondebaixa',
    });

    expect.toContainMagnetAnswers(results.recents);
    expect.toContainMagnetAnswers(results.top);
  });

  it('should be able to list results by tf engine', async () => {
    const results = await listTop.execute({
      url: 'baixafilme',
    });

    expect.toContainMagnetAnswers(results.recents);
    expect.toContainMagnetAnswers(results.top);
  });

});
