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
                Список заболеваний
            </Navbar.Brand>

            <Navbar.Brand as={Link} to="/drugs/" className="brand-text">
                Препараты
            </Navbar.Brand>
                 
            <Nav className="ms-auto">
              <NavDropdown title="Профиль" id="basic-nav-dropdown">
                <NavDropdown.Item> <Link to="">Корзина</Link></NavDropdown.Item>
                <NavDropdown.Item> <Link to="">Выйти</Link></NavDropdown.Item>
             </NavDropdown>
            </Nav>
        </Container>
      </Navbar>
  );
}

export default MyNavbar;