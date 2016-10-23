// Define Game function for intro and outro
var Game = function() {
    this.gameOn = false;
};

// Game instantiate with enemy array allEnemies and a player with 3 lives
Game.prototype.start = function() {
    allEnemies = [];
    for (var i = 0; i < 4; i++) {
        var enemy = new Enemy(-i * 100, 83 * i + 62);
        allEnemies.push(enemy);
    }

    player = new Player(202, 404);
    score = 0;
    lives = 3;
    // timer = 60;
    // document.getElementById('timer').innerHTML = timer;
    document.getElementById('lives').innerHTML = lives;
    document.getElementById('score').innerHTML = score;
    document.getElementById('body').style.backgroundColor = "lightblue";
    document.getElementById('body').style.color = "black";
    this.gameOn = true;
};

// Handle intro and outro spacebar inputs
Game.prototype.handleInput = function(key) {
    switch (key) {
        case 'spacebar':
            if (!game.gameOn) {
                game.start();
            }

            if (game.gameOn && lives === 0) {
                game.start();
            }
    }
};

// Game.prototype.timer = function() {

// };

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.rate = 100 + Math.floor(Math.random() * 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.rate);
    if (this.x > 505) {
        this.x = -100;
    }
};

// Increase speend of enemies for every 5 points in score
// Also change background color to let users know
Enemy.prototype.increaseRate = function() {
    if (score >= 5 && this.rate < 200) {
        this.rate += 30;
        document.getElementById('body').style.backgroundColor = "#cfe2e2";
    }
    if (score >= 10 && this.rate < 230) {
        this.rate += 30;
        document.getElementById('body').style.backgroundColor = "#9fc6c6";

    }
    if (score >= 15 && this.rate < 260) {
        this.rate += 30;
        document.getElementById('body').style.backgroundColor = " #70a9a9";

    }
    if (score >= 20 && this.rate < 290) {
        this.rate += 30;
        document.getElementById('body').style.backgroundColor = "#4d8080";
        document.getElementById('body').style.color = "white";

    }
    if (score >= 25 && this.rate < 320) {
        this.rate += 30;
        document.getElementById('body').style.backgroundColor = "DarkSlateGray";
        document.getElementById('body').style.color = "white";

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Update score of the player    
Player.prototype.update = function() {
    this.score();
};

// Handle the keyboard inputs
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y < 404) {
                this.y += 83;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }
    }
};

// Score Update
Player.prototype.score = function() {
    if (this.y < 0) {
        this.x = 202;
        this.y = 404;
        score++;
        document.getElementById('score').innerHTML = score;
    }
};

// Reduce player lives
Player.prototype.reset = function() {
    if (lives > 0) {
        lives--;
        document.getElementById('lives').innerHTML = lives;
    }
    this.x = 202;
    this.y = 404;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys;
    if (!game.gameOn || (game.gameOn && lives === 0)) {
        allowedKeys = {
            32: 'spacebar'
        };
        game.handleInput(allowedKeys[e.keyCode]);
    } else allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        87: 'up', //W
        65: 'left', //A
        83: 'down', //S
        68: 'right' //D
    };
    player.handleInput(allowedKeys[e.keyCode]);
    if (e.keyCode in allowedKeys) {
        e.preventDefault();
    }
});