import GameComponent from './DefaultLayout/Game';
/** Redux  */
import {connect} from 'react-redux';
import { NotificationActions, GameActions } from './../actions';
import {IApplicationState} from "./../reducers"
import {INotifyOptions} from "./../common";

const mapStateToProps = (state: IApplicationState, ownProps?:any) => ({
    ...ownProps,
    applicationState:state
});

  
const mapDispatchToProps = (dispatch: any)  => ({
  NotifyError: (notification:INotifyOptions) => dispatch(NotificationActions.NotifyError(notification)),
  NotifySuccess: (notification:INotifyOptions) => dispatch(NotificationActions.NotifySuccess(notification)),

  onGameItemClicked:(gameId:string)=>{
    dispatch(GameActions.getGameParticipantStartAction(gameId))
  },
  onParticipantClicked:(gameId:string, participantId:string, password:string)=>{
      dispatch(GameActions.verifyParticipantStartAction(gameId, participantId, password))
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);


