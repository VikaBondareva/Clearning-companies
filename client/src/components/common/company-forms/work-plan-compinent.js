import React, { Component } from "react";
import {getNameFormArray, daysSelect} from '../../../utils';

export  function WorkPlanCompany({workPlan}) {

    function renderWorkPlan(day, i) {
    return (
      <div key={i * 51 - i * 5} className="mini-card-info">
        <p className="text-desc">{getNameFormArray(daysSelect, day.day,"value")}:</p>
        <p className="text-desc"> {day.start} - {day.end}</p>
      </div>
    );
  }
  return <>{workPlan.map(renderWorkPlan)}</>
  
}