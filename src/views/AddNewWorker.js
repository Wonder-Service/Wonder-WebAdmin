import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  CardHeader,
  Card,
  Col,
  FormInput,
  ListGroup,
  ListGroupItem,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Button
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { FormGroup } from "@material-ui/core";
import { GET, POST, POSTLOGIN } from "../api/caller";
import { SKILL_ENDPOINT, CREATE_ACCOUNT_ENDPOINT } from "../api/endpoint";
import ListSkills from "../components/ListSkill";

function AddNewWorker() {
  const [isVisibleModel, setVisibelModel] = useState(false);
  const [skillsData, setSkillsData] = useState([]);
  const [skillsSelected, setSkillSelected] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [fullname, setFullname] = useState('');

  const handelSelectedSkills = (listSkills) => {
    setSkillSelected(listSkills);
  }

  const handleModal = () => {
    if (isVisibleModel) {
      setVisibelModel(false);
    } else {
      setVisibelModel(true);
    }
  };

  const handleCreateAccount =  () => {
    POSTLOGIN(CREATE_ACCOUNT_ENDPOINT, {} ,{
      username: username,
      email: email,
      fullname:fullname,
      address: address,
      password: password,
      phone: phone,
      role: "worker",
      skills: skillsSelected,
    }).then(rs => {
      alert("SUCCESS")
    })
  }

  const getSkillsData = async () => {
    await GET(SKILL_ENDPOINT, {}, {}).then(res => {
      setSkillsData(res);
    });
  };

  useEffect(() => {
    getSkillsData();
  }, []);

  return (
    <Container>
      <Modal open={isVisibleModel} toggle={handleModal}>
        <ModalHeader>Add Skill User</ModalHeader>
        <ModalBody>
            <ListSkills
            onChange={handelSelectedSkills}  
            data={skillsData} x/>
        </ModalBody>
      </Modal>
      <Col md="6">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Add new worker" className="text-sm-left" />
        </Row>
        <Card small className="mb-auto">
          <CardHeader className="border-bottom">
            <h6>Form Inputs</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3"> 
              <Row>
                <Col>
                    <FormGroup>
                      <Col md="12" className="form-group">
                        <label htmlFor="feEmailAddress">Email & Username</label>
                        <FormInput
                          id="txtEmail"
                          type="email"
                          placeholder="Email"
                          onChange={e => setEmail(e.target.value)}
                        />
                        <label htmlFor="feEmailAddress"> </label>
                        <FormInput
                          id="txtUsername"
                          type="text"
                          placeholder="Username"
                          onChange={e => setUsername(e.target.value)}
                        />
                        <FormInput
                          id="txtFullname"
                          type="text"
                          placeholder="fullname"
                          onChange={e => setFullname(e.target.value)}
                        />
                      </Col>
                      <Col md="12">
                        <label htmlFor="fePassword">Password</label>
                        <FormInput
                          id="txtPassword"
                          type="password"
                          placeholder="Password"
                          onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="feEmailAddress"> </label>
                        
                        <Row>
                          <FormGroup>
                            <label htmlFor="feInputAddress">Address</label>
                            <FormInput
                              id="feInputAddress"
                              placeholder="1234 Main St"
                              onChange={e => setAddress(e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label htmlFor="feInputAddress">Phone</label>
                            <FormInput id="txtPhone" placeholder="+84..." 
                            onChange={e => setPhone(e.target.value)}/>
                            
                          </FormGroup>
                        </Row>
                      </Col>
                    </FormGroup>
                    <Row>
                        <Button type="submit" onClick={handleCreateAccount}>Create New Account</Button>
                        <Button theme="info" onClick={handleModal}>Add Skill</Button>
                    </Row>

                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
      <Col />
    </Container>
  );
}

export default AddNewWorker;
