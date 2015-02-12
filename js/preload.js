var gameObj = gameObj || {};
gameObj.Preload = function(){};

gameObj.Preload.prototype = {
  preload: function() {
    this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/tiles.png');
  },
  create: function() {
    this.state.start('Game');
  }
};