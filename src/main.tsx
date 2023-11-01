
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { FC, useEffect, useState} from 'react'


import 'bootstrap/dist/css/bootstrap.min.css'
import ITunesPage from './last/ITunesPage.tsx'
import DiseaseCard from './components/DiseaseCard.tsx'
import DiseasesList from './DiseasesList.tsx'
import DiseaseItem from './components/DiseaseItem.tsx'

const router = createBrowserRouter([

  {
    path:'/list_of_diseases',
    element: <DiseasesList/>
  },
  {
    path: '/list_of_diseases/:id/',
    element: <DiseaseCard/>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
