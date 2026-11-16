import Pokemon from './pokemon.js';
import random, { randomRange } from './utils.js';
import { pokemons } from './pokemons.js';
import { spriteOf } from './sprites.js';
import { generateLog, addLog, clearLogs } from './log.js';
import { createAttackButtons, disableButtons } from './buttons.js';

class Game {
    constructor() {
        this.$log = document.getElementById('log');
        this.player1 = null;
        this.player2 = null;
        this.attacksLeft = () => 0;
    }

    say(text) {
        this.$log.innerText = text;
    }

    pickRandom(excludeName) {
        const pool = pokemons.filter(({ name }) => name !== excludeName);
        return pool[random(pool.length) - 1];
    }

    createPlayer(pokemon, selector) {
        return new Pokemon({ ...pokemon, img: spriteOf(pokemon), selector });
    }

    spawnEnemy() {
        const enemy = this.pickRandom(this.player1.name);
        this.player2 = this.createPlayer(enemy, 'player2');
    }

    startGame() {
        this.player1 = this.createPlayer(this.pickRandom(), 'player1');
        this.spawnEnemy();
        clearLogs();
        this.attacksLeft = createAttackButtons(this.player1.attacks, (attack) => this.attack(attack));
        this.say('Почни бій!');
    }

    hit(attacker, defender, { minDamage, maxDamage }) {
        return defender.changeHP(randomRange(minDamage, maxDamage), (dealt) =>
            addLog(generateLog(defender, attacker, dealt))
        );
    }

    attack(attack) {
        const { player1, player2 } = this;
        const dealtToEnemy = this.hit(player1, player2, attack);

        if (player2.damageHP === 0) {
            this.onEnemyDefeated();
            return;
        }

        const [firstEnemyAttack] = player2.attacks;
        const dealtToPlayer = this.hit(player2, player1, firstEnemyAttack);
        this.say(`${attack.name}: ${player2.name} -${dealtToEnemy}, ${player1.name} -${dealtToPlayer}`);

        if (player1.damageHP === 0) {
            this.finish(`${player2.name} переміг!`);
        } else if (this.attacksLeft() === 0) {
            this.finish('Удари закінчились!');
        }
    }

    onEnemyDefeated() {
        const { name: defeatedName } = this.player2;
        addLog(`${defeatedName} переможений!`);

        if (this.attacksLeft() === 0) {
            this.finish(`${defeatedName} переможений, але удари закінчились!`);
            return;
        }

        this.spawnEnemy();
        this.say(`${defeatedName} переможений! З'явився ${this.player2.name}`);
    }

    finish(message) {
        disableButtons();
        addLog(message);
        this.say(`${message} Натисни на логотип, щоб почати знову.`);
    }
}

export default Game;
