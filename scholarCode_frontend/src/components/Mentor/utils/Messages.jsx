import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Messages = ({text,send,sender}) => {
  const isSender = send === sender;
  return (
    <Container className="mb-2 ">
      <Row className={isSender ? 'justify-content-end' : 'justify-content-start'}>
        <Col xs={10} md={7} className={`p-2 rounded-3 ${isSender ? 'bg-primary text-white' : 'bg-light text-secondary'} font-weight-bold`}>
          {text}
        </Col>
      </Row>
    </Container>
  )
}

export default Messages