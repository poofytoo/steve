var gameObj = gameObj || {};
gameObj.Preload = function(){};

gameObj.Preload.prototype = {
  preload: function() {
    this.load.tilemap('level1', 'assets/tilemaps/tilemaptest.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/raw/test-tile2.png');
    this.load.image('key', 'assets/raw/key.png');
    //this.load.image('steve', 'assets/raw/steve1.png');

    this.load.atlasJSONHash('steve', 'assets/raw/steve2.png', 'assets/tilemaps/sprites.json');
  
  },
  create: function() {
    this.state.start('Game');
  }
}