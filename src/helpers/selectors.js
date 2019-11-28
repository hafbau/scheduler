const getAppointmentsForDay = (state, day) => {
  const filteredDays = state.days.filter(item => item.name === day, []);
  let result = [];
  if (filteredDays.length > 0) {
    for (const key in state.appointments) {
      filteredDays[0].appointments.forEach(el => {
        if (el === Number(key)) {
          result.push(state.appointments[key]);
        }
      });
    }
  }
  return result;
};

const getInterview = (state, interview) => {
  if (interview) {
    let result = { student: interview.student };
    for (const key in state.interviewers) {
      if (interview.interviewer === Number(key)) {
        result = { ...result, interviewer: state.interviewers[key] };
      }
    }
    return result;
  }

  return null;
};

const getInterviewersForDay = (state, day) => {
  const filteredDays = state.days.filter(item => item.name === day, []);
  let result = [];
  if (filteredDays.length > 0) {
    for (const key in state.interviewers) {
      filteredDays[0].interviewers.forEach(el => {
        if (el === Number(key)) {
          result.push(state.interviewers[key]);
        }
      });
    }
  }
  return result;
};

const getBookAppointmentDay = (state, id) => {
  const dayObj = state.days.reduce((acc, item) => {
    const findDay = item.appointments.filter(el => el === id);
    if (findDay[0] === id) {
      return { ...item };
    }
    return acc;
  }, {});
  return dayObj;
};

const decreaseSpots = (state, findDay) => {
  const days = state.days.map((item, index) => {
    if (index !== findDay.id - 1) {
      return item;
    }
    return {
      ...findDay,
      spots: item.spots - 1
    };
  });
  return days;
}

const increaseSpots = (state, findDay) => {
  const days = state.days.map((item, index) => {
    if (index !== findDay.id - 1) {
      return item;
    }
    return {
      ...findDay,
      spots: item.spots + 1
    };
  });
  return days;
}

export {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
  getBookAppointmentDay,
  decreaseSpots,
  increaseSpots
};
