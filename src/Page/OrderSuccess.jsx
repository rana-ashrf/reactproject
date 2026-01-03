import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/OrderSuccess.css"

function OrderSuccess() {
    const navigate=useNavigate();
  return (
    <div className='order-success-container'>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with us</p>

        <div className='success-actions'>
            <button onClick={()=>navigate("/orders")}>View My Orders</button>
            <button onClick={()=>navigate("/")}>Continue Shopping</button>
        </div>

    </div>
  )
}

export default OrderSuccess;