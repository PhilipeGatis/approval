import React from 'react';
import ApproverComponent from './Approver';
import useApprovalQuery from '../relayComponents/useApprovalQuery';
import { Approver } from '../Types';

const AppoversList = () => {
  const approval = useApprovalQuery();

  if (approval?.approvers?.length) {
    return (
      <>
        {approval?.approvers.map((approver) => {
          return <ApproverComponent key={approver.id} approver={approver as Approver} />;
        })}
      </>
    );
  }

  return null;
};

export default AppoversList;
