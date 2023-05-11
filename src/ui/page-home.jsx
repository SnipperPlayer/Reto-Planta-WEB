import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export function PageHome({}) {
  /// TODO: add content to home page
  return (
    <Container fluid className="pt-5">
      <Row className="text-center">
        <Col>
          <Image src="./assets/logo.jpeg" rounded />
        </Col>
        <Col className="d-flex align-items-stretch">
          <Card>
            <Card.Body>
              <Card.Title>
                <h1>TC1004B</h1>
              </Card.Title>
              <Container>
                <Row className="mb-5">
                  {[
                    { name: "Kenny" },
                    { name: "Emmanuel" },
                    { name: "Asad" },
                  ].map(personItem)}
                </Row>

                <Row>
                  <Col className="mx-auto" xs={8}>
                    <Card>
                      <Card.Body>
                        <Container>
                          <Row>
                            <Col xs={4}>
                              <Image
                                style={{ "max-width": "64px" }}
                                src="./assets/monkey.png"
                                rounded
                              />
                            </Col>
                            <Col xs={8} className="d-flex align-items-center">
                              <p className="text-muted">
                                Powered by Post-Monkey
                              </p>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  ////

  function personItem({ name }) {
    return (
      <Col key={name} className="d-flex align-items-stretch">
        <Card>
          <Card.Body>
            <Card.Title>
              <h4>{name}</h4>
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default PageHome;
