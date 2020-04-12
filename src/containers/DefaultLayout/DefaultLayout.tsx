import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from 'react-cookie';
import {checkForValidSession} from './../../utils/authentications';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
  // @ts-ignore
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

// const Game = React.lazy(() => import('./Game'));
// const GameList = React.lazy(() => import('./GameList'));

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

interface IDefaultLayoutProps extends RouteComponentProps, ReactCookieProps{
  LoadLookupData:()=>void
}
interface IDefaultLayoutState {
  validSession:boolean
}
class DefaultLayout extends Component<IDefaultLayoutProps, IDefaultLayoutState> {

  public constructor(props:IDefaultLayoutProps){
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
          <AppSidebar fixed display="none">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense fallback={this.loading()}>
            <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
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
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
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

export default withCookies(withRouter(DefaultLayout));
