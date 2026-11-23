const invalidDateLabel = 'Unknown date';

export function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(value, options) {
  const date = parseDate(value);
  return date ? new Intl.DateTimeFormat('en-US', options).format(date) : invalidDateLabel;
}
