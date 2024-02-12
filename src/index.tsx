import React from 'react';
import ReactDOM from "react-dom/client";
import { PersistGate } from 'redux-persist/integration/react'; // PersistGate ekle
import { Provider } from 'react-redux';
import { store, persistor } from './store/store'; // store ve persistor'u içeri aktar
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement, 
);

root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
);

reportWebVitals();
