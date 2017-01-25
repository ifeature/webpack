import welcome from './welcome';

welcome('home');

if (NODE_ENV === 'development') {
    console.info('This is development mode...');
}

console.log('jquery', $);

btn.onclick = function() {
    require.ensure(['./login'], function() {
        let login = require('./login');
        login();
    }, 'auth');
};

exports.welcome = welcome;