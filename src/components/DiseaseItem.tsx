// import { FC, useState, useEffect} from 'react'
import {FC} from 'react'
import { Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Buffer } from 'buffer';
import '/home/student/front/start_for_gp/list_of_diseases_frontend/src/components/ds.css'


interface Disease {
    image: string,
    disease_name: string,
    disease_id: number
}




// const DiseaseItem: FC<Disease> = ({ image64, disease_name, disease_id}) => {
const DiseaseItem: FC<Disease> = ({ disease_name, disease_id, image}) => {
    

    return (
        
        <Card className='card'>
        
        {/* <img src={image64} alt={disease_name} className="custom-card-img" /> */}
        
        {<Card.Img className="img-card" variant="top" src={"data:image/png;base64," + image} height={100} width={100} />}
        <Card.Body>
            <div>
                <Card.Text> { disease_name }</Card.Text>
            </div>
            
            <Button className="btn" href={"http://localhost:3000/list_of_diseases_frontend/"+disease_id}>Подробнее</Button>
            {/* <Button className="btn" href={"http://localhost:3000/diseases/"+disease_id}>Удалить</Button> */}

        </Card.Body>
        </Card>
    )


}
export default DiseaseItem;








