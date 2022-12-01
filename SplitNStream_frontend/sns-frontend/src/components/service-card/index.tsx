import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { serviceShape } from 'data/type'
import { Card, ListGroup, Table } from 'react-bootstrap'
import 'components/service-card/index.css'
import cardImg from 'assets/card-img.png'

interface IServiceCard {
  services: serviceShape
}

export const ServiceCard = (props: IServiceCard) => {
  const { services } = props
  const navigate = useNavigate()

  const handleSelectSubscription = (
    e: React.MouseEvent<Element, MouseEvent>, subscriptionId: number, subscriptionName: string, serviceName: string
  ) => {
    const subscription = `${serviceName}-${subscriptionName}`
    navigate(`/group-list/${subscriptionId}/${subscription}`)
  }

  return (
    <div className='service-card-list'>
      {
        Object.keys(services).map((service, index) => (
          <Card key={index}>
            <Card.Img src={cardImg}/>
            <Card.Body>
              <Card.Title>
                {service}
              </Card.Title>
                <Table borderless>
                  {
                    services[service].map((subscription) => (
                      <tr
                        key={subscription.subscription_id}
                        className="d-flex justify-content-between align-items-start subscription-row" 
                        onClick={(e) => handleSelectSubscription(
                          e, subscription.subscription_id, subscription.name, service)}
                      >
                        <td>
                          {subscription.name}
                        </td>
                        <td>
                          {`$${subscription.price}`}
                        </td>
                      </tr>
                    ))
                  }
                </Table>
            </Card.Body>
          </Card>
        ))
      }
    </div>
  )
}