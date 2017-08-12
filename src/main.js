"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

global.config = require('./config.json');

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('app'));
});