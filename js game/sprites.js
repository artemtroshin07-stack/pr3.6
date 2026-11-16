const spriteIds = {
    Bulbasaur: 1,
    Charmander: 4,
    Squirtle: 7,
    Pidgey: 16,
    Pikachu: 25,
    Mew: 151,
};

const BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export const spriteOf = ({ name, img }) =>
    spriteIds[name] ? `${BASE_URL}/${spriteIds[name]}.png` : img;
