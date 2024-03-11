// NavbarComponent.js
import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Aos from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/main.css";
import BulbPage from "./blinkled.js";
import Alarm from "./alarm.js";

function NavbarComponent() {
  const [showBulbPage, setShowBulbPage] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleToggleBulbPage = () => {
    setShowBulbPage(!showBulbPage);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <Navbar
        expand="md" // Change lg to md to make it vertical
        className="gradient-bg" // Apply background color class
        style={{ right: "0", top: "0", left: "0", bottom: "0" }}
      >
        <Container style={{ margin: "0px 20px", borderRadius: "15px" }}>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ fontSize: "30px", fontWeight: "500", marginBottom: "20px" }} // Adjust styles for vertical layout
          >
            Farm Security
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-column"> {/* Use flex-column class for vertical layout */}
              <Nav.Link
                as={Link}
                to="/"
                style={styles}
                className="home"
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="https://docs.google.com/document/d/e/2PACX-1vQuzN4-MPPtJomidDvibMbMLiskbCbesAusYBKSC3etqVieYLyJ8xeVdVchppkspVhK1HCucm6B2pBi/pub"
                style={styles}
                className="home"
              >
                Docs
              </Nav.Link>
              <NavDropdown
                title="Sensors"
                style={styles}
                id="basic-nav-dropdown"
                className="home"
              >
                <NavDropdown.Item
                  onClick={() => scrollToSection("airsection")}
                >
                  Soil Moisture Sensor
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => scrollToSection("tempsection")}
                >
                  Humidity Sensor
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => scrollToSection("ultrasection")}
                >
                  Temperature Sensor
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {/* { <NavDropdown.Item as={Link} to="/bulb" onClick={handleToggleBulbPage}>
                  WATER MOTOR
                </NavDropdown.Item> } */}
                { <NavDropdown.Item as={Link} to="/alarm" onClick={handleToggleBulbPage}>
                  ALARM
                </NavDropdown.Item> }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* {showBulbPage && (
        <div
          style={{
            position: "absolute",
            top: "70px", // Adjust this value based on your navbar height
            width: "100%",
          }}
        >
          <BulbPage onClose={() => setShowBulbPage(false)} />
        </div>
      )} */}
    </>
  );
}

export default NavbarComponent;
