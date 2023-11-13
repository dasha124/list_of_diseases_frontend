import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import DiseaseCard from './DiseaseCard.tsx'
import DiseasesList from './DiseasesList.tsx'

const router = createBrowserRouter([

  {
    path:'/diseases/',
    element: <DiseasesList/>
  },
  {
    path: '/diseases/:id/',
    element: <DiseaseCard/>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
