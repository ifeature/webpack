import welcome from './welcome';

const old = require('old');
welcome('home');

if (NODE_ENV === 'development') {
    console.info('This is development mode...');
}

console.log('jquery', $);
old();

btn.onclick = function() {
    require.ensure(['./login'], function() {
        let login = require('./login');
        login();
    }, 'auth');
};

exports.welcome = welcome;