import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css'
import App from './App.tsx'
import PageTest from './pages/test.tsx';
import PageProjects from './pages/projects/index.tsx';
import NavigationBar from './components/navigation bar/index.tsx';
import Footer from './components/footer/index.tsx';
import { CustomCursor } from './components/ui/cursor/index.tsx';
import PageAbout from './pages/about/index.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <NavigationBar />
        <CustomCursor />
        <Routes>
            <Route path='/' element={<App />} />
            <Route path="test/:value" element={<PageTest />} />
            <Route path="projects/:project_title" element={<PageProjects />} />
            <Route path="about" element={<PageAbout />} />
        </Routes>
        <Footer />
    </BrowserRouter>
)
