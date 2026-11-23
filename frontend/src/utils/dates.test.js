import { formatDate, parseDate } from './dates';

describe('date helpers', () => {
  it('returns null for invalid dates', () => {
    expect(parseDate('not-a-date')).toBeNull();
  });

  it('provides a safe label for invalid dates', () => {
    expect(formatDate('not-a-date', { month: 'short', day: 'numeric' })).toBe('Unknown date');
  });
});
