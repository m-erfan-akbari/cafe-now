import moment from "jalali-moment";

export function unixToString(time) {
  const date = new Date(time * 1000);

  const hour =
    `${date.getHours()}`.length === 2
      ? `${date.getHours()}`
      : `0${date.getHours()}`;

  const minute =
    `${date.getMinutes()}`.length === 2
      ? `${date.getMinutes()}`
      : `0${date.getMinutes()}`;

  return `${hour}:${minute}`;
}

export function getPersianDate(time) {
  const date = moment(new Date(time * 1000));
  date.locale("fa");

  return date.format("dddd DD MMM jYYYY");
}
