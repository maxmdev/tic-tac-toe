export default class Player {
    constructor(params = this.createPlayerAI()) {
        this.name = params.name;
        this.mark = params.mark;
        this.score = 0;
    }

    setMark(mark) {
        this.mark = mark.toString();
    }

    setScoreToZero() {
        this.score = 0;
    }

    getMark() {
        return this.mark;
    }

    getName() {
        return this.name;
    }

    getScore() {
        return this.score;
    }

    addWin() {
        this.score++;
    }

    createPlayerAI() {
        return new Player({name: 'AI', mark: ''});
    }

    setOppositeMark(defender) {
        if (defender.getMark() === 'X') {
            this.setMark('O');
        } else {
            this.setMark('X');
        }
    }
}