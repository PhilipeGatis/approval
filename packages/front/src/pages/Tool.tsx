import React, { Fragment, FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../partials/Header';
import Content from '../partials/Content';
import LeftMenu from '../partials/LeftMenu';
import RightMenu from '../partials/RightMenu';
import KeyBoardEvents from '../components/KeyBoardEvents';
import Loading from '../components/Loading';
import useUpdateInfoSubscribe from '../subscribers/useUpdateInfoSubscribe';
import { useQuery } from 'relay-hooks';
import graphql from 'babel-plugin-relay/macro';
import { ToolQuery } from './__generated__/ToolQuery.graphql';

const query = graphql`
  query ToolQuery($approvalId: String!) {
    approval(approvalId: $approvalId) {
      id
      dueDate
      isCanApprove
      assets {
        assetUrl
        asset
      }
      approvers {
        name
        isApproved
      }
      notes {
        id
        createdBy
        comments {
          id
          text
        }
      }
    }
  }
`;

interface TParams {
  id: string;
}

type Props = RouteComponentProps<TParams>;

const Tool: FC<Props> = ({ match, history }) => {
  const approvalId = match.params.id;
  const { props } = useQuery<ToolQuery>(
    query,
    { approvalId },
    {
      fetchPolicy: 'store-or-network',
    },
  );

  useUpdateInfoSubscribe({ approvalId });

  useEffect(() => {
    if (props && !props.approval) history.push('/404');
  }, [props, history]);
  if (props && props.approval) {
    return (
      <Fragment>
        <KeyBoardEvents>
          <Header />
          <Content />
          <LeftMenu />
          {props && props.approval && props.approval.isCanApprove && <RightMenu approvalId={approvalId} />}
        </KeyBoardEvents>
      </Fragment>
    );
  }
  return <Loading />;
};

export default Tool;
