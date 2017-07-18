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

	};

});