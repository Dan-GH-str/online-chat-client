import cl from './MainPageCloseButton.module.css'

const MainPageCloseButton = ({clearInput, state, name}) => (
    <button type='button' tabIndex={-1} className={cl.close} onClick={() => clearInput({...state, [name]: ""})}>&times;</button>
)

export default MainPageCloseButton