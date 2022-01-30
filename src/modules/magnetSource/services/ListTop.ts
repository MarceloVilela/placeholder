import "reflect-metadata"
import { injectable, injectAll } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShowDetailMagnetDTO from '@modules/magnetSource/dtos/IShowDetailMagnetDTO';
import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ITrendDTO from "../dtos/ITrendDTO";

@injectable()
class ListResults {
  constructor(
    // https://github.com/microsoft/tsyringe#injectall
    //@injectAll('EngineFake')
    @injectAll('EngineSource')
    private sources: IEngineRepository[],
  ) { }

  public async execute({ url }: IShowDetailMagnetDTO): Promise<ITrendDTO> {
    const [engine] = this.sources.filter((item) => item.getOriginUrl().includes(url));

    if (!engine) {
      const available = this.sources.map((item) => item.getOriginUrl()).join(', ');
      throw new AppError(`Alias not found: ${url}. Available: ${available}`);
    }

    if (!engine.top) {
      throw new AppError(`Engine ${url} does not have this method: top|home-top-trend`);
    }

    const results = await engine.top();

    return results;
  }
}

export default ListResults;
