import React from "react";
import { Table, Icon, Header, Image } from "semantic-ui-react";

import EditContact from "./EditContact";

const ContactList = ({ contacts = [], editForm, contactInfo }) => {
  const { Body, Row, Cell, HeaderCell } = Table;

  const headers = () => {
    return (
      <Table.Header key={`head`}>
        <HeaderCell>
          <Icon name="plus" />
        </HeaderCell>
        <HeaderCell>Basic Info</HeaderCell>
        <HeaderCell>Company</HeaderCell>
      </Table.Header>
    );
  };

  const tableBody = (myContacts) => {
    return myContacts.map((res, i) => (
      <Row key={i}>
        <Cell>
            <EditContact
              title={`Edit Contact`}
              index={res['id']}
              formData={res}
              editForm={editForm}
            />
        </Cell>
        <Cell>
          <div onClick={() => contactInfo(res)}>
            <Header as="h4" image>
              <Image src={res["image"]} rounded size="tiny" />
              <Header.Content as="a" >
                {res["name"]}
                <Header.Subheader>{res["email"]}</Header.Subheader>
              </Header.Content>
            </Header>
          </div>
        </Cell>
        <Cell>{res["company"]}</Cell>
      </Row>
    ));
  };

  const nodataFound = () => (
    <Image src={require('../image/nodata.png')} />
  )

  return (
    <div>
    <Table celled>
      {headers()}
      <Body>
        {tableBody(contacts)}
      </Body>
    </Table>
      {!contacts.length ? nodataFound():null} 
    </div>
  );
};

export default ContactList;
