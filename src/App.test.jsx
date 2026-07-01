import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

vi.mock('./components/TopNavBar', () => ({
  default: ({ notifications, onOpenAdmin }) => (
    <div data-testid="top-nav-bar">
      TopNavBar (Notifications: {notifications.length})
      <button onClick={onOpenAdmin}>Open Admin</button>
    </div>
  )
}));
vi.mock('./components/Hero', () => ({ default: () => <div data-testid="hero">Hero</div> }));
vi.mock('./components/Stats', () => ({ default: () => <div data-testid="stats">Stats</div> }));
vi.mock('./components/LatestActivities', () => ({ default: () => <div data-testid="latest-activities">LatestActivities</div> }));
vi.mock('./components/Announcements', () => ({ default: () => <div data-testid="announcements">Announcements</div> }));
vi.mock('./components/CTA', () => ({
  default: ({ onOpenRegistration, onOpenPayment }) => (
    <div data-testid="cta">
      CTA
      <button onClick={onOpenRegistration}>Open Registration</button>
      <button onClick={onOpenPayment}>Open Payment</button>
    </div>
  )
}));
vi.mock('./components/Footer', () => ({ default: () => <div data-testid="footer">Footer</div> }));

vi.mock('./components/Modals/RegistrationModal', () => ({
  default: ({ isOpen, onClose }) => isOpen ? (
    <div data-testid="registration-modal">
      RegistrationModal
      <button onClick={onClose}>Close Registration</button>
    </div>
  ) : null
}));

vi.mock('./components/Modals/PaymentModal', () => ({
  default: ({ isOpen, onClose, onSuccess }) => isOpen ? (
    <div data-testid="payment-modal">
      PaymentModal
      <button onClick={onClose}>Close Payment</button>
      <button onClick={() => onSuccess('John Doe')}>Success Payment</button>
    </div>
  ) : null
}));

vi.mock('./components/Modals/AdminModal', () => ({
  default: ({ isOpen, onClose, onSuccessTagihan, onSuccessSurat }) => isOpen ? (
    <div data-testid="admin-modal">
      AdminModal
      <button onClick={onClose}>Close Admin</button>
      <button onClick={() => onSuccessTagihan('Januari')}>Success Tagihan</button>
      <button onClick={() => onSuccessSurat('001/SK/2023')}>Success Surat</button>
    </div>
  ) : null
}));

describe('App Component', () => {
  beforeEach(() => {
    // Mock the date to ensure deterministic tests for notifications
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-01-01T10:30:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders all main components and no modals initially', () => {
    render(<App />);

    expect(screen.getByTestId('top-nav-bar')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('stats')).toBeInTheDocument();
    expect(screen.getByTestId('latest-activities')).toBeInTheDocument();
    expect(screen.getByTestId('announcements')).toBeInTheDocument();
    expect(screen.getByTestId('cta')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    expect(screen.queryByTestId('registration-modal')).not.toBeInTheDocument();
    expect(screen.queryByTestId('payment-modal')).not.toBeInTheDocument();
    expect(screen.queryByTestId('admin-modal')).not.toBeInTheDocument();
  });


  it('opens registration modal when Open Registration button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Open Registration'));
    expect(screen.getByTestId('registration-modal')).toBeInTheDocument();
  });

  it('opens payment modal when Open Payment button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Open Payment'));
    expect(screen.getByTestId('payment-modal')).toBeInTheDocument();
  });

  it('opens admin modal when Open Admin button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Open Admin'));
    expect(screen.getByTestId('admin-modal')).toBeInTheDocument();
  });


  it('closes registration modal when Close Registration button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Open Registration'));
    expect(screen.getByTestId('registration-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Registration'));
    expect(screen.queryByTestId('registration-modal')).not.toBeInTheDocument();
  });

  it('closes payment modal when Close Payment button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Open Payment'));
    expect(screen.getByTestId('payment-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Payment'));
    expect(screen.queryByTestId('payment-modal')).not.toBeInTheDocument();
  });

  it('closes admin modal when Close Admin button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Open Admin'));
    expect(screen.getByTestId('admin-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Admin'));
    expect(screen.queryByTestId('admin-modal')).not.toBeInTheDocument();
  });

  it('adds notification and passes it to TopNavBar on payment success', () => {
    render(<App />);
    expect(screen.getByText('TopNavBar (Notifications: 0)')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Open Payment'));
    fireEvent.click(screen.getByText('Success Payment'));

    expect(screen.getByText('TopNavBar (Notifications: 1)')).toBeInTheDocument();
  });

  it('adds notification and passes it to TopNavBar on admin success tagihan', () => {
    render(<App />);
    expect(screen.getByText('TopNavBar (Notifications: 0)')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Open Admin'));
    fireEvent.click(screen.getByText('Success Tagihan'));

    expect(screen.getByText('TopNavBar (Notifications: 1)')).toBeInTheDocument();
  });

  it('adds notification and passes it to TopNavBar on admin success surat', () => {
    render(<App />);
    expect(screen.getByText('TopNavBar (Notifications: 0)')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Open Admin'));
    fireEvent.click(screen.getByText('Success Surat'));

    expect(screen.getByText('TopNavBar (Notifications: 1)')).toBeInTheDocument();
  });
});
