import DefaultLayout from './DefaultLayout';
import GameComponent from './Game';
import GameListComponent from './GameList';

/** Redux  */
import {connect} from 'react-redux';
import { NotificationActions, LookupActions } from './../../actions';
import {IApplicationState} from "./../../reducers"
import {INotifyOptions} from "./../../common";

const mapStateToProps = (state: IApplicationState, ownProps?:any) => ({
    ...ownProps
});

  
const mapDispatchToProps = (dispatch: any)  => ({
  NotifyError: (notification:INotifyOptions) => dispatch(NotificationActions.NotifyError(notification)),
  NotifySuccess: (notification:INotifyOptions) => dispatch(NotificationActions.NotifySuccess(notification)),
  LoadLookupData:()=>{
    // start initializing the state
    dispatch(LookupActions.getAllLookupAction());
  }
});
export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComponent);
export const GameList = connect(mapStateToProps, mapDispatchToProps)(GameListComponent);
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);


