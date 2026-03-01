import { useTitleAnimation } from '../hooks';

export const Title = () => {
    useTitleAnimation();

    return (
        <div className="general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16">
            <div className="overflow-hidden 2xl:py-0 py-3 first-text-split">
                <h1>We have 6</h1>
            </div>

            <div
                style={{
                    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                }}
                className="flavor-text-scroll"
            >
                <div className="bg-mid-brown pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
                    <h2 className="text-colorDark">freaking</h2>
                </div>
            </div>

            <div className="overflow-hidden 2xl:py-0 py-3 second-text-split">
                <h1>delicious flavors</h1>
            </div>
        </div>
    );
};