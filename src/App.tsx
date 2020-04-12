import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { withCookies, ReactCookieProps } from 'react-cookie';
import Notifications from 'react-notification-system-redux';
import {connect} from 'react-redux';
import {IApplicationState} from "./reducers"
import './App.scss';
// Containers
import {DefaultLayout, Game,GameList} from './containers';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Pages
const Login = React.lazy(() => import('./views/Pages/Login/index'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

interface IAppProps extends ReactCookieProps{
  notifications:any
}
class App extends Component<IAppProps,any> {
  public constructor(props:IAppProps){
    super(props);
  }
  public render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" render={props => <Login {...props}/>} />
              <Route exact path="/register" render={props => <Register {...props}/>} />
              <Route exact path="/404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" render={props => <Page500 {...props}/>} />
              <Route path="/Game/:gameId" render={props => <Game {...props}/>} />
              <Route path="/GameList" render={props => <GameList {...props}/>} />
              <Route path="/" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
          {this.renderNotification()}
      </HashRouter>
    );
  }
  private renderNotification=()=>{
    const {notifications} = this.props;
    console.log('notifications', notifications)
    //Optional styling
    const style = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px'
        },
        success: { // Applied only to the success notification item
          color: 'green'
        },
        error: { // Applied only to the error notification item
          color: 'red'
        }
      }
    };
    return (
      <Notifications
        notifications={notifications}
        style={style}
      />
    );
  }
}

export default connect(
  (state:IApplicationState) => ({ notifications: state.notifications })
)( withCookies(App));
