import { Card } from "react-bootstrap";
import { Dispatch, useState } from "react";
import { Disease } from "../../../../Types";
// import { requestTime } from "../../../Consts";
import "/home/student/front/list_of_diseases_frontend/src/components/ds.css";
import { DOMEN } from "/home/student/front/list_of_diseases_frontend/src/Consts.tsx";
// import { useAuth } from "/home/student/front/list_of_diseases_frontend/src/hooks/useAuth.ts";
import { useSession } from "../../../../hooks/useSession";
import "/home/student/front/list_of_diseases_frontend/src/pages/DiseasePage/DiseaseInfo/DiseaseInfoEdit.css";
import "/home/student/front/list_of_diseases_frontend/src/components/ds.css";
import axios from 'axios';


interface DiseaseCardAddProps { disease_id?: number | undefined; selectedDisease: Disease | undefined; setSelectedDisease: Dispatch<Disease | undefined>;}

const DiseaseCardAdd: React.FC<DiseaseCardAddProps> = ({}) => {

  const [diseaseName, setDiseaseName] = useState("");
  const [Info, setDiseaseInfo] = useState("");
  const [Simpt, setDiseaseSimpt] = useState("");
  const [file, setFile] = useState<File | null>(null);



  const { access_token } = useSession();


  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('disease_name', diseaseName);
      formData.append('general_info', Info);
      formData.append('simptoms', Simpt);
      if (file) {
        formData.append('image', file);
      }
      await axios.post(`${DOMEN}/diseases/post/`, formData, {
        headers: {
          'Authorization': access_token,
        },
      });
      
      setDiseaseName("");
      setDiseaseInfo("");
      setDiseaseSimpt("");
      setFile(null);
    } catch (e) {
    }
  };
  


  return (
    <div className="card-container">
      <Card className="card0">
        <div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Название заболевания"
              value={diseaseName}
              onChange={(e) => setDiseaseName(e.target.value)}
            />
          </div>
  
          <div style={{ marginBottom: '10px' }}>
            <textarea
              style={{ fontFamily: 'Arial' }}
              placeholder="Общая информация"
              value={Info}
              onChange={(e) => setDiseaseInfo(e.target.value)}
            />
          </div>
  
          <div style={{ marginBottom: '10px' }}>
            <textarea
              style={{ fontFamily: 'Arial' }}
              placeholder="Симптомы"
              value={Simpt}
              onChange={(e) => setDiseaseSimpt(e.target.value)}
            />
          </div>
  
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
  
          <button className="link0" onClick={saveChanges}>
            Добавить
          </button>
        </div>
      </Card>
    </div>
  );
  
};

export default DiseaseCardAdd;

