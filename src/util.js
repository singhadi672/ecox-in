

export function ratingGenerator(rating) {
  let ratingArray = [];
  for (let i = 0; i < rating; i++) {
    ratingArray = ratingArray.concat(i);
  }

  return ratingArray;
}

export function findItemById(product, state) {
  return !!state.find((item) => item.product._id === product._id);
}


