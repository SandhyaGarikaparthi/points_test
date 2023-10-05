import moment from "moment";

export const calculatePoints = (amount) => {
  if (amount < 50) return 0;
  if (amount < 100) return amount - 50;
  return (amount - 100) * 2 + 50;
};

export const getPointResult = (data) => {
  // convert input text to json
  const parsedData = JSON.parse(data);
  // sort data with date to make sure months are in order
  const sortedData = parsedData.sort((a, b) =>
    moment(a.date).diff(moment(b.date))
  );

  const finalData = sortedData.reduce((acc, entry) => {
    const month = moment(entry.date).format("MMMM");
    if (!acc.has(month)) {
      acc.set(month, { entries: [], points: 0 });
    }
    const prevData = acc.get(month);
    prevData.entries.push(entry.expense);
    prevData.points += calculatePoints(entry.expense);
    acc.set(month, prevData);
    return acc;
  }, new Map());

  return finalData;
};
