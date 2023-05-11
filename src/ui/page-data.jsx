import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import _ from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import api from "../api";
import { ProgressBar } from "react-bootstrap";

function DataDisplay({ kName, token, pID, kID }) {
  const [data, setData] = React.useState(null);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  React.useEffect(() => {
    update();
    setInterval(update, 5000);
  }, []);

  return (
    <Container fluid className="pt-3">
      <Card>
        <Card.Body>{data ? render() : null}</Card.Body>
      </Card>
    </Container>
  );

  //////////////////////////////////////////////////////////////////////////////

  function render() {
    return (
      <Container fluid>
        <Row>
          <Col></Col>
          <Col>
            <Line options={options} data={data} type={"line"} />
          </Col>
        </Row>
      </Container>
    );
  }

  function update() {
    fetchData().then(({ data }) => {
      const lastValues = _.takeRight(data, 15);

      setData({
        labels: lastValues.map(
          ({ date, time }) => `${date.split("T")[0]} ${time}`
        ),
        datasets: [
          {
            label: kName,
            data: lastValues.map(({ value }) => value),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            tension: 0.5,
          },
        ],
      });
    });
  }

  function fetchData() {
    /// TODO: add error handling
    return api.getData({ token, pID, kID });
  }
}

export function PageData({ currentUser: { token }, data: { pID } }) {
  const [kinds, setKinds] = React.useState({
    status: "NA",
    kinds: null,
  });
  const [key, setKey] = React.useState("index");

  useEffect(() => {
    setKinds({
      status: "LOADING",
      kinds: null,
    });

    fetchDataKinds().then(({ kinds }) =>
      setKinds({
        status: "SUCCESS",
        kinds,
      })
    );
  }, []);

  return (({ status }) =>
    (status === "NA" && null) ||
    (status === "LOADING" && (
      <Row>
        <Col xs={8} className="mt-5 mx-auto">
          <ProgressBar now={60} />
        </Col>
      </Row>
    )) ||
    (status === "ERROR" && <div>Error</div>) ||
    (status === "SUCCESS" && render()))(kinds);

  ////////////////////////////////////////////////////////////////////////////////

  function render() {
    return (
      <Container fluid className="pt-5">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={setKey}
          className="mb-3"
        >
          {kinds.kinds.map(item)}
        </Tabs>
      </Container>
    );
  }

  function item({ kName, kID }) {
    return (
      <Tab key={kID} eventKey={kID} title={kName}>
        <DataDisplay token={token} kID={kID} pID={pID} kName={kName} />
      </Tab>
    );
  }

  function fetchDataKinds() {
    return api.getDataKinds({ token, pID });
  }
}

export default PageData;
