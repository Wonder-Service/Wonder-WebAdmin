import React from "react"
import { Container, Row, Col, Card, CardTitle } from "shards-react";

export default class LoginPage extends React.Component{
    
    render() {
        return(
            <Container>
                <Row>
                    <Col sm="12" lg="6">
                        <Card>
                            <CardTitle className="border-top">
                                <h4>Login</h4>
                            </CardTitle>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
