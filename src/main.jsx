import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import Home from './pages/Home/Home.jsx'
import { RouterProvider } from 'react-router-dom'
import Gallery from './pages/gallery/Gallery.jsx'
import Journal from './pages/journal/Journal.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        index: true,
        element:<Home/>
      },
      {
        path: 'gallery',
        element: <Gallery/>
      },
      {
        path: 'journal',
        element: <Journal/>
      }

    ]

}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
