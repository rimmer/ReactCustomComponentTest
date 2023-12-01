import { component$, useStore } from '@builder.io/qwik';
import { QwikLottie } from 'qwik-lottie';

export default component$(() => {
  const store = useStore({
    options: {
      path: '/Loading-animation.json',
    },
  });
  return (
    <>
      <div>
        <QwikLottie options={store.options} />
      </div>
    </>
  );
});
