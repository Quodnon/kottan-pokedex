/*global angular*/
"use strict"; // да, да в ES6 встроен строгий режим по умолчанию,
            //но ведь я буду писать на ES5(по крайней мере я так думаю)
            // и нет, я не буду в этот раз ковыряться с ие8

//сделал код простынёй. не вижу смысла размазывать код по файлам на текущем этапе


var pokedexApp=angular.module("pokedexApp",['ngResource']);

//мы используем первую версию апи как в тз
//получаем весь датасет сразу
var pokemonApiHost="https://pokeapi.co/api/v1/";

//фабрика для получения данных по покемонам
pokedexApp.factory("Pokemons",function($resource){
    return $resource(pokemonApiHost+"pokemon/?limit=:limit&offset=:offset");
});

//фабрика для получения данных по типам
pokedexApp.factory("Types",function($resource) {
    return $resource(pokemonApiHost+"type/?limit=999");
})


//контроллер. сделал единственный чтобы не перебрасываться скоупами.. нутакое
var pokemonListController=pokedexApp.controller("pokemonListController",function($scope,Pokemons,$window,Types){
    //переменные
    $scope.noMorePokemons=false;
    $scope.showDetailsOfPokemon=false;
    $scope.globalFilterCheck=true;
    
    
    //здесь лежит основная модель
    $scope.pokemons=null;
    $scope.selectedPokemon=null;
    $scope.pokeTypes=null;
    $scope.visiblePokemons=null;
    
    //параметры для запросов
    $scope.nextPokemons="";
    $scope.limit=50;
    $scope.offset=0;
    
    
    /*РАБОТА С АПИ*/
    //получение базового массива покемонов в самом начале
    Pokemons.get({limit:$scope.limit, offset:$scope.offset},function(data){
        $scope.pokemons=data.objects;
        $scope.visiblePokemons=data.objects;
        $scope.nextPokemons=data.meta.next;
        $scope.offset+=$scope.limit;
        
    });

    Types.get({},function (data) {
        /**
         * добавил через мап одно свойство - фильтры у нас сразу "включены"
         */
        $scope.pokeTypes=data.objects.map(function(currentValue,currentIndex,array){
            currentValue.checked=true;
            return currentValue;
        });
    });
    /*КОНЕЦ РАБОТЫ С АПИ*/
    
    
    /*ОБРАБОТЧИКИ КНОПОК*/
    //onclicklistener переключалка на выбранного покемона
    //перезаписать объект и сместить фокус???
    $scope.switchToPokemon = function (pokemon) {
        $scope.selectedPokemon=pokemon;
        $scope.showDetailsOfPokemon=true;
    
    };
 
    //загрузка еще 50-ти покемончиков. 
    //руками пересчитываем смещение
    $scope.loadMore = function () {
        try{
            Pokemons.get({limit:$scope.limit, offset:$scope.offset},function(data) {
                if (data.meta.next===null){
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
    /**
     * выбрать-невыбрать все чекбоксы
     */
     $scope.selDesFilters = function(){
         //нечего мапы плодить. через фор перебираем галки и ставим-снимаем
         for (var i = 0; i < $scope.pokeTypes.length; i++) {
             if($scope.globalFilterCheck===true){
                 $scope.pokeTypes[i].checked=false;
             } else{
                 $scope.pokeTypes[i].checked=true;
             }
         }
        $scope.globalFilterCheck=!$scope.globalFilterCheck;
     }
     $scope.filterType=function () {
         // body...
         $scope.apply();
     }
});


//директива маленькой карточки покемона
pokemonListController.directive("pokeCard",function(){
    return{
        restrict:'E',
        templateUrl: 'html/poke-card.html'
    }
});    


//директива детальной информации о покемоне
pokemonListController.directive('pokeInfo',function() {
    return {
        restrict:'E',
        templateUrl:'html/poke-info.html'
    };
});

//придется сделять кастомный фильтр для обработки пересечения двух массивов
// чесный и быстрый разбор отсюда http://stackoverflow.com/questions/22024631/angularjs-filter-based-on-array-of-strings
pokemonListController.filter('selectedPoketype', function () {
    return function (pokemons, globalPokeTypes) {
        return pokemons.filter(function(pokemon){
            var result=false;
            var types=pokemon.types;
            
            for( var j=0;j<types.length;j++){
                for (var i = 0; i<globalPokeTypes.length; i++) {
                    if(globalPokeTypes[i].name.toLowerCase()===types[j].name.toLowerCase()){
                        if(globalPokeTypes[i].checked===true){
                            result=true;
                        } else {
                            // опп. хоть один не чекнутый - выкидываем из просмотра
                            result=false;
                            return result;
                        }
                    } else {
                        continue;
                    }
                }
            }
            return result;
        });
            
    }
});

//фильтр типов покемонов которые есть в загруженных покемонах
pokemonListController.filter('availableTypes', function () {
    return function (types, pokemons) {
        return types.filter(function(type){
            debugger;
            var result=false;
            for (var i=0;i<pokemons.length;i++){
                for( var j=0;j<pokemons[i].types.length;j++){
                    if(pokemons[i].types[j].name===type.name.toLowerCase()){
                        result=true;
                        return result;
                    }else {
                        continue
                    }
                }
            }
            return result;
        });
            
    }
});