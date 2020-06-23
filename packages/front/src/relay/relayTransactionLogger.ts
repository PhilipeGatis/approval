import { LogRequestInfoFunction } from 'relay-runtime';

export const relayTransactionLogger: LogRequestInfoFunction = (event) => {
  console.log('RELAY: ', event);
  return;
};
