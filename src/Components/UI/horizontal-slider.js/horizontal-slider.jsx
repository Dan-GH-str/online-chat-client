import { useCallback, useEffect, useRef } from "react"
import "./_horizontal-slider.scss"

const HorizontalSlider = ({ sources = [], slideIndex = 0, setModalImageViewerData }) => {
    const slidesCount = sources.length
    const leftBtnClass = 'horizontal-slider__angle-left'
    const rightBtnClass = 'horizontal-slider__angle-right'
    const paginationClass = 'horizontal-slider__pagination-image'
    const $sliderInfo = useRef(null)
    const $slideIndexes = useRef(null)
    const $slider = useRef(null)
    let activeSlideIndex = useRef(0)

    const itemInfo = sources.map((src, index) => {
        return (
            <article className="horizontal-slider__info-item" key={index}>
                <img className="horizontal-slider__info-image" src={src} alt=""/>
            </article>
        )
    })
    
    const pagination = sources.map((_, index) => {
        let modifier = index === 0 ? "horizontal-slider__slide-index_active" : ""
        return (
            <div className={`horizontal-slider__slide-index ${modifier}`} data-index={index} key={index}>
                <img className="horizontal-slider__pagination-image" src={sources[index]} alt=""/>
            </div>
        )
    })

    const defineStep = (nextSlideIndex) => {
        const steps = nextSlideIndex - activeSlideIndex.current

        return steps
    }

    const changeSlide = useCallback(({ steps, nextSlideIndex = 0}) => {
        if (Number.isInteger(steps)) {

            $slideIndexes.current.childNodes[activeSlideIndex.current].classList.remove('horizontal-slider__slide-index_active')

            activeSlideIndex.current += steps

            if (activeSlideIndex.current === slidesCount) {
                activeSlideIndex.current = 0
            }
            else if (activeSlideIndex.current === -1) {
                activeSlideIndex.current = slidesCount - 1
            }
            
            
            $sliderInfo.current.style.transform = `translateX(-${activeSlideIndex.current * 100}vw)`
            console.log("activeSlideIndex.current", activeSlideIndex.current);
            $slideIndexes.current.childNodes[activeSlideIndex.current].classList.add('horizontal-slider__slide-index_active')

            if (window.innerWidth <= 480) {
                $slideIndexes.current.style.right = -64 + activeSlideIndex.current * 13 + "%"
            } 

        }

        else changeSlide({ steps: defineStep(nextSlideIndex) })
    }, [slidesCount])

    const removeHorizontalSlider = () => {
        $slider.current.removeEventListener('click', handleListener)
        $slideIndexes.current.style.removeProperty('right')
        setModalImageViewerData({ slideIndex: 0, sources: [] })
    }

    const handleListener = (e) => {
        const parentClass = e.target.parentNode.classList
        const elClass = e.target.classList
        
        if (elClass.contains(leftBtnClass) || parentClass.contains(leftBtnClass)) changeSlide({ steps: -1 })
        else if (elClass.contains(rightBtnClass) || parentClass.contains(rightBtnClass)) changeSlide({ steps: 1 })
        else if (elClass.contains(paginationClass)) {
            if (parentClass.contains('horizontal-slider__slide-index')) {
                changeSlide({nextSlideIndex: parseInt(e.target.parentNode.dataset.index)})
            }
        }
        else removeHorizontalSlider()
    }
    
    useEffect(() => {
        console.log("CURR", slideIndex);
        changeSlide({nextSlideIndex: slideIndex})
    }, [slideIndex, changeSlide])

    return (
        <div className="horizontal-slider" onClick={handleListener} ref={$slider}>
            <div className="horizontal-slider__info" ref={$sliderInfo}>
                {itemInfo.map(el => el)}
            </div>
            <div className="horizontal-slider__pagination" ref={$slideIndexes}>
                {pagination.map(el => el)}
            </div>
            <button className="horizontal-slider__close horizontal-slider__button">
                <i className="fa fa-times fa-2x" aria-hidden="true"></i>
            </button>
            <button className="horizontal-slider__angle-right horizontal-slider__button">
                <i className="fa fa-angle-right fa-2x"></i>
            </button>
            <button className="horizontal-slider__angle-left horizontal-slider__button">
                <i className="fa fa-angle-left fa-2x"></i>
            </button>
        </div>
    )
}

export default HorizontalSlider