var pos = 0;
const pacArray = [
	['images/pacman1', 'images/pacman2'],
	['images/pacman3', 'images/pacman4']
];
var direction = 0;
const pacMen = [];

function setToRandom(scale) {
	return {
		x: Math.random() * scale,
		y: Math.random() * scale
	}
}
// Factory to make a PacMan 
function makePac() {
	// returns an object with values scaled {x: 33, y: 21}
	let velocity = setToRandom(10);
	let position = setToRandom(200);
	// Add image to div id = game
	let game = document.getElementById('game');
	let newimg = document.createElement('img');
	newimg.style.position = 'absolute';
	newimg.src = 'images/pacman1';
	newimg.width = 100;
	newimg.style.left = position.x;
	newimg.style.top = position.y;
	game.appendChild(newimg);
	let sequence = 0;
	// new style of creating an object
	return {
		position,
		velocity,
		newimg,
		sequence
	}
}

function update() {
	//loop over pacmen array and move each one and move image in DOM
	pacMen.forEach((item) => {
		checkCollisions(item)
		item.position.x += item.velocity.x;
		item.position.y += item.velocity.y;

		item.newimg.style.left = item.position.x;
		item.newimg.style.top = item.position.y;
		
		item.sequence = (item.sequence + 1) % 2;

		if (item.velocity.x >= 0) {
			item.newimg.src = pacArray[0][item.sequence];
		} else {
			item.newimg.src = pacArray[1][item.sequence];
		}
	})
	setTimeout(update, 20);
}

function checkCollisions(item) {
	if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
		item.position.x + item.velocity.x < 0) item.velocity.x = -item.velocity.x;
	if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
		item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
}

function makeOne() {
	pacMen.push(makePac()); // add a new PacMan
}