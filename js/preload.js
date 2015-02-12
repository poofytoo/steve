var gameObj = gameObj || {};
gameObj.Preload = function(){};

gameObj.Preload.prototype = {
  preload: function() {
    this.load.tilemap('level1', 'assets/tilemaps/tilemaptest.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/raw/test-tile.png');
  },
  create: function() {
    this.state.start('Game');
  }
}