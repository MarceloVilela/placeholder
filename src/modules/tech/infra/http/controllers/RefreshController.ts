import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Axios from 'axios';

import RefreshPostService from '@modules/technews/services/RefreshPost';
import ShowChannels from '@modules/techSource/services/ShowTechChannelsBR';

interface ChannelDevFinder {
  name: string;
  link: string;
}

export default class TechRefreshController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { data: channelsAdded } = await Axios.get<ChannelDevFinder[]>('https://devfinder-api.herokuapp.com/channels');
    const names = channelsAdded.map(({ name }) => name);
    const links = channelsAdded.map(({ link }) => link);

    const { url } = request.query;
    const showItems = container.resolve(ShowChannels);
    const channelsFoundOnGithub = await showItems.execute({
      url: String(url),
    });

    let added = [];
    for (let i = 0; i < channelsFoundOnGithub.length; i++) {
      const channel = channelsFoundOnGithub[i];
      if (!names.includes(channel.title) && !links.includes(channel.link)) {
        added.push(channel.title);
        console.log(`canal novo: ${channel.title}`);
      }
    }

    return response.json(added);
  }
}
