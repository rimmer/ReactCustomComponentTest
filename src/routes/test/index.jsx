import { useStore, useStyles$ } from '@builder.io/qwik';

import TestStyles from './test.css?inline'
import { component$, useVisibleTask$, useSignal, noSerialize } from '@builder.io/qwik';
import lottie from 'lottie-web';

function initLoopedSegment(animation, startFrame, endFrame) {
  animation.addEventListener('drawnFrame', (event) => {
    const frame = Math.round(event.currentTime)
    if (frame >= endFrame) {        
      animation.setDirection(-1)
    } else if (frame == startFrame) {        
      animation.setDirection(1)
    }
  })
}

export default component$(() => {
  useStyles$(TestStyles)

  const store = useStore({
    anim: noSerialize({}),
  });
  const canvas = useSignal();  
  useVisibleTask$(() => {
    let animation = store.anim = noSerialize(
      lottie.loadAnimation({
        container: canvas.value,
        loop: false,
        autoplay: true,
        path: '/Loading-animation.json',

      })
    );

    initLoopedSegment(animation, 36, 100)
  });

  return (
    <div class='box' ref={canvas}></div>
  );
});
