var gameObj = gameObj || {};
gameObj.Game = function(){};

gameObj.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');
    this.map.addTilesetImage('test-tile', 'gameTiles');
    
    //create layer
    //this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('Base');
    this.backgroundlayer = this.map.createLayer('Front');

    this.blockedLayer.resizeWorld();
  }
}