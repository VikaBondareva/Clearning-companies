export function replaceWorkPlanInNumber(workPlan){
    var newWorkPlan = workPlan.map(dayWork=>{
      return {
        day: dayWork.day,
        start: replaceTime( dayWork.start),
        end: replaceTime( dayWork.end),
      }
    });
    return newWorkPlan;
  }
  
function replaceTime(time){
    return +time.replace(":", "");
  }
