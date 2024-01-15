import {BrowserRouter, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from "../src/components/Header/Header";
import BreadCrumbs from "/home/student/front/list_of_diseases_frontend/src/components/BreadCrumbs/BreadСrumbs.tsx";
import DiseasePage from "./pages/DiseasePage/DiseasePage";
import DiseasePageEdit from "./pages/DiseasePage/DiseasePageEdit";
import SignIn from "./pages/LoginPage/SignIn/SignIn";
import SignUp from "./pages/LoginPage/SignUp/SignUp";
import {Provider} from "react-redux"
import store from "./store/store" 
// import { store } from "/home/student/front/list_of_diseases_frontend/src/store/store"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DrugConstructor from "../src/components/DrugConstructor/DrugConstructor";
import {useAuth} from "./hooks/useAuth";
import DraftDrugPage from "./pages/DraftDrugPage/DraftDrugPage";
import DrugsPage from "../src/pages/DrugsList/DrugsList";
import DiseaseListPage from "../src/pages/DiseasesList/DiseaseList";
import {QueryClient, QueryClientProvider } from "react-query";
import {Disease, Drug} from "./Types";
import {useState} from "react";
import DrugPage from "./pages/DrugPage/DrugPage";
import NotFoundPage from "./pages/NotFoundPage"
import React from "react";
import DiseaseCardAdd from "./pages/DiseasePage/DiseaseInfo/DiseaseCardAdd/DiseaseCardAdd"
import Menu from "/home/student/front/list_of_diseases_frontend/src/pages/MenuPage/Menu.tsx"



const LoginFormLayout = () => {
  return (
      <div className="login-wrapper">
        <Outlet />
      </div>
  )
}

const TopPanelWrapper = () => {
  const {is_authenticated} = useAuth()
  const location = useLocation()

  return (
      <div className="top-panels-wrapper">
        <BreadCrumbs />
      </div>
  )
}



function App() {
  const [selectedDrug, setSelectedDrug] = useState<Drug | undefined>(undefined);
  const [selectedDisease, setSelectedDisease] = useState<Disease | undefined>(undefined);
  const queryClient = new QueryClient()
  

  return (
      <QueryClientProvider client={queryClient}>

        <Provider store={store}>

          <BrowserRouter basename="">

            <div className="App">

              <div className="wrapper">

                <ToastContainer />

                <Header />

                <div className="content-wrapper">

                  <TopPanelWrapper />

                  <Routes>


                    <Route path="/register/" element={<SignUp />} />
                    <Route path="/login/" element={<SignIn />} />

                    <Route path="/" element={<Menu />} />

                    <Route path="/diseases/" element={<DiseaseListPage />} />
                    <Route path="/diseases/:id" element={<DiseasePage selectedDisease={selectedDisease} setSelectedDisease={setSelectedDisease} />} />
                    <Route path="/diseases/:id/update" element={<DiseasePageEdit selectedDisease={selectedDisease} setSelectedDisease={setSelectedDisease}/>} />
                    <Route path="/diseases/add/" element={<DiseaseCardAdd selectedDisease={selectedDisease} setSelectedDisease={setSelectedDisease}/>} />
                    

                    <Route path="/drugs/" element={<DrugsPage />} />

                    <Route path="/drugs/:id/" element={<DrugPage selectedDrug={selectedDrug} setSelectedDrug={setSelectedDrug}/>} />

                    <Route path="/drugs/create_drug/" element={<DraftDrugPage />} />


                    
                    

                  </Routes>

                </div>

              </div>

            </div>

          </BrowserRouter>
        </Provider>

      </QueryClientProvider>
  )
}

export default App;