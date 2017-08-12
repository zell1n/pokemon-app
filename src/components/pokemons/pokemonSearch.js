"use strict";

/* https://github.com/moroshko/react-autosuggest */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var _ = require('underscore');
var Autosuggest = require('react-autosuggest');
var Link = Router.Link;

var getSuggestions = function(value, pokemons) {
    var inputValue = value.trim().toLowerCase();
    var inputLength = inputValue.length;

    return inputLength === 0 ? [] : pokemons.filter(pokemon => pokemon.name.toLowerCase().slice(0, inputLength) === inputValue);
}

var getSuggestionValue = function(suggestion) {
    return suggestion.name;
}

var renderType = function(types) {
    if (types.length > 1) {
        return types[0] + ', ' + types[1];
    }
    else
        return types;
}

var renderSuggestion = function(suggestion) {
    return (
        <Link to="pokemon" params={{pokeIndex: suggestion.pokeIndex}}>
                <table>
                    <tr>
                        {/*<td rowspan="2"><img src={suggestion.urlPicture}/></td>*/}
                        <td><b>{suggestion.name}</b></td>
                    </tr>
                    <tr>
                        <td><i>{renderType(suggestion.types)}</i></td>
                    </tr>
                </table>
        </Link>
    );
}

var PokemonSearch = React.createClass({
    componentWillMount: function () {
        this.state = {
            value: '',
            suggestions: []
        };
    },

    onChange: function (event, { newValue }) {
        this.setState({
            value: newValue
        })
    },

    onSuggestionsFetchRequested: function({ value }) {
        this.setState({
            suggestions: getSuggestions(value, this.props.pokemons)
        });
    },

    onSuggestionsClearRequested: function() {
        this.setState({
            suggestion: []
        });
    },

    render: function() {
        var { value, suggestions } = this.state;

        var inputProps = {
            placeholder: 'Type a pokemon',
            value,
            onChange: this.onChange
        };

        return (
            <div className="container-fluid" style={{ paddingLeft: 0}}>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        );
    }
});

module.exports = PokemonSearch;