import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PaymentModal from './PaymentModal';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('PaymentModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSuccess: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders correctly when isOpen is true', () => {
    render(<PaymentModal {...defaultProps} />);
    expect(screen.getByText('Lapor Pembayaran & QRIS')).toBeInTheDocument();
    expect(screen.getByText('Konfirmasi Pembayaran')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<PaymentModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Lapor Pembayaran & QRIS')).not.toBeInTheDocument();
  });

  it('simulates success using setTimeout when scriptUrl is default', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    // use a fake user object for interacting with fake timers active
    const user = userEvent.setup({ delay: null });

    render(<PaymentModal {...defaultProps} />);

    // Fill out the form
    await user.type(screen.getByLabelText(/Nama Penyetor/i), 'Budi Santoso');
    await user.type(screen.getByLabelText(/Alamat Email/i), 'budi@example.com');
    await user.type(screen.getByLabelText(/Nominal/i), '50000');
    await user.type(screen.getByLabelText(/No. Referensi/i), 'REF12345');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Kirim Laporan Pembayaran/i }));

    // Assert loading state
    expect(screen.getByRole('button', { name: /Mengirim.../i })).toBeInTheDocument();

    // Fast-forward 1000ms for the mock API response timeout
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Ensure success flow is triggered
    await waitFor(() => {
      expect(screen.getByText('Laporan Berhasil Terkirim!')).toBeInTheDocument();
    });

    expect(defaultProps.onSuccess).toHaveBeenCalledWith('Budi Santoso');

    // Fast-forward to test the auto-close (4000ms from success flow)
    act(() => {
      vi.advanceTimersByTime(4500); // 500 for receipt + 4000 for close
    });

    await waitFor(() => {
        expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it('handles successful form submission with valid scriptUrl', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ status: 'success' }),
    });
    globalThis.fetch = mockFetch;

    render(<PaymentModal {...defaultProps} scriptUrl="https://script.google.com/macros/s/test/exec" />);

    // Fill form
    await userEvent.type(screen.getByLabelText(/Nama Penyetor/i), 'Siti Aminah');
    await userEvent.type(screen.getByLabelText(/Alamat Email/i), 'siti@example.com');
    await userEvent.type(screen.getByLabelText(/Nominal/i), '100000');
    await userEvent.type(screen.getByLabelText(/No. Referensi/i), 'REF98765');

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Kirim Laporan Pembayaran/i }));

    // Wait for the async flow to complete
    await waitFor(() => {
        expect(screen.getByText('Laporan Berhasil Terkirim!')).toBeInTheDocument();
    });

    // Check if fetch was called with the right data
    expect(mockFetch).toHaveBeenCalledWith("https://script.google.com/macros/s/test/exec", expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: expect.stringContaining('"action":"pembayaran"'),
    }));

    expect(mockFetch).toHaveBeenCalledWith("https://script.google.com/macros/s/test/exec", expect.objectContaining({
        body: expect.stringContaining('"nama":"Siti Aminah"'),
    }));
  });

  it('handles failed form submission with valid scriptUrl', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ status: 'error' }),
    });
    globalThis.fetch = mockFetch;

    render(<PaymentModal {...defaultProps} scriptUrl="https://script.google.com/macros/s/test/exec" />);

    // Fill minimum required fields
    await userEvent.type(screen.getByLabelText(/Nama Penyetor/i), 'Test');
    await userEvent.type(screen.getByLabelText(/Alamat Email/i), 'test@test.com');
    await userEvent.type(screen.getByLabelText(/Nominal/i), '1000');
    await userEvent.type(screen.getByLabelText(/No. Referensi/i), 'REF');

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Kirim Laporan Pembayaran/i }));

    // Wait for the error message
    await waitFor(() => {
        expect(screen.getByText('Terjadi kesalahan. Silakan coba lagi.')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /Kirim Laporan Pembayaran/i })).not.toBeDisabled();
  });

  it('handles fetch network error', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));
      globalThis.fetch = mockFetch;

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<PaymentModal {...defaultProps} scriptUrl="https://script.google.com/macros/s/test/exec" />);

      // Fill minimum required fields
      await userEvent.type(screen.getByLabelText(/Nama Penyetor/i), 'Test');
      await userEvent.type(screen.getByLabelText(/Alamat Email/i), 'test@test.com');
      await userEvent.type(screen.getByLabelText(/Nominal/i), '1000');
      await userEvent.type(screen.getByLabelText(/No. Referensi/i), 'REF');

      // Submit
      fireEvent.click(screen.getByRole('button', { name: /Kirim Laporan Pembayaran/i }));

      // Wait for the error message
      await waitFor(() => {
          expect(screen.getByText('Terjadi kesalahan. Silakan coba lagi.')).toBeInTheDocument();
      });

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
  });
});
