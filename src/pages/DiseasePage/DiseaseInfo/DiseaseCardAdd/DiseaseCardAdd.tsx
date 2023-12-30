// import { FC } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import {useContext} from "react";
// import {DiseasesContext, SelectDiseaseContext} from "../../../DiseasesList/DiseaseList";
// import axios from "axios";
// import {requestTime, DOMEN} from "../../../../Consts";

// // import { Orbit } from '../../modules/ds';
// // import store from '../../store/store';
// // import { getOrbitByName } from '../../modules/getOrbitByName';
// // import { editOrbit } from '../../modules/editOrbit';
// // import { addNewOrbit } from '../../modules/addNewOrbit';
// // import { uploadOrbitImage } from '../../modules/uploadOrbitImage';
// import { useParams } from 'react-router-dom';
// import "./DiseaseCardAdd.css"

// const DiseaseCardAdd: FC = () => {
//     const navigate = useNavigate();
//     const { selectedDisease, setSelectedDisease } = useContext(SelectDiseaseContext);
//     const { id } = useParams();
//     console.log("iiiiddddd =", id)

//     //     const fetchData = async () => {

//     //     try {
//     //         const response1 = await fetch(`${DOMEN}/diseases/${disease_id}/`, {
//     //             method: "GET",
//     //             signal: AbortSignal.timeout(requestTime)
//     //         });

//     //         if (!response1.ok){
//     //             //MockDiseaseInfo()
//     //         }

//     //         const disease: Disease = await response1.json()

//     //         setSelectedDisease(disease)

//     //     } catch (e) {

//     //     }

//     // };
   


//     console.log("SS dis =", selectedDisease)
//     // const [orbit, setOrbit] = useState<Orbit | null>(null);
//     // const [imageFile, setImageFile] = useState<File | null>(null);
//     // const { userToken } = useSelector((state: ReturnType<typeof store.getState>) => state.auth);

//     // useEffect(() => {
//     //     if (orbit_name && orbit_name !== 'add') {
//     //         localStorage.setItem("flag", "edit")
//     //         getOrbitByName(orbit_name)
//     //             .then((response) => setOrbit(response))
//     //             .catch((error) => console.error('Ошибка при получении данных об орбите:', error));
//     //     } else {
//     //         setOrbit({
//     //             Name: '',
//     //             Apogee: '',
//     //             Perigee: '',
//     //             Inclination: '',
//     //             Description: '',
//     //             ID: 0,
//     //             ImageURL: '',
//     //             IsAvailable: false
//     //         });
//     //         localStorage.setItem("flag", "add")
//     //     }
//     // }, []);

//     // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     if (e.target.type === 'file') {
//     //         const file = e.target.files && e.target.files[0];
//     //         if (file) {
//     //             setImageFile(file);
//     //         }
//     //     } else {
//     //         setOrbit((prevOrbit) => ({
//     //             ...prevOrbit!,
//     //             [e.target.name]: e.target.value,
//     //         }));
//     //     }
//     // };

//     // const handleImageUpload = async () => {
//     //     try {
//     //         if (imageFile) {
//     //             const imageUrl = await uploadOrbitImage(userToken?.toString(), imageFile, orbit?.Name);
//     //             setOrbit((prevOrbit) => ({
//     //                 ...prevOrbit!,
//     //                 ImageURL: imageUrl,
//     //             }));
//     //         }
//     //     } catch (error) {
//     //         console.error('Ошибка при загрузке изображения:', error);
//     //     }
//     // };

//     // const handleOrbitSubmit = async (e: React.FormEvent) => {
//     //     e.preventDefault();

//     //     try {
//     //         if (orbit) {
//     //             if (orbit_name && localStorage.getItem("flag") == "edit") {
//     //                 const updatedOrbit = await editOrbit(userToken?.toString(), orbit);
//     //                 setOrbit(updatedOrbit);
//     //                 navigate(`/orbits/${updatedOrbit.Name}/edit`);
//     //             } else {
//     //                 const newOrbit = await addNewOrbit(userToken?.toString(), orbit);
//     //                 setOrbit(newOrbit);
//     //                 localStorage.setItem("flag", "edit")
//     //                 navigate(`/orbits/${newOrbit.Name}/edit`);
//     //             }
//     //             await handleImageUpload();
//     //         }
//     //     } catch (error) {
//     //         console.error('Ошибка при сохранении орбиты:', error);
//     //     }
//     // };

//     const handleUpdateDisease = async () =>  {
//         if (selectedDisease !== null) {
//           setSelectedDisease(selectedDisease);

//           try {
//             await axios.put(`${DOMEN}/diseases/${id}/update/`, selectedDisease);
//             navigate('/diseases'); // Redirect after successful update
//           } catch (error) {
//             console.error(error);
//           }
//         }
//       };
      

//     return (
//         <div className="form-container">
//             {/* <Form onSubmit={handleOrbitSubmit} encType="multipart/form-data"> */}
//             <Form encType="multipart/form-data">
//                 <Form.Group>
//                 <Form.Label>Изображение заболевания</Form.Label>
//                     <Form.Control
//                         type="file"
//                         name="image"
//                         onChange={handleUpdateDisease}
//                     />
//                     {/* {orbit?.ImageURL && (
//                         <img
//                             src={orbit.ImageURL}
//                             alt={`Orbit ${orbit.Name} Image`}
//                             style={{ maxWidth: '40%', marginBottom: '10px' }}
//                         />
//                     )} */}
//                 </Form.Group>
//                 <Form.Group controlId="formOrbitName">
//     <Form.Label>Название заболевания</Form.Label>
//     <Form.Control
//         type="text"
//         placeholder="Введите название"
//         name="disease_name"
//         value={selectedDisease?.disease_name || ''}
//         onChange={handleUpdateDisease}
//         required
//     />
//     {selectedDisease?.disease_name && (
//         <p>Выбранное заболевание: {selectedDisease.disease_name}</p>
//     )}
// </Form.Group>

//                 <Form.Group controlId="formOrbitApogee">
//                     <Form.Label>Общая информация</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Введите общую информацию о заболевании"
//                         name="generaal_info"
//                         value={selectedDisease?.general_info || ''}
//                         onChange={handleUpdateDisease}
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formOrbitPerigee">
//                     <Form.Label>Симптомы</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Введите характерные симптомы заболевания"
//                         name="simptoms"
//                         value={selectedDisease?.simptoms || ''}
//                         onChange={handleUpdateDisease}
//                     />
//                 </Form.Group>
                
//                 <Button className='button' type="submit">
//                     {id && id !== 'add' ? 'Сохранить изменения' : 'Добавить заболевание'}
//                 </Button>
//             </Form>
//         </div>
//     );
// };

// export default DiseaseCardAdd