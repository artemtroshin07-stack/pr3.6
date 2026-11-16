import random from './utils.js';
import { logs } from './logs.js';

const $logs = document.getElementById('logs');

export const generateLog = (firstPerson, secondPerson, damage) => {
    const { name: firstName, damageHP, defaultHP } = firstPerson;
    const { name: secondName } = secondPerson;

    const text = logs[random(logs.length) - 1]
        .replaceAll('[ПЕРСОНАЖ №1]', firstName)
        .replaceAll('[ПЕРСОНАЖ №2]', secondName);

    return `${text} -${damage}, [${damageHP}/${defaultHP}]`;
};

export const addLog = (text) => {
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
};

export const clearLogs = () => {
    $logs.innerHTML = '';
};
