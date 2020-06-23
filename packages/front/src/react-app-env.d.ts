/// <reference types="react-scripts" />

declare module 'babel-plugin-relay/macro' {
  export { graphql as default } from 'react-relay';
}

declare module 'relay-devtools' {
  export { installRelayDevTools } from 'relay-devtools';
}
