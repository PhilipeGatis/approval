import { Observable, SubscribeFunction } from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';

// @ts-ignore
export const setupSubscription: SubscribeFunction = (request, variables) => {
  const query = request.text;

  const connectionParams = {
    Authorization: 'Basic dGVzdGU6dGVzdA=',
  };

  const subscriptionClient = new SubscriptionClient('ws://localhost:3001/subscriptions', {
    reconnect: true,
    connectionParams,
  });

  const observable = subscriptionClient.request({ query: query!, variables });

  // @ts-ignore
  return Observable.from(observable);
}