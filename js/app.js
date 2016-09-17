/*global angular*/
//copyright Mykola Denysyuk special for Kottans
"use strict"; // да, да в бабель встроен строгий режим по умолчанию,
            //но ведь я буду писать на ES5(по крайней мере я так думаю)
            // и нет, я не буду в этот раз ковыряться с ие8

//сделал код простынёй.
//не вижу смысла размазывать код по файлам на текущем этапе


var pokedexApp=angular.module("pokedexApp",['ngResource']);

//мы используем первую версию апи КАК В ТЗ
//получаем первый датасет при загрузке
var pokemonApiHost="https://pokeapi.co/api/v1/";

//фабрика для получения данных по покемонам
pokedexApp.factory("Pokemons",function($resource){
    return $resource(pokemonApiHost+"pokemon/?limit=:limit&offset=:offset");
});

//фабрика для получения данных по типам
pokedexApp.factory("Types",function($resource) {
    return $resource(pokemonApiHost+"type/?limit=999");
})

var imageMiddleware = function(pokemons){
    debugger
    let goodimgokemons = pokemons.map(pokemon=>{
        let id = pokemon.pkdx_id,
            img ='';
        if (id<10) {img+='0'}
        if (id<100) {img+='0';}
        pokemon.pkdx_img=img+id.toString();
        return pokemon
    })
    return goodimgokemons
}
//контроллер. сделал единственный чтобы не перебрасываться скоупами.. нутакое
var pokemonListController=pokedexApp.controller("pokemonListController",function($scope,Pokemons,$window,Types){
    //переменные
    $scope.noMorePokemons=false;
    $scope.showDetailsOfPokemon=false;
    
    $scope.globalFilterCheck=true;
    
    $scope.pinned=false;
    $scope.showPinned=true;
    
    $scope.loadingPokemons=false;
    $scope.initialLoadCompleted=false;
    
    $scope.headerInVisible=false;
    
    $scope.firstYPosition=0
    
    //здесь лежит основная модель
    $scope.pokemons=null;
    $scope.selectedPokemon=null;
    $scope.pokeTypes=null;
    $scope.visiblePokemons=null;
    
    //параметры для запросов
    $scope.nextPokemons="";
    $scope.limit=12;
    $scope.offset=0;
    
    
    /*РАБОТА С АПИ*/
    //получение базового массива покемонов в самом начале
    Pokemons.get({limit:$scope.limit, offset:$scope.offset},function(data){
        $scope.pokemons=imageMiddleware(data.objects);
        $scope.visiblePokemons=data.objects;
        $scope.nextPokemons=data.meta.next;
        $scope.offset+=$scope.limit;
        $scope.initialLoadCompleted=true;
    });

    Types.get({},function (data) {
        /**
         * добавляем через мап одно свойство - фильтры у нас сразу "включены"
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
        if(window.innerWidth<768){
            $scope.showPinned=false;
            $scope.firstYPosition=window.pageYOffset;
            window.scroll(0,0);
        } else {
            $scope.showPinned=true;
        }
    
    };
    
 
 
    //загрузка еще 12-ти покемончиков. 
    //руками пересчитываем смещение
    $scope.loadMore = function () {
        try{
            //купируем асинхронный забор результатов пячем кнопку;
            $scope.loadingPokemons=true;
            
            //забираем данные, впихиваем их в наш репитер
            Pokemons.get({limit:$scope.limit, offset:$scope.offset},function(data) {
                if (data.meta.next===null){
                    $scope.noMorePokemons=true;
                }
                $scope.offset+=$scope.limit;
                $scope.pokemons=$scope.pokemons.concat(imageMiddleware(data.objects));
                
                //все забралось -выпячиваем обратно
                $scope.loadingPokemons=false;
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
        if($scope.globalFilterCheck===false){
            $scope.showDetailsOfPokemon=false;
        }
     }
    /**закрыть детальки
     * 
    */
    $scope.closeDetails= function(){
        $scope.showDetailsOfPokemon=false;
        if(window.innerWidth<768){
            window.scroll(0,$scope.firstYPosition);
        }
    }
    
    $scope.pinDetails =function(){
        $scope.pinned=!$scope.pinned;
    }
    
    $scope.backToTop=function(){
        window.scrollTo(0,0);
    };

    $scope.reCountChecked = function () {
        var visibleAndChecked=0,
            visibleAndUnChecked=0,
            visibleCount=0;
        
        for (var i=0;i<$scope.pokeTypes.length;i++){
            if ($scope.pokeTypes[i].visible==true)   {
                visibleCount++;
            }
            if ( $scope.pokeTypes[i].checked==true && $scope.pokeTypes[i].visible==true)
            {
                visibleAndChecked++;
            }else if ( $scope.pokeTypes[i].checked==false && $scope.pokeTypes[i].visible==true){
                visibleAndUnChecked++;
            }
        }
        if(visibleAndChecked==visibleCount || visibleAndUnChecked==visibleCount){
            $scope.globalFilterCheck=!$scope.globalFilterCheck;
        }
    }
    //прям в контроллере подписались на скролл.
    angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 80) {
                $scope.headerInVisible = true;
             } else {
                $scope.headerInVisible = false;
             }
            $scope.$apply();
        });
    
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

 

// сделяль кастомный фильтр для обработки пересечения двух массивов
// честный и быстрый разбор отсюда http://stackoverflow.com/questions/22024631/angularjs-filter-based-on-array-of-strings
pokemonListController.filter('selectedPoketype', function () {
    return function (pokemons, globalPokeTypes) {
        //опс. не прогрузилось
        if (pokemons===null || globalPokeTypes===null){return}
        // а теперь прогрузилось
        return pokemons.filter(function(pokemon){
            var result=false;
            var types=pokemon.types;
            
            for( var j=0;j<types.length;j++){
                for (var i = 0; i<globalPokeTypes.length; i++) {
                    if(globalPokeTypes[i].name.toLowerCase()===types[j].name.toLowerCase()){
                        // у нас совпали типы в массивах проверяем их на "чек"
                        if(globalPokeTypes[i].checked===true){
                            //чекнутый - показываем. чтобы скрыть психика -фейри надо снять обе галки
                            result=true;
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
        if (types===null || pokemons===null){return}
        return types.filter(function(type){
            var result=false;
            for (var i=0;i<pokemons.length;i++){
                for( var j=0;j<pokemons[i].types.length;j++){
                    if(pokemons[i].types[j].name===type.name.toLowerCase()){
                        result=true;
                        type.visible=true;
                        return result;
                    }else {
                         type.visible=false;
                        continue
                    }
                }
            }
            return result;
        });
            
    }
});
