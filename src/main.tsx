import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import DiseaseCard from './pages/DiseaseCard.tsx'
import DiseasesList from './pages/DiseasesList.tsx'
import SignInPage from './pages/SignIn.tsx'
import SignUpPage from './pages/SignUp.tsx'
import AccountPage from './pages/AccountPage.tsx'


const router = createBrowserRouter([

  {
    path:'/diseases/',
    element: <DiseasesList/>
  },
  {
    path: '/diseases/:id/',
    element: <DiseaseCard/>,
  },
  {
    path: '/login/',
    element: <SignInPage/>,
  },
  {
    path: '/signUp/',
    element: <SignUpPage/>,
  },
  {
    path: '/acc/',
    element: <AccountPage/>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
