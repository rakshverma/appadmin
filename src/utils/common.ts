import moment from "moment";

export const convertDateToLocal = (date: string) => {
  return moment.utc(date).local().format("DD-MM-YYYY h:mm a");
};
