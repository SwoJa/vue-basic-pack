import moment from 'moment';

export function toLocalDate(iso8601TimeString, format='MM/DD/YYYY') {
  return moment(iso8601TimeString).format(format);
};

export function toLocalTime(iso8601TimeString, format='MM/DD/YYYY HH:mm:ss') {
  return moment(iso8601TimeString).format(format);
};

export function toLocal12Time(iso8601TimeString, format='YYYY/MM/DD A hh:mm:ss') {
  return moment(iso8601TimeString).format(format);
};
