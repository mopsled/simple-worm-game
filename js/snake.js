var Snake = function(begin_x, begin_y) {
	this.body = [{x: begin_x, y: begin_y}];
	this.growth_amount = 5;
	this.direction = Direction.NONE;

	this.movedThisTurn = false;
	this.cachedMove = null;
}
Snake.prototype.move = function() {
	if (this.direction != Direction.NONE) {
		var next = this.next_position();
		this.body.pop();
		this.body.unshift(next);
		this.movedThisTurn = false;
		if (this.cachedMove != null) {
			this.direction = this.cachedMove;
			this.cachedMove = null;
			this.movedThisTurn = true;
		}
	}
}
Snake.prototype.grow = function() {
	var last = this.body[this.body.length - 1];
	var next = {x:last.x, y:last.y}
	this.body.push(next);
}
Snake.prototype.collided = function(game) {
	var head = this.body[0];
	if (head.x < 0 || head.y < 0 || head.x > ((game.width / game.grid_size) - 1) || head.y > (game.height / game.grid_size) - 1) {
		return true;
	}
	for (var i = 1; i < this.body.length; i++) {
		var snake_part = this.body[i];
		if (head.x == snake_part.x && head.y == snake_part.y) {
			return true;
		}
	}
	return false;
}
Snake.prototype.next_position = function() {
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
	return next;
}
Snake.prototype.draw = function(game) {
	game.context.fillStyle = "#333333";
	for (var i = 0; i < this.body.length; i++) {
		snake_part = this.body[i];
		game.context.fillRect(snake_part.x * game.grid_size, snake_part.y * game.grid_size, game.grid_size, game.grid_size)
	}
}
Snake.prototype.apply_direction = function(new_direction) {
	if (!Direction.are_opposite(this.direction, new_direction)) {
		if (this.movedThisTurn) {
			this.cachedMove = new_direction;
		} else {
			this.direction = new_direction;
			this.movedThisTurn = true;
		}
	}
}
Direction = {
	LEFT: -1,
	RIGHT: 1,
	UP: -2,
	DOWN: 2,
	NONE: 0,
	are_opposite: function(a, b) {
		return (a == -b);
	}
}