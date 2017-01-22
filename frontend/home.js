import welcome from './welcome';
welcome('home');

if (NODE_ENV === 'development') {
    console.info('This is development mode...');
}

exports.welcome = welcome;