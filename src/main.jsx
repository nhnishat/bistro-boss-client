import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './Routes/Router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<div className="max-w-screen-xl mx-auto">
			<RouterProvider router={Router} />
		</div>
	</React.StrictMode>
);
