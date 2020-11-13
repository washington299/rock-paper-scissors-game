const rules_button = document.querySelector('.rules');
const score_value = document.querySelector('.header__value');

const rules_modal = document.querySelector('.modal');
const modal_close_button = document.querySelector('.modal__close');

const circle = document.querySelectorAll('.game__circle');
const symbol_area = document.querySelectorAll('.game__symbol-area');

const symbols_picked = document.querySelector('.symbols-picked');
const user_symbol_picked = document.querySelector('.symbols-picked--user');
const computer_symbol_picked = document.querySelector('.symbols-picked--computer');
const result = document.querySelector('.symbols-picked__result');
const winner_msg = document.querySelector('.symbols-picked__message');
const play_again_button = document.querySelector('.symbols-picked__button');

const loading_text = document.querySelector('.load');

let score;

(function () {
	if (!localStorage.getItem('score')) {
		score = 0;
	} else {
		score = parseInt(localStorage.getItem('score'));
	}
	score_value.textContent = score;
})();

const symbols_color = {
	paper: {
		gradient1: 'hsl(230, 89%, 62%)',
		gradient2: 'hsl(230, 89%, 65%)',
	},
	scissors: {
		gradient1: 'hsl(39, 89%, 49%)',
		gradient2: 'hsl(40, 84%, 53%)',
	},
	rock: {
		gradient1: 'hsl(349, 71%, 52%)',
		gradient2: 'hsl(349, 70%, 56%)',
	},
};

const symbols_path = {
	rock: './assets/images/icon-rock.svg',
	paper: './assets/images/icon-paper.svg',
	scissors: './assets/images/icon-scissors.svg',
};

function toggleRulesModal() {
	if (this === rules_button) {
		rules_modal.style.display = 'flex';
	} else {
		rules_modal.style.display = 'none';
	}
};

function playAgain() {
	window.location.href = 'index.html';
}

function computerResult(gradient1, gradient2, symbol_area) {
	computer_symbol_picked.style.background = `linear-gradient(${gradient1}, ${gradient2})`;
	computer_symbol_picked.children[0].style.backgroundColor = '#FFF';
	computer_symbol_picked.children[0].appendChild(symbol_area.children[0]);

	loading_text.style.display = 'none';
	result.style.display = 'flex';
	symbols_picked.style.maxWidth = '800px';
}

function computerRandomChoice() {
	const options = ['rock', 'paper', 'scissors'];
	const randomNumber = Math.floor(Math.random() * 3);

	if (options[randomNumber] === 'rock') {
		computerResult(symbols_color.rock.gradient1, symbols_color.rock.gradient2, symbol_area[2]);
	} else if (options[randomNumber] === 'paper') {
		computerResult(symbols_color.paper.gradient1, symbols_color.paper.gradient2, symbol_area[0]);
	} else if (options[randomNumber] === 'scissors') {
		computerResult(symbols_color.scissors.gradient1, symbols_color.scissors.gradient2, symbol_area[1]);
	}

	return options[randomNumber];
}

function createSymbolElement(symbol, symbolPath) {
	const img = document.createElement('img');

	img.setAttribute('src', symbolPath);
	img.setAttribute('alt', `${symbol} symbol`);

	return img;
}

function verifyWinner(user_choice, computer_choice) {
	if (
		user_choice === 'rock' && computer_choice === 'paper' ||
		user_choice === 'paper' && computer_choice === 'scissors' ||
		user_choice === 'scissors' && computer_choice === 'rock'
	) {
		winner_msg.textContent = 'YOU LOSE';
		if (score !== 0) {
			score -= 1;
			localStorage.setItem('score', score);
		}
		score_value.textContent = score;
		return;
	}

	if (
		user_choice === 'rock' && computer_choice === 'rock' ||
		user_choice === 'paper' && computer_choice === 'paper' ||
		user_choice === 'scissors' && computer_choice === 'scissors'
	) {
		winner_msg.textContent = 'DRAW';
		return;
	}

	if (
		user_choice === 'rock' && computer_choice === 'scissors' ||
		user_choice === 'paper' && computer_choice === 'rock' ||
		user_choice === 'scissors' && computer_choice === 'paper'
	) {
		score += 1;
		localStorage.setItem('score', score);
		winner_msg.textContent = 'YOU WIN';
		score_value.textContent = score;
		return;
	}
}

function getUserSymbol(user_choice) {
	let symbol_image;

	switch (user_choice) {
		case 'rock':
			symbol_image = createSymbolElement('Rock', symbols_path.rock);
			break;
		case 'paper':
			symbol_image = createSymbolElement('Paper', symbols_path.paper);
			break;
		case 'scissors':
			symbol_image = createSymbolElement('Scissors', symbols_path.scissors);
			break;
	};

	document.querySelector('.game').classList.add('hidden');
	symbols_picked.style.display = 'flex';
	user_symbol_picked.style.background = `linear-gradient(${symbols_color[user_choice].gradient1}, ${symbols_color[user_choice].gradient2})`;
	user_symbol_picked.children[0].appendChild(symbol_image);
	computer_symbol_picked.children[0].style.backgroundColor = 'hsl(237, 49%, 15%)';
	loading_text.style.display = 'block';

	setTimeout(() => {
		const computer_choice = computerRandomChoice();
		verifyWinner(user_choice, computer_choice);
	}, 2000);
}

rules_button.addEventListener('click', toggleRulesModal);
modal_close_button.addEventListener('click', toggleRulesModal);
play_again_button.addEventListener('click', playAgain);
