import React from 'react'

const TextInput = ({ placeholder, innerRef }) => {
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                ref={innerRef}
            />
        </div>
    )
}

export default TextInput