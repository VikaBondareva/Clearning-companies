export const roles = {
  user: "customer",
  admin: "admin",
  executor: "executor"
};


export const orderStatuses = {
  Canceled: "canceled",
  Confirmed: "confirmed",
  Made: "made",
  Pending: "pending"
}

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
  { _id: 1, name: "Понедельник" },
  { _id: 2, name: "Вторник" },
  { _id: 3, name: "Среда" },
  { _id: 4, name: "Четверг" },
  { _id: 5, name: "Пятница" },
  { _id: 6, name: "Суббота" },
  { _id: 7, name: "Воскресенье" }
];

export const regularityTypes = [
  { _id: 1, name: "Только один раз" },
  { _id: 2, name: "Каждую неделю" },
  { _id: 3, name: "Каджые две недели" },
  { _id: 4, name: "Каждый месяц" }
];

export const selectSort =[
  {value: "", name: ""},
  {value: "asc", name: "По возрастанию цены"},
  {value: "desc", name: "По убиванию цены"},
  {value: "ratting", name: "По популярности"}
];

export const selectCountCard =[
  {value: 10, name: 10},
  {value: 20, name: 20},
  {value: 25, name: 25},
  {value: 30, name: 30},
  {value: 40, name: 40},
];

export const selectCity =[
  {value: "", name: "Все города"},
  {value: "Могилев", name: "Могилев"},
  {value: "Витебск", name: "Витебск"},
  {value: "Гродно", name: "Гродно"},
  {value: "Минcк", name: "Минcк"},
  {value: "Гомель", name: "Гомель"},
  {value: "Брест", name: "Брест"},
];

export const statusOrders =[
    {value: orderStatuses.Canceled, name: "Отказано"},
    {value: orderStatuses.Pending, name: "Открытый"},
    {value: orderStatuses.Confirmed, name: "Принят"},
    {value: orderStatuses.Made, name: "Сделано"},
];

export const getNameFormArray = (values, current, nameSearch) => {
  const reg = values.filter(value=> value[nameSearch]=== current);
  return reg[0].name;
}  

export function preliminaryCalculation(rooms, countRooms, services) {
  const result = services.reduce(
    (res, service) => {
      res.time += pricingTime(rooms, countRooms, service.coefficient);
      res.price += pricingPrice(rooms, countRooms, service.coefficient);
      return res;
    },
    { time: 0, price: 0 }
  );
  return result;
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
