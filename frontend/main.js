'use strict';

require.ensure(['./menu'], function(require) {
    let Menu;
    let pandaMenu;

    function showMenu() {
        Menu = require('./menu').default;
        pandaMenu = new Menu({
            title: 'Panda Menu',
            items: [
                {
                    text: 'Eggs',
                    href: '#eggs'
                },
                {
                    text: 'Meat',
                    href: '#meat'
                },
                {
                    text: 'Bamboo',
                    href: '#bamboo'
                }
            ]
        });
        document.body.appendChild(pandaMenu.elem);
    }

    showMenu();

    if (module.hot) {
        module.hot.accept('./menu', () => {
            Menu = require('./menu');
            document.body.removeChild(pandaMenu.elem);
            showMenu();
        });
    }
}, 'Menu');
