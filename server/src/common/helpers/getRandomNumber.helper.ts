export const getRandomNumber = (min: number, max: number, fractionDigits = 0) =>
    (Math.random() * (max - min) + min).toFixed(fractionDigits)