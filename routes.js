const routes = require('next-routes')();

routes
    .add('/servicecenters/listAll', 'servicecenters/listAll')
    .add('/vheicles/listAll', 'vheicles/listAll')
    .add('/vheicles/new', 'vheicles/new')
    .add('/servicecenters/new', 'servicecenters/new')
    .add('/services/:address', '/servicecenters/show')
    .add('/vheicles/:address', '/vheicles/show');

module.exports = routes;