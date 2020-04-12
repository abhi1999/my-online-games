import { BaseAction } from '../../common';

import { connect } from 'react-redux';
import {Dispatch} from "redux"
import { NumberActions, NotificationActions } from './../../actions';
import {INotifyOptions} from "./../../common";
import {IApplicationState} from "./../../reducers"
import Employees  from './Employees';

const mapStateToProps = (state: IApplicationState) => ({
    numberCollection: state.numberCollection,
  });

  
const mapDispatchToProps = (dispatch: Dispatch<BaseAction>|any)  => ({
    onRequestNewNumber: () => dispatch(NumberActions.numberRequestStartAction()),
    notifyInfo: (notification:INotifyOptions) => dispatch(NotificationActions.NotifyInfo(notification)),
  });


  
  
export const EmployeesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Employees);