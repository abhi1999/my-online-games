import GameListComponent from './DefaultLayout/GameList';
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
  loadGameList:()=>{
    // start initializing the state
    // dispatch(LookupActions.getAllLookupAction());
    dispatch(GameActions.getGameListStartAction());
  },
  onGameItemClicked:(gameId:string)=>{
    dispatch(GameActions.getGameParticipantStartAction(gameId))
  }

});
export default  connect(mapStateToProps, mapDispatchToProps)(GameListComponent);


