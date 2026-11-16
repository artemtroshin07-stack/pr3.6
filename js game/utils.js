const random = (num) => Math.ceil(Math.random() * num);

export const randomRange = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

export default random;
