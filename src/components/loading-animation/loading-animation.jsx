import { component$, useStore } from '@builder.io/qwik';
import { QwikLottie } from 'qwik-lottie';
import AnimationData from '../../../public/Loading-animation.json'

export default component$(() => {
  // const defaultOptions  = useStore({
  //   animationData: AnimationData      
  //     //path: '../../../public/Loading-animation.json',
  // });
  return (
      <div>
          <QwikLottie animationData={AnimationData} />
      </div>
  );
});
