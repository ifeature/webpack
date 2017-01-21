var welcome = require('./welcome');
welcome('Hello');


if (NODE_ENV === 'development') {
    console.info('This is development mode...');
}
exports.t = welcome;