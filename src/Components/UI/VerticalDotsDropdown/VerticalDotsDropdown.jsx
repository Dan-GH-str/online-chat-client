import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
        className={`btn btn-light btn-sm d-flex fs-3 p-0`}
        type="button"
        onClick={onClick}
        style={{ border: 'none', background: 'none' }} // Убираем стандартное оформление кнопки
        ref={ref}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-three-dots-vertical text-white" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
        </svg>
    </button>
))

const VerticalDotsDropdown = ({ options, handleSelect }) => {
    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {options.map(option => <Dropdown.Item as={"button"} eventKey={option.key} key={option.key}>{option.label}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default VerticalDotsDropdown