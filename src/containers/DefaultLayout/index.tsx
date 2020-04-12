import DefaultLayout from './DefaultLayout';
import GameComponent from './Game';
import GameListComponent from './GameList';
import BingoLayoutComponent from "./BingoLayout"
/** Redux  */
import {connect} from 'react-redux';
import { NotificationActions, GameActions } from './../../actions';
import {IApplicationState} from "./../../reducers"
import {INotifyOptions} from "./../../common";

const mapStateToProps = (state: IApplicationState, ownProps?:any) => ({
    ...ownProps,
    state
});

  
const mapDispatchToProps = (dispatch: any)  => ({
  NotifyError: (notification:INotifyOptions) => dispatch(NotificationActions.NotifyError(notification)),
  NotifySuccess: (notification:INotifyOptions) => dispatch(NotificationActions.NotifySuccess(notification)),
  LoadLookupData:()=>{
    // start initializing the state
    // dispatch(LookupActions.getAllLookupAction());
    dispatch(GameActions.getGameListStartAction());
  },
  onGameItemClicked:(gameId:string)=>{
    dispatch(GameActions.getGameParticipantStartAction(gameId))
  }

});
export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComponent);
export const GameList = connect(mapStateToProps, mapDispatchToProps)(GameListComponent);
export const BingoLayout = connect(mapStateToProps, mapDispatchToProps)(BingoLayoutComponent);
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);


