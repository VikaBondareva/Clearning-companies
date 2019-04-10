export const serviceTypes = [
    {name:'Стандартная уборки помещения', _id: 11},
    {name:'Генеральная уборка', _id: 12},
    {name:'Уборка после ремента и строительства', _id: 13},
    {name:'Химчистка ковров', _id: 14},
    {name:'Химчистка мебели и покрытий', _id: 15},
    {name:'Промышленная уборки', _id: 16},
    {name:'Уборки бассейна', _id: 17},
]

export const daysSelect = [
    {_id: 1, name: "Понедельник"},
    {_id: 2, name: "Вторник"},
    {_id: 3, name: "Среда"},
    {_id: 4, name: "Четверг"},
    {_id: 5, name: "Пятница"},
    {_id: 6, name: "Суббота"},
    {_id: 7, name: "Воскресенье"},
]

export const regularityTypes = [
    {_id: 1, name: "Только один раз"},
    {_id: 2, name: "Каждую неделю"},
    {_id: 3, name: "Каджые две недели"},
    {_id: 4, name: "Каждый месяц"}
]

export function preliminaryCalculation(rooms,countRooms, services){
   const result = services.reduce((res, service)=>{
        res.time+=pricingTime(rooms,countRooms,service.coefficient)
        res.price+=pricingPrice(rooms,countRooms,service.coefficient)
        return res
    }, {time: 0, price: 0})
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