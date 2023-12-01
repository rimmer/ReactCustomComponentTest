import { component$, useStore } from '@builder.io/qwik';
import { QwikLottie } from 'qwik-lottie';

export default component$(() => {
  const store = useStore({
    options: {
      path: 'https://assets7.lottiefiles.com/packages/lf20_M6jA5UNDHa.json',
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
