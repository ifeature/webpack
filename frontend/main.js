'use strict';

require.ensure(['./menu'], function(require) {
    const Menu = require('./menu').default;

    const pandaMenu = new Menu({
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
}, 'Menu');