import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';

type Props = {}

type State = {}

export default class deckCounter extends Component<Props, State> {
  state = {}

  render() {
    return (
        <Container className="containerDeckCounter">
                    <p className="deckCounter">
            0/40    
        </p>
        </Container>

    )
  }
}