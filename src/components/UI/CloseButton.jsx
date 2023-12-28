import cl from './CloseButton.module.css'

const CloseButton = ({clearInput, state, name}) => (
    <button type='button' className={cl.close} onClick={() => clearInput({...state, [name]: ""})}>&times;</button>
)

export default CloseButton