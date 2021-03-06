import "reflect-metadata"
import { container } from 'tsyringe';

import '../providers';

import IPostsRepository from '@modules/technews/repositories/IPostRepository';
import PostsRepository from '@modules/technews/infra/typeorm/repositories/PostsRepository';
//
import ITechNewsSourcePost from '@modules/technewsSource/repositories/IPostRepository';
import AvailableNewsSources from '@modules/technewsSource/infra/crosscutting/repositories';

//
import IBrowserRepository from '@modules/browser/repositories/repositories/IBrowserRepository';
import Firefox from '@modules/browser/infra/crosscutting/Firefox';

//
import ITechSourcePost from '@modules/techSource/repositories/IPostRepository';
import TechChannelsBR from '@modules/techSource/infra/crosscutting/repositories/TechChannelsBR';
import MeetUp from '@modules/techSource/infra/crosscutting/repositories/MeetUp';
import ReactBR from '@modules/techSource/infra/crosscutting/repositories/ReactBR';
import YtAbout from '@modules/techSource/infra/crosscutting/repositories/YtAbout';
import Movie from '@modules/techSource/infra/crosscutting/repositories/Movie';

//
import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import AvailableMagnetSources from '@modules/magnetSource/infra/crosscutting/repositories';
import AvailableMagnetFakes from '@modules/magnetSource/repositories/fakes';

//

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);

//
//
//
Object.values(AvailableNewsSources).map((source: ITechNewsSourcePost) =>
  container.registerSingleton<ITechNewsSourcePost>('TechNewsSource', source)
);

//
//
//
Object.values(AvailableMagnetSources).map((source) =>
  container.registerSingleton<IEngineRepository>('EngineSource', source)
);
Object.values(AvailableMagnetFakes).map((source) =>
  container.registerSingleton<IEngineRepository>('EngineFake', source)
);

//
//
//
container.registerSingleton<IBrowserRepository>('Browser', Firefox);

//
//
//
container.registerSingleton<ITechSourcePost>('YtAboutSource', YtAbout);
container.registerSingleton<ITechSourcePost>('TechSource', TechChannelsBR);
container.registerSingleton<ITechSourcePost>('ReactBRSource', ReactBR);
container.registerSingleton<ITechSourcePost>('TechSource', TechChannelsBR);
container.registerSingleton<ITechSourcePost>('MovieSource', Movie);
container.registerSingleton<ITechSourcePost>('MeetUpSource', MeetUp);
