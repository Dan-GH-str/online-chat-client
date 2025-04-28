import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalWindow = ({buttonText, title, children, onSave, saveBtnText="Сохранить изменения", ...props}) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {buttonText}
            </Button>

            <Modal 
                {...props}
                show={show} 
                onHide={handleClose} 
                animation={true}    
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>

                    {onSave !== undefined && 
                    <Button variant="primary" onClick={() => {
                        onSave()
                        handleClose()
                    }}>
                        {saveBtnText}
                    </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalWindow