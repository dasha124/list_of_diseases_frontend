import React from "react";
import { FC, useState, useEffect} from 'react'
import "./ds.css"
import { Button, Card } from "react-bootstrap";
import {useParams} from "react-router-dom";
import { Col, Row, Spinner } from 'react-bootstrap'
import DiseaseItem from "./DiseaseItem";
import { DiseaseDetail, getDiseaseDetail } from "../modules/get-disease-detail";




const DiseaseCard: FC = () => {

    const [details, setDetails] = useState<DiseaseDetail |null>(null)
    const {id} = useParams<{id: string}>()

    const handlerGetDetail = async () => {
    if (id) {
        const data = await getDiseaseDetail(parseInt(id, 10));
        setDetails(data);
        }
    }
    useEffect(() => {
        handlerGetDetail();
      }, [id]);



    return (

        <div className="card_serv">

            <div>

                <p className="service-text"> { details?.disease_name }</p>

                <p></p>
                <p className="service-text"> Характерные симптомы:</p>
                <p></p>
    

                {/* {% for var in data.simptoms %}
                    <li class="service-text-li">{{ var }}</li>
                {% endfor %} */}
                

            </div>
        </div>

    )

}
export default DiseaseCard;