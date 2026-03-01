import { useAboutAnimation } from '../hooks';
import { MarqueeRow } from './marquee-row';

export const AboutWrapper = () => {
  useAboutAnimation();

  return (
    <div className="message-content">
      <div className="container mx-auto flex-center relative">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message">Every line of <br /> code has a story</h1>

            <div className="marquee-wrapper">
              <MarqueeRow />
            </div>

            <h1 className="second-message">
              Scroll to <br /> see
              where <br /> ideas became real
            </h1>
          </div>
          <div className="flex-center md:mt-20 mt-10">
            <div className="max-w-md px-10 flex-center overflow-hidden">
              <p>
                I don&apos;t just write code — I obsess over every
                interaction, every frame, every pixel until
                it feels exactly right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};