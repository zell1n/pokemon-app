"use strict";

var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
    <Route name="app" path="/" handler={require('./components/app')}>
        <DefaultRoute name="pokemons" handler={require('./components/pokemons/pokemonsPage')} />
        <Route name="pokemon" path="/pokemons/:pokeIndex" handler={require('./components/pokemons/pokemonPage')} />
        <NotFoundRoute handler={require('./components/notFoundPage')} />
    </Route>
);

module.exports = routes;