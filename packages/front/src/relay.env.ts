import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
  SubscribeFunction,
  Observable,
} from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const fetchQuery: FetchFunction = async (operation, variables) => {
  const response = await fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      Authorization: 'Basic dGVzdGU6dGVzdA=',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
};
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const setupSubscription: SubscribeFunction = (request, variables) => {
  const query = request.text;

  const connectionParams = {
    Authorization: 'Basic dGVzdGU6dGVzdA=',
  };

  const subscriptionClient = new SubscriptionClient(
    'ws://localhost:3001/subscriptions',
    {
      reconnect: true,
      connectionParams,
    }
  );

  const observable = subscriptionClient.request({ query: query!, variables });
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return Observable.from(observable);
};

const source = new RecordSource();
const store = new Store(source);

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery, setupSubscription),
  store: store,
});

export default modernEnvironment;
