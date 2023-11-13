import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function MyNavbar() {
  return (
    <Navbar className="color-navbar" expand="lg">
        <Container>
            <Link to="/diseases/">
                {/* <Image src={logoImage} roundedCircle className="logo-img" alt="Логотип AnyMetro" /> */}
            </Link>
            <Navbar.Brand as={Link} to="/diseases/" className="brand-text">
                Список препаратов
            </Navbar.Brand>
         
            <NavDropdown title="Наиболее распространенные заболевания" id="basic-nav-dropdown">
              <NavDropdown.Item> <Link to="/diseases/1/">Аритмия</Link></NavDropdown.Item>
              <NavDropdown.Item> <Link to="/diseases/2/">Нарушение сердечного ритма</Link></NavDropdown.Item>
            </NavDropdown>
          
            <Nav className="ms-auto">
              <NavDropdown title="Вход" id="basic-nav-dropdown">
                <NavDropdown.Item> <Link to="">Зарегистрироваться</Link></NavDropdown.Item>
                <NavDropdown.Item> <Link to="">Войти</Link></NavDropdown.Item>
             </NavDropdown>
            </Nav>
        </Container>
      </Navbar>
  );
}

export default MyNavbar;