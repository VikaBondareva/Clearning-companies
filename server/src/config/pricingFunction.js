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
    price += +service.coefficient;
    return price;
  }, 0);
  middlePrice *= rooms.toilet.price + rooms.standart.price + rooms.big.price;
  middlePrice = Math.round((middlePrice / 3) * 100) / 100;
  return middlePrice;
};

module.exports.middleRatting = reviews => {
  let ratting = 0;
  ratting = reviews.reduce((sum, review) => {
    return sum + review.ratting;
  }, 0);
  const rat = Math.round((ratting / reviews.length) * 10) / 10;
  return rat;
};

module.exports.getStringTime = timeNumber => {
  let hours;
  console.log(timeNumber);

  if (timeNumber.length === 3) {
    hours = "0" + timeNumber.substring(0, 1);
  } else {
    hours = timeNumber.substring(0, 2);
  }
  let minutes = timeNumber.slice(-2);
  let timeString = `${hours}:${minutes}`;
  console.log(timeString);
  return timeString;
};

module.exports.replaceTime = time => {
  return +time.replace(":", "");
};
