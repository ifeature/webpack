import welcome from './welcome';
welcome('Hello, world!');

if (NODE_ENV === 'development') {
    console.info('This is development mode...');
}

exports.welcome = welcome;