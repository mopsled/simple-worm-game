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