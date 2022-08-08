function getRandValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
        }
    },

    methods: {
        launchAttack() {
            this.currentRound++;
            const damage = getRandValue(5, 12);
            this.monsterHealth -= damage;
            this.monsterAttack();
        },
        monsterAttack() {
            const damage = getRandValue(8, 15);
            this.playerHealth -= damage;
        },
        specialAttackMonster() {
            this.currentRound++;
            const damage = getRandValue(10, 25);
            this.monsterHealth -= damage;
            this.monsterAttack();
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
        }
    },

    computed: {
        monsterStyle() {
            return {
                width: this.monsterHealth + '%'
            }
        },

        playerStyle() {
            return {
                width: this.playerHealth + '%'
            }
        },

        enableSpecialattack() {
            return this.currentRound % 3 !== 0
        }
    }
});

app.mount('#game');