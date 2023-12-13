import { component$, useSignal } from '@builder.io/qwik';
import LoadingAnimation from "~/components/loading-animation/loading-animation";

export default component$(() => {
  const loading = useSignal(true);  
  return (
      <div>
          <button onClick$={() => loading.value = !loading.value }>Stop animation</button>
          <LoadingAnimation loopAnimation={loading} />
      </div>
  );
});
