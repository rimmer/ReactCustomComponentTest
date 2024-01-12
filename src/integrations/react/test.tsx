/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
 
// An existing React component
function Greetings() {
  return <div>Hello from React</div>;
}

// Qwik component wrapping the React component
export const QGreetings = qwikify$(Greetings);