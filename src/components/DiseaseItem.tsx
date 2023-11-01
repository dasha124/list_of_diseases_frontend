import Dispatch from "react";
import { FC, useState} from 'react'
import { Button, Card } from "react-bootstrap";
import "/home/student/reactProject/list_of_diseases/src/styles/examp.css"



interface Disease {
    image64: string
    disease_name: string
    sphere_name: string
    disease_id: number
}


const DiseaseItem: FC<Disease> = ({ image64, disease_name, sphere_name, disease_id}) => (
    <Card className="card_2">
        
        {/*<img className="img-card" src="data:image/jpeg;base64,{ image64 }" alt="картинка" />*/}
        <Card.Body className="card-body">
            <div>
                <Card.Text> { disease_name }</Card.Text>
            </div>
            
            { /*< p class="aspect_st">{{ disease.sphere_name }}</p> */}
            {/* <button className="butt_serv"><a href="{% url 'disease_url' disease.disease_id %}">{{ disease.disease_name }}</a></button> */}
            <div>
                <Card.Text className="aspect_st"> { sphere_name }</Card.Text>
            </div>
            
            <Button className="butt_serv"><a className="l1" href="{% url 'disease_url' disease.disease_id %}">Подробнее</a></Button>
            <Button className="butt_serv_2"><a className="l2" href="{% url 'delete_url' disease.disease_id %}">Удалить</a></Button>

        </Card.Body>
    </Card>
    )
export default DiseaseItem;




// import "./GroupPage.sass"
// import GroupInfo from "./GroupInfo/GroupInfo";
// import { useParams } from "react-router-dom";
// import {Group} from "../../Types";
// import {Dispatch} from "react";


// const GroupPage = ({ selectedGroup, setSelectedGroup }: { selectedGroup:Group | undefined, setSelectedGroup: Dispatch<Group | undefined> }) => {
//     const { id } = useParams<{id?: string}>();

//     if (id == undefined) {
//         return (
//             <div>404</div>
//         )
//     }

//     return (
//         <GroupInfo group_id={parseInt(id)} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
//     )
// }

// export default  GroupPage;