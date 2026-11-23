import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import JournalEntryForm from './JournalEntryForm';

describe('JournalEntryForm', () => {
  it('submits trimmed text and selected mood, then clears the form', async () => {
    const onSubmit = jest.fn().mockResolvedValue(true);

    render(<JournalEntryForm onSubmit={onSubmit} onViewInsights={jest.fn()} />);

    fireEvent.change(screen.getByLabelText('Journal reflection'), {
      target: { value: '  Today felt calm.  ' },
    });
    fireEvent.click(screen.getByLabelText('Light'));
    fireEvent.click(screen.getByRole('button', { name: /plant reflection/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({
      text: 'Today felt calm.',
      mood: 4,
    }));
    await waitFor(() =>
      expect(screen.getByLabelText('Journal reflection')).toHaveValue('')
    );
  });

  it('does not submit while submission is in progress', () => {
    const onSubmit = jest.fn();

    render(
      <JournalEntryForm
        onSubmit={onSubmit}
        onViewInsights={jest.fn()}
        submitting
      />,
    );

    expect(screen.getByRole('button', { name: /planting/i })).toBeDisabled();
    expect(screen.getByLabelText('Journal reflection')).toBeDisabled();
  });
});
