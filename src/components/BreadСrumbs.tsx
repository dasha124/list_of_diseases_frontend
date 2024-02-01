import {  useLocation, useNavigate } from "react-router-dom";
import "./BreadCrumbs.css"
import {FaChevronRight} from "react-icons/fa";
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

        
        let currentLink = 'list_of_diseases_frontend'
        let cur = 'list_of_diseases_frontend'

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div key={crumb}>
                    
                    <span onClick={() => navigate(`/${crumb}`)}>
                    {topics[crumb]}
                    </span>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('(\d*)')))
        {
            return (
                <div key={crumb}>

                    <span onClick={(e) => e.preventDefault()}>
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


export default BreadCrumbs;