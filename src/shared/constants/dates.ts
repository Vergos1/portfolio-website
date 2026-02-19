export const CURRENT_YEAR = new Date().getFullYear();
export const CURRENT_DATE = new Date().getDate();
export const CURRENT_MONTH = new Date().getMonth();
export const CURRENT_DAY = new Date().getDay();
export const CURRENT_HOUR = new Date().getHours();

export const SHORT_DATE_TIME_FORMATS: Intl.DateTimeFormatOptions[] = [
  { month: 'short', day: 'numeric' },
  { hour: 'numeric', minute: 'numeric' },
];
