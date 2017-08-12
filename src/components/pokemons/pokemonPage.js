"use strict";

var React = require('react');
var axios = require('axios');
var Router = require('react-router');
var Link = Router.Link;

// const baseUrl = 'http://localhost:5000/'
// const pokeindexEndpoint = 'api/pokedex/pokeindex/';
// const strongAgainstEndpoint = 'api/pokedex/strongAgainst/';

var renderType = function(types) {
    if (types) {
        if (types.length > 1) {
            return types[0] + ', ' + types[1];
        }
        else
            return types;
    }
}

var PokemonPage = React.createClass({
    getInitialState: function () {
        return {
            pokemon: {},
            weaknesses: []
        }
    },

    componentDidMount: function() {
        axios.get(global.config.BaseUrl + global.config.PokedexEndpoint + this.props.params.pokeIndex)
        .then(x => {
            var pokemon = x.data;
            var weaknesses;

            axios.get(global.config.BaseUrl + global.config.PokedexEndpoint + global.config.GetPokedexStrongAgainst + this.props.params.pokeIndex)
            .then(y => {
                weaknesses = y.data;
                this.setState({ pokemon, weaknesses });
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    render: function() {
        var weaknessNode = this.state.weaknesses.map(function (weakness) {
            return (
                <li className="list-group-item" key={weakness.pokeIndex}>{weakness.name}</li>
            );
        });

        return (
            <div>
                <div className="container-fluid">
                    <h2>{this.state.pokemon.name}</h2>
                    <img alt="..." src="link to pic" style={{width: 150 + 'px'}}/>
                    <h3>Detailed info:</h3>      
                    <table className="table table-condensed">
                        <tbody>
                        <tr>
                            <td>Type:</td>
                            <td>{renderType(this.state.pokemon.types)}</td>
                        </tr>
                        <tr>
                            <td>HP:</td>
                            <td>{this.state.pokemon.hp}</td>
                        </tr>
                        <tr>
                            <td>Attack:</td>
                            <td>{this.state.pokemon.attack}</td>
                        </tr>
                        <tr>
                            <td>Defence:</td>
                            <td>{this.state.pokemon.defense}</td>
                        </tr>
                        <tr>
                            <td>Max CP:</td>
                            <td>{this.state.pokemon.maxCP}</td>
                        </tr>
                        </tbody>
                    </table>

                    <h3>Possible counters:</h3>
                    <ul className="list-group">
                        {weaknessNode}
                    </ul>
                    <hr/>
                    <p><Link to="pokemons" className="btn btn-default">Go back</Link></p>
                </div>
            </div>
        );
    }
});

module.exports = PokemonPage;