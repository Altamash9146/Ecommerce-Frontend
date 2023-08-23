import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Store Setup
import store from './Store/Store';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

//Store to persist
const persistedStore = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <Provider store={store} >
       <PersistGate loading={<div>Loading....</div>} persistor={persistedStore} >
            <App />
       </PersistGate>
    </Provider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
