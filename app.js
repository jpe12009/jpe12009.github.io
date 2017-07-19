$(() => {
console.log('works');


//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

//	GLOBAL VARIABLES

	let round = 1;

//--------------------------------------------------------------------------------------------------------

//	COMPUTER AND PLAYER CLASSES

	class CpuUnit {
		constructor (name, attack, defense, accuracy, reward) {
			this.name = name;
			this.attack = attack;
			this.defense = defense;
			this.accuracy = accuracy;
			this.reward = reward;
		}
		battle () {


// math.random to check for hit - spacebattle

// return true so other object knows if itself was hit

// if attack >= defense, remove other div from dom and give reward
// if attack < defense, adjust targets defense if still alive after taking damage
		}
	}

	class PlayerUnit {
		constructor (name, attack, defense, accuracy, cost) {
			this.name = name;
			this.attack = attack;
			this.defense = defense;
			this.accuracy = accuracy;
			this.cost = cost; 
		}
		battle () {
		// 	console.log('The aliens shoot back!');
		// if (Math.random() < this.accuracy) {
		// 	USS_Schwarzenegger.hull -= this.firepower;
		// 	if (USS_Schwarzenegger.hull <= 0) {
		// 		alert('Your spaceship blew up. You lose.');
		// 		throw new Error();
		// 	}
		// alert('You were hit! Your hull is ' + USS_Schwarzenegger.hull + ' out of 20.');
		// 	USS_Schwarzenegger.attack();
				
		// } else {
		// 	alert('The alien ship missed you!');
		// 	USS_Schwarzenegger.attack();
		// }
		}
	}
//--------------------------------------------------------------------------------------------------------

//	UNITS - CPU OFFENSE

	const goblin = new CpuUnit('goblin', 1, 1, .5, 5);

	const orc = new CpuUnit('orc', 3, 4, .6, 20);

	const lich = new CpuUnit('lich', 5, 5, .7, 30);

// 	UNITS - CPU DEFENSE

	const zombie = new CpuUnit('zombie', 1, 3, .6, 5);

	const minion = new CpuUnit('minion', 2, 5, .7, 20);

	const medusa = new CpuUnit('medusa', 3, 10, .8, 30);


//	UNITS - PLAYER OFFENSE

	const soldier = new PlayerUnit('soldier', 1, 1, .5, 5);

	const knight = new PlayerUnit('knight', 3, 4, .6, 20);

	const wizard = new PlayerUnit('wizard', 5, 5, .7, 30);

//	UNITS - PLAYER DEFENSE

	const dwarf = new PlayerUnit('dwarf', 1, 3, .6, 5);

	const elephant = new PlayerUnit('elephant', 2, 5, .7, 20);

	const ent = new PlayerUnit('ent', 3, 10, .8, 30);

// let imgHeight = 400;
// let numImgs = 12;
// let cont = 0;
// let img = $('#container').find('png');
 
// let animation = setInterval( moveSprite,100);
 
// function moveSprite(){
//     img.css('margin-top', -1 * (cont*imgHeight));
     
//     cont++;
//     if(cont == numImgs){
//         clearInterval(animation);
//     }
// }
// moveSprite();

//--------------------------------------------------------------------------------------------------------

// COMPUTER AND PLAYER OBJECTS

	const cpuCastle = {
		life: 10,
		gold: 0,
		totalOffense: 0,
		totalDefense: 0
	};

	const playerCastle = {
		life: 10,
		gold: 20,
		totalOffense: 0,
		totalDefense: 0
	};

//--------------------------------------------------------------------------------------------------------

// GAME OBJECT

	const gameObject = {
		createGoodGuys () {
			// const promptAnswer = $('input').val();
			// const makeWarrior = $('<div/>').attr('id', 'knight');
		},
		newRound () {
			$('.good-guy').remove();
			$('.bad-guy').remove();
			$('#round').text('Round ' + round);
			switch (round) {
			case 1:
			$('#gold').text('Gold: ' + playerCastle.gold);
			cpuCastle.gold = 30;
			break;
			case 2:
			$('#gold').text('Gold: ' + playerCastle.gold);
			cpuCastle.gold = 50;
			break;
			case 3:
			$('#gold').text('Gold: ' + playerCastle.gold);
			cpuCastle.gold = 70;
			break;
		}
		},
		
		appendCpuUnits (cpuBoughtUnits) {
			for (var i = 0; i < cpuBoughtUnits.length; i++) {
				if (cpuBoughtUnits[i] !== null) {
				switch (cpuBoughtUnits[i].name) {
					case "goblin":
					$("#battlefield").append($('<div id ="goblin"> </div>'));
					break;
					case "orc":
					$("#battlefield").append($('<div id ="orc"> </div>'));
					break;
					case "lich":
					$("#battlefield").append($('<div id ="lich"> </div>'));
					break;
						case "zombie":
					$("#battlefield").append($('<div id ="zombie"> </div>'));
					break;
					case "minion":
					$("#battlefield").append($('<div id ="minion"> </div>'));
					break;
					case "medusa":
					$("#battlefield").append($('<div id ="medusa"> </div>'));
					break;
				}
				}	
			}

		},
		randomNumber (badGuy) {
			const randomNum = Math.floor(Math.random() * 6) + 1;

		if (randomNum === 1 && cpuCastle.gold >= badGuy[0].reward) {
			cpuCastle.gold -= badGuy[0].reward;
			return badGuy[0];

		} else if (randomNum === 2 && cpuCastle.gold >= badGuy[1].reward){
			cpuCastle.gold -= badGuy[1].reward;
			return badGuy[1];

		} else if (randomNum === 3 && cpuCastle.gold >= badGuy[2].reward){
			cpuCastle.gold -= badGuy[2].reward;	
			return badGuy[2];
		
		} else if (randomNum === 4 && cpuCastle.gold >= badGuy[3].reward){	
			cpuCastle.gold -= badGuy[3].reward;	
			return badGuy[3];

		} else if (randomNum === 5 && cpuCastle.gold >= badGuy[4].reward){	
			cpuCastle.gold -= badGuy[4].reward;
			return badGuy[4];

		} else if (randomNum === 6 && cpuCastle.gold >= badGuy[5].reward){	
			cpuCastle.gold -= badGuy[5].reward;
			return badGuy[5];
		
		} else {
			return null;
		}
	},
	// makes an array that has different units that can be randomly bought 
// cycles through until until cpu gold = 0;
		cpuBuyUnits () {
			let cpuBoughtUnits = [];
			const badGuyArray = [goblin, orc, lich, zombie, minion, medusa];
				while (cpuCastle.gold > 0 ) {
			//if (gameObject.randomNumber(badGuyArray) != null) {
				cpuBoughtUnits.push(gameObject.randomNumber(badGuyArray));
			//}
			// bug where random number returns undefined into array if unit can't be afforded
				}
				console.log(cpuBoughtUnits);
				console.log(cpuCastle.gold);
			
				gameObject.appendCpuUnits(cpuBoughtUnits);
			
				
			} ,

		marketMaker (){

			for (let i = 0; i < 6; i++) {
		const merchant = $('<div/>').attr('id', i);
			}
		},


			playerBuyUnits (e) {	
				
				let playerBoughtUnits = [];
				const goodGuyArray = [soldier, knight, wizard, dwarf, elephant, ent];
				// let buttonValue = $(e.currentTarget).attr('id');
				// let buttonValue2 = $('button').attr('id').val();
				for (var i = 0; i < goodGuyArray.length; i++) {
			if (goodGuyArray[i].name === '') {
				$('#battlefield').append($('<div id ="hero">'));
			}
		}
			// console.log(buttonValue);
				}
		};

// div loop make the six buying divs, assign id's

// on click run a function that checks gold and if enough, run append function,
// otherwise alert you don't have enough and return to buying screen.
// button that starts next round

// at the beginning of each round cpu gets a certain amount of gold
// it randomly buys what it can until nothing else can be bought
// different buttons at the start of the round you can click to buy units
// units are placed onto battlefield

//player clicks a bunch until no more units remain.

// who would you like to attack with? 
// who would you like to attack?
// go until no more units -- end of round
// give rewards and begin buying portion
// different buttons at the end of round you can click to buy units



// $('#knight').sprite({fps: 12, no_of_frames: 20});




$('button').on('click', (e) => { 
	const input = $('button').val();
	
	console.log('button works');
	gameObject.playerBuyUnits();


});

gameObject.newRound();
gameObject.cpuBuyUnits();

});