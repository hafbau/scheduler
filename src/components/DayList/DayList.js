import React from "react";

import DayListItem from "components/DayListItem/DayListItem";

export default function DayList(props) {
  const lists = props.days.map(day => (
    <ul>
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={e => props.setDay(day.name)}
      />
    </ul>
  ));

  return lists;
}
