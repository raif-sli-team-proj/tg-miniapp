import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from "./store";

import { MiniApp } from './MiniApp.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <Provider store={store}>
            <MiniApp />
        </Provider>
    </StrictMode>
);
