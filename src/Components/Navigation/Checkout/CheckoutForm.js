import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Alert} from 'react-bootstrap'
import { useCreateOrderMutation } from '../../../Services/AppApi'
import './CheckoutForm.css'
import axios from 'axios'


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector((state) => state.user);
    // console.log(user);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isSuccess}] = useCreateOrderMutation();
    const [address, setAddress] = useState({
        line1: "",
        line2: "",
        city: "",
        postal_code: "",
        state: "",
        country: "",
    });

    const [paying, setPaying] = useState(false);

const handlePay = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || user.cart.count <= 0) return;
    console.log("Cart before sending order request:", user.cart);
    setPaying(true);
    try {
        const response = await axios.post("https://ecmmerce-backend-vu1h.onrender.com/create-payment", {
            userId: user._id,
            amount: user.cart.total,
            address: address
        });

        const { client_secret } = response.data;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.name,
                    email: user.email,
                    address: {
                        line1: address.line1,
                        line2: address.line2,
                        city: address.city,
                        postal_code: address.postal_code,
                        state: address.state,
                        country: address.country,
                    }
                }
            },
        });

        if (paymentResult.error) {
            console.error("Payment error:", paymentResult.error);
            setAlertMessage(`Payment failed: ${paymentResult.error.message}`);
        } else if (paymentResult.paymentIntent && paymentResult.paymentIntent.status === "succeeded") {
            await createOrder({
                userId: user._id,
                cart: user.cart,
                address: address,
                country: address.country 
            });

            setAlertMessage("Payment successful");
            setTimeout(() => {
                // const queryParams = `?address=${encodeURIComponent(address)}&country=${encodeURIComponent(address.country)}`;
                navigate('/orders');
            }, 3000);
        }
    } catch (error) {
        console.error("Error:", error);
        setAlertMessage("An error occurred during payment");
    } finally {
        setPaying(false);
    }
};

    return (
        <div className='responsive-checkout-container'>
            <div className='cart-payment-container'>
                <form onSubmit={handlePay}>
                    {alertMessage && <Alert>{alertMessage}</Alert>}
                    <h4>Make Your Payment</h4>
                    <label className='Form-Labels'>First Name</label>
                    <input type='text' placeholder='First Name' value={user.name} disabled className='Checkout-Input-Bar' />
    
                    <label className='Form-Labels'>Email</label>
                    <input type='email' placeholder='Enter Email' value={user.email} disabled className='Checkout-Input-Bar' />
    
                    <label className='Form-Labels'>Address Line 1</label>
                    <input type='text' placeholder='Enter your Residential Address' value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} required className='Checkout-Input-Bar' />
    
                    <label className='Form-Labels'>Address Line 2</label>
                    <input type='text' placeholder='Enter your Residential Address' value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} className='Checkout-Input-Bar' />
    
                    <label className='Form-Labels'>City</label>
                    <input type='text' placeholder='Enter your City' value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required className='Checkout-Input-Bar' />
    
                    <label className='Form-Labels'>Postal Code</label>
                    <input type='number' placeholder='Enter Postal Code' value={address.postal_code} onChange={(e) => setAddress({ ...address, postal_code: e.target.value })} required className='Checkout-Input-Bar' />
    
                    <label className='Form-Labels'>State</label>
                    <input type='text' placeholder='Enter your State' value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} required className='Checkout-Input-Bar' />
    
                    <label className='Form-Labels'>Country<div style={{
                        fontFamily:"Georgia, 'Times New Roman', Times, serif",
                        fontSize:"12px",
                        color:"green"
                    }}>**It accepts only international contry in two code format like US,UK etc.**</div></label>
                    <input type='text' placeholder='Enter your Country' value={address.country} onChange={(e) => setAddress({...address, country:e.target.value})} required className='Checkout-Input-Bar' />
                    <br/>
                    <label htmlFor='card-element' className='Form-Labels'>Card<span style={{color:"green",fontSize:'12px'}}> *type 4242... till last*</span></label>
                    <CardElement id='card-element' />
                    <button type='submit' disabled={user.cart.count <= 0 || paying || isSuccess} className='Checkout-Form-Button'>
                        {paying ? 'Processing...' : 'Pay'}
                    </button>
                </form>
            </div>
    
        </div>
    );
    }    
export default CheckoutForm
