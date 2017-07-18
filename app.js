$(() => {
console.log('works');

let score = 0;
let time = 30;
let round = 1;
let name = '';
let lives = 3;





$('#submit-name').on('click', (e) => {
	name = $('input').val();
	$(e.currentTarget).parent().css('display', 'none');

	welcome();
});

	const welcome = () => {
		const welcomeDiv = $('<div/>');
		welcomeDiv.text('Welcome ' + name + '! Prepare to text your reflexes in Zip Ghosts!');

		$('header').append(welcomeDiv);
	};




	const createGhosts = (num) => {
		for (let i = 0; i < num; i++) {
			const square = $('<div/>').on('click', (e) => {
	// pass to check function
			const color = $(e.currentTarget).css('background-color');
			colorCheck(color);
				console.log(color, typeof color);

			});		

			randomColors(square);
			$('.squares').append(square);


		}
	};

	const randomColors = (square) => {
		const randomNum = Math.floor(Math.random() * 10) + 1;

		switch (randomNum) {
			case 1:
			square.css('background-color', 'red');
			break;
			case 2:
			square.css('background-color', 'blue');
			break;
			case 3:
			square.css('background-color', 'green');
			break;
			case 4:
			square.css('background-color', 'yellow');
			break;
			case 5:
			square.css('background-color', 'purple');
			break;
			case 6:
			square.css('background-color', 'teal');
			break;
			case 7:
			square.css('background-color', 'lime');
			break;
			case 8:
			square.css('background-color', 'black');
			break;
			case 9:
			square.css('background-color', 'grey');
			break;
			case 10:
			square.css('background-color', 'white');
			break;
		}  
		
	};	

const colorCheck = (squareColor) => {
	const colors = squareColor.substr(4, squareColor.length -1).split(" ");
	const colorVal1 = parseInt(colors[0]);
	const colorVal2 = parseInt(colors[1]);
	const colorVal3 = parseInt(colors[2]); 


};





const currentScore = () => {
	$('h1').text('Score:  ' + score);
};


const countdown = (() => {

	const timer = setInterval(() => {
		// where we want to decrease the time and update the timer on the dom
		time--;
		if(time === 0) {
			clearInterval(timer);
			round++;
		}
		$('#timer').text('timer: ' + time + 's');
	}, 1000);
});


	const newRound = () => {
		$('.squares').empty();
		$('#round').text('round: ' + round);
		switch (round) {
			case 1:
			createGhosts(10);
			time = 5;	
			break;
			case 2:
			createGhosts(20);
			time = 10;	
			break;
			case 3:
			createGhosts(30);
			time = 15;	
			break;
			case 4:
			createGhosts(40);
			time = 20;	
			break;
			case 5:
			createGhosts(50);
			time = 25;	
			break;
			case 6:
			createGhosts(60);
			time = 30;	
			break;
			case 7:
			createGhosts(70);
			time = 35;	
			break;
			case 8:
			createGhosts(80);
			time = 40;	
			break;
			case 9:
			createGhosts(90);
			time = 45;	
			break;
			case 10:
			createGhosts(100);
			time = 50;	
			break;
		}
	};


$('#start-game').on('click', (e) => {
	console.log('works');
	newRound();
	countdown();
});


});