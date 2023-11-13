import { FC, useState, useEffect} from 'react'
import { Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Buffer } from 'buffer';
import "/home/student/reactProject/list_of_diseases/src/components/ds.css"


interface Disease {
    // image64: string,
    disease_name: string,
    disease_id: number
}




// const DiseaseItem: FC<Disease> = ({ image64, disease_name, disease_id}) => {
const DiseaseItem: FC<Disease> = ({ disease_name, disease_id}) => {
    
    const [image, setImage64] = useState('');


    // useEffect(() => {
    //     // 1/ const image = image64
    //     // setImage64(image)


    //     // 2/ 
    //     const buffer: Buffer = Buffer.from(String(image64));
    //     const base64String: string = buffer.toString('base64');
        
    //     setImage64(base64String);
    // }, []);
    // console.log("image =", typeof(image))


    const fetchData = async () => {
        

        const response = await fetch('/api/diseases/');
        const data = await response.json();
    //     // console.log("data", data)
    //     // for(let i = 0; i < data.length; i++) {
    //     //     data[i].image64 = String(data[i].image64)
            
    //     //     // const bytes = new Uint8Array(atob(data[i].image).split('').map(c => c.charCodeAt(0)));
    //     //     // console.log(bytes)


    //     //     // const base64String: string = /* ваша строка в формате base64 */;
    //     //     const imageB: Buffer = Buffer.from(data[i].image64, 'base64');
    //     //     data[i].image64 = imageB
    //     //     console.log("B =", data[i].image64)
    //     //     // setImage64(data.image64);
    //     //     // data[i].image = decoder.decode(data[i].image);
    //     //     // data[i].image = data[i].image.substring(1, data[i].image.length - 1)
    //     //   }
        
        // data.image = String(data.image)
        // console.log(data.image)
        // const imageB: Buffer = Buffer.from(data.image, 'base64');
        // data.image = imageB
        // console.log("B =", data.image)


        // const decodedImage: string = atob(data.image64);
        // console.log(decodedImage);
        
        const buffer: Buffer = Buffer.from(String(data.image64));
        console.log("0 =", buffer)
        const base64String: string = buffer.toString('base64');
        console.log("1 =", base64String)

        setImage64(data.image); // Обновление значения image64 с помощью setImage64

    }

    useEffect(() => {

        fetchData();
    }, []);







    return (
        
        <Card className='card'>
        
        {/* <img src={image64} alt={disease_name} className="custom-card-img" /> */}
        
        {/* {<Card.Img className="cardImage" variant="top" src={"data:image/png;base64," + image} height={100} width={100} />} */}
        <Card.Body>
            <div>
                <Card.Text> { disease_name }</Card.Text>
            </div>
            
            <Button className="l1" href={"http://localhost:3000/diseases/"+disease_id}>Подробнее</Button>
            <Button className="l1" href={"http://localhost:3000/diseases/"+disease_id}>Удалить</Button>

        </Card.Body>
        </Card>
    )


}
export default DiseaseItem;








