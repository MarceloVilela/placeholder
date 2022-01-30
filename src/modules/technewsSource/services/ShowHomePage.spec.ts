import "reflect-metadata";
import { JSDOM } from 'jsdom';
import path from 'path';

import './validations'
import AppError from '@shared/errors/AppError';

import ShowHomePageService from './ShowHomePage';
import AvailableNewsSources from '@modules/technewsSource/repositories/fakes';
//import AvailableNewsSources from '@modules/technewsSource/infra/crosscutting/repositories';
import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';

const filePath = path.resolve('src', 'assets', 'fakes', 'html', 'technews-source', 'home', '%s');

let fakeEngineRepository: IArticlesRepository[];
let showHomePage: ShowHomePageService;

const mockFromURL = (filename: string) => JSDOM.fromFile(filePath.replace('%s', filename));

describe('@technews-source/home', () => {
  beforeAll(() => {
    const sources = Object.values(AvailableNewsSources).map((Source) => (
      new Source()
    ));

    showHomePage = new ShowHomePageService(
      sources
    );
  });

  it('should be able to list post previews on the TecnoBlog homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://tecnoblog.net' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the GizModo homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://gizmodo.uol.com.br' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the Tecmundo homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://www.tecmundo.com.br' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the MundoBit homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://blogs.ne10.uol.com.br/mundobit/' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the CanalTech homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://canaltech.com.br' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the UolTecnologia homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://www.uol.com.br/tilt' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the OlharDigital homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://olhardigital.com.br' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the Leak homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://www.leak.pt' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the MaisTecnologia homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://www.maistecnologia.com' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the Adrenaline homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://adrenaline.com.br' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the CocaTech homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://cocatech.com.br' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the ExameTecnologia homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://exame.com' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the ShowMeTech homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://www.showmetech.com.br' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the TudoEmTecnologia homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://tudoemtecnologia.com' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the ComputerWorldPt homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://www.computerworld.com.pt' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the SapoTek homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://tek.sapo.pt' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the FourGNews homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://4gnews.pt' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the TechTudo homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://www.techtudo.com.br' });
    expect(results).toContainHomePageObject();
  });

  it('should be able to list post previews on the ProfissionaisTI homepage', async () => {
    const results = await showHomePage.execute({ url: 'https://www.profissionaisti.com.br' });
    expect(results).toContainHomePageObject();
  });
});
