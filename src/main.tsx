import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css'
import App from './App.tsx'
import PageTest from './pages/test.tsx';
import PageProjects from './pages/projects/index.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path="test/:value" element={<PageTest />} />
            <Route path="projects/:project_title" element={<PageProjects />} />
        </Routes>
    </BrowserRouter>
)
