function gra(min, max) {
  return Math.random() * (max - min) + min;
}

function gri(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { gra, gri };
