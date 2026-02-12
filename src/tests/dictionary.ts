// составить список отправных точек
// составить список конечных точек
// сравнить какой конечной точки нету в отправных
// составить новый список из последовательных поездок
export const dictionary = (objArr: { from: string; to: string }[]) => {
  const beginPoints = new Map();
  const endPoints = new Map();
  const result = [];
  objArr.forEach((trip) => {
    beginPoints.set(trip.from, trip.to);
    endPoints.set(trip.to, trip.from);
  });
  let beginTrip = objArr.find((trip) => !endPoints.has(trip.from))?.from;

  for (let i = 0; i < objArr.length; i++) {
    if (beginTrip && beginPoints.has(beginTrip)) {
      const newBegin = beginPoints.get(beginTrip);
      result.push({
        from: beginTrip,
        to: newBegin,
      });
      beginTrip = newBegin;
    }
  }
  return result;
};
