$(() => {

//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

//	GLOBAL VARIABLES

		let cpuCastle = {
		life: 40,
		gold: 0
	};

	let playerCastle = {
		life: 40,
		gold: 30
	};


	let round = 1;
	let playerUnitArray = [];

	let cpuBoughtUnits = [];
	let cpuUnitArray = [];

	let defeatedEnemies = [];
	let defeatedHeros = [];

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
	
			
			// push destroyed units into new array


			if (Math.random() <= this.accuracy) {
				playerUnitArray[0].defense -= this.attack;
				$('#battle-message').html('Your ' + playerUnitArray[0].name + ' was hit by a ' + this.name + ' for ' + cpuUnitArray[0].attack + ' points of damage.');
				console.log('Your ' + playerUnitArray[0].name + ' was hit by a ' + this.name + '. It has ' + this.defense + ' defense remaining.');
				if (playerUnitArray[0].defense > 0) {
						
					
						$('#battle-message').html('Your ' + playerUnitArray[0].name + ' survives with ' + playerUnitArray[0].defense + ' defense left and strikes back!');
						console.log('Your ' + playerUnitArray[0].name + ' survives and strikes back!');
						$('#battle').remove();
						gameObject.createBattleButton();
					}
					else if (playerUnitArray[0].defense <= 0) {
						$('#battle-message').html('Your ' + playerUnitArray[0].name + ' suffer ' + cpuUnitArray[0].attack + ' points of damage and is defeated by the ' + this.name + '. Stand your ground!');
						console.log('Your ' + playerUnitArray[0].name + ' was defeated by a(n) ' + this.name + '. Stand your ground!');
					defeatedHeros.push(playerUnitArray[0]);
					$('#battle-message').html('Your ' + playerUnitArray[0].name + ' suffer ' + cpuUnitArray[0].attack + ' points of damage and is defeated by the ' + this.name + '. Stand your ground!');
					gameObject.removeFromPlayerBattlefield();
					defeatedHeros.pop();
					playerUnitArray.shift();
					checkCpuRoundWin();
					
				}
			} else if (Math.random() > this.accuracy) {
				$('#battle-message').html('The ' + this.name + ' missed! Your unit unleashes a counterattack!');
				console.log('The ' + this.name + ' missed! Your unit unleashes a counterattack!');
				$('#battle').remove();
				gameObject.createBattleButton();
				
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
				
		
					
			if (Math.random() <= this.accuracy) {
								
				cpuUnitArray[0].defense -= this.attack;
				$('#battle-message').html('Your ' + this.name + ' hits the ' + cpuUnitArray[0].name + ".");
				console.log('Your ' + this.name + ' hits the ' + cpuUnitArray[0].name + ".");
				if (cpuUnitArray[0].defense > 0) { 
					
				
					$('#battle-message').html('The ' + cpuUnitArray[0].name + ' takes ' + playerUnitArray[0].attack + ' points of damage and strikes back!');
					console.log('The ' + cpuUnitArray[0].name + ' survives and strikes back!');
					$('#battle').remove();
					gameObject.createBattleButtonCpu();
				}

				else if (cpuUnitArray[0].defense <= 0) {
					defeatedEnemies.push(cpuUnitArray[0]);
					$('#battle-message').html('Your ' + this.name + ' strikes the ' + cpuUnitArray[0].name + ' for ' + playerUnitArray[0].attack + ' points of damage and destroys it.');

					gameObject.removeFromCpuBattlefield();
					defeatedEnemies.pop();
					$('#battle-message').html('Your ' + this.name + ' strikes the ' + cpuUnitArray[0].name + ' for ' + playerUnitArray[0].attack + ' points of damage and destroys it.');
					console.log('Your ' + this.name + ' defeated the ' + cpuUnitArray[0].name + '.');
					cpuUnitArray.shift();
					checkPlayerRoundWin();
					
		
				}	
				
				
			} else if (Math.random() > this.accuracy){
				$('#battle-message').html('Your ' + this.name + ' missed! Your opponent unleashes a counterattack!');
				console.log('The ' + this.name + ' missed! Your opponent unleashes a counterattack!');
			
				$('#battle').remove();
				gameObject.createBattleButtonCpu();
				
			}

		}
	}
//--------------------------------------------------------------------------------------------------------



	const checkCpuRoundWin = () => {
		
		const playerLife = $('#playerLife');
		
		let lifeDamageToPlayer = 0;

		console.log(cpuUnitArray);

		if (playerUnitArray.length === 0) {
			for (let i = 0; i < cpuUnitArray.length; i++) {
			lifeDamageToPlayer += cpuUnitArray[i].attack; 
		}
		playerCastle.life -= lifeDamageToPlayer;
		playerLife.text(playerCastle.life);
	
		if (playerCastle.life <= 0) {
			return gameObject.checkGameWin();
		}
	
					
$('#battle-message').html('You lost the round. The remaining enemy forces deal a combined ' + lifeDamageToPlayer + ' damage to your castle. All units are cleared from the field. The next wave of enemies is gathering for battle! Purchase some units and prepare yourself for the next attack.');
					console.log(playerCastle.life, 'player life'); 
		
			if (playerCastle.life > 0) {
				round++;
			gameObject.newRound();
		}

		} 
		else if (playerUnitArray.length > 0) {
			$('#battle').remove();
			gameObject.createBattleButtonCpu();
		}
	};

	const checkPlayerRoundWin = () => {
		
		const cpuLife = $('#computerLife');
	

		let lifeDamageToCpu = 0;

		console.log(playerUnitArray);

		if (cpuUnitArray.length === 0){
			for (let i = 0; i < playerUnitArray.length; i++) {
				lifeDamageToCpu += playerUnitArray[i].attack;
			}
			cpuCastle.life -= lifeDamageToCpu;
			cpuLife.text(cpuCastle.life);

			if (cpuCastle.life <= 0) {
				return gameObject.checkGameWin();
			}
	
			$('#battle-message').html("You won the round! Your remaining units' combined attack stat deals " + lifeDamageToCpu + " damage to the enemy's castle. All units are cleared from the field. The next wave of enemies is gathering for battle! Purchase some units and prepare yourself for the next attack.");
			console.log(cpuCastle.life, 'cpu life');
			if (cpuCastle.life > 0) 	{
				round++;
				gameObject.newRound();
			}
			
		} else if (cpuUnitArray.length > 0) {
			$('#battle').remove();
			gameObject.createBattleButton();
		}
	};



//	UNITS - CPU OFFENSE

	const goblin = new CpuUnit('goblin', 2, 1, .5, 5);

	const orc = new CpuUnit('orc', 3, 4, .6, 20);

	const lich = new CpuUnit('lich', 5, 5, .5, 30);

// 	UNITS - CPU DEFENSE

	const zombie = new CpuUnit('zombie', 1, 3, .6, 5);

	const minion = new CpuUnit('minion', 2, 6, .7, 20);

	const medusa = new CpuUnit('medusa', 3, 8, .8, 30);


//	UNITS - PLAYER OFFENSE

	const soldier = new PlayerUnit('warrior', 2, 1, .5, 5);

	const knight = new PlayerUnit('mage', 3, 4, .6, 20);

	const wizard = new PlayerUnit('wizard', 5, 5, .5, 30);

//	UNITS - PLAYER DEFENSE

	const dwarf = new PlayerUnit('guard', 1, 3, .6, 5);

	const elephant = new PlayerUnit('druid', 2, 6, .7, 20);

	const ent = new PlayerUnit('knight', 3, 8, .8, 30);

//--------------------------------------------------------------------------------------------------------

// GAME OBJECT

	const gameObject = {
		
		newRound () {
		
			console.log('new round');
			$('#battle').remove();
			$('#modal').remove();
			$('#round').text('Round ' + round);

			switch (round) {
			case 1:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);

			playerCastle.gold = 30;
			cpuCastle.gold = 30;
			$('#gold').text('Gold: ' + playerCastle.gold);
			$('#playerLife').text('Player life: ' + playerCastle.life);
			$('#computerLife').text('CPU life: ' + cpuCastle.life);
			gameObject.cpuBuyUnits();
			console.log('Round ' + round);
			$('#battle-message').html('The enemy castle is gathering its forces. Click on "Market" to start building your army.');
			break;


			case 2:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
			$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];



			cpuCastle.gold = 50;
			playerCastle.gold += 40;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();

			break;


			case 3:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
			$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold = 70;
			playerCastle.gold += 50;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 4:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
					$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold = 90;
			playerCastle.gold += 60;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 5:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
					$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold = 100;
			playerCastle.gold += 80;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 6:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
					$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold =110;
			playerCastle.gold += 90;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 7:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
					$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold =120;
			playerCastle.gold += 100;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 8:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
					$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold =130;
			playerCastle.gold += 110;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 9:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
					$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold =140;
			playerCastle.gold += 120;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 10:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
			$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold =150;
			playerCastle.gold += 130;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 11:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
			$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold =160;
			playerCastle.gold += 140;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 12:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
			$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold =170;
			playerCastle.gold += 150;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 13:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
			$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold =180;
			playerCastle.gold += 160;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 14:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
			$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold =190;
			playerCastle.gold += 170;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
			break;

			case 15:
				$('#computerLife').text('CPU life: ' + cpuCastle.life);
			$('#playerLife').text('Player life: ' + playerCastle.life);
			$('.good-guy').remove();
			$('.bad-guy').remove(); // removes all div baddies from field, even those that survived.
			cpuUnitArray = [];
			playerUnitArray = [];

			cpuCastle.gold =200;
			playerCastle.gold += 180;
			$('#gold').text('Gold: ' + playerCastle.gold);
			console.log('Round ' + round);
			gameObject.cpuBuyUnits(); //added buy units
			gameObject.createMarketButton();
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


// at the beginning of each round cpu gets a certain amount of gold
// it randomly buys what it can until nothing else can be bought
	// makes an array that has different units that can be randomly bought 
// cycles through until until cpu gold = 0;

		cpuBuyUnits () {
			cpuBoughtUnits = [];


			const badGuyArray = [new CpuUnit('goblin', 2, 1, .5, 5), new CpuUnit('orc', 3, 4, .6, 20), new CpuUnit('lich', 5, 5, .5, 30), new CpuUnit('zombie', 1, 3, .6, 5), new CpuUnit('minion', 2, 6, .7, 20), new CpuUnit('medusa', 3, 8, .8, 30)];
				while (cpuCastle.gold > 0 ) {
			
				cpuBoughtUnits.push(gameObject.randomNumber(badGuyArray));
		
				}
			
				gameObject.appendCpuUnits(cpuBoughtUnits);
			
				
			} ,

			createBattleButton () {
					const battleButton = $('<button/>').text('Click here to attack with your units!').attr('id', 'battle');
				//	$('.img-div').eq(0).append(battleButton);
					battleButton.css('.background-color,', 'white'); 
					battleButton.css('font-weight', 'bold');
					battleButton.css('color', 'black');
					battleButton.css('font-size', '.9em');
					$('#modal').prepend(battleButton);
					battleButton.on('click', (e) => {
					playerUnitArray[0].battle();
					});

				},

				createBattleButtonCpu () {
					const battleButton = $('<button/>').text('The enemies are attacking! Click here').attr('id', 'battle');
					battleButton.css('background-color', 'black'); 
					battleButton.css('color', 'white'); 
					battleButton.css('font-size', '.9em');


					$('#modal').prepend(battleButton);
		


					battleButton.on('click', (e) => {
						
						
						
						cpuUnitArray[0].battle();
			
							

					});

				},

			createMarketButton() {
				const marketButton = $('<button/>').text('--- Market ---').attr('id', 'market');
					marketButton.hover(function() {
					marketButton.css("font-weight", 'bold');
				}, function() {
					marketButton.css("font-weight", 'normal');
				});
					marketButton.hover(function() {
					marketButton.css("background-color", 'green');
				}, function() {
					marketButton.css("background-color", 'grey');
				});
				marketButton.on('click', (e) => { 
				$('button').remove();

				console.log('button works');
				gameObject.marketMaker();
			
				});
	

				$('#battle-message').prepend(marketButton);

			},


// different buttons at the start of the round you can click to buy units
// units are placed onto battlefield
// on click run a function that checks gold and if enough, run append function,
// otherwise alert you don't have enough and return to buying screen.
// *** button that starts next round **** instead of jumping straight to battle

		marketMaker (){
			// $('#battle-message').html().empty();
			const bigHeroDiv = $('<div id="modal"><div id="outer"><div class="inner"><button type="submit" id ="Warrior"> Warrior - 5 Gold  </button></div><div class="inner"><button type="submit" id ="Mage"> Mage - 20 Gold</button></div>   <div class="inner"><button id ="Wizard"> Wizard - 30 Gold</button></div>        <div class="inner"><button type="submit" id ="Guard"> Guard - 5 Gold</button></div><div class="inner"><button type="submit" id ="Druid"> Druid - 20 Gold</button></div>     <div class="inner"><button id ="Knight"> Knight - 30 Gold</button></div></div><br></div>');
			
			const exitShop = $('<button id ="exitShop">Exit Shop</button>');

			$('#battlefield').append(bigHeroDiv).append(exitShop);


				  $('#Warrior').hover(function() {
					$('#battle-message').html(soldier.name + ': attack: ' + soldier.attack + ' -- defense: ' + soldier.defense + ' -- accuracy: ' + soldier.accuracy);
				}, function() {
					$('#battle-message').html("After you have bought some units click 'Exit Shop' to ready your attack.");
				});

					$('#Mage').hover(function() {
					$('#battle-message').html(knight.name + ': attack: ' + knight.attack + ' -- defense: ' + knight.defense + ' -- accuracy: ' + knight.accuracy);
				}, function() {
					$('#battle-message').html("After you have bought some units click 'Exit Shop' to ready your attack.");
				});

						$('#Wizard').hover(function() {
					$('#battle-message').html(wizard.name + ': attack: ' + wizard.attack + ' -- defense: ' + wizard.defense + ' -- accuracy: ' + wizard.accuracy);
				}, function() {
					$('#battle-message').html("After you have bought some units click 'Exit Shop' to ready your attack.");
				});

							$('#Guard').hover(function() {
					$('#battle-message').html(dwarf.name + ': attack: ' + dwarf.attack + ' -- defense: ' + dwarf.defense + ' -- accuracy: ' + dwarf.accuracy);
				}, function() {
					$('#battle-message').html("After you have bought some units click 'Exit Shop' to ready your attack.");
				});

								$('#Druid').hover(function() {
					$('#battle-message').html(elephant.name + ': attack: ' + elephant.attack + ' -- defense: ' + elephant.defense + ' -- accuracy: ' + elephant.accuracy);
				}, function() {
					$('#battle-message').html("After you have bought some units click 'Exit Shop' to ready your attack.");
				});

									$('#Knight').hover(function() {
					$('#battle-message').html(ent.name + ': attack: ' + ent.attack + ' -- defense: ' + ent.defense + ' -- accuracy: ' + ent.accuracy);
				}, function() {
					$('#battle-message').html("After you have bought some units click 'Exit Shop' to ready your attack.");
				});
				
		
			const merchant1 = $('#Warrior');
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
					playerUnitArray.push(new PlayerUnit('warrior', 2, 1, .5, 5));
				}
			});
			merchant2.on('click', (e) => {
				console.log('Mage clicked');
				if (playerCastle.gold < 20) {
					alert("You don't have enough gold to buy a mage.");
				} else if (playerCastle.gold >= 20) {
					$('#gold').text('Gold: ' + (playerCastle.gold-= 20));
					$('#battlefield').append($('<div>').attr('id', 'wizard').addClass('good-guy'));
					playerUnitArray.push(new PlayerUnit('mage', 3, 4, .6, 20));
				}
			});
			merchant3.on('click', (e) => {
				console.log('Wizard clicked');
				if (playerCastle.gold < 30) {
					alert("You don't have enough gold to buy a wizard.");
				} else if (playerCastle.gold >= 30) {
					$('#gold').text('Gold: ' + (playerCastle.gold-= 30));
					$('#battlefield').append($('<div>').attr('id', 'mage').addClass('good-guy'));
					playerUnitArray.push(new PlayerUnit('wizard', 5, 5, .5, 30));
				}
			});
			merchant4.on('click', (e) => {
				console.log('Guard clicked');
				if (playerCastle.gold < 5) {
					alert("You don't have enough gold to buy any guards.");
				} else if (playerCastle.gold >= 5) {
					$('#gold').text('Gold: ' + (playerCastle.gold-= 5));
					$('#battlefield').append($('<div>').attr('id', 'baby').addClass('good-guy'));
					playerUnitArray.push(new PlayerUnit('guard', 1, 3, .6, 5));
				}
			});
			merchant5.on('click', (e) => {
				console.log('Druid clicked');
				if (playerCastle.gold < 20) {
					alert("You don't have enough gold to buy a druid.");
				} else if (playerCastle.gold >= 20) {
					$('#gold').text('Gold: ' + (playerCastle.gold-= 20));
					$('#battlefield').append($('<div>').attr('id', 'dwarf').addClass('good-guy'));
					playerUnitArray.push(new PlayerUnit('druid', 2, 6, .7, 20));
				}
			});
			merchant6.on('click', (e) => {
				console.log('Knight clicked');
				if (playerCastle.gold < 30) {
					alert("You don't have enough gold to buy a knight.");
				} else if (playerCastle.gold >= 30) {
					$('#gold').text('Gold: ' + (playerCastle.gold-= 30));
					$('#battlefield').append($('<div>').attr('id', 'hero').addClass('good-guy'));
					playerUnitArray.push(new PlayerUnit('knight', 3, 8, .8, 30));
					console.log(playerUnitArray);
				}
			});
		
				$('#exitShop').on('click', (e) => {
					if (playerUnitArray.length === 0) {
						alert("You're trying to leave your kingdom defenseless! Go ahead and buy some units.");
						return;
					}
					$('#outer').children().remove();
					$('#exitShop').remove();
					$('#battle-message').html("You're ready to take on the enemy! Click the attack button above to initiate combat.");
					cpuUnitArray = cpuBoughtUnits.filter((n, i) => {
						return n != null;

					});

					console.log(cpuUnitArray);
					console.log(playerUnitArray);
					
					gameObject.createBattleButton();
					return cpuUnitArray;
			});
		},

				
			removeFromCpuBattlefield () {	
			for (let i = 0; i < defeatedEnemies.length; i++) {
				switch (defeatedEnemies[i].name) {
					case "goblin":
					$('#goblin').remove();
					break;
					case "orc":
					$('#orc').remove();
					break;
					case "lich":
					$('#lich').remove();
					break;
						case "zombie":
					$('#zombie').remove();
					break;
					case "minion":
					$('#minion').remove();
					break;
					case "medusa":
					$('#medusa').remove();
					break;
				}
			}
			
				},
				removeFromPlayerBattlefield() {
					for (let i = 0; i < defeatedHeros.length; i++) {
						switch (defeatedHeros[i].name) {
					case "warrior":
					$('#knight').remove();
					break;
					case "mage":
					$('#wizard').remove();
					break;
					case "wizard":
					$('#mage').remove();
					break;
						case "guard":
					$('#baby').remove();
					break;
					case "druid":
					$('#dwarf').remove();
					break;
					case "knight":
					$('#hero').remove();
					break;
				}
					}
				},
				checkGameWin () {
					if (playerCastle.life <= 0) {
						round = 0;
						alert('Your castle walls have been breached by the enemy! Your kingdom falls to the forces of darkness. Click "OK" to play again');
						gameObject.restartGame();
					} else if (cpuCastle.life <= 0) {
						round = 0;
						alert('The last of the evil forces are defeated by your heroes. The kingdom is saved! Click "OK" to try again.');
						gameObject.restartGame();
					}

				},
				afterWinningStart () {
					  playerCastle.gold = 30;
						playerCastle.life = 40;
						cpuCastle.gold = 30;
						cpuCastle.life = 40;
						round = 1;
						playerUnitArray = [];

						cpuBoughtUnits = [];
						cpuUnitArray = [];

						defeatedEnemies = [];
						defeatedHeros = [];
				$('#gold').text('Gold: ' + (playerCastle.gold));
						console.log('new round');
				$('#battle').remove();
				$('#modal').remove();
				$('#round').text('Round ' + round);

				$('#computerLife').text('CPU life: ' + cpuCastle.life);
				$('#playerLife').text('Player life: ' + playerCastle.life);
				$('.good-guy').remove();
				$('.bad-guy').remove();
				
				gameObject.cpuBuyUnits();
				
				$('#battle-message').html('The enemy castle is gathering its forces. Click on "Market" to start building your army.');

					},
				restartGame () {
						playerCastle.gold = 30;
						playerCastle.life = 40;
						cpuCastle.life = 40;
						round = 1;
						playerUnitArray = [];

						cpuBoughtUnits = [];
						cpuUnitArray = [];

						defeatedEnemies = [];
						defeatedHeros = [];
						gameObject.afterWinningStart();
						gameObject.createMarketButton();
				}


				
		};



// STRETCH
//player clicks a bunch until no more units remain.
// who would you like to attack with? 
// who would you like to attack?
// give rewards and begin buying portion


$('#market').on('click', (e) => { 
	$('button').remove();
	$('#battle-message').text('Welcome to the market! Hover over the unit names to see their stats.');
	console.log('button works');
	gameObject.marketMaker();
});

$('#market').hover(function() {
					$('#market').css("background-color", 'green');
				}, function() {
					$('#market').css("background-color", 'grey');
				});
$('#market').hover(function() {
					$('#market').css("font-weight", 'bold');
				}, function() {
					$('#market').css("font-weight", 'normal');
				});



$('#modal1button').on('click', (e) => {
$('#modal1div').remove();
$('#modal2div').css('display', 'block');
});

$('#modal2button').on('click', (e) => {
	$('#modal1divcontainer').remove();
	$('#modal2div').remove();
});


$('#modal1div').on('click', (e) => {

});






gameObject.newRound();

});


