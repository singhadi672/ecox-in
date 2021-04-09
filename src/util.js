export function ratingGenerator(rating) {
  let ratingArray = [];
  for (let i = 0; i < rating; i++) {
    ratingArray = ratingArray.concat(i);
  }

  return ratingArray;
}
