import React, { useState } from "react";
import { Grid, Form } from "semantic-ui-react";

import Layout from "../Components/Layout";
import ContactList from "../Components/ContactList";
import ContactForm from "../Components/ContactForm";
import ContactDetail from "../Components/ContactDetail";

const Contact = () => {
  const { Row, Column } = Grid;

  const [myContact, setContact] = useState([]);
  const [contactDetail, setDetail] = useState({});
  const [search, setSearch] = useState({
    searchKey: '',
    searchValue: []
  });

  const [modal, setModal] = useState({
    open: false,
  });

  const onSubmit = (e) => {
    var contact = myContact;
    contact.push(e);
    setContact([...contact]);
  };

  const editForm = (data, id) => {
    var result = myContact.findIndex(res => res['id'] === id);
    myContact[result] = data;
    setContact([...myContact]);
    setSearch({...search, searchKey: ''});
    setDetail({});
  };

  const getContactInfo = (data) =>{
    setDetail({...data});
  }

  const handleSearch = (e, { name, value }) => {
    var val = myContact.filter(res => res['name'].toLowerCase().match(value.toLowerCase()));
    setSearch({ ...search, [name]: value, searchValue: [...val] });
    
  }

  const { searchKey, searchValue } = search;

  return (
    <Layout>
      <Grid>
        <Row>
          <Column width={8}>
            <Form autoComplete="off">
              <Form.Group>
                <Form.Input placeholder="Search" name="searchKey" value={searchKey} onChange={handleSearch} icon="search" />
                <ContactForm
                  open={modal["open"]}
                  close={(e) => setModal({ open: e })}
                  formSubmit={onSubmit}
                />
                <Form.Button
                  basic
                  color="blue"
                  icon="plus"
                  content="Add Contact"
                  onClick={() => setModal({ ...modal, open: true })}
                />
              </Form.Group>
            </Form>
          </Column>
        </Row>
        <Row>
          <Column width={8}>
            <ContactList contacts={searchKey.length ? searchValue : myContact} editForm={editForm} contactInfo={getContactInfo} />
          </Column>
          <Column width={8}>
            {Object.keys(contactDetail).length ? <ContactDetail data={contactDetail} /> : null}
          </Column>
        </Row>
      </Grid>
    </Layout>
  );
};

export default Contact;
