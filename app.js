$(() => {
console.log('works');


//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

//	GLOBAL VARIABLES


// global player+cpu unit arrays are being cleared by NewRound so they don't show in console logs

		let cpuCastle = {
		life: 10,
		gold: 0,
		totalOffense: 0,
		totalDefense: 0
	};

	let playerCastle = {
		life: 10,
		gold: 30,
		totalOffense: 0,
		totalDefense: 0
	};


	let round = 1;
	let playerUnitArray = [];

	let cpuBoughtUnits = [];
	let cpuUnitArray = [];

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
			


			// check your logic! Begin addeding functions that remove destroyed units
			// push destroyed units into new array


			for (let i = 0; i < playerUnitArray.length; i++) {

			if (Math.random() <= this.accuracy) {
				playerUnitArray[0].defense -= this.attack;
				console.log('Your ' + playerUnitArray[0].name + ' was hit by a ' + this.name);
				if (playerUnitArray[0].defense > 0) {
						
						playerUnitArray[0].battle();
						console.log('Your ' + playerUnitArray[0].name + ' survives and strikes back!');
					}
					else if (playerUnitArray[0].defense <= 0) {
					playerUnitArray.shift();
					checkCpuRoundWin();
					console.log('Your ' + playerUnitArray[0].name + ' was defeated by a(n) ' + this.name + '. Stand your ground!');
					if (checkPlayerRoundWin() === false) {
						return playerUnitArray[0].battle();
					} 

				// if checkplayerround win = false, do another attack????

				//console.log('The ' + this.name + ' hit your ' + playerUnitArray[i].name + '.');
				//console.log(playerUnitArray[i].defense, ' remaining defense');

				}
			} else if (Math.random() > this.accuracy) {
				console.log('The ' + this.name + ' missed! Your unit unleashes a counterattack!');
				playerUnitArray[0].battle();
				
			}


// if attack >= defense, remove other div from dom and give reward
// if attack < defense, adjust targets defense if still alive after taking damage
			
			}
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
				
			for (let i = 0; i < cpuUnitArray.length; i++) {	
			if (Math.random() <= this.accuracy) {
				
				cpuUnitArray[0].defense -= this.attack;
				console.log('Your ' + this.name + ' hits the ' + cpuUnitArray[0].name + ".");
				if (cpuUnitArray[0].defense > 0) { // try i
					
					cpuUnitArray[0].battle();// changed from i
					console.log('The ' + cpuUnitArray[0].name, ' survives and strikes back!');
				}
				//console.log(cpuUnitArray[i].defense, ' remaining defense');
				else if (cpuUnitArray[0].defense <= 0) {
					
					cpuUnitArray.shift();
					checkPlayerRoundWin();
					console.log('Your ' + this.name + ' defeated a ' + cpuUnitArray[0].name + '.');
					if (checkPlayerRoundWin() === false) {
						playerUnitArray[0].battle();
					} 
					// if checkplayerround win = false, do another attack????

					//this.battle();//try 0 here // maybe shouldn't run here but instean in checkWin

					//this would be where you add gold for defeating enemy
					// check for round end (no enemies left)
					// tell this unit to attack again -> ? this.battle();
				}	
				//this line causing errors
				
			} else if (Math.random() > this.accuracy){
				console.log('The ' + this.name + ' missed! Your opponent unleashes a counterattack!');
				cpuUnitArray[0].battle(); // changed from i
				
			}
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
	}
//--------------------------------------------------------------------------------------------------------



	const checkCpuRoundWin = () => {
		playerCastle.life = 10;
		const playerLife = $('<div>').attr('id', 'playerLife');
		let lifeDamageToPlayer;

		if (playerUnitArray.length === 0) {
			for (let i = 0; i < cpuUnitArray.length; i++) {
			lifeDamageToPlayer += cpuUnitArray[i].offense; 
		}
		playerCastle.life -= lifeDamageToPlayer;
		playerLife.text(playerCastle.life - lifeDamageToPlayer);

		$('#round').append(playerLife);
					round++;
					console.log(playerCastle.life); // returning NaN
			gameObject.newRound();
			//gameObject.cpuBuyUnits();
			// gameObject.marketMaker();
			//return playerCastle.life -= lifeDamageToPlayer;
		} 
		else if (playerUnitArray.length > 0) {
			return false;
		}
	};

	const checkPlayerRoundWin = () => {
		cpuCastle.life = 10; // just testing to not get NaN
		const cpuLife = $('<div>').attr('id', 'computerLife');
		let lifeDamageToCpu;

		if (cpuUnitArray.length === 0){
			for (let i = 0; i < playerUnitArray.length; i++) {
			lifeDamageToCpu += playerUnitArray[i].offense;
			}
			cpuCastle.life -= lifeDamageToCpu;
			cpuLife.text(cpuCastle.life - lifeDamageToCpu);

			$('#gold').append(cpuLife);
		// append life div
			round++;
			console.log(cpuCastle.life);
			gameObject.newRound();
			//gameObject.cpuBuyUnits();
			// gameObject.marketMaker();
			//return cpuCastle.life -= lifeDamageToCpu;
		} else if (cpuUnitArray.length > 0) {
			return false;
		}
	};



//	UNITS - CPU OFFENSE

	const goblin = new CpuUnit('goblin', 1, 1, .5, 5);

	const orc = new CpuUnit('orc', 3, 4, .6, 20);

	const lich = new CpuUnit('lich', 5, 5, .7, 30);

// 	UNITS - CPU DEFENSE

	const zombie = new CpuUnit('zombie', 1, 3, .6, 5);

	const minion = new CpuUnit('minion', 2, 5, .7, 20);

	const medusa = new CpuUnit('medusa', 3, 10, .8, 30);


//	UNITS - PLAYER OFFENSE

	const soldier = new PlayerUnit('warrior', 1, 1, .5, 5);

	const knight = new PlayerUnit('mage', 3, 4, .6, 20);

	const wizard = new PlayerUnit('wizard', 5, 5, .7, 30);

//	UNITS - PLAYER DEFENSE

	const dwarf = new PlayerUnit('guard', 1, 3, .6, 5);

	const elephant = new PlayerUnit('druid', 2, 5, .7, 20);

	const ent = new PlayerUnit('knight', 3, 10, .8, 30);

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
// move to top


//--------------------------------------------------------------------------------------------------------

// GAME OBJECT

	const gameObject = {
		createGoodGuys () {
			// const promptAnswer = $('input').val();
			// const makeWarrior = $('<div/>').attr('id', 'knight');
		},
		newRound () {
			console.log('new round');
			
			// $('.good-guy').remove();
			$('.bad-guy').remove();
			$('#round').text('Round ' + round);
			switch (round) {
			case 1:
			cpuUnitArray = [];
			playerUnitArray = [];
			$('#gold').text('Gold: ' + playerCastle.gold);
			cpuCastle.gold = 30;
			playerCastle.gold = 30;
			gameObject.cpuBuyUnits();
			console.log('Round ' + round);
			break;
			case 2:
			$('#gold').text('Gold: ' + playerCastle.gold);
			cpuCastle.gold = 50;
			playerCastle.gold = 50;
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			break;
			case 3:
			$('#gold').text('Gold: ' + playerCastle.gold);
			cpuCastle.gold = 70;
			playerCastle.gold = 70;
			console.log('Round ' + round);
			//gameObject.cpuBuyUnits(); //added buy units
			break;
		}
		},
		
		appendCpuUnits (cpuBoughtUnits) {
			for (var i = 0; i < cpuBoughtUnits.length; i++) {
				if (cpuBoughtUnits[i] !== null) {
				switch (cpuBoughtUnits[i].name) {
					case "goblin":
					$("#battlefield").prepend($('<div id ="goblin" class="bad-guy"> </div>'));
					break;
					case "orc":
					$("#battlefield").prepend($('<div id ="orc" class="bad-guy"> </div>'));
					break;
					case "lich":
					$("#battlefield").prepend($('<div id ="lich" class="bad-guy"> </div>'));
					break;
						case "zombie":
					$("#battlefield").prepend($('<div id ="zombie" class="bad-guy"> </div>'));
					break;
					case "minion":
					$("#battlefield").prepend($('<div id ="minion" class="bad-guy"> </div>'));
					break;
					case "medusa":
					$("#battlefield").prepend($('<div id ="medusa" class="bad-guy"> </div>'));
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
			cpuBoughtUnits = [];
			const badGuyArray = [goblin, orc, lich, zombie, minion, medusa];
				while (cpuCastle.gold > 0 ) {
			//if (gameObject.randomNumber(badGuyArray) != null) {
				cpuBoughtUnits.push(gameObject.randomNumber(badGuyArray));
			//}
			// bug where random number returns undefined into array if unit can't be afforded
				}
				// console.log(cpuBoughtUnits);
			
				gameObject.appendCpuUnits(cpuBoughtUnits);
			
				
			} ,

		marketMaker (){
			const bigHeroDiv = $('<div id="modal"><div id="outer"><div class="inner"><button type="submit" id ="Warrior"> Warrior - 5 Gold  </button></div><div class="inner"><button type="submit" id ="Mage"> Mage - 20 Gold</button></div>   <div class="inner"><button id ="Wizard"> Wizard - 30 Gold</button></div>        <div class="inner"><button type="submit" id ="Guard"> Guard - 5 Gold</button></div><div class="inner"><button type="submit" id ="Druid"> Druid - 20 Gold</button></div>     <div class="inner"><button id ="Knight"> Knight - 3O Gold</button></div></div><br></div>');
			
			const exitShop = $('<button id ="exitShop">Exit Shop</button>');

			$('#battlefield').append(bigHeroDiv).append(exitShop);

			const merchant1 = $('#Warrior');// .on('click', );
			const merchant2 = $('#Mage');
			const merchant3 = $('#Wizard');
			const merchant4 = $('#Guard');
			const merchant5 = $('#Druid');
			const merchant6 = $('#Knight');

			merchant1.on('click', (e) => {
				console.log('Warrior clicked');
				if (playerCastle.gold < 5) {
					alert("You don't have enough gold to buy any warriors.");
				} else if (playerCastle.gold >= 5) {
					$('#gold').text('Gold: ' + (playerCastle.gold-= 5));
					$('#battlefield').append($('<div>').attr('id', 'knight').addClass('good-guy'));
					playerUnitArray.push(soldier);
				}
			});
			merchant2.on('click', (e) => {
				console.log('Mage clicked');
				if (playerCastle.gold < 20) {
					alert("You don't have enough gold to buy a mage.");
				} else if (playerCastle.gold >= 20) {
					$('#gold').text('Gold: ' + (playerCastle.gold-= 20));
					$('#battlefield').append($('<div>').attr('id', 'wizard').addClass('good-guy'));
					playerUnitArray.push(knight);
				}
			});
			merchant3.on('click', (e) => {
				console.log('Wizard clicked');
				if (playerCastle.gold < 30) {
					alert("You don't have enough gold to buy a wizard.");
				} else if (playerCastle.gold >= 30) {
					$('#gold').text('Gold: ' + (playerCastle.gold-= 30));
					$('#battlefield').append($('<div>').attr('id', 'mage').addClass('good-guy'));
					playerUnitArray.push(wizard);
				}

				
			});
			merchant4.on('click', (e) => {
				console.log('Guard clicked');
				if (playerCastle.gold < 5) {
					alert("You don't have enough gold to buy any guards.");
				} else if (playerCastle.gold >= 5) {
					$('#gold').text('Gold: ' + (playerCastle.gold-= 5));
					$('#battlefield').append($('<div>').attr('id', 'baby').addClass('good-guy'));
					playerUnitArray.push(dwarf);
				}
			});
			merchant5.on('click', (e) => {
				console.log('Druid clicked');
				if (playerCastle.gold < 20) {
					alert("You don't have enough gold to buy a druid.");
				} else if (playerCastle.gold >= 20) {
					$('#gold').text('Gold: ' + (playerCastle.gold-= 20));
					$('#battlefield').append($('<div>').attr('id', 'dwarf').addClass('good-guy'));
					playerUnitArray.push(elephant);
				}
			});
			merchant6.on('click', (e) => {
				console.log('Knight clicked');
				if (playerCastle.gold < 30) {
					alert("You don't have enough gold to buy a knight.");
				} else if (playerCastle.gold >= 30) {
					$('#gold').text('Gold: ' + (playerCastle.gold-= 30));
					$('#battlefield').append($('<div>').attr('id', 'hero').addClass('good-guy'));
					playerUnitArray.push(ent);
					console.log(playerUnitArray);
				}
			});
		
				$('#exitShop').on('click', (e) => {
					$('#outer').children().remove();
					$('#exitShop').remove();
					cpuUnitArray = cpuBoughtUnits.filter((n, i) => {
						return n != null;
					});

					console.log(cpuUnitArray);
					console.log(playerUnitArray);
					playerUnitArray[0].battle(); // what is this for? starting battle after market
					return cpuUnitArray;
			});
		},

				
			checkEndRound () {	
				// gameObject.marketMaker();
		// 		let playerBoughtUnits = [];
		// 		const goodGuyArray = [soldier, knight, wizard, dwarf, elephant, ent];
		// 		// let buttonValue = $(e.currentTarget).attr('id');
		// 		// let buttonValue2 = $('button').attr('id').val();
		// 		for (var i = 0; i < goodGuyArray.length; i++) {
		// 	if (goodGuyArray[i].name === '') {
		// 		$('#battlefield').append($('<div id ="hero">'));
		// 	}
		// }
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








$('#market').on('click', (e) => { 
	const input = $('button').val();
	$('button').remove();
	console.log('button works');
	gameObject.marketMaker();



});

gameObject.newRound();

});