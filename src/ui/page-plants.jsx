import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";

import api from "../api";
import { Alert } from "react-bootstrap";

export function PageHome({ onNavigate, currentUser: { token } }) {
  if (!token) throw new Error("No token");

  const [plants, setPlants] = React.useState({
    status: "NA",
    plants: null,
  });

  React.useEffect(() => {
    setPlants({
      status: "LOADING",
      plants: null,
    });
    /// TODO: handle error
    fetchPlants().then(({ plants }) =>
      setPlants({
        status: "OK",
        plants,
      })
    );
  }, []);

  return (
    <Container fluid className="pt-5">
      {plants.status === "LOADING" ? (
        <Row>
          <Col xs={8} className="mx-auto">
            <ProgressBar now={60} />
          </Col>
        </Row>
      ) : null}

      {plants.status === "OK" ? (
        <>
          {plants.plants.length === 0 ? (
            <Row><Col className="mx-auto" xs={8}><Alert variant="warning">No tienes plantas registradas!</Alert></Col></Row>
          ) : null}
          <Row>{plants.plants.map(plantItem)}</Row>
        </>
      ) : null}
    </Container>
  );

  ///////////////////////////////////////////////////////////////////////

  function plantItem({ pID, pName }) {
    return (
      <Col xs={6} md={4} key={pID}>
        <Card>
          <Card.Body className="text-center">
            <Card.Title>{pName}</Card.Title>
            <Button onClick={() => selectPlant({ pID, pName })}>
              Consultar
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  function selectPlant({ pID, pName }) {
    onNavigate({ route: "data", data: { pID, pName } });
  }

  function fetchPlants() {
    return api.getPlants({ token });
  }
}

export default PageHome;
