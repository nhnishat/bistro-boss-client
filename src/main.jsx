import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './Pages/Auth/AuthProvider.jsx';
import router from './Routes/router.jsx';
import './index.css';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<HelmetProvider>
				<div className="max-w-screen-xl mx-auto">
					<AuthProvider>
						<RouterProvider router={router} />
					</AuthProvider>
				</div>
			</HelmetProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
