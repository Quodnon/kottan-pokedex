"use strict"; // да, да в ES6 встроен строгий режим по умолчанию,
            //но ведь я буду писать на ES5(по крайней мере я так думаю)
            // и нет, я не буду в этот раз ковыряться с ие8



var pokedexApp=angular.module("pokedexApp",['ngResource']);

var pokemonApiHost="https://pokeapi.co/api/v2/";

pokedexApp.factory("Pokemons",function($resource){
    return $resource(pokemonApiHost+"pokemon/?limit=:limit&offset=:offset");
});

pokedexApp.controller("pokemonListController",function($scope,Pokemons){
    $scope.noMorePokemons=false;
    $scope.pokemons=null;
    
    $scope.nextPokemons="";
    $scope.limit=500;
    $scope.offset=0;
    Pokemons.get({limit:$scope.limit, offset:$scope.offset},function(data){
        $scope.pokemons=data.results;
        $scope.nextPokemons=data.next;
        $scope.offset+=$scope.limit;
        
    });
    
    
    $scope.loadMore = function () {
        try{
            Pokemons.get({limit:$scope.limit, offset:$scope.offset},function(data) {
                if (data.next==null){
                    $scope.noMorePokemons=true;
                }
                $scope.offset+=$scope.limit;
                $scope.pokemons=$scope.pokemons.concat(data.results);
            });
        } catch (err)
        {
            //todo empty catch wololo
            console.log(err);
        }
    }
});