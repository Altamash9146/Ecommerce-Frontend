import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Container, Table } from 'react-bootstrap';
import './Orders.css';
import axios from '../../Axios';
import Loading from '../Products/Loading';
import {useNavigate} from 'react-router-dom'

function Orders() {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const navi = useNavigate()

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/users/${user._id}/orders`)
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, [user._id]);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-3">No orders yet</h1>;
    }

    const gotohome = ()=>{
        navi('/')
    }

    return (
       <>
        <h1 onClick={gotohome} style={{cursor:'pointer'}}>←</h1>
        <Container>
            <h1 className="text-center">Your orders</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr>
                            <td>{order._id}</td>
                            <td>
                                <Badge bg={`${order.status === "processing" ? "warning" : "success"}`} text="white">
                                    {order.status}
                                </Badge>
                            </td>
                            <td>{order.date}</td>

                            <td>${order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </>
    );
}

export default Orders;