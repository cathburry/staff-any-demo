/* eslint-disable
  prefer-template,
  arrow-body-style
*/
import React, { FC, useEffect } from 'react';
import moment from 'moment';
import '../../styles/ruler.scss';

interface PropsType {
  shifts: any,
}
const halfHours = ["00", "30"];
  
const Ruler: FC<PropsType> = ({ shifts } : PropsType) => {
  useEffect(() => {}, [shifts]);

  const getDateItems = () => {
    const times = [];
    for(let i = 1; i < 24; i += 1){ 
      for(let j = 0; j < 2; j += 1){
        times.push(i + ":" + halfHours[j]);
      }
    };
    return times;
  }

  const renderSchedules = () => {
    return getDateItems().map((hour) => {
      return (
        <div className={`time start-${hour.replace(/:/g,'')}`}>
          {hour}
        </div>
      );
    })
  }

  const getSlot = (hour: string) => {
    if(('0' + hour).slice(-4) >= '12:00') {
      return 'afternoon';
    }

    return 'morning';
  }

  const parseTime = (time: string) => {
    let hours = parseInt(time.split(':')[0], 10);
    let minutes = parseInt(time.split(':')[1], 10);

    if(minutes <= 15 || minutes > 45) {
      if (minutes > 45) {
        if(hours === 23) {
          hours = 0;
        } else {
          hours += 1;
        }
      }
      minutes = 0;
    } else {
      minutes = 30;
    }

    const newTime = `${hours}${('0' + minutes).slice(-2)}`;

    console.log(newTime);
    return newTime;
  }

  const renderShifts = () => {
    return shifts.map((sh: any) => {
      const shiftSlot = getSlot(sh.startTime);
      console.log(shifts);
      return (
        <div
          id={sh.id}
          className={`event stage-${shiftSlot} start-${parseTime(sh.startTime)} end-${parseTime(sh.endTime)} length-4`}
        >
          { sh.name }
          <span>{ `${shiftSlot} shift` }</span>
          <span>{ `${sh.startTime} - ${sh.endTime}` }</span>
        </div>
      )
    });
  }

  return (
    <div className="scheduleContainer" key="schedule">
      { renderSchedules() }
      { renderShifts() }
    </div>
  )
};

export default Ruler;
