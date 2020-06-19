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
        onNext: (response) => {
          console.log(response);
        },
      }),
      [approvalId],
    ),
  );
};

export default useUpdateInfoSubscribe;
