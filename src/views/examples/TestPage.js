// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import React, { useEffect, useState } from "react";
// reactstrap components
import { Button, Col, Container, Input, InputGroup, Row } from "reactstrap";
import { addClassLists, get, reduxify } from "../../hookUtils";

function TestPage(props) {
  const [firstFocus, setFirstFocus] = useState(false);
  const [schools, setSchools] = useState([]);
  const [nameEntry, setNameEntry] = useState("");
  const [cityEntry, setCityEntry] = useState("");
  useEffect(addClassLists, []);

  useEffect(() => {
    const callGet = async () => {
      let result = await get("schools/masterlist");
      setSchools(result.schools);
      console.log("in useEffect", result);
    };
    callGet();
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="section section-contact-us text-center">
          <h2 className="title">
            Test Page - Name Entry: {nameEntry.toUpperCase()}
          </h2>
          <Container>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <Input
                    placeholder="School Name..."
                    type="text"
                    value={nameEntry}
                    onChange={e => setNameEntry(e.target.value)}
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <Input
                    placeholder="School City..."
                    type="text"
                    value={cityEntry}
                    onChange={e => setCityEntry(e.target.value)}
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    Add School
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
          <hr />
          <Container>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                <h3>Schools loaded:{schools.length}</h3>
              </Col>
            </Row>
            {schools.map((s, index) => (
              <Row key={index}>
                <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                  {s.nm} <i>{s.city}</i>
                </Col>
              </Row>
            ))}
          </Container>
        </div>
      </div>
    </>
  );
}

export default reduxify(TestPage);
