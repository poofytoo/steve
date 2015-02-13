var gameObj = gameObj || {};
gameObj.Game = function(){};

gameObj.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');
    this.map.addTilesetImage('test-tile', 'gameTiles');
    
    //create layer
    //this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.base = this.map.createLayer('Base');
    this.base.resizeWorld();
    // this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
    // this.backgroundlayer.resizeWorld();

    this.state = {
      verticalOffset: 12,
      horizontalOffset: 4,
      velocity: 200,
      step: 32,
      moving: false,
      direction: null,
      next: null,
      direction: null
    }

    this.tiles = {
      1: {
        walkable: true
      },
      3: {
        walkable: false
      }
    }
    
    // Create player
    var result = this.findObjectsByType('steveStart', this.map, 'objectsLayer')

    // Initiate the player
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'steve');
    this.game.physics.arcade.enable(this.player);
    this.player.animations.add('run');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.x = -1;
    this.player.position.setTo(this.player.position.x + 16, this.player.position.y + 8);
    this.game.camera.follow(this.player);

    // Move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // Add foreground
    this.front = this.map.createLayer('Front');

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
  
  findTileByWorldCoords: function(worldX, worldY, map, layer) {
    return map.getTile(Math.round(worldX/map.tileWidth),
      Math.round(worldY/map.tileHeight), layer);
  },

  validMovement: function(worldX, worldY, offsetX, offsetY) {
    return this.map.getTile(Math.round(worldX/this.map.tileWidth) + offsetX,
      Math.round(worldY/this.map.tileHeight) + offsetY, 'Base').index == 1 || false;
  },
  /*
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);
      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
  */

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
        this.player.animations.stop('run', true);
        switch(this.state.direction) {
          case 'up':
          case 'down':
            var next = Math.floor(Math.round(this.state.next + this.state.verticalOffset) / this.state.step) * this.state.step;
            this.player.body.y = next - this.state.verticalOffset; break;
          case 'left':
          case 'right':
            var next = Math.floor(Math.round(this.state.next + this.state.horizontalOffset) / this.state.step) * this.state.step;
            this.player.body.x = next - this.state.horizontalOffset; break;
        }
      }
    }

    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    // TODO: Should be switched to event listeners

    if (this.cursors.up.isDown && this.validMovement(this.player.body.x, this.player.body.y, 0, -1)) {
      this.state.moving = true;
      this.state.direction = 'up';
      this.state.next = this.player.body.y - this.state.step;
      this.player.body.velocity.y -= this.state.velocity;
      this.player.animations.play('run', 15, true);
    } else if (this.cursors.down.isDown && this.validMovement(this.player.body.x, this.player.body.y, 0, 1)) {
      this.state.moving = true;
      this.state.direction = 'down';
      this.state.next = this.player.body.y + this.state.step;
      this.player.body.velocity.y += this.state.velocity;
      this.player.animations.play('run', 15, true);

    } else if (this.cursors.left.isDown && this.validMovement(this.player.body.x, this.player.body.y, -1, 0)) {
      this.state.moving = true;
      this.state.direction = 'left';
      this.state.next = this.player.body.x - this.state.step;
      this.player.body.velocity.x -= this.state.velocity;
      this.player.scale.x = 1;
      this.player.animations.play('run', 15, true);

    } else if (this.cursors.right.isDown  && this.validMovement(this.player.body.x, this.player.body.y, 1, 0)) {
      this.state.moving = true;
      this.state.direction = 'right';
      this.state.next = this.player.body.x + this.state.step;
      this.player.body.velocity.x += this.state.velocity;
      this.player.scale.x = -1;
      this.player.animations.play('run', 15, true);

    } else {
      // TODO: Fix landing on non-first-frame
      // Setting TRUE should return to frame 1 when stopped
      this.player.animations.stop('run', true);
    }
  }
}