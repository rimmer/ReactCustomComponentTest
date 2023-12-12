import type { NoSerialize, Signal } from '@builder.io/qwik';
import { noSerialize, useVisibleTask$ } from '@builder.io/qwik';

import { component$, useSignal } from '@builder.io/qwik';
import type { AnimationEventCallback, AnimationItem, BMEnterFrameEvent } from 'lottie-web';
import Lottie from 'lottie-web/build/player/lottie_light';
import LoadingAnimation from './loading-animation.json';

interface Props {
  /**
   * Whether to loop the loading animation.
   * 
   * Use it to loop animation of loading and then "release" the loading animation.
   * When set to `false`, the animation continues to play until the end.
   */
  loopAnimation: Signal<boolean>;
}

export default component$<Props>((props) => {
  const canvas = useSignal<HTMLElement>();
  const animation = useSignal<NoSerialize<AnimationItem>>();
  // We need to load the animation on the client side only.
  useVisibleTask$(({ track }) => {
    track(() => { props.loopAnimation.value })
    if (!animation.value) {
      animation.value = noSerialize(Lottie.loadAnimation({
        // canvas should be available by now, so we can safely use `value!` here.
        container: canvas.value!,
        loop: false,
        autoplay: false,
        animationData: LoadingAnimation
      }))! // `!` is safe here, because we are initializing the animation.
    }
    const anim = animation.value as AnimationItem;
    if (props.loopAnimation.value) {
      // Initialize the looped segment of the animation.
      // animation.value has been initialized by now, so we can safely use `value!` here.
      loopSegment(anim, 36, 100);
    } else {
      // Release the animation from the loop.
      releaseAnimation(anim, 36);
    }
    anim.play();
  });
  return (
    <div class='box' ref={canvas}></div>
  );
});

/**
 * Initialize a looped segment of an animation.
 * @param animation lotte animation object
 * @param startFrame start frame of the loop
 * @param endFrame end frame of the loop
 */
function loopSegment(animation: AnimationItem, startFrame: number, endFrame: number) {
  const onFrameShown: AnimationEventCallback = (event: BMEnterFrameEvent) => {
    const frame = Math.round(event.currentTime);
    if (frame >= endFrame) {
      animation.setDirection(-1);
    } else if (frame == startFrame) {
      animation.setDirection(1);
    }
  }

  // Looks bit ugly, but there is not much documentation on how to do this.
  animation.removeEventListener('drawnFrame', onFrameShown)
  animation.addEventListener('drawnFrame', onFrameShown)
}

/**
 * Release animation from the loop
 * 
 * @param animation lotte animation object
 */
function releaseAnimation(animation: AnimationItem, waitUntillFrame: number) {
  animation.removeEventListener('drawnFrame');
  const onFrameShown: AnimationEventCallback = (event: BMEnterFrameEvent) => {
    const frame = Math.round(event.currentTime);
    if (frame <= waitUntillFrame) {
      animation.setDirection(1);
      animation.removeEventListener('drawnFrame', onFrameShown);
    }
  }
  animation.addEventListener('drawnFrame', onFrameShown)
}