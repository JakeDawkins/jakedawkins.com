const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const month = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });
const full = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export function formatMonthYear(date: string) {
  return monthYear.format(new Date(date));
}

export function formatMonth(date: string) {
  return month.format(new Date(date));
}

export function formatDate(date: string) {
  return full.format(new Date(date));
}
