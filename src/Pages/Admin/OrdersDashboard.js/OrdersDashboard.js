import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Badge,Table,Button, Modal } from 'react-bootstrap';
import axios from '../../../Axios'
import Loading from '../../Products/Loading'

const OrdersDashboard = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const products = useSelector((state) => state.products)
    const [orderToShow, setOrderToShow] = useState([])
    const [show, setShow] = useState(false)

    const handleClose = ()=>{
        setShow(false)
    }

    useEffect(() => {
        setLoading(true);
        axios
        .get(`/orders`)
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
            });
    }, []);

    const markShipped = (orderId, ownerId)=>{
            axios.patch(`/orders/${orderId}/mark-shipped`,{ownerId})
            .then(({data})=>{
                setOrders(data)
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const showOrder = (productsObj)=>{
            let productsToShow = products.filter(product => productsObj[product._id])
            productsToShow = productsToShow.map((product)=>{
                const productCopy = {...product}
                productCopy.count = productsObj[product._id]
                delete productCopy.description
                return productCopy
        })
        setShow(true)
        setOrderToShow(productsToShow)
    }

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-4">No orders yet</h1>;
    }
  return (
    <>
            <h1 className="text-center">Your orders</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Client Name</th>
                        <th>Items</th>
                        <th>Order Total</th>
                        <th>Address</th>
                        <th>Order Action</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr>
                            <td>{order._id}</td>
                            <td>{order.owner?.name}</td>
                            <td>{order.count}</td>
                            <td>${order.total}</td>
                            <td>
      {order.address && (
        `${order.address.line1}, ${order.address.line2}, ${order.address.city}, ${order.address.postal_code}, ${order.address.state}, ${order.address.country}`
      )}
    </td>
                            <td>
                                {order.status === 'processing' ? 
                                    <Button size='sm' onClick={()=> markShipped(order._id, order.owner?._id)}>Marked as shipped</Button>
                                :
                                    <Badge bg='success' >Shipped</Badge>
                                }
                            </td>
                            <td>
                                <span style={{
                                    cursor:'pointer',
                                    
                                }} 
                                    onClick={()=> showOrder(order.products)}
                                >View Order <i className='fa fa-eye'></i></span>
                            </td>
                           
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order details</Modal.Title>
                </Modal.Header>
                {orderToShow.map((order) => (
                    <div className="order-details__container d-flex justify-content-around py-2">
                        <img src={order.pictures[0].url} style={{ maxWidth: 100, height: 100, objectFit: "cover" }} alt='Not-found' />
                        <p>
                            <span>{order.count} x </span> {order.name}
                        </p>
                        <p>Price: ${Number(order.price) * order.count}</p>
                    </div>
                ))}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>      
    </>
  )
}

export default OrdersDashboard