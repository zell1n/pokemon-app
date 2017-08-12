"use strict";

var React = require('react');
var axios = require('axios');
var jsonp = require('jsonp');
var _ = require('underscore');

var PokemonList = require('./pokemonList');
var PokemonSearch = require('./pokemonSearch');

var PokemonsPage = React.createClass({
    getInitialState: function () {
        return {
            pokemons: []
        }
    },

    componentDidMount: function() {
        axios.get(global.config.BaseUrl + global.config.PokedexEndpoint)
        .then(res => {
            var pokemons = res.data;
            pokemons = _.sortBy(pokemons, 'pokeIndex');
            this.setState({ pokemons });
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    render: function() {
        return (
            <div className="container-fluid">
                <PokemonSearch pokemons={this.state.pokemons} />
            </div>
        );
    }
});

module.exports = PokemonsPage;