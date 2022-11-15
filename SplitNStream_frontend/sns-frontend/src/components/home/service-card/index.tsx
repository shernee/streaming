import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { serviceShape } from 'data/type'
import { Card, ListGroup } from 'react-bootstrap'
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
    <div className='service-card'>
      {
        Object.keys(services).map((service, index) => (
          <Card key={index}>
            <Card.Body>
              <Card.Title>
                {service}
              </Card.Title>
              <Card.Text>
                <ListGroup>
                {
                  services[service].map((subscription) => (
                    <ListGroup.Item 
                      key={subscription.subscription_id}
                      className="d-flex justify-content-between align-items-start" 
                      onClick={(e) => handleSelectSubscription(e, subscription.subscription_id)}
                    >
                      <span>
                        {subscription.name}
                      </span>
                      <span>
                        {subscription.price}
                      </span>
                    </ListGroup.Item>
                  ))
                }
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      }
    </div>
  )
}