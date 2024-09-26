import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Index from './pages/IndexPage/Index';
import FileUpload from './pages/FileUploadPage/FileUpload';
import TableDisplay from './pages/TablePage/TableDisplay';
import SomeTable from './components/Tables/SomeTable';
import router from './routes/routes';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Index />
    <TableDisplay />
    <FileUpload />
  </>
)
