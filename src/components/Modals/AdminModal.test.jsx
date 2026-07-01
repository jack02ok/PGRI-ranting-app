import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AdminModal from './AdminModal';

describe('AdminModal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders nothing when isOpen is false', () => {
    render(<AdminModal isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText('Panel Pengurus')).not.toBeInTheDocument();
  });

  it('renders correctly when isOpen is true', () => {
    render(<AdminModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Panel Pengurus')).toBeInTheDocument();

    // Default tab should be tagihan
    expect(screen.getByText('Bulan Tagihan')).toBeInTheDocument();
    expect(screen.getByText('Nominal Iuran Wajib (Rp)')).toBeInTheDocument();
  });

  it('switches tabs correctly', () => {
    render(<AdminModal isOpen={true} onClose={vi.fn()} />);

    // Initial state: Tagihan form
    expect(screen.getByText('Bulan Tagihan')).toBeInTheDocument();
    expect(screen.queryByText('Jenis Surat')).not.toBeInTheDocument();

    // Switch to Surat tab
    const uploadSuratTab = screen.getByRole('button', { name: /upload surat/i });
    fireEvent.click(uploadSuratTab);

    // Assert Surat form is shown
    expect(screen.queryByText('Bulan Tagihan')).not.toBeInTheDocument();
    expect(screen.getByText('Jenis Surat')).toBeInTheDocument();
    expect(screen.getByText('Nomor Surat')).toBeInTheDocument();
    expect(screen.getByText('Perihal')).toBeInTheDocument();
    expect(screen.getByText('File Dokumen (PDF/JPG)')).toBeInTheDocument();

    // Switch back to Tagihan tab
    const kirimTagihanTab = screen.getByRole('button', { name: /kirim tagihan/i });
    fireEvent.click(kirimTagihanTab);

    expect(screen.getByText('Bulan Tagihan')).toBeInTheDocument();
    expect(screen.queryByText('Jenis Surat')).not.toBeInTheDocument();
  });
  it('submits tagihan form successfully', async () => {
    const onSuccessTagihan = vi.fn();
    render(<AdminModal isOpen={true} onClose={vi.fn()} onSuccessTagihan={onSuccessTagihan} />);

    const bulanInput = screen.getByLabelText('Bulan Tagihan');
    const nominalInput = screen.getByLabelText('Nominal Iuran Wajib (Rp)');

    fireEvent.change(bulanInput, { target: { value: '2023-10' } });
    fireEvent.change(nominalInput, { target: { value: '50000' } });

    const form = bulanInput.closest('form');
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(screen.getByText('Sedang memproses...')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(onSuccessTagihan).toHaveBeenCalledWith('2023-10');
    expect(screen.getByText('Tagihan Terkirim!')).toBeInTheDocument();
  });

  // Since SCRIPT_URL is hardcoded to "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE" and
  // it intercepts the fetch logic with a timeout, we can't easily test the fetch error branch
  // unless we mock it or the component allows prop injection. We will just test the mock success flow
  // for now since that's what the component does when unmodified.

  it('submits surat form successfully', async () => {
    const onSuccessSurat = vi.fn();
    render(<AdminModal isOpen={true} onClose={vi.fn()} onSuccessSurat={onSuccessSurat} />);

    // Switch to Surat tab
    fireEvent.click(screen.getByRole('button', { name: /upload surat/i }));

    // Fill form
    const jenisSelect = screen.getByLabelText('Jenis Surat');
    const nomorInput = screen.getByLabelText('Nomor Surat');
    const perihalInput = screen.getByLabelText('Perihal');
    const fileInput = screen.getByLabelText('File Dokumen (PDF/JPG)');

    fireEvent.change(jenisSelect, { target: { value: 'Eksternal' } });
    fireEvent.change(nomorInput, { target: { value: '002/PGRI/2023' } });
    fireEvent.change(perihalInput, { target: { value: 'Undangan' } });

    // Mock FileReader
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });

    // Create a mock FileReader implementation
    const mockFileReader = {
      readAsDataURL: vi.fn(function() {
        this.result = 'data:application/pdf;base64,dummy';
        if (this.onloadend) {
          this.onloadend();
        }
      }),
    };
    global.FileReader = vi.fn(function() {
      return mockFileReader;
    });

    await act(async () => {
      fireEvent.change(fileInput);
    });

    // Submit
    const form = jenisSelect.closest('form');
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(screen.getByText('Sedang memproses...')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(onSuccessSurat).toHaveBeenCalledWith('002/PGRI/2023');
    expect(screen.getByText('Surat Diarsipkan!')).toBeInTheDocument();
  });
});
