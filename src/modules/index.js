import locationsRouter from './locations';

const apiPrefix = '/api/v1';

//aggregate all routes here
const routes = [
  locationsRouter,
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
