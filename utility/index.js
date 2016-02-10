import dateFormat from 'dateformat';

export function getFormattedDate(timestamp) {
   return dateFormat(timestamp, "mmmm dS, h:MM:ss TT");
}
