"use strict"; // да, да в ES6 встроен строгий режим по умолчанию,
            //но ведь я буду писать на ES5(по крайней мере я так думаю)

angular.module("pokedexApp",[])
.controller("mainController",["$scope",function(s){
    s.testModelValue={
        text:"Hello World from Angular value"
        
    };    
}]);