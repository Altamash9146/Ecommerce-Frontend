import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import './Cartpage.css'
import { useSelector } from 'react-redux'
import {useIncreaseCartProductMutation,useDecreaseCartProductMutation,useRemoveFromCartMutation} from '../../Services/AppApi'
import { Alert, Container,Row,Col, Table } from 'react-bootstrap'
import CheckoutForm from './Checkout/CheckoutForm'
import { useNavigate } from 'react-router-dom';

const Publishable_key = 'pk_test_51Ng2IJSDW3KwNhr0QojaHIpV4nnqsSESHSR1vJf7l75NZDZMkrYfl5eldkmLFKbel32OoprMSu1BHQ8MywSGmVUi006CBey9CO'

const stripePromise = loadStripe(Publishable_key)

const CartPage = () => {
    const navi = useNavigate()
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading}] = useRemoveFromCartMutation();

  function handleDecrease(product) {
     const quantity = user.cart[product.productId];
      if (quantity <= 1) {
        removeFromCart({ productId: product.productId, price: product.price, userId: user._id });
      } else {
        decreaseCart(product);
      }
  }

  const Gotohome = ()=>{
    navi('/')
  }
 

  return (
    <div className='Cart-Page'>
   <Container style={{ minHeight: "95vh" }} className="cart-container">
            <Row>
                <Col>
                    <h1 className="pt-2 h3" onClick={Gotohome}><span>←</span>Shopping cart</h1>
                    {cart.length === 0 ? (
                        <Alert variant="info">Shopping cart is empty. Add products to your cart</Alert>
                    ) : (
                        <Elements stripe={stripePromise} >
                            <CheckoutForm />
                        </Elements>
                    )}
                </Col>
      
                {cart.length > 0 && (
                    <Col md={5}>
                        <>
                            <Table responsive="sm" className="cart-table">
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* loop through cart products */}
            {cart.map((item) => (
                <tr>
                    <td>&nbsp;</td>
                    <td>
                        {!isLoading && <i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }} onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}></i>}
                        <img src={item.pictures[0].url} style={{ width: 100, height: 100, objectFit: "cover" }} alt='not found' />
                    </td>
                    <td>${item.price}</td>
                    <td>
                        <span className="quantity-indicator">
                            <i className="fa fa-minus-circle" onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}></i>
                            <span>{user.cart[item._id]}</span>
                            <i className="fa fa-plus-circle" onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}></i>
                        </span>
                    </td>
                    <td>${item.price * user.cart[item._id]}</td>
                </tr>
            ))}
                                </tbody>
                            </Table>
                            <div>
                                <h3 className="h4 pt-4">Total: ${user.cart.total}</h3>
                            </div>
                        </>
                    </Col>
                )}
            </Row>
        </Container>
      </div>
  );
}

export default CartPage
