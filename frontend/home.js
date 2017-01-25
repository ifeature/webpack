import welcome from './welcome';
welcome('home');

if (NODE_ENV === 'development') {
    console.info('This is development mode...');
}

btn.onclick = function() {
    require.ensure(['./login'], function() {
        let login = require('./login');
        login();
    }, 'auth');
};

exports.welcome = welcome;