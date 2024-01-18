import {  useLocation, useNavigate } from "react-router-dom";
import "./BreadCrumbs.css"
import {FaChevronRight} from "react-icons/fa";
import { useState } from "react";
// import { Breadcrumb } from "react-bootstrap";
// import { nameMatching } from "./names";



function BreadCrumbs(){

    
 
    const location = useLocation()
    const navigate= useNavigate()

    // let currentLink = 'list_of_diseases_frontend'



    type Topics = {
        [key: string]: string;
    };

    const topics: Topics = {
        list_of_diseases_frontend: "Заболевания",
        draft: "Заявка",
        // home: "Главная",
        profile: "Профиль",
        login: "Вход",
        register: "Регистрация"
    };

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        let currentLink='list_of_diseases_frontend/'

        currentLink += `/${crumb}`

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    {/* <Link to={currentLink} >
                        {topics[crumb]}
                    </Link> */}
                    
                    <span onClick={() => navigate(currentLink)}>
                    {topics[crumb]}
                    </span>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('list_of_diseases_frontend/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <span onClick={() => navigate(currentLink)}>
                     Заболевание
                    </span>

                    

                </div>
            )
        }
    });
    return(
        <div className={"breadcrumbs-wrapper"}>
        <div className="breadcrumbs">

            <div>

            </div>

            {crumbs}

        </div>
    </div>
    )
}


    // const pathComponents = path.split('/').slice(1);

    // const goto = (index: number) => {
    //     const nestedPath = pathComponents.slice(0, index+1).join('/');
    //     navigate(`/list_of_diseases_frontend/${nestedPath}`);
    // }

    // useEffect(() => {
    //     setPath(location.pathname.split('/').slice(1).join('/'));
    // }, [location.pathname]);


    // return (
    //     <Breadcrumb>
    //     {pathComponents?.map((component, index) => (
    //     <Breadcrumb.Item onClick={() => goto(index)} key={index}>
    //         {nameMatching(component)}
    //     </Breadcrumb.Item>
    //     ))}
    //     </Breadcrumb>
    // );
    // }

export default BreadCrumbs;