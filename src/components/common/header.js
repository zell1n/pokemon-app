"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <Link to="pokemons" className="navbar-brand">
                        <img className="img-resize" src="images/pokemon_go_logo.png" />
                    </Link>
                </div>
            </nav>
        );
    }
});

module.exports = Header;