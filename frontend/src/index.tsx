import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataRefreshProvider } from './hooks/useDataRefresh';
import { EventGroupsServiceProvider } from './hooks/useEventGroupsService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataRefreshProvider>
        <EventGroupsServiceProvider>
            <App />
        </EventGroupsServiceProvider>
    </DataRefreshProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
