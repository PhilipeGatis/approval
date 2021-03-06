import { Environment, FetchFunction, Network, RecordSource, Store, commitLocalUpdate } from 'relay-runtime';
import { InfoAreaType, MarkupType } from '../Types';
import { relayTransactionLogger } from './relayTransactionLogger';
import { setupSubscription } from './setupSubscription';
import Konva from 'konva';

const isDev = process.env.NODE_ENV === 'development';

const fetchQuery: FetchFunction = async (operation, variables) => {
  const response = await fetch('/graphql', {
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

const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network: Network.create(fetchQuery, setupSubscription),
  store: store,
  log: relayTransactionLogger,
});

commitLocalUpdate(env, (store) => {
  const fieldKey = 'settings';
  const __typename = 'Settings';

  const dataID = `client:${__typename}`;
  const record = store.create(dataID, __typename);

  // Tool
  record.setValue(MarkupType.LINE, 'tool_selectedNoteType');
  record.setValue(Konva.Util.getRandomColor(), 'tool_selectedColor');

  // Shortcuts
  record.setValue(false, 'shotcuts_isImageDrawing');

  // info
  record.setValue(InfoAreaType.NOTES, 'info_selected');

  // Stage
  record.setValue(1, 'stage_scale');
  record.setValue(window.innerWidth, 'stage_stageWidth');
  record.setValue(window.innerHeight, 'stage_stageHeight');
  record.setValue(100, 'stage_imageWidth');
  record.setValue(100, 'stage_imageHeight');

  // Dialogs
  record.setValue(false, 'dialogs_addNote');

  store.getRoot().setLinkedRecord(record, fieldKey);
});

if (isDev) {
  // @ts-ignore
  window.relayEnvironment = env;
  // @ts-ignore
  window.debugRelayStore = () => env.getStore().getSource().toJSON();
}

export default env;
