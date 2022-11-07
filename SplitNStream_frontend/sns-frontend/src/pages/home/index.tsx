import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Nav, Container, Row, Col, Card } from 'react-bootstrap'

const DATA = [
  {
    'Service': 'Service1',
    'Subscriptions': [
      {
        'subName': 'Sub1',
        'subPrice': 'Price1'
      },
      {
        'subName': 'Sub2',
        'subPrice': 'Price2'
      }
    ]
  },
  {
    'Service': 'Service2',
    'Subscriptions': [
      {
        'subName': 'Sub1',
        'subPrice': 'Price1'
      },
      {
        'subName': 'Sub2',
        'subPrice': 'Price2'
      }
    ]
  },
]
  

export const Home = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={3}>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar" activeKey={'/home'}>
              <Nav.Item>
                <Link to="/home" className="nav-link">Home</Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={10}>
            {
              DATA.map((service) => (
                <Card>
                  <Card.Body>
                    <Card.Title>
                      { service['Service'] }
                    </Card.Title>
                    <Card.Text>
                      {
                        service['Subscriptions'].map((sub) => (
                          <Row>
                            <Col>
                              {sub['subName']}
                            </Col>
                            <Col>
                              {sub['subPrice']}
                            </Col>
                          </Row>
                        ))
                      }
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}