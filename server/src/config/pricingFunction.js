module.exports.pricingPrice = (rooms, countRooms, serviceCoeff) => {
  let commonPrice =
    serviceCoeff *
    (countRooms.toilet * rooms.toilet.price +
      countRooms.standart * rooms.standart.price +
      countRooms.big * rooms.big.price);
  return commonPrice;
};

module.exports.pricingTime = (rooms, countRooms, serviceCoeff) => {
  let commonTime =
    serviceCoeff *
    (countRooms.toilet * rooms.toilet.time +
      countRooms.standart * rooms.standart.time +
      countRooms.big * rooms.big.time);
  return commonTime;
};

module.exports.middlePriceForCompany = (rooms, services) => {
  let middlePrice = services.reduce((price, service) => {
    price += service.coefficient;
    return price;
  }, 0);
  middlePrice *= rooms.toilet.price + rooms.standart.price + rooms.big.price;
  return middlePrice / 3;
};

module.exports.middleRatting = reviews => {
  let ratting = 0;
  ratting = reviews.reduce((sum, review) => {
    return sum + review.ratting;
  }, 0);
  ratting = ratting / reviews.length;
  console.log("ratting: " + ratting);
  return ratting;
};
