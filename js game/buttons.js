import { limitClicks } from './clickLimiter.js';

const $buttons = document.querySelector('.control .buttons');
const $log = document.getElementById('log');

export const clearButtons = () => {
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach(($item) => $item.remove());
};

export const disableButtons = () => {
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach(($item) => {
        $item.disabled = true;
    });
};

export const createAttackButtons = (attacks, onAttack) => {
    clearButtons();

    const counters = attacks.map((attack) => {
        const { name, minDamage, maxDamage, maxCount } = attack;
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = name;
        $btn.title = `Урон: ${minDamage}-${maxDamage}`;
        $buttons.insertBefore($btn, $log);
        return limitClicks($btn, maxCount, () => onAttack(attack));
    });

    return () => counters.reduce((sum, left) => sum + left(), 0);
};
