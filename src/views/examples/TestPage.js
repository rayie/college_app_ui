// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import React, { useEffect, useState } from "react";
// reactstrap components
import { Button, Col, Container, Input, InputGroup, Row } from "reactstrap";
import { addClassLists, get, post, reduxify } from "../../hookUtils";

function TestPage(props) {
  const [firstFocus, setFirstFocus] = useState(false);
  const [schools, setSchools] = useState([]);
  const [nameEntry, setNameEntry] = useState("");
  const [cityEntry, setCityEntry] = useState("");
  const [addsAttempted, attemptAdd] = useState(0);
  const [situation, addSituation] = useState("None");

  useEffect(addClassLists, []); //ignore this one, but leave it here

  useEffect(() => {
    const callGet = async () => {
      let result = await get("schools/masterlist");
      setSchools(result.schools);
      console.log("schools loaded", result);
    };
    callGet();
  }, []);

  useEffect(() => {
    console.log("triggered effect");
    console.log(nameEntry, cityEntry);
    if (!nameEntry || !cityEntry) {
      return;
    }
    const callPost = async () => {
      try {
        await post("schools/add", {
          nm: nameEntry,
          city: cityEntry,
        });
      } catch (postError) {
        console.error(postError);
        addSituation(postError.message);
        return;
      }
    };
    if (addsAttempted && nameEntry && cityEntry) {
      callPost();
    }
  }, [nameEntry, cityEntry, addsAttempted]);

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="section section-contact-us text-center">
          <h3 className="title">Name Entry: {nameEntry.toUpperCase()}</h3>
          <h3 className="title">City Entry: {cityEntry.toUpperCase()}</h3>
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
                    onClick={e => {
                      console.log("addsAttempted", addsAttempted);
                      attemptAdd(addsAttempted + 1);
                      e.preventDefault();
                      return;
                    }}
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
                <h3>Debug Situation:</h3>
                {situation}
              </Col>
            </Row>
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
