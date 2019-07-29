import locationsRouter from './locations';
import subLocationsRouter from './subLocations';

const apiPrefix = '/api/v1';

//aggregate all routes here
const routes = [
  locationsRouter,
  subLocationsRouter
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
