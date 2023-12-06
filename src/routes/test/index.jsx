import { useStore, useStyles$ } from '@builder.io/qwik';

import TestStyles from './test.css?inline'
import { component$, useVisibleTask$, useSignal, noSerialize } from '@builder.io/qwik';
import lottie from 'lottie-web';



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
        loop:  true,
        autoplay:  false,
        path: '/Loading-animation.json',

      })
    );
    // eventlistener loop 
   
animation.addEventListener("loop", () => {
  console.log("You've captured the ready event!");
});
      animation.playSegments([0, 82], false);
      animation.setDirection(-1)
      animation.playSegments([82,0], false)

  });

  return (
    <div class='box' ref={canvas}></div>
  );
});
