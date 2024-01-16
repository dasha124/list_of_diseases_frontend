import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route } from 'react-router-dom';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import DiseaseCard from './DiseaseCard.tsx'
import DiseasesList from './DiseasesList.tsx'

// const router = createBrowserRouter([

//   {
//     path:'/diseases/',
//     element: <DiseasesList/>
//   },
//   {
//     path: '/diseases/:id/',
//     element: <DiseaseCard/>,
//   },

// ]);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Navigation /> */}
      {/* <Breadcrumbs /> */}
      <Routes>
        <Route path="/list_of_diseases_frontend/" Component={DiseasesList} />
        <Route path="/list_of_diseases_frontend/:id/" Component={DiseaseCard} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
