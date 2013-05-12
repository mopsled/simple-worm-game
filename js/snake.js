// SnakeGame

var SnakeGame = function(canvas_id) {
	this.canvas = document.getElementById(canvas_id);
	this.context = this.canvas.getContext('2d');
	this.width = 600;
	this.height = 500;
	this.delay = 80;
	this.grid_size = 20;
	this.snake = new Snake(5, 10);
	this.food = new GrowFood(this.width / this.grid_size, this.height / this.grid_size);
	this.running = true;
}
SnakeGame.prototype.game_loop = function() {
    if (this.running) {
    	var _this = this;
    	setTimeout(function() { _this.game_loop() }, this.delay);
    }

    this.update_world();
    if (this.food.collided(this.snake)) {
		this.food.eaten(this);
		this.food = new GrowFood(this.width / this.grid_size, this.height / this.grid_size);
	}
	this.draw_world();
}
SnakeGame.prototype.update_world = function() {
	this.snake.move();
}
SnakeGame.prototype.draw_world = function () {
	this.draw_backgorund("#FFFFFF");
	this.draw_grid("#000000");
	this.snake.draw(this)
	this.food.draw(this)
}
SnakeGame.prototype.draw_backgorund = function(color) {
	this.canvas.height = this.canvas.height;
	this.canvas.width = this.canvas.width;
	this.context.fillStyle = color;
	this.context.fillRect(0, 0, this.width, this.height)
}
SnakeGame.prototype.draw_grid = function(color) {
	this.context.beginPath();
	this.context.moveTo(0, 0);
	this.context.lineTo(0, this.height);
	this.context.lineTo(this.width, this.height)
	this.context.lineTo(this.width, 0);
	this.context.lineTo(0, 0);
	this.context.strokeStyle = color;
	this.context.lineWidth = 2.0;
	this.context.closePath();
	this.context.stroke();
}
SnakeGame.prototype.key_hit = function(key) {
	// Change snake direction
	if (key.keyCode == 38) {
		this.snake.direction = Direction.UP;
	} else if (key.keyCode == 40) {
		this.snake.direction = Direction.DOWN;
	} else if (key.keyCode == 37) {
		this.snake.direction = Direction.LEFT;
	} else if (key.keyCode == 39) {
		this.snake.direction = Direction.RIGHT;
	}
}

// Snake
var Snake = function(begin_x, begin_y) {
	this.body = [{x: begin_x, y: begin_y}];
	this.growth_amount = 5;
	this.direction = Direction.RIGHT;
}
Snake.prototype.move = function() {
	var head = this.body[0];
	var next = {};
	if (this.direction == Direction.LEFT) {
		next = {x: head.x-1, y: head.y};
	} else if (this.direction == Direction.RIGHT) {
		next = {x: head.x+1, y: head.y};
	} else if (this.direction == Direction.UP) {
		next = {x: head.x, y: head.y-1};
	} else if (this.direction == Direction.DOWN) {
		next = {x: head.x, y: head.y+1};
	}
	this.body.pop();
	this.body.unshift(next);
}
Snake.prototype.grow = function() {
	var head = this.body[0];
	var next = {};
	if (this.direction == Direction.LEFT) {
		next = {x: head.x-1, y: head.y};
	} else if (this.direction == Direction.RIGHT) {
		next = {x: head.x+1, y: head.y};
	} else if (this.direction == Direction.UP) {
		next = {x: head.x, y: head.y-1};
	} else if (this.direction == Direction.DOWN) {
		next = {x: head.x, y: head.y+1};
	}
	this.body.unshift(next);
}
Snake.prototype.draw = function(game) {
	game.context.fillStyle = "#333333";
	for (var i = 0; i < this.body.length; i++) {
		snake_part = this.body[i];
		game.context.fillRect(snake_part.x * game.grid_size, snake_part.y * game.grid_size, game.grid_size, game.grid_size)
	}
}
Direction = {
	LEFT: 0,
	RIGHT: 1,
	UP: 2,
	DOWN: 3
}

// Food
var Food = function(max_x, max_y) {
	var random_x = Math.floor(Math.random() * max_x);
	var random_y = Math.floor(Math.random() * max_y);
	this.location = {x: random_x, y: random_y};
	this.color = "#123456";
}
Food.prototype.draw = function(game) {
	game.context.fillStyle = this.color;
	game.context.fillRect(this.location.x * game.grid_size, this.location.y * game.grid_size, game.grid_size, game.grid_size)
}
Food.prototype.collided = function(snake) {
	for (var i = 0; i < snake.body.length; i++) {
		snake_part = snake.body[i];
		if (this.location.x == snake_part.x && this.location.y == snake_part.y) {
			return true;
		}
	}
	return false;
}

// GrowFood
var GrowFood = function(max_x, max_y) {
	Food.call(this, max_x, max_y)
	this.color = "#12CF08";
}
GrowFood.prototype = new Food();
GrowFood.prototype.eaten = function(game) {
	game.snake.grow();
}

// Setup

function main() {
	var game = new SnakeGame("game");
	window.addEventListener('keydown', function(e) {
		game.key_hit(e);
	}, false);
	game.game_loop();
}

$(document).ready(function() {
	main();
});