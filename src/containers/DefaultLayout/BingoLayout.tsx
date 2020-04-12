import React, { Component, Suspense } from 'react';
import { Container } from 'reactstrap';
import { withRouter, RouteComponentProps } from "react-router";
import * as router from 'react-router-dom';
import { withCookies, ReactCookieProps } from 'react-cookie';
import {checkForValidSession} from './../../utils/authentications';
import { Redirect,Route, Switch } from 'react-router-dom';

/*
import {Game,GameList} from './../';
  <Route  path="/Bingo/Game/:gameId" render={props => <Game {...props}/>} />
                    <Route  path="/Bingo/GameList11" render={props => <div>hello</div>} />
                    <Route  path="/Bingo/GameList" render={props => <GameList {...props}/>} />
                    */
import {
  AppFooter,
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,

  // @ts-ignore
} from '@coreui/react';
import { IApplicationState } from '../../reducers';
// routes config
import routes from '../../routes';

// const Game = React.lazy(() => import('./Game'));
// const GameList = React.lazy(() => import('./GameList'));

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

interface IBingoLayoutProps extends RouteComponentProps, ReactCookieProps{
  LoadLookupData:()=>void,
  onGameItemClicked:(gameId:string)=>void
  state:IApplicationState
}
interface IBingoLayoutState {
  validSession:boolean
}
class BingoLayout extends Component<IBingoLayoutProps, IBingoLayoutState> {

  public constructor(props:IBingoLayoutProps){
    super(props);
    this.state ={
      validSession:false
    }
  }
  private checkForValidSession = ()=>{
    const { cookies, history } = this.props;
    if(checkForValidSession(cookies)){
      this.setState({validSession:true});
      this.props.LoadLookupData();
    }else{
      this.setState({validSession:false})
      history.push('/Login');
    }    
  }

  public componentDidMount=()=>{
    this.checkForValidSession();
  }
  private loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  public render() {
    if(!this.state.validSession){return <div/>}
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader {...this.props}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
            <Suspense fallback={this.loading()}>
                <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props:any) => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/Bingo/Games" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default withCookies(withRouter(BingoLayout));
