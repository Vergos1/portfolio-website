import { useRef } from "react";
import { projectsList } from '../constants';
import { useSliderAnimation } from '../hooks/use-slider-animation';

export const Slider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    useSliderAnimation(sliderRef);

    return (
        <div ref={sliderRef} className="slider-wrapper">
            <div className="flavors">
                {projectsList.map((flavor) => (
                    <div
                        key={flavor.name}
                        className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
                    >
                        <img
                            src={`/images/projects-test/${flavor.color}-bg.svg`}
                            alt=""
                            className="absolute bottom-0"
                        />

                        <img
                            src={`/images/projects-test/${flavor.color}-drink.webp`}
                            alt=""
                            className="drinks"
                        />

                        <img
                            src={`/images/projects-test/${flavor.color}-elements.webp`}
                            alt=""
                            className="elements"
                        />

                        <h1>{flavor.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};
