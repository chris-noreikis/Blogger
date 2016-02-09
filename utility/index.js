import dateFormat from 'dateformat';

export function getFormattedDate(timestamp) {
   return dateFormat(timestamp, "dddd, mmmm dS, h:MM:ss TT");
}