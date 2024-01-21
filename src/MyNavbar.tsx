import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import "/home/student/front/start_for_gp/list_of_diseases_frontend/src/styles/bc.css"

function MyNavbar() {
  return (
    <Navbar className="header-wrapper" expand="lg">
        <Container>
           
            <Navbar.Brand as={Link} to="/diseases/" className="header-title">
            Регистрация новых препаратов
            </Navbar.Brand>

           
            
          
            <Nav className="header-menu-link">
              <NavDropdown title="Вход" id="basic-nav-dropdown" className="header-title">
                <NavDropdown.Item> <Link to="">Зарегистрироваться</Link></NavDropdown.Item>
                <NavDropdown.Item> <Link to="">Войти</Link></NavDropdown.Item>
             </NavDropdown>
            </Nav>
        </Container>
      </Navbar>
  );
}

export default MyNavbar;