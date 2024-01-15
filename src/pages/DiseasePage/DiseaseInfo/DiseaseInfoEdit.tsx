//import "./DiseaseInfo.css"

import { Card } from "react-bootstrap";
import {Dispatch, useEffect, useState} from "react";
import {Disease} from "../../../Types";
import {requestTime} from "../../../Consts";
// import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
// import {useSession} from "../../../hooks/useSession";
// import {DiseaseDetail} from "../../../modules/get-disease-detail";
import "/home/student/front/list_of_diseases_frontend/src/components/ds.css"
import {DOMEN} from "/home/student/front/list_of_diseases_frontend/src/Consts.tsx"
import {useAuth} from "/home/student/front/list_of_diseases_frontend/src/hooks/useAuth.ts"
import {useSession} from "../../../hooks/useSession";
import "./DiseaseInfoEdit.css"


import axios from 'axios';



interface DiseaseInfoEditProps { disease_id: number | undefined; selectedDisease: Disease | undefined; setSelectedDisease: Dispatch<Disease | undefined>;}

const DiseaseInfoEdit: React.FC<DiseaseInfoEditProps> = ({ disease_id, selectedDisease, setSelectedDisease}) => {

  const [diseaseName, setDiseaseName] = useState("");
  const [Info, setDiseaseInfo] = useState("");
  const [Simpt, setDiseaseSimpt] = useState("");
  const [file, setFile] = useState<File | null>(null);



  const { access_token } = useSession();

  const fetchData = async () => {
    try {
      const response1 = await axios.get(`${DOMEN}/diseases/${disease_id}/`, {
        method: "GET",
      });
      const disease = response1.data;
      setSelectedDisease(disease);
      setDiseaseName(disease.disease_name);
      setDiseaseInfo(disease.general_info);
      setDiseaseSimpt(disease.simptoms)
    } catch (e) {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('disease_name', diseaseName);
      formData.append('general_info', Info);
      formData.append('simptoms', Simpt);
      if (file) {
        formData.append('image', file);
      }
      
      await axios.put(`${DOMEN}/diseases/${disease_id}/update/`, formData, {
        headers: {
            'Authorization': `${access_token}`
        },
      });

      fetchData();
    } catch (e) {
    }
  };



  return (
    <div className="card-container">
      <Card className="card0">
        <div>
          {selectedDisease ? (
            <div>
                {<Card.Img  variant="top" src={"data:image/png;base64," + selectedDisease?.image} height={90} width={110} />}
              <div style={{ marginBottom: '5px' }}>
                <input
                  type="text"
                  value={diseaseName}
                  onChange={(e) => setDiseaseName(e.target.value)}
                />
              </div>

              <div>
                <textarea
                    style={{ fontFamily: 'Arial' }}
                    value={Info}
                    onChange={(e) => setDiseaseInfo(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: '3px' }}>
                <textarea
                    style={{ fontFamily: 'Arial' }}
                    value={Simpt}
                    onChange={(e) => setDiseaseSimpt(e.target.value)}
                />
            </div>


            <div>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />

            </div>



              <button className="link0" onClick={saveChanges}>Сохранить</button>
            </div>
          ) : (
            <p>Загрузка...</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DiseaseInfoEdit;
