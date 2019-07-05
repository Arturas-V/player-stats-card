## Player Stats Card App

In order to get styles and scripts minified you must to run commands:

### `gulp sass`

and

### `gulp js`


To make xml http call to server to get json data please start up server witht the following command:

### `./app/server.js`




## App information, developer's instruction

Player Stats Card Application made in singular component called "PlayerCard".
In order to render component you need to create component class instance by calling "new PlayerCard()".
Additional settign needs to be passsed to component, please refer to code below:

```
var settings = {
    playersData: data
}
var card = new PlayerCard(settings);
```

Component disposal can be done by calling:

```
card.dispose();
```