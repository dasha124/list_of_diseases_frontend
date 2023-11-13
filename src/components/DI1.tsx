import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';





const DI1 = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get('/api/diseases/')
        setData(response.data);

      };
  
      fetchData();
    }, []);
	
	const result = Object.values(data);
    return (       
        <div className="card text-center">
  			<div className="card-header">
				{result[0]}
  			</div>
  			<div className="card-body">
			  <img className="cardImage" src={result[2]} height={200} width={200}  />
			  <hr></hr>
    			<h5 className="card-title">Цена: {result[3]}</h5>
    			<p className="card-text">Описание: {result[1]}</p>
  			</div>
		</div>
    );
  };

export default DI1;