/** Redux  */
import {connect} from 'react-redux';
import { NotificationActions, LookupActions } from './../../actions';
import {IApplicationState} from "./../../reducers"
import {INotifyOptions} from "./../../common";
import TableView from "./TableView";

const mapStateToProps = (state: IApplicationState, ownProps?:any) => ({
    data:state.lookupCollection.jobsites?state.lookupCollection.jobsites:[],
    columnDefs:[{
        headerName: "Name",
        field: "name"
      },{
        headerName: "Location",
        field: "location"
      },{
        headerName: "Id",
        field: "_id",
        editable:false
      },{
        headerName: "Created On",
        field: "createDate",
        editable:false
      },{
        headerName: "Last Update",
        field: "updateDate",
        editable:false
      }],
    numberCollection: state.numberCollection,
    ...ownProps
});

  
const mapDispatchToProps = (dispatch: any)  => ({
  NotifyError: (notification:INotifyOptions) => dispatch(NotificationActions.NotifyError(notification)),
  NotifySuccess: (notification:INotifyOptions) => dispatch(NotificationActions.NotifySuccess(notification)),
  getContextMenuItems:(params:any)=>{
    console.log('params for context menyu', params)
    return [{
        name: "Delete ",
        action: function() {
          if(params && params.node && params.node.data && params.node.data.id){
            dispatch(NotificationActions.NotifyError({message:"Deleting record -" + params.node.data.id}))
            // dispatch(LookupActions.deleteJobSitesStartAction(params.node.data.id));
          }
        },
        cssClasses: ["redFont", "bold"]
      },
      "copy",
      "separator"
    ]
  },
  onLoginComplete:()=>{
    dispatch(NotificationActions.NotifySuccess({message:'Login Complete.  Loading the data'}));
    dispatch(LookupActions.getAllLookupAction());
    // start initializing the state
  },
  onAdd:()=>{
    dispatch(LookupActions.createJobSitesStartAction({name:''}));
  },
  onUpdate:(id:string, row:any)=>{
    dispatch(LookupActions.updateJobSitesStartAction(id, row));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableView);
