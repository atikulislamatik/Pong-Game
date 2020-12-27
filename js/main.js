var player,
    computer,
    ball;
var paddles;
var computerPos;
var scoreText;

const canvasDimensions = [600, 400];
const RAD2DEG = 180 / Math.PI;
const DEG2RAD = Math.PI / 180;

function rand(a, b) {
    return (a + Math.random() * (b - a));
}

function setup() {
    createCanvas(canvasDimensions[0], canvasDimensions[1]);
    background(20);

    fill(255);
    textAlign(RIGHT);

    paddles = new Group();

    player = createSprite(5, height / 2, 5, 50);
    player.shapeColor = 'white';
    paddles.add(player);

    computer = createSprite(width - 5, height / 2, 5, 50);
    computer.shapeColor = 'white';
    paddles.add(computer);

    ball = createSprite(width / 2, height / 2, 12, 12);
    ball.shapeColor = 'tomato';

    computerPos = Array.apply(null, Array(10)).map(Number.prototype.valueOf, height / 2);
    score = [0,0];

    ball.setSpeed(2, rand(-10, 10));
}

function draw() {
    background(20);
    drawSprites();

    player.position.y = Math.max(0, Math.min(height, mouseY));

    computerPos.push(ball.position.y);
    computer.position.y = computerPos.shift();

    if (ball.position.y < 4 || ball.position.y > height - 4) {
        ball.velocity.y *= -1;
    }

    if (ball.position.x < 4) {
        score[1]++;
        ball.position.x = width/2;
        ball.position.y = height/2;
        ball.setSpeed(2, rand(170,190));
    }
    else if (ball.position.x > width - 4) {
        score[0]++;
        ball.position.x = width/2;
        ball.position.y = height/2;
        ball.setSpeed(2, rand(-10,10));
    }

    ball.overlap(paddles, function(ball, paddle) {
        ball.velocity.x *= -1.01;
        ball.velocity.y += (ball.position.y - paddle.position.y) / 20;
    });

    scoreText = score[0] + " – " + score[1];
    text(scoreText, width/2, 20);
}
