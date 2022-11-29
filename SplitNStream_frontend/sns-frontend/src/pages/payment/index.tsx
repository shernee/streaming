import React from "react";
import 'pages/payment/index.css'
import { useEffect, useState } from 'react'
import {paymentCardShape } from 'data/type'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true

interface IPaymentPage {
   setShowPaymentModal: Function;
   showPaymentModal: boolean;
   handleMakePayment: Function;
   amountToPay: number;
 }

export const Payment = (props: IPaymentPage) => {
   const {
      setShowPaymentModal, showPaymentModal, handleMakePayment, amountToPay
   } = props

    const navigate = useNavigate()
    const [card_number, setCardNumber] = useState("")
    const [user_name, setUserName] = useState("")
    const [card_expiry, setCardExpiry] = useState("")
    const [card_cvc, setCardCvc] = useState("")

    return (
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
         <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Pay Subscription Fee</h2>
                  <div className='amount'>
                     <h4>Amount is ${amountToPay}</h4>
                  </div>
                  <div className='card_number'>
                     <label htmlFor="card_number">Card Number</label>
                     <input type='text' name='card_number'
                     onChange={(e) => {setCardNumber(e.target.value)}}/>
                  </div>
                  <div className='user_name'>
                     <label htmlFor="user_name">Card Holder Name</label>
                     <input type='text' name='user_name'
                     onChange={(e) => {setUserName(e.target.value)}}/>
                  </div>
                  <div className='card_expiry'>
                     <label htmlFor="card_expiry">Expiry Date</label>
                     <input type='card_expiry' name='card_expiry'
                     onChange={(e) => {setCardExpiry(e.target.value)}}/>
                  </div>
                  <div className='card_cvc'>
                     <label htmlFor="card_cvc">CVC</label>
                     <input type='text' name='card_cvc'
                     onChange={(e) => {setCardCvc(e.target.value)}}/>
                  </div>            
                  <div className='pay' onClick={(e) => { handleMakePayment() }}>
                     <button>Pay</button>
                  </div>
                  </div>
            </div>
      </Modal>
   );
}