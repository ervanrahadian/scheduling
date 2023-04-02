export const getStartDate = (currentDate: Date) => {
  let getStartDate = currentDate.getDate() - currentDate.getDay() + 1;

  let startDate = new Date(new Date().setDate(getStartDate));

  return startDate;
};

export const getEndDate = (currentDate: Date) => {
  let getStartDate = currentDate.getDate() - currentDate.getDay() + 1;

  let startDate = new Date(new Date().setDate(getStartDate));

  let endDate = new Date(startDate.setDate(startDate.getDate() + 6));

  return endDate;
};

export const updateStartAndEndDate = (
  startDate: Date,
  weekCounter: number,
  setDate: Function
) => {
  let date = new Date();
  let firstDate = date.getDate() - date.getDay() + 1 + weekCounter * 7;

  startDate = new Date(new Date().setDate(firstDate));
  let tempStartDate = new Date(new Date().setDate(firstDate));

  let endDate = new Date(tempStartDate.setDate(tempStartDate.getDate() + 6));

  return setDate({
    startDate: startDate,
    endDate: endDate,
  });
};
