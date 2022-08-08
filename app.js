function getRandValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            scored: 0,
            monsterScore: 0,
            playerScore: 0,
            bolean: false,
            damage: [],
            damageGotten: []
        }
    },

    methods: {
        damageDealt(value) {
            this.damage.push(`You did ${value} damage`)
        },

        damageGot(value) {
            this.damageGotten.push(`recieved ${value} damage`)
        },

        launchAttack() {
            this.currentRound++;
            const damage = getRandValue(5, 12);
            this.monsterHealth -= damage;
            this.monsterAttack();
            this.damageDealt(damage);
        },
        monsterAttack() {
            const damage = getRandValue(8, 15);
            this.playerHealth -= damage;
            this.damageGot(damage);
        },
        specialAttackMonster() {
            this.currentRound++;
            const damage = getRandValue(10, 25);
            this.monsterHealth -= damage;
            this.monsterAttack();
            this.damageDealt(damage);
        },
        healPlayer() {
            this.currentRound++;
            const heal = getRandValue(8, 15);
            if (this.playerHealth + heal > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth += heal;
            }
            this.monsterAttack();
        },
        newGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.scored = 0;
            this.damage = [];
        },

        surrender() {
            this.scored = 2;
            this.monsterScore += 1;
        },

        revealBattleLog() {
            this.bolean = !this.bolean;
        }
    },

    computed: {
        monsterStyle() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }
            }
            return {
                width: this.monsterHealth + '%'
            }
        },

        playerStyle() {
            if (this.playerHealth < 0) {
                return { width: '0%' }
            }
            return {
                width: this.playerHealth + '%'
            }
        },

        enableSpecialattack() {
            return this.currentRound % 3 !== 0
        }
    },

    watch: {
        playerHealth(value) {
            if (value < 1 && this.monsterHealth <= 0) {
                this.scored = 1;
            } else if (value <= 0) {
                this.scored = 2;
                this.playerScore += 1;
            }
        },

        monsterHealth(value) {
            if (value < 1 && this.playerHealth <= 0) {
                this.scored = 1;
            } else if (value <= 0) {
                this.scored = 3;
                this.monsterScore += 1;
            }
        }
    }
});

app.mount('#game');