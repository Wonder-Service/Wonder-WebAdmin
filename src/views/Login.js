import React from "react"
import {
    Container,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormInput,
    Button,
    Card,
    CardTitle,
    Row,
    Col, 
    ListGroupItem,
    ListGroup,
} from "shards-react"
import MaterialIcon from "material-icons-react"
import { POSTLOGIN } from "../api/caller"
import { LOGIN_ENDPOINT } from "../api/endpoint"



export default class Login extends React.Component {
    state = {
        username: '',
        password: '',
    }
    handleLogin = async () => {
       await POSTLOGIN(LOGIN_ENDPOINT, {}, {username: this.state.username, password: this.state.password})
        .then(res => {
            if(res.status === 200) {
                sessionStorage.jwt = res.headers.get('Authorization');
                console.log(res);
                window.location= "/home"
            }
        })
    }
    render() {
        const {username, password} = this.state
        return(
            <Container>
                <Row>
                    <Col lg="2" sm="0"></Col>
                    <Col>
                <Card>    
                    <ListGroup flush>
                    <ListGroupItem className="px-3">
                    <CardTitle>
                        <h3>Login</h3>
                    </CardTitle>
                        <InputGroup seamless className="mb-3">
                            <InputGroupAddon type="prepend">
                                <InputGroupText>
                                <MaterialIcon icon="people" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <FormInput placeholder="Username" onChange={(e) => this.setState({username:e.target.value})} value={username}/>
                            </InputGroup>
    
                            <InputGroup seamless className="mb-3">
                            <FormInput
                                type="password"
                                placeholder="password"
                                onChange={(text) => {this.setState({password:text.target.value})}}
                                value={password}
                            />
                            <InputGroupAddon type="append">
                                <InputGroupText>
                                    <MaterialIcon icon="lock" />
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        <Button theme="info" size="lg" outline onClick={()=> this.handleLogin()}>Login</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
                </Col>
                <Col lg="3" sm="0"></Col>
                </Row>
            </Container>
        )
    }
}