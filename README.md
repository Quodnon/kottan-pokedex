DAS POKEDEX !
=============
Привет! Меня зовут Коля. это унылый я 2 года назад:
![](https://scontent-fra3-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/1939951_549822188448848_110909194_n.jpg?oh=360bd388b5561f5e68c57f08984ceb99&oe=5787EEEA)

и всё пока. К делу.

Запуск 
----------
<a href='https://www.youtube.com/watch?v=XQEBzauVIlA'  target='voodo'>музыка для ритма (не забываем про новую табу) и покотились</a>

<a href='https://quodnon.github.io/kottan-pokedex/' target='test-site'>https://quodnon.github.io/kottan-pokedex/</a> опять желательно в новой табе и да. покемоновское апи иногда не отдает несчатные 12 записей сразу  из-за корса на ихнем сервере печаль :whale: =( 


---------------

| Что Смотреть? |  |
|------------|--------------------|
| index.html | максимум декларативности здесь |
| app.js    |   покемоновский код |
| app.css   |   стили, да            |
| две директивы в папке html:|  |
| pokeCard | карточка грида  |
| pokeInfo | детальная инфа |
     

Стек
------------
Front-end:
 - angularjs ~~(нечего выделываться вообще не 2.0)~~
 - bootstrap
 
(отдаю себе отчет что это в целом "из пушки по воробьям")

Back-end:
- gh-pages

IDE:
- cloud 9
- visual code

Фичи которые есть
-----------
+ концепция SPA
+ Директивы и контроллер
+ байндинги
+ фильтры
+ ~~ламповый~~ мобайл френдли
+ ~~сервисы~~  две фабрики работы с апи
+ фиксированный див справа при адаптивном дизайне и "фиксд-релатив" рецепт. [отсюда](http://jsfiddle.net/hajpoj/Q7A33/1/)
- кастомные фильтры ангуляра 
- фильтры должны включать только загруженные данные и появляться с новыми типами покемонов
- когда узкий экран - перегонять фокус наверх
- сделать кнопку наверх
- на узком экране закрытие карточки ведет на предыдущую У позицию скролла


----------------------------
| Что **не делал** \ **не нравится** |почему\как сделал|
|--------|----------|
| фавайконы **для всех** браузеров | время и придумка иконки |
| свои стили за исключением явно необходимых марджинов | дизайнер слабоватый =( юзаю стандартные темы |
|фильтрация в виде отдельного запроса к апи с параметром типа| фильтруем **уже загруженные данные**|
| сложная логика фильтров | сделал по жадному принципу: "если  хоть один тип чекнут, то карточку показываем" |
| юнит тесты| 1.время 2. не знаком с их фреймворком |
|при**ЛИП**чивый див фильтров(аккордеоном)| не включил его в мвп. обязательно попробую реализовать после сабмита в свободное время =)|
|фиксированная верстка карточки деталей по покемону в пришпиленном, свободном состоянии, с разными видами данных| не включил в мвп.|
|не обработан cценарий - узкий экран - кликнули карточку - снесли фильтр- закрыли карточку- *вернуться на предыдущее место с учетом того есть карточка или нет*| время.|

БАГИ
====================

|Где|ЧТО|КАК ФИКСИЛ|
|----|---|-------|
|ие едж|Бутстрап. при загрузке из цдн валятся 403 ошибки на доп.ресурсы. на функциональность влияния не обнаружил| [открыт стаковерфлоу переделал на локальные ресурсы](http://stackoverflow.com/questions/33533605/twitter-bootstrap-alpha-4-0-404-403-response-from-cdns-in-ms-edge)|
|~~везде~~|~~чекбоксы. фильтров 1 "снимаем все". 2 .по одному включаем. довключаем все фильтры 3.нажимаем "снять всё"- ошибка и необходимо доп.нажатие~~|закрыл через ng-change reCountChecked|

Кто я?
----------------
Денисюк Николай feanorfeanturi@gmail.com Киев, 24 
- разработчик-**самоучка**(местами это грусть-грустная ситуация) под MS Dynamics CRM (стек js + .net) 2.5 года
- пользовался ангуляром, winjs. до сих пор для задач  почти хватает jquery
- из прям *предметного* делаю SPA клиенты  к разным серверным решениям телефонии(циска, ИнИн) *fyi*

~~Зачем~~ почему я хочу к вам?
----------------------

- **делать** проекты под чутким присмотром менторов
- *говорить* с менторами о веб-разработке
- понять как чаще делать "как надо", так как устал делать "как не надо"
- познакомиться с тусовкой самых крутых разрабов Украины =)
- дать фронт-енду преимущество в борьбе специализаций фронт-енд vs бек-енд.


-------------------



![](https://scontent-frt3-1.cdninstagram.com/t51.2885-15/e35/12826036_1008594852554644_380765953_n.jpg?ig_cache_key=MTIwNjQ0NTg4MzQ2NDg4NTk0NQ%3D%3D.2)
*Просто ежик говорит спасибо, что дочитали до конца ридми.*

[ну и мой инстаграмчик =)](http://instagram.com/feanorfeanturi)
