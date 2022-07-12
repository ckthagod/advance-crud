import React from 'react'

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input type="text"
                    name='fullName'
                    required='required'
                    placeholder='Enter the name'
                    value={editFormData.fullName}
                    onChange={handleEditFormChange}
                />

            </td>
            <td>
                <input type="text"
                    name='address'
                    required='required'
                    placeholder='Enter the address'
                    value={editFormData.address}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input type="text"
                    name='phoneNumber'
                    required='required'
                    placeholder='Enter the phoneNumber'
                    value={editFormData.phoneNumber}
                    onChange={handleEditFormChange}

                />
            </td>
            <td>
                <input type="text"
                    name='email'
                    required='required'
                    placeholder='Enter the email'
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <button type='submit'>Save</button>
                <button type='button' onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default EditableRow