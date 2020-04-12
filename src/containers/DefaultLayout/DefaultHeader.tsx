import React, { Component } from 'react';
import {  NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { ReactCookieProps } from 'react-cookie';
import { RouteComponentProps } from "react-router";
import {  AppNavbarBrand, AppSidebarToggler 
  // @ts-ignore
} from '@coreui/react';
// import logo from '../../assets/img/brand/AFD-New-Logo-LG-RegMark_AFD-Blue_RGB.png'
// import sygnet from '../../assets/img/brand/AFD-New-Logo-LG-RegMark_AFD-Blue_RGB.png'
import logo from '../../assets/img/aadi.png';
import sygnet from '../../assets/img/aadi.png';


import {connect} from 'react-redux';
import { withCookies } from 'react-cookie';
import { NotificationActions } from './../../actions';
import {IApplicationState} from "./../../reducers"
import {INotifyOptions} from "./../../common";
import {removeSessionCookie} from "./../../utils/authentications";
import Cookies from 'universal-cookie';



interface IDefaultHeaderProps extends RouteComponentProps, ReactCookieProps{
  onLogout:(cookieHandler:Cookies|undefined, history:any)=>void
}
interface IDefaultHeaderState{
}

class DefaultHeader extends Component<IDefaultHeaderProps,IDefaultHeaderState>  {
  public constructor(props:IDefaultHeaderProps){
    super(props);
  }
  public render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 40, alt: 'AFD' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'AFD' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
  private onLogout(){
    this.props.onLogout(this.props.cookies, this.props.history);
  }
}


const mapStateToProps = (state: IApplicationState, ownProps?:any) => ({
  numberCollection: state.numberCollection,
  ...ownProps
});


const mapDispatchToProps = (dispatch: any)  => ({
  NotifyError: (notification:INotifyOptions) => dispatch(NotificationActions.NotifyError(notification)),
  NotifySuccess: (notification:INotifyOptions) => dispatch(NotificationActions.NotifySuccess(notification)),
  onLogout:(cookieHandler:Cookies, history:string[])=>{
    dispatch(NotificationActions.NotifySuccess({message:'Logging out from your session'}));
    removeSessionCookie(cookieHandler);
    setTimeout(()=>window.location.reload(), 1000);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(DefaultHeader));


