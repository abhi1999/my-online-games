import React, { Component, Suspense } from 'react';
import { Container } from 'reactstrap';
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from 'react-cookie';
import {checkForValidSession} from './../../utils/authentications';
import InstagramEmbed from 'react-instagram-embed';
import {Row, Col,ListGroup, Jumbotron, ListGroupItem} from "reactstrap"

import {
  AppFooter,
  AppHeader,
  // @ts-ignore
} from '@coreui/react';
// sidebar nav config

// const Game = React.lazy(() => import('./Game'));
// const GameList = React.lazy(() => import('./GameList'));

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
          <main className="main">
            <Container fluid>
            <Jumbotron>
                <h1 className="display-3">Welcome to Aadi's Bingo Bash</h1>
                <p className="lead">Select a game that you would like to play.  You will need a user password to start the game</p>
                <hr className="my-2" />
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroupItem disabled tag="a" href="#">Game 1</ListGroupItem>
                            <ListGroupItem tag="a" href="#">Aadi's Birthay</ListGroupItem>
                            <ListGroupItem tag="a" href="#">Aadi's Family Bingo1</ListGroupItem>
                            <ListGroupItem tag="a" href="#">Aadi's Family Bingo2 </ListGroupItem>                        
                        </ListGroup>
                    </Col>
                    <Col>
                        <InstagramEmbed
                                        url='https://instagr.am/p/B-z9OkPBKmz/'
                                        maxWidth={320}
                                        hideCaption={false}
                                        containerTagName='div'
                                        protocol=''
                                        injectScript
                                        onLoading={() => {}}
                                        onSuccess={() => {}}
                                        onAfterRender={() => {}}
                                        onFailure={() => {}}
                                        />
                    </Col>
                </Row>
            </Jumbotron>
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

export default withCookies(withRouter(DefaultLayout));
