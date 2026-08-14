import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Contact } from '../Contact';

const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

describe('Contact', () => {
  beforeEach(() => {
    openSpy.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('opens Gmail compose with the form content and then returns to the prompt', async () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada Lovelace' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Please contact me about the portfolio.' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Send Message →' }).closest('form')!);

    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://mail.google.com/mail/?view=cm&fs=1'),
      '_blank',
      'noopener,noreferrer',
    );
    expect(screen.getByRole('status')).toHaveTextContent('Gmail draft opened.');
    expect(screen.getByRole('button', { name: 'Send Another →' })).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(screen.getByRole('button', { name: 'Send Message →' })).toBeInTheDocument();
    expect(screen.getByText('Send a message')).toBeInTheDocument();
  });
});
