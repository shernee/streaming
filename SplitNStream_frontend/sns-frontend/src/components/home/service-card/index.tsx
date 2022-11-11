import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { serviceShape } from 'data/type'
import { Card, ListGroup } from 'react-bootstrap'
import 'components/home/service-card/index.css'

interface IServiceCard {
  services: serviceShape
}

export const ServiceCard = (props: IServiceCard) => {
  const { services } = props

  return (
    <div className='service-card'>
      {
        Object.keys(services).map((service) => (
          <Card>
            <Card.Body>
              <Card.Title>
                {service}
              </Card.Title>
              <Card.Text>
                <ListGroup>
                {
                  services[service].map((subscription) => (
                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
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