class Pokemon {
    constructor({ name, type, hp, img, attacks, selector }) {
        this.name = name;
        this.type = type;
        this.attacks = attacks;
        this.defaultHP = hp;
        this.damageHP = hp;
        this.elName = document.getElementById(`name-${selector}`);
        this.elImg = document.getElementById(`img-${selector}`);
        this.elHP = document.getElementById(`health-${selector}`);
        this.elProgressbar = document.getElementById(`progressbar-${selector}`);
        this.elName.innerText = name;
        this.elImg.src = img;
        this.renderHP();
    }

    renderHPLife() {
        const { elHP, damageHP, defaultHP } = this;
        elHP.innerText = `${damageHP} / ${defaultHP}`;
    }

    renderProgressbarHP() {
        const { elProgressbar, damageHP, defaultHP } = this;
        const percent = (damageHP / defaultHP) * 100;
        elProgressbar.style.width = `${percent}%`;
        elProgressbar.classList.remove('low', 'critical');
        if (percent < 20) {
            elProgressbar.classList.add('critical');
        } else if (percent < 60) {
            elProgressbar.classList.add('low');
        }
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    changeHP(count, callback) {
        const dealt = Math.min(count, this.damageHP);
        this.damageHP -= dealt;
        this.renderHP();
        if (callback) callback(dealt);
        return dealt;
    }
}

export default Pokemon;
