import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AlertComponent from '../components/AlertComponent';
import * as router from 'react-router-dom'; // Import * as router to access the original router functions
import { mkstore } from './mockup-store';
const mockStore = configureStore([]);

describe('AlertComponent', () => {
  let store;
  let navigate;

  beforeEach(() => {
    store = mockStore(mkstore);
  });

  test('renders AlertComponent with alerts and unresolved count', () => {
    render(
      <Provider store={store}>
        <router.BrowserRouter>
          <AlertComponent />
        </router.BrowserRouter>
      </Provider>
    );

    // Check if the bell icon button is rendered
    expect(screen.getByRole('button', { name: /bell/i })).toBeInTheDocument();

    // Click the bell icon to open the modal
    fireEvent.click(screen.getByRole('button', { name: /bell/i }));

    // Check if the modal is opened with alerts
    expect(screen.getByText(/Alerts/i)).toBeInTheDocument();
    expect(screen.getByText(/Critical/i)).toBeInTheDocument();
    expect(screen.getByText(/Info/i)).toBeInTheDocument();
    expect(screen.getByText(/Warning/i)).toBeInTheDocument();
  });
});