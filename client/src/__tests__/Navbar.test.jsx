import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navbar from '../components/Navbar';
import {BrowserRouter as Router} from 'react-router-dom';
import { mkstore } from './mockup-store';

const mockStore = configureStore([]);

describe('Navbar Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(mkstore);
  });

  test('renders Navbar with user email and notification count', () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/admin_03@cogniman.eu/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
    expect(screen.getByText(/Create User/i)).toBeInTheDocument();
  });
});