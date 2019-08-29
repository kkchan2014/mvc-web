/*---------------------------------------------------------------------------------------------
 *  Copyright (c) kkChan(694643393@qq.com). All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict'

require('node-type-extensions');

const uuid = require("node-uuid");
const session = require('express-session');
const fileupload = require("express-fileupload");
const expressmvc = require('node-exp-mvc');

const mvchandler = require('./handler');
const options = require('./web.json');
const mvc = new expressmvc(options, false);

mvc.use(session({
    resave: false,
    saveUninitialized: true,
    secret: uuid.v4(),
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));
mvc.use([fileupload(), mvchandler]);
mvc.setPages(options.pages);
mvc.catch();

options.resources && mvc.static(options.resources.static);
options.routes && mvc.use(options.routes);

mvc.listen(options.port, function () {
    console.log('[URL]http://127.0.0.1:%s', options.port);
})