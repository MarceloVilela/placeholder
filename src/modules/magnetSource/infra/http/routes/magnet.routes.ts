import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SearchController from '../controllers/SearchController';
import TrendController from '../controllers/TrendController';

const magnetRouter = Router();
const searchController = new SearchController();
const trendController = new TrendController();

magnetRouter.get(
  // #swagger.tags = ['MagnetSource']
  // #swagger.path = '/v1/magnet-source/search'
  // #swagger.summary = 'Get array of results'
  /* #swagger.parameters['url'] = {
    in: 'query',
    description: 'alias from source site',
    type: 'string',
    default: 'pirateproxy'
  } */
  /* #swagger.parameters['search_query'] = {
    in: 'query',
    description: 'search parameter',
    type: 'string',
    default: 'snes'
  } */
  /* #swagger.parameters['encoded'] = {
    in: 'query',
    description: 'indicates whether the parameters are encoded',
    type: 'string',
    default: 'false'
  } */
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/MagnetSource_ArrayOfResults" },
  } */
  '/search',
  searchController.index
);

magnetRouter.get(
  // #swagger.tags = ['MagnetSource']
  // #swagger.path = '/v1/magnet-source/detail'
  // #swagger.summary = 'Get data on full post page'
  /* #swagger.parameters['url'] = {
    in: 'query',
    description: 'url of full post page',
    type: 'string',
    default: 'https://comandotorrent.net/liga-da-justica-de-zack-snyder-torrent/'
  } */
  /* #swagger.parameters['encoded'] = {
    in: 'query',
    description: 'indicates whether the parameters are encoded',
    type: 'string',
    default: 'false'
  } */
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/MagnetSource_Detail" },
  } */
  '/detail',
  searchController.show
);

magnetRouter.get(
  '/trend',
  trendController.index
);

export default magnetRouter;
