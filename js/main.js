/**

Main.js

**/

var gameObj = gameObj || {};

gameObj.game = new Phaser.Game(160, 160, Phaser.AUTO, '');

console.log('adding boot');
gameObj.game.state.add('Boot', gameObj.Boot);
gameObj.game.state.add('Preload', gameObj.Preload);
gameObj.game.state.add('Game', gameObj.Game);

gameObj.game.state.start('Boot');
console.log(gameObj.game.state)