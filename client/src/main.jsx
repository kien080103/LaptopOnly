import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from './store/Provider.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/index.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider>
            <Router>
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.component} />
                    ))}
                </Routes>
            </Router>
        </Provider>
    </StrictMode>,
);
