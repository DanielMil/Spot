import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';
export default class FormExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
            <Button block light>
                <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}