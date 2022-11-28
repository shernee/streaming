import React from "react";
import 'pages/payment/index.css'
import { useEffect, useState } from 'react'
import {paymentCardShape } from 'data/type'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true

export const Payment = () => {
    const navigate = useNavigate()
    const [card_number, setCardNumber] = useState("")
    const [user_name, setUserName] = useState("")
    const [card_expiry, setCardExpiry] = useState("")
    const [card_cvc, setCardCvc] = useState("")
    const [card_issuer, setCardIssuer] = useState("")


    const { subscriptionId } = useParams()
    const { userId } = useParams()

    const postPayment = () => {      
        const paymentUrl = `/api/pay-subscription/?user_id=${userId}&subscription_id=${subscriptionId}`
        const paymentData = {
          card_number: card_number,
          user_name: user_name,
          card_expiry: card_expiry,
          card_cvc: card_cvc,
          card_issuer: card_issuer
        }
        axios.post(paymentUrl, paymentData).then((resp) => {
          if(resp.status === 201) {
            console.log(resp)

            const createPaymentId= resp.data.paymentId
            navigate('/home')
          } else {
            alert(`${resp.statusText}`)
          }
        })
      }

    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
           <h2>Pay Subscription</h2>
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
              <div className='card_issuer'>
                 <label htmlFor="card_issuer">Card Issuer</label>
                 <input type='card_issuer' name='card_issuer'
                 onChange={(e) => {setCardIssuer(e.target.value)}}/>
              </div>              
              <div className='pay' onClick={(e) => {postPayment()}}>
                 <button>Pay</button>
              </div>
     </div>
  </div>
 );

    }