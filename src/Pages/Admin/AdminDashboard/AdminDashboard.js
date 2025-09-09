import React from 'react'
import {Container,Tab,Row,Col,Nav} from 'react-bootstrap'
import './AdminDashboard.css'
import DashboardProducts from '../productDashboard/DashboardProducts'
import OrdersDashboard from '../OrdersDashboard.js/OrdersDashboard'
import ClientDashboard from '../ClientDashboard/ClientDashboard'

const AdminDashboard = () => {
  return (
    <div>
        <Container>
            <Tab.Container defaultActiveKey='products' >
                <Row>
                    <Col sm={3}>
                        <Nav variant='pills' className='flex-column'>
                            <Nav.Item>
                                <Nav.Link eventKey='products'>
                                        Products
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='orders'>
                                        Orders
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='clients'>
                                        Clients
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9} >
                        <Tab.Content >

                            <Tab.Pane eventKey='products'>
                                <DashboardProducts/>  
                            </Tab.Pane>

                            <Tab.Pane eventKey='orders'>
                                <OrdersDashboard/>  
                            </Tab.Pane>

                            <Tab.Pane eventKey='clients'>
                                <ClientDashboard/>  
                            </Tab.Pane>
                            </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    </div>
  )
}


export default AdminDashboard
