import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import EntryList from './EntryList';

describe('EntryList', () => {
  it('requires confirmation before deleting an entry', () => {
    window.confirm = jest.fn(() => false);
    const onDelete = jest.fn();

    render(
      <EntryList
        entries={[{ id: 'entry-1', mood: 4, date: '2026-11-22T00:00:00.000Z', text: 'A reflection' }]}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText('Delete journal entry'));
    expect(window.confirm).toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('shows additional entries with the show-more control', () => {
    const entries = Array.from({ length: 8 }, (_, index) => ({
      id: `entry-${index}`,
      mood: 3,
      date: '2026-11-22T00:00:00.000Z',
      text: `Reflection ${index}`,
    }));

    render(<EntryList entries={entries} onDelete={jest.fn()} />);

    expect(screen.queryByText('Reflection 7')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /show more reflections/i }));
    expect(screen.getByText('Reflection 7')).toBeInTheDocument();
  });
});
