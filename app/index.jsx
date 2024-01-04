import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';

import { MiniApp } from './MiniApp.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <MiniApp />
    </StrictMode>
);
