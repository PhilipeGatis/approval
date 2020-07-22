import { useMemo } from 'react';
import { useSubscription } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import { useUpdateInfoSubscribeInfoSubscription } from './__generated__/useUpdateInfoSubscribeInfoSubscription.graphql';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useParams } from 'react-router-dom';

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

const useUpdateInfoSubscribe = (): void => {
  const { id: approvalId } = useParams();
  useSubscription(
    useMemo(
      (): GraphQLSubscriptionConfig<useUpdateInfoSubscribeInfoSubscription> => ({
        subscription: subscription,
        variables: {
          approvalId: approvalId,
        },
        updater: (store, data) => {
          const approvalData = store.get(approvalId);

          //Add new Notes
          const notes = approvalData?.getLinkedRecords('notes');
          const newNotes = data.updateInfoSubscription.notes
            ?.filter((item) => notes?.findIndex((note) => note.getDataID() === item.id) === -1)
            .map((item) => store.get(item.id));
          if (newNotes?.length) {
            // @ts-ignore
            approvalData?.setLinkedRecords(newNotes.concat(notes), 'notes');
          }

          //Add new Approvers
          const approvers = approvalData?.getLinkedRecords('approvers');
          const newApprovers = data.updateInfoSubscription.approvers
            ?.filter((item) => approvers?.findIndex((approver) => approver.getDataID() === item.id) === -1)
            .map((item) => store.get(item.id));
          if (newApprovers?.length) {
            // @ts-ignore
            approvalData?.setLinkedRecords(approvers?.concat(newApprovers), 'approvers');
          }

          //Add new Asset
          const assets = approvalData?.getLinkedRecords('assets');
          const newAssets = data.updateInfoSubscription.assets
            ?.filter((item) => assets?.findIndex((asset) => asset.getDataID() === item.id) === -1)
            .map((item) => store.get(item.id));
          if (newAssets?.length) {
            // @ts-ignore
            approvalData?.setLinkedRecords(assets?.concat(newAssets), 'assets');
          }

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
