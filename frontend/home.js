import welcome from './welcome';
welcome('home');

if (NODE_ENV === 'development') {
    console.info('This is development mode...');
}

btn.onclick = function() {
    // Promise.resolve()
    //     .then(function() {
    //                 require.ensure([], function(require) {
    //         resolve(require('./login'));
    //     });
    //     })
};

exports.welcome = welcome;