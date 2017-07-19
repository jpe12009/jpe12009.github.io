$(() => {
console.log('works');


//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
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

		}
	}
//--------------------------------------------------------------------------------------------------------

//	UNITS - CPU OFFENSE

	const goblin = new CpuUnit('goblin', 1, 1, .5, 5);

	const orc = new CpuUnit('orc', 3, 4, .6, 20);

	const lich = new CpuUnit('lich', 5, 5, .7, 40);

// 	UNITS - CPU DEFENSE

	const zombie = new PlayerUnit('zombie', 1, 3, .6, 5);

	const troll = new PlayerUnit('troll', 2, 5, .7, 20);

	const cyclops = new PlayerUnit('cyclops', 3, 10, .8, 40);


//	UNITS - PLAYER OFFENSE

	const soldier = new PlayerUnit('soldier', 1, 1, .5, 5);

	const knight = new PlayerUnit('knight', 3, 4, .6, 20);

	const wizard = new PlayerUnit('wizard', 5, 5, .7, 40);

//	UNITS - PLAYER DEFENSE

	const dwarf = new PlayerUnit('dwarf', 1, 3, .6, 5);

	const elephant = new PlayerUnit('elephant', 2, 5, .7, 20);

	const ent = new PlayerUnit('ent', 3, 10, .8, 40);

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
		life: 50,
		gold: 0,
		totalOffense: 0,
		totalDefense: 0
	};

	const playerCastle = {
		life: 50,
		gold: 10,
		totalOffense: 0,
		totalDefense: 0
	};

//--------------------------------------------------------------------------------------------------------

// GAME OBJECT

	const gameObject = {
		createGoodGuys () {
			const promptAnswer = $('input').val();
			const makeWarrior = $('<div/>').attr('id', 'knight');
		}
	};

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



$('#knight').sprite({fps: 12, no_of_frames: 20});

console.log(wizard);


});