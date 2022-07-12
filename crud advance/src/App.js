import React, { useState, Fragment } from 'react';
import "./App.css";
import data from './mockdata.json';
import { nanoid } from "nanoid";
import ReadOnlyRow from "./Component/ReadOnlyRow";
import EditableRow from './Component/EditableRow.js';

const App = () => {
  const [contacts, setContacts] = useState(data);
  
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  })

  const [editFormData, setEditFormData] = useState(
    {
      fullName: "",
      address: "",
      phoneNumber: "",
      email: "",
    }
  )
  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const feildName = event.target.getAttribute("name");
    const feildValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[feildName] = feildValue;

    setAddFormData(newFormData);
  }

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);

  }
  const handleAddFormSubmit = (event) => {

    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    }
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    console.log(JSON.stringify(newContacts[5]));
  }
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    }

    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);

  }
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValue = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    }
    setEditFormData(formValue);

  }
  const handleCancelClick = () => {
    setEditContactId(null);
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);

  }


  return (
    <div className='app-container'>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </tbody >
          <tbody>
            {contacts.map((contact, index) => (
              <Fragment>
                {
                  editContactId === contact.id ?
                    (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />) :
                    (
                      <ReadOnlyRow
                        contact={contact}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />)
                }

              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add to Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input type="text"
          name='fullName'
          required='required'
          placeholder='Enter the name'
          onChange={handleAddFormChange} />

        <input type="text"
          name='address'
          required='required'
          placeholder='Enter the address'
          onChange={handleAddFormChange} />

        <input type="text"
          name='phoneNumber'
          required='required'
          placeholder='Enter the Phone Number'
          onChange={handleAddFormChange} />

        <input type="text"
          name='email'
          required='required'
          placeholder='Enter the email'
          onChange={handleAddFormChange} />

        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default App