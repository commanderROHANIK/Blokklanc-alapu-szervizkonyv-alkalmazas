const routes = require('next-routes')();

routes
    .add('/services/:address', '/servicecenters/show')
    .add('/vheicles/:address', '/vheicles/show');

module.exports = routes;