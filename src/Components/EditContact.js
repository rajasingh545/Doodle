import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Image, Message } from "semantic-ui-react";
import { ContactValidation } from "../Validation/ContactValidation";

const EditContact = ({ title, index, formData, editForm }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    company: "",
    image: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState({
    isError: false,
    isLoading: false,
    isEdit: false,
  });
  const { name, email, company, image } = contact;
  const { isError, isLoading, isEdit } = loading;

  const init = () => {
    setContact({ ...formData });
    setError({});
    setLoading({
      isError: false,
      isLoading: false,
      isEdit: false,
    });
  };

  useEffect(() => {
    init(formData);
  }, [index]);

  const handleChange = (e, { name, value }) => {
    if (name === "file") {
      setContact({
        ...contact,
        image: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setContact({ ...contact, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setLoading({ ...loading, isError: false, isLoading: true });
    setError({});
    const error = await ContactValidation(contact);
    if (Object.keys(error).length) {
      setLoading({ ...loading, isError: true, isLoading: false });
      setError(error);
    } else {
      await editForm(contact, index);
      setLoading({
        ...loading,
        isError: false,
        isLoading: false,
        isEdit: true,
      });
    }
  };

  const successMessage = () => (
    <Message positive>
      <Message.Header>Your contact has changed succesfully.</Message.Header>
    </Message>
  );

  return (
    <Modal trigger={<Button icon="edit" onClick={init} />}>
      {isEdit && successMessage()}
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Form error={isError} loading={isLoading} autoComplete="off">
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              name={`name`}
              value={name}
              placeholder="Enter the name of the contact."
              onChange={handleChange}
              error={error.name}
            />
            <Form.Input
              fluid
              label="Email"
              name={`email`}
              value={email}
              placeholder="Enter the email of the contact."
              onChange={handleChange}
              error={error.email}
            />
            <Form.Input
              fluid
              label="Company"
              name={`company`}
              value={company}
              placeholder="Enter the company name of the contact."
              onChange={handleChange}
              error={error.company}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              type="file"
              name="image"
              name={`file`}
              onChange={handleChange}
              error={error.image}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </Form.Group>
          {image && <Image src={image} size="medium" rounded />}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Save"
          onClick={handleSubmit}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EditContact;
