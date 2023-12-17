// import { FC, useState, useEffect} from 'react'
import {FC} from 'react'
import { Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Buffer } from 'buffer';
import '/home/student/front/list_of_diseases_frontend/src/components/ds.css'


interface Disease {
    image: string,
    disease_name: string,
    id: number,
    simptoms: string,
}




// const DiseaseItem: FC<Disease> = ({ image64, disease_name, disease_id}) => {
const DiseaseItem: FC<Disease> = ({ disease_name, id, image}) => {
    

    return (
        
        <Card className='card'>
        
        {/* <img src={image64} alt={disease_name} className="custom-card-img" /> */}
        
        {<Card.Img className="cardImage" variant="top" src={"data:image/png;base64," + image} height={100} width={100} />}
        <Card.Body>
            <div>
                <Card.Text> { disease_name }</Card.Text>
            </div>
            
            <Button className="btn" href={"http://localhost:3000/diseases/"+id}>Подробнее</Button>
            <Button className="btn" href={"http://localhost:3000/diseases/"+id}>Добавить</Button>

        </Card.Body>
        </Card>
    )


}
export default DiseaseItem;








