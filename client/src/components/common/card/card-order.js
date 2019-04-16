import React from 'react';
import Button from "@material-ui/core/Button";

import {
    getNameFormArray,
    statusOrdersArray,
    daysSelect,
    regularityTypes,
    orderStatusesEnum
  } from "../../../utils";
import "./style.css";

export function CardOrder({order,onClick}){

  const renderOrder = () => {
    return (
      <div className="card-media">
        <div className="card-media-title card-media_border">
          <div className="card-media-title-heading">
            <span >
              Статус:{" "}
              {getNameFormArray(statusOrdersArray, order.status, "value")}
            </span>
            <div className="card-media-title-price">
              <span className="subtle_margin u-float-right">
                Цена: {order.price}
              </span>
              <span className="u-float-right">
                Время: {order.cleanTime}
              </span>
            </div>
          </div>
          <div className="card-media-title-heading  ">
            <span>Компания:{order.executor.name}</span>
            <span>Адрес уборки: {order.address}</span>
          </div>
        </div>
        <div>
          <div className="card-media-object-container">
            <span className="subtle">Количество комнат</span>
            <span className="subtle card-media-body-heading">
              Санузлов: {order.countRooms.toilet}
            </span>
            <span className="subtle card-media-body-heading">
              Маленьких: {order.countRooms.standart}
            </span>
            <span className="subtle card-media-body-heading">
              Больших: {order.countRooms.big}
            </span>
          </div>
          <div className="card-media-body">
            <div className="card-media-body-top">
              <span className="subtle">
                Дни уборки: {order.days.map(day => day + ", ")}
              </span>
            </div>
            <span className="card-media-body-heading">
              Ожидаемое время начало уборки {order.date} в {order.startTime}
            </span>
            <div className="card-media-body-supporting-bottom">
              <span className=" subtle">
                Планируемая регулярноть уборки:{" "}
                {getNameFormArray(regularityTypes, order.regularity, "_id")}
              </span>
            </div>
            <div>
              {order.duration && (
                <span className=" subtle">
                  Продолжительность в месяцах {order.duration}
                </span>
              )}
            </div>
            <div className="card-media-body-supporting-bottom">
              <span>
                Услугa: {order.service}
              </span>
              {order.status === orderStatusesEnum.Pending && (
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={()=>onClick(order.executor.name, order.date, order._id)}
                  className="card-media-link u-float-right"
                >
                  Отменить заказ
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

 if(order) return renderOrder();
 return null;
}