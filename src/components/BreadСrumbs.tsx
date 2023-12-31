import { Link, useLocation } from "react-router-dom";
import '/home/student/frontend/list_of_diseases_frontend/src/components/ds.css'


function BreadCrumbs(){
    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
        currentLink += `/${crumb}`

        return(
            <div className="crumb" key={crumb}>
                <Link to={currentLink}>{crumb}</Link>
            </div>
        )
    })
    return(
        <div className="breadcrumbs">
            {crumbs}
        </div>
    )
}

export default BreadCrumbs;