var gameObj = gameObj || {};
gameObj.Boot = function(){};

gameObj.Boot.prototype = {
  preload: function() {
    //preloading
  },
  create: function() {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#eee';

    //scaling options
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.scale.setScreenSize(true);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    console.log('Starting Preload...');
    this.state.start('Preload');
  }
};