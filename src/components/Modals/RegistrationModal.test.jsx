import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationModal from './RegistrationModal';
import { vi } from 'vitest';

describe('RegistrationModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  const fillForm = async (user) => {
    await user.type(screen.getByPlaceholderText(/Masukkan nama lengkap beserta gelar/i), 'John Doe');
    await user.type(screen.getByPlaceholderText(/Masukkan NIP/i), '123456');
    await user.type(screen.getByPlaceholderText(/Masukkan Nomor Anggota \(opsional\)/i), '7890');
    await user.type(screen.getByPlaceholderText(/Contoh: SD NEGERI NEGLASARI/i), 'Test Unit');
  };

  it('displays error message when fetch throws an error', async () => {
    const user = userEvent.setup();
    // Mock fetch to reject
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    render(<RegistrationModal {...defaultProps} />);

    await fillForm(user);

    const submitButton = screen.getByRole('button', { name: /Kirim Pendaftaran/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Terjadi kesalahan saat mengirim data\. Silakan coba lagi\./i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('displays error message when fetch returns status !== success', async () => {
    const user = userEvent.setup();
    // Mock fetch to resolve but with error status
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 'error', message: 'Invalid data' }),
      })
    );

    render(<RegistrationModal {...defaultProps} />);

    await fillForm(user);

    const submitButton = screen.getByRole('button', { name: /Kirim Pendaftaran/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Terjadi kesalahan saat mengirim data\. Silakan coba lagi\./i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
