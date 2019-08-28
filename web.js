require('node-type-extensions');

const uuid = require("node-uuid");
const session = require('express-session');
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const expressmvc = require('node-exp-mvc');

const hook = require('./hook');
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
mvc.use(bodyParser.urlencoded({
    extended: false
}));
mvc.use([fileupload(), hook]);
mvc.catch();

options.resources && mvc.static(options.resources.static);
options.routes && mvc.use(options.routes);

mvc.listen(options.port, function () {
    console.log('[URL]http://127.0.0.1:%s', options.port);
})