// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
  };
  
  Enemy.prototype.update = function(dt) {
    // On x-axis speed is 'dt' times.
    // here dt ensures that speed of the enemy is same on all computers
  
    this.x += this.speed * dt; // enemy speed on x-axis
    // if position of enemy is greater than 510 units then reset its position to -50 on x-axis
    if (this.x > 550) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 512);
      // Once position is reset to -50, give a start speed of 110 to enemies
      // and add a shuffle function which randomizes the enemies by multiple of 225
    }
  
    // If player touches enemies then activate collision detection function below
    if (
      player.x < this.x + 60 &&
      player.x + 37 > this.x &&
      player.y < this.y + 25 &&
      30 + player.y > this.y
    ) {
      player.x = 200;
      player.y = 380;
      // If player touches enemy then reset player's x & y position to initial value i.e. 202 and 405.
    }
  };
  
  // The method activates enemy and the game engine
  Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  
  var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/char-boy.png";
  };
  
  Player.prototype.update = function() {};
  
  // The method renders player in the game engine
  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  
  Player.prototype.handleInput = function(keyPress) {
    // if left key is pressed and position of player is not excedding zero then move player to left by 102
    if (keyPress == "left" && this.x > 0) {
      this.x = this.x - 102;
    }
  
    // if right key is pressed and position of player is not excedding rightmost border then move player to right by 102
    if (keyPress == "right" && this.x < 405) {
      this.x = this.x + 102;
    }
  
    // if up key is pressed and position of player is not excedding top border then move player up by 83
    if (keyPress == "up" && this.y > 0) {
      this.y = this.y - 83;
    }
  
    // if down key is pressed and position of player is not excedding top border then move player up by 83
    if (keyPress == "down" && this.y < 405) {
      this.y = this.y + 83;
    }
  
    // If player wins (i.e. destination water area)
    // Then after delay of 700 millisec player will reach initial position of 202, 405
    if (this.y < 0) {
      setTimeout(function() {
        player.x = 202;
        player.y = 405;
      }, 700);
    }
  };
  
  var allEnemies = [];
  var enemyLocation = [60, 140, 220];
  var player = new Player(200, 380, 50);
  var enemy;
  
  enemyLocation.forEach(function(locationY) {
    enemy = new Enemy(0, locationY, Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
  });
  
  var player = new Player(200, 380, 50);
  
  document.addEventListener("keyup", function(e) {
    var allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };
  
    player.handleInput(allowedKeys[e.keyCode]);
  });
  