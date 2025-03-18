import { useEffect, useRef, PropsWithChildren } from 'react';
import { Carousel as NativeCarousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';
import type { OptionsType } from '@fancyapps/ui/types/Carousel/options';

interface Props {
  options?: Partial<OptionsType>;
}

const defaults: Partial<OptionsType> = {
  Dots: false,
  Navigation: true,
  Thumbs: {
    type: 'modern',
    minCount: 1,
  },
};

function Carousel(props: PropsWithChildren<Props>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const options = {
      ...defaults,
      ...(props.options || {}),
    };

    const instance = new NativeCarousel(container, options, { Thumbs });

    return () => {
      instance.destroy();
    };
  }, [props.options]);

  return (
    <div className='f-carousel' ref={containerRef}>
      {props.children}
    </div>
  );
}

export default Carousel;
