import { useMemo } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { useSubscription } from 'relay-hooks';
import { useUpdateInfoSubscribeInfoSubscription } from './__generated__/useUpdateInfoSubscribeInfoSubscription.graphql';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

const subscription = graphql`
  subscription useUpdateInfoSubscribeInfoSubscription($approvalId: String!) {
    updateInfoSubscription(approvalId: $approvalId) {
      approval {
        id
        dueDate
      }
      approvers {
        id
        isApproved
      }
      assets {
        id
        asset
        assetUrl
      }
      notes {
        id
        markup
        text
        createdAt
        createdBy
      }
      comments {
        id
        note {
          id
        }
        text
        createdBy
      }
    }
  }
`;

interface Props {
  approvalId: string;
}

const useUpdateInfoSubscribe = (props: Props): void => {
  const { approvalId } = props;
  useSubscription(
    useMemo(
      (): GraphQLSubscriptionConfig<useUpdateInfoSubscribeInfoSubscription> => ({
        subscription: subscription,
        variables: {
          approvalId: approvalId,
        },
        updater: (store, data) => {
          const approvalData = store.get(approvalId);

          const notes = approvalData?.getLinkedRecords('notes');
          const newNotes = data.updateInfoSubscription.notes?.map((item) => store.get(item.id));
          // @ts-ignore
          approvalData?.setLinkedRecords(notes?.concat(newNotes), 'notes');

          const approvers = approvalData?.getLinkedRecords('approvers');
          const newApprovers = data.updateInfoSubscription.approvers?.map((item) => store.get(item.id));
          // @ts-ignore
          approvalData?.setLinkedRecords(approvers?.concat(newApprovers), 'approvers');

          const assets = approvalData?.getLinkedRecords('assets');
          const newAssets = data.updateInfoSubscription.assets?.map((item) => store.get(item.id));
          // @ts-ignore
          approvalData?.setLinkedRecords(assets?.concat(newAssets), 'assets');

          data.updateInfoSubscription.comments?.forEach((comment) => {
            const noteData = store.get(comment.note.id);
            const comments = noteData?.getLinkedRecords('comments');
            const newComment = store.get(comment.id);
            // @ts-ignore
            noteData?.setLinkedRecords(comments?.concat([newComment]), 'comments');
          });
        },
      }),
      [approvalId],
    ),
  );
};

export default useUpdateInfoSubscribe;
