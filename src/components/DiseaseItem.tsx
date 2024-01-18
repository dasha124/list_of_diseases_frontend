// import { FC, useState, useEffect} from 'react'
import {FC} from 'react'
import { Card, Button } from "react-bootstrap";
// import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Buffer } from 'buffer';
import '/home/student/front/start_for_gp/list_of_diseases_frontend/src/components/ds.css'
import { useNavigate } from 'react-router-dom';



interface Disease {
    image: string,
    disease_name: string,
    id: number
}




// const DiseaseItem: FC<Disease> = ({ image64, disease_name, disease_id}) => {
const DiseaseItem: FC<Disease> = ({ disease_name, id, image}) => {
    const navigate = useNavigate();
    

    return (
        
        <Card className='card'>
        
        {/* <img src={image64} alt={disease_name} className="custom-card-img" /> */}
        
        {<Card.Img className="img-card" variant="top" src={"data:image/png;base64," + image} height={100} width={100} />}
        <Card.Body>
            <div>
                <Card.Text> { disease_name }</Card.Text>
            </div>

            {/* <div style={{backgroundColor: "red", height: '15px', width: "25px"}}>
            <Link to={"list_of_diseases_frontend/"+ disease_id}>Подробнее</Link>
            </div> */}
            
            <Button className="btn" onClick={()=>navigate(`/list_of_diseases_frontend/${id}`)} >Подробнее</Button>
            {/* <Button className="btn" href={"http://localhost:3000/diseases/"+disease_id}>Удалить</Button> */}

        </Card.Body>
        </Card>
    )


}
export default DiseaseItem;








