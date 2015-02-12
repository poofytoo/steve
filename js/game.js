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
    // this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    // this.backgroundlayer.resizeWorld();

    this.state = {
      moving: false,
      direction: null,
      next: null,
      direction: null
    }
     //create player
    var result = this.findObjectsByType('steveStart', this.map, 'objectsLayer')

    //we know there is just one result
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'steve');
    this.game.physics.arcade.enable(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust the y position
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact pixel position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);
      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    if (this.state.moving) {
      if (this.state.direction === 'up' && this.player.body.y >= this.state.next ||
          this.state.direction === 'down' && this.player.body.y <= this.state.next ||
          this.state.direction === 'left' && this.player.body.x >= this.state.next ||
          this.state.direction === 'right' && this.player.body.x <= this.state.next) {
        return;
      } else {
        this.state.moving = false;
        switch(this.state.direction) {
          case 'up':
          case 'down':
            this.player.body.y = this.state.next; break;
          case 'left':
          case 'down':
            this.player.body.x = this.state.next; break;
        }
      }
    }
    console.log(this.player.body.x, this.player.body.y);
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;
    var velocity = 128;
    var step = 32;
    if (this.cursors.up.isDown) {
      this.state.moving = true;
      this.state.direction = 'up';
      this.state.next = this.player.body.y - step;
      this.player.body.velocity.y -= velocity;
    } else if (this.cursors.down.isDown) {
      this.state.moving = true;
      this.state.direction = 'down';
      this.state.next = this.player.body.y + step;
      this.player.body.velocity.y += velocity;
    } else if (this.cursors.left.isDown) {
      this.state.moving = true;
      this.state.direction = 'left';
      this.state.next = this.player.body.x - step;
      this.player.body.velocity.x -= velocity;
    } else if (this.cursors.right.isDown) {
      this.state.moving = true;
      this.state.direction = 'right';
      this.state.next = this.player.body.x + step;
      this.player.body.velocity.x += velocity;
    }
  }
}