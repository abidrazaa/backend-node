const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getCurrentDate = async () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const newDate = month + ' ' + day + ', ' + year;
  return newDate;
};
