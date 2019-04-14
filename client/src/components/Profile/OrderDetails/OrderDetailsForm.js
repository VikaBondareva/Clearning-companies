import React from "react";
import {regularityTypes, statusOrdersArray,getNameFormArray}  from '../../../utils'

function OrderDetails ({order}) {

    if(!order) {
        return (
            <p>Not found/</p>
        )
    }

    const {customer, address, services, countRooms, days, startTime,status, date, price, cleanTime, regularity} = order;

    return (
        <div>
            {/* <p>Клиент: {customer.name} {customer.surname}</p>
            {customer.email && <p>Email: {customer.email} </p>}
            {customer.phone && <p>Мобильный телефон: {customer.phone} </p>} */}
            <p>Адрес уборки: {address} </p>
            <div>
                <p>Тип уборки</p>
                <p>{services.map(service=>`${service}, `)}</p>
            </div>
            <div>
                <p>описание помещение</p>
                <p>Количество санузлов: {countRooms.toilet}</p>
                <p>Количество маленьких комнат: {countRooms.standart}</p>
                <p>Количество больших комант: {countRooms.big}</p>
            </div>
            <div>
                <p>День / дни уборки  {days.map(day=>`${day}, `)}</p>
                <p>Ожидаемое дата начала уборк: {date}</p>
                <p>Ожидаемое время начала уборк: {startTime}</p>
                <p>Планируемая регулярность уборки: {getNameFormArray(regularityTypes, regularity, "_id")}</p>
               {regularity > 1 && <p>Продолжительность сделки: {order.duration} месяцев</p>}
               <p>Цена: {price}</p>
               <p>Одижаемое время уборки: {cleanTime} минут</p>
            </div>

            <div>
                Статус заказа: {getNameFormArray(statusOrdersArray,status, "value")}
                {status ==="canceled" && <p>Причина отмены заказа: {order.lockMessage}</p>}
            </div>
        </div>
    );
}

export default OrderDetails;