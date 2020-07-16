import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Image } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';

import { ContactValidation } from '../Validation/ContactValidation';

const ContactForm = ({ open, close, formSubmit }) => {
    const [contact, setContact] = useState({
        id: '',
        name:'',
        email: '',
        company: '',
        image: ''
    });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState({
        isError: false,
        isLoading: false
    });
    const {name, email, company, image} = contact;
    const { isError, isLoading } = loading;

    useEffect(() =>{
        setContact({
            id: uuidv4(),
            name: '',
            email: '',
            company: '',
            image: ''
        });
        setLoading({ isError: false, isLoading: false });
        setError({});
    }, [open]);

    const handleChange = (e, { name, value }) => {
        if(name === 'file'){
            setContact({
                ...contact,
                image: URL.createObjectURL(e.target.files[0])
            })
        }else{
            setContact({...contact, [name]: value });
        }
    }

    const handleSubmit = async () => {
        setLoading({...loading, isLoading: true});
        const error = await ContactValidation(contact);
        if(Object.keys(error).length){
            setLoading({...loading, isError: true, isLoading: false});
            setError(error);
        }else{
            await formSubmit(contact);
            await close(false);
        }
    }

    return(
        <Modal size="small" open={open} onClose={() => close(false)}>
            <Modal.Header>Add new contact</Modal.Header>
            <Modal.Content>
                <Form error={isError} loading={isLoading} autoComplete="off">
                    <Form.Group widths="equal">
                        <Form.Input
                            fluid 
                            label='Name' 
                            name={`name`} 
                            value={name} 
                            placeholder='Enter the name of the contact.' 
                            onChange={handleChange}
                            error={error.name}
                        />
                        <Form.Input 
                            fluid 
                            label='Email' 
                            name={`email`} 
                            value={email} 
                            placeholder='Enter the email of the contact.' 
                            onChange={handleChange}
                            error={error.email}
                        />
                        <Form.Input fluid label='Company' name={`company`} value={company} placeholder='Enter the company name of the contact.' onChange={handleChange} error={error.company} />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input type="file" name="image" name={`file`} onChange={handleChange} error={error.image} accept="image/x-png,image/gif,image/jpeg"/>
                    </Form.Group>
                    {image && <Image src={image} size='medium' rounded />}
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Submit'
                    onClick={handleSubmit}
                />
            </Modal.Actions>
        </Modal>
    );
}

export default ContactForm;