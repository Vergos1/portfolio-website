import { Slider } from './slider';
import { Title } from './title';

export const ExpertiseWrapper = () => {
  return (
    <div className='flavor-section'>
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <Title />
        </div>
        <div className="h-full">
          <Slider />
        </div>
      </div>
    </div>
  );
};
