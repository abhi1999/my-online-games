import React, { Component } from 'react';
import { ReactCookieProps } from 'react-cookie';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {INotifyOptions} from "./../../../common";
import {checkPassword, setSessionCookie} from "./../../../utils/authentications";

interface ILoginProps extends RouteComponentProps, ReactCookieProps{
  NotifyError:(notificationOptions:INotifyOptions)=>void;
  NotifySuccess:(notificationOptions:INotifyOptions)=>void;
  onLoginComplete:()=> void;
}
interface ILoginState{
  username:string,
  password:string,
}

class Login extends Component<ILoginProps,ILoginState> {
  public constructor(props:ILoginProps){
    super(props);
    this.state={
      username:'',
      password:''
    };
  }
  public render =()=> {
    return (<div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Enter a password to continue</p>
                      <InputGroup style={{'display':'none'}}  className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input disabled={true} type="text" placeholder="Username" autoComplete="username" value={this.state.username} onChange={(e:any)=>{this.setState({username:e.target.value});}}  />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input data-hook="password" type="password" placeholder="Password" value={this.state.password} onChange={(e:any)=>{this.setState({password:e.target.value});}} 
                        autoComplete="none" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button data-hook="login" color="primary" className="px-4" onClick={this.onLoginClicked}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" disabled={true} className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%', display:'none' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  private onLoginClicked=()=>{
    if(checkPassword(this.state.password)){
      // this.props.NotifySuccess({message: "Login successful. Redirecting to main page"});
      this.props.onLoginComplete();
      setTimeout(()=>{this.setCookieAndRedirectToMainPage()}, 1000)
    }else{
      this.props.NotifyError({message:"Incorrect Password"})
    }
  }
  private setCookieAndRedirectToMainPage = ()=>{
    const { cookies, history } = this.props;
    setSessionCookie(this.state.password, cookies)
    history.push('/GameList');
  }
}


export default Login;