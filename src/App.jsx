import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ClientFormPage from './pages/ClientFormPage';
import { ClientProvider } from './context/ClientContext';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ClientProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="new" element={<ClientFormPage />} />
            <Route path="edit/:id" element={<ClientFormPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ClientProvider>
  );
}

export default App;
