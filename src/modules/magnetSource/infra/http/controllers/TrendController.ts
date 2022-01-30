import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListTop from '@modules/magnetSource/services/ListTop';
import { atob } from '@shared/utils';

export default class SearchController {

  public async index(request: Request, response: Response): Promise<Response> {
    const { url, encoded } = request.query;

    const showTop = container.resolve(ListTop);

    let urlDecoded = String(url);
    if (String(encoded).toLocaleLowerCase() === 'true') {
      console.log('=>encoded');
      urlDecoded = atob(urlDecoded);
    }

    const content = await showTop.execute({
      url: String(url)
    });

    return response.json(content);
  }
}
