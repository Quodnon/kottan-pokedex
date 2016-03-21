/*global angular*/
"use strict"; // да, да в ES6 встроен строгий режим по умолчанию,
            //но ведь я буду писать на ES5(по крайней мере я так думаю)
            // и нет, я не буду в этот раз ковыряться с ие8

//сделал пока простыней. не вижу смысла размазывать код на текущем этапе

var pokedexApp=angular.module("pokedexApp",['ngResource']);

//мы используем первую версию апи как в тз
//получаем весь датасет сразу
var pokemonApiHost="https://pokeapi.co/api/v1/";

pokedexApp.factory("Pokemons",function($resource){
    return $resource(pokemonApiHost+"pokemon/?limit=:limit&offset=:offset");
});

var pokemonListController=pokedexApp.controller("pokemonListController",function($scope,Pokemons){
    
    $scope.noMorePokemons=false;
    $scope.showDetailsOfPokemon=false;
    
    $scope.pokemons=null;
    $scope.selectedPokemon=null;
    
    $scope.nextPokemons="";
    $scope.limit=12;
    $scope.offset=0;
    
    //получение базового массива покемонов в самом начале
    Pokemons.get({limit:$scope.limit, offset:$scope.offset},function(data){
        $scope.pokemons=data.objects;
        $scope.nextPokemons=data.meta.next;
        $scope.offset+=$scope.limit;
        
    });


    //onclicklistener переключалка на выбранного покемона
    //перезаписать объект и сместить фокус
    $scope.switchToPokemon = function (pokemon) {
        $scope.selectedPokemon=pokemon;
        $scope.showDetailsOfPokemon=true;
        document.getElementById('#poke-details').focus();
    };


    //button 
    $scope.loadMore = function () {
        try{
            Pokemons.get({limit:$scope.limit, offset:$scope.offset},function(data) {
                if (data.meta.next==null){
                    $scope.noMorePokemons=true;
                }
                $scope.offset+=$scope.limit;
                $scope.pokemons=$scope.pokemons.concat(data.objects);
            });
        } catch (err)
        {
            //todo empty catch wololo
            console.log(err);
        }
    }
});

pokemonListController.directive("pokeCard",function(){
    return{
        restrict:'E',
        templateUrl: 'html/poke-card.html'
    }
});    

pokemonListController.directive('pokeInfo',function() {
    return {
        restrict:'E',
        templateUrl:'html/poke-info.html'
    };
});