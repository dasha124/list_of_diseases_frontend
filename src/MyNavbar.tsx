import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
import "/home/student/front/start_for_gp/list_of_diseases_frontend/src/styles/bc.css"

function MyNavbar() {
  return (
    <Navbar className="header-wrapper" expand="lg">
        <Container>
           
            <Navbar.Brand as={Link} to="/list_of_diseases_frontend/" className="header-title">
            Регистрация новых препаратов
            </Navbar.Brand>
        </Container>
      </Navbar>
  );
}

export default MyNavbar;