import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { serviceShape } from 'data/type'
import { Card, ListGroup, Table } from 'react-bootstrap'
import 'components/home/service-card/index.css'

interface IServiceCard {
  services: serviceShape
}

export const ServiceCard = (props: IServiceCard) => {
  const { services } = props
  const navigate = useNavigate()

  const handleSelectSubscription = (e: React.MouseEvent<Element, MouseEvent>, subscriptionId: number) => {
    navigate(`/group-list/${subscriptionId}`)
  }

  return (
    <div className='service-card-list'>
      {
        Object.keys(services).map((service, index) => (
          <Card key={index}>
            <Card.Body>
              <Card.Title>
                {service}
              </Card.Title>
              <Card.Text>
                <Table borderless>
                  {
                    services[service].map((subscription) => (
                      <tbody
                        key={subscription.subscription_id}
                        className="d-flex justify-content-between align-items-start subscription-row" 
                        onClick={(e) => handleSelectSubscription(e, subscription.subscription_id)}
                      >
                        <td>
                          {subscription.name}
                        </td>
                        <td>
                          {`$${subscription.price}`}
                        </td>
                      </tbody>
                    ))
                  }
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      }
    </div>
  )
}