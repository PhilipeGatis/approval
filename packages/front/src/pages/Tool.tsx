import React, { FC, Suspense } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Content from '../partials/Content';
import LeftMenu from '../partials/LeftMenu';
import RightMenu from '../partials/RightMenu';
import KeyBoardEvents from '../components/KeyBoardEvents';
import Loading from '../components/Loading';
import useUpdateInfoSubscribe from '../relayComponents/useUpdateInfoSubscribe';
import useApprovalQuery from '../relayComponents/useApprovalQuery';
import { AppTheme } from '../theme';
import { makeStyles } from '@material-ui/core/styles';

type Props = RouteComponentProps;

const useStyles = makeStyles((theme: AppTheme) => ({
  background: {
    backgroundImage:
      'linear-gradient(45deg,#e3e9ed 25%,transparent 0),linear-gradient(-45deg,#e3e9ed 25%,transparent 0),linear-gradient(45deg,transparent 75%,#e3e9ed 0),linear-gradient(-45deg,transparent 75%,#e3e9ed 0)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0,0 10px,10px -10px,-10px 0',
    height: '100%',
    width: '100%',
    position: 'fixed',
  },
  flex: {
    display: 'flex',
  },
}));

const Tool: FC<Props> = ({ match, history }) => {
  const classes = useStyles();
  const approval = useApprovalQuery();

  useUpdateInfoSubscribe();

  return (
    <Suspense fallback={<Loading />}>
      <KeyBoardEvents>
        <div className={classes.background}>
          <LeftMenu />
          <div className={classes.flex}>
            <Content />
            <RightMenu isCanApprove={approval?.isCanApprove} />
          </div>
        </div>
      </KeyBoardEvents>
    </Suspense>
  );
};

export default Tool;
