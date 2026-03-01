import { STACK_ITEMS } from '../constants';
import "@styles/marquee.css"
import { useMarqueeAnimation } from '../hooks';

export const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => {
    useMarqueeAnimation();

    const items = [...STACK_ITEMS, ...STACK_ITEMS];
    return (
        <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
            {items.map((item, i) => (
                <span key={`${item} ${i}`} className="marquee-item">
                    {item}
                </span>
            ))}
        </div>
    );
};