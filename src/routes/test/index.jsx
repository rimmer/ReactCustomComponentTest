import { component$,  } from '@builder.io/qwik';
import LoadingAnimation from "~/components/loading-animation/loading-animation"

export default component$(() => {
  return (
      <div>
          <LoadingAnimation  />
      </div>
  );
});

