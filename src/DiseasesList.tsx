import { FC, useState, useEffect} from 'react';
import InputField from './components/InputField';
import { Col, Row, Spinner, Container } from 'react-bootstrap'
import DiseaseItem from "./components/DiseaseItem";
import { Disease, getDisease } from "./modules/get-disease";
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNavbar from "./MyNavbar";






const DiseasesList: FC = () => {

    const [searchValue, setSearchValue] = useState('');
    const [disease, setDisease] = useState<Disease[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () =>{
        await setLoading(true)
        const result = await getDisease(searchValue)
        await setDisease(result)
        await setLoading(false)
    }
    useEffect(() => {

        handleSearch();
        console.log(disease)
      }, []);

    return (
        <div>
            <MyNavbar/>
            {/* <BreadCrumbs /> */}
            <Container>
            <div className={`container ${loading && 'containerLoading'}`}>
                {loading && <div className="loadingBg"><Spinner animation="border"/></div>}

                <InputField
                    value={searchValue}
                    setValue={(value) => setSearchValue(value)}
                    loading={loading}
                    onSubmit={handleSearch}
                />
            
                {!disease.length && <div>
                    <h1>К сожалению, пока ничего не найдено :(</h1>
                </div>}

                <Row xs={4} md={4} className="g-4">
                    {disease.map((item, index)=> (
                        <Col key={index}>
                            <DiseaseItem {...item} />
                        </Col>
                    ))}
                </Row>
                
            </div>
            </Container>

        </div>
        
        
    )
    

}
export default DiseasesList;





























// import React from "react";
// import { FC, useState, useEffect} from 'react';
// import DiseaseCards from "./components/DiseaseCards";
// import InputField from "./components/last/InputField";
// import ReactDOM from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import DiseaseItem from "./components/DiseaseItem";


// interface Disease{
//     image64: string
//     disease_name: string
//     sphere_name: string
//     disease_id: number
// }


// const DiseasesList: FC = () => {

//     const [searchValue, setSearchValue] = useState('');
//     const [modelings, setModelings] = useState<DiseaseItem[]>([]);
//     const [loading, setLoading] = useState(false);

//     const diseases: Disease [] = [
//         {
//         image64: "путь/к/изображению.jpg",
//         disease_name: "Название болезни_1",
//         sphere_name:"Название сферы_1",
//         disease_id: 123
//         },
    
//         {
//             image64: "путь/к/изображению.jpg",
//             disease_name: "Название болезни_2",
//             sphere_name:"Название сферы_2",
//             disease_id: 123
//         }
//     ]

//     return (
//         <BrowserRouter basename="">
//             {/* <div className="navbar">

//             </div> */}
//                 <Routes>
//                     {/* <Route path='/diseases' element={<DiseaseCards diseases={diseases}/>}/>
//                     <Route path='/diseases/:id' element={<DiseaseItem disease={diseases[disease_id]}/>}/> */}
//                     {/* <Navigate to='diseases'/> */}
//                     <Route path='/diseases' element={<DiseaseCards/>}/>
//                     <Route path='/diseases/:id' element={<DiseaseItem />}/>
//                 </Routes>

            
//         </BrowserRouter>

      

//     )}
// export default DiseasesList;


