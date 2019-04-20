export const roles = {
  user: "customer",
  admin: "admin",
  executor: "executor"
};

export const orderStatusesEnum = {
  Canceled: "canceled",
  Confirmed: "confirmed",
  Made: "made",
  Pending: "pending"
};

export const statusUsersEnum = {
  notVerified: 1,
  verified: 2,
  deleted: 3,
  locked: 4
};

export const statusOrdersArray = [
  {value: "", name: "Все"},
  { value: orderStatusesEnum.Canceled, name: "Отказано" },
  { value: orderStatusesEnum.Pending, name: "Открытый" },
  { value: orderStatusesEnum.Confirmed, name: "Принят" },
  { value: orderStatusesEnum.Made, name: "Сделано" }
];

export const statusUsersArray = [
  {value: "", name: "Все"},
  { value: statusUsersEnum.notVerified, name: "Email не подтвержден" },
  { value: statusUsersEnum.verified, name: "Активный" },
  { value: statusUsersEnum.locked, name: "Заблокирован" }
];

export const serviceTypes = [
  { name: "Стандартная уборки помещения", _id: 11 },
  { name: "Генеральная уборка", _id: 12 },
  { name: "Уборка после ремента и строительства", _id: 13 },
  { name: "Химчистка ковров", _id: 14 },
  { name: "Химчистка мебели и покрытий", _id: 15 },
  { name: "Промышленная уборки", _id: 16 },
  { name: "Уборки бассейна", _id: 17 }
];

export const daysSelect = [
  { value: 0, name: "Понедельник" },
  { value: 1, name: "Вторник" },
  { value: 2, name: "Среда" },
  { value: 3, name: "Четверг" },
  { value: 4, name: "Пятница" },
  { value: 5, name: "Суббота" },
  { value: 6, name: "Воскресенье" }
];

export const regularityTypes = [
  { _id: 1, name: "Только один раз" },
  { _id: 2, name: "Каждую неделю" },
  { _id: 3, name: "Каджые две недели" },
  { _id: 4, name: "Каждый месяц" }
];

export const selectSort = [
  { value: "", name: "" },
  { value: "asc", name: "По возрастанию цены" },
  { value: "desc", name: "По убиванию цены" },
  { value: "ratting", name: "По популярности" }
];

export const selectCountCard = [
  { value: 10, name: 10 },
  { value: 20, name: 20 },
  { value: 25, name: 25 },
  { value: 30, name: 30 },
  { value: 40, name: 40 }
];

export const selectCity = [
  { value: "", name: "Все города" },
  { value: "Могилев", name: "Могилев" },
  { value: "Витебск", name: "Витебск" },
  { value: "Гродно", name: "Гродно" },
  { value: "Минcк", name: "Минcк" },
  { value: "Гомель", name: "Гомель" },
  { value: "Брест", name: "Брест" }
];

export const getNameFormArray = (values, current, nameSearch) => {
  const index = values.filter(value => value[nameSearch] === current);
  if (index) {
    return index[0].name;
  }
  return null;
};

export const toStringDate = date => {
  const month = date.getMonth() < 10 ? "0"+date.getMonth() :  date.getMonth()
  const formatDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
  return formatDate
}

export function preliminaryCalculation(rooms, countRooms, coefficient) {
  const time = pricingTime(rooms, countRooms, coefficient);
  const price = pricingPrice(rooms, countRooms, coefficient);
  return {
    time,
    price
  };
}

const pricingPrice = (rooms, countRooms, serviceCoeff) => {
  let commonPrice =
    +serviceCoeff *
    (countRooms.toilet * rooms.toilet.price +
      countRooms.standart * rooms.standart.price +
      countRooms.big * rooms.big.price);

  return commonPrice;
};

const pricingTime = (rooms, countRooms, serviceCoeff) => {
  let commonTime =
    +serviceCoeff *
    (countRooms.toilet * rooms.toilet.time +
      countRooms.standart * rooms.standart.time +
      countRooms.big * rooms.big.time);
  return commonTime;
};
