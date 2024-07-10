import { useEffect, useRef } from "react"
import cl from "./styles/ModalImageViewer.module.css"
import HorizontalSlider from "./UI/horizontal-slider.js/horizontal-slider"

const ModalImageViewer = ({ modalImageViewerData, setModalImageViewerData }) => {
    const modal = useRef(null)
    const { slideIndex, sources } = modalImageViewerData

    useEffect(() => {
        const modalClass = modal.current.classList

        if (sources.length) 
            modalClass.add(cl.ModalImageViewer_open)
        else if (modalClass.contains(cl.ModalImageViewer_open))
            modalClass.remove(cl.ModalImageViewer_open)
    }, [sources])

    return (
        <div className={cl.ModalImageViewer} ref={modal}>

            <div className={cl.ModalImageViewer__overlay}>

                <div className={cl.ModalImageViewer__window}>

                    {!!sources.length && 
                        <HorizontalSlider 
                            sources={sources} 
                            slideIndex={slideIndex} 
                            setModalImageViewerData={setModalImageViewerData}
                        />
                    }

                </div>

            </div>

        </div>
    )
}

export default ModalImageViewer