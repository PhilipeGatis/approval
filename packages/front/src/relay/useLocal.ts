import { commitLocalUpdate } from 'relay-runtime';
import environment from './environment';
import { useLocalQuery } from './__generated__/useLocalQuery.graphql';
import graphql from 'babel-plugin-relay/macro';
import { useQuery } from 'relay-hooks';
import { useMemo } from 'react';

const query = graphql`
  query useLocalQuery {
    ... on Query {
      __typename
    }
    settings {
      shotcuts_isImageDrawing
      stage_scale
      stage_stageHeight
      stage_stageWidth
      tool_selectedColor
      tool_selectedNoteType
    }
  }
`;

const useLocal = (field: string) => {
  const { props } = useQuery<useLocalQuery>(
    query,
    {},
    {
      fetchPolicy: 'store-only',
    },
  );

  // @ts-ignore
  const value: any = props && props.settings && props.settings[field];

  const updater = useMemo(
    () => (value: any) => {
      commitLocalUpdate(environment, (store) => {
        const record = store.getRoot().getLinkedRecord('settings');
        if (record) record.setValue(value, field);
      });
    },
    [field],
  );

  return [value, updater];
};

export default useLocal;
