/** Redux  */
import {connect} from 'react-redux';
import { NotificationActions, GameActions } from './../../actions';
import {IApplicationState} from "./../../reducers"
import {INotifyOptions} from "./../../common";

import React, { Component } from 'react';
import { AgGridReact } from "@ag-grid-community/react";
// import { AllCommunityModules } from "@ag-grid-community/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import { AllModules } from "@ag-grid-enterprise/all-modules";

interface ITableViewProps{
    data:any[],
    columnDefs:any[]
    onAdd:()=>void;
    onUpdate:(id:string, data:any)=>void;
    getContextMenuItems:(params:any)=>any[];
}

export class TableView extends Component<ITableViewProps, any> {
    gridApi:any={};
    gridColumnApi:any={};
    public constructor(props:ITableViewProps){
        super(props);
        this.state ={
            modules: AllModules,
            columnDefs:props.columnDefs,
            defaultColDef: {
                editable: true,
                sortable: true,
                filter: true
              },
              rowData:props.data,
              getRowNodeId: function(data:any) {
                return data._id;
              }
        }
    }
    public render(){
        return (
        <React.Fragment>
           <div style={{ marginBottom: "5px" }}>
                <button onClick={()=>this.props.onAdd()}>Add Row</button>
           
            </div>
        
        <div style={{ height: "calc(100vh - 25px)" }}>
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%"
          }}
          className="ag-theme-balham"
        >
          <AgGridReact
            modules={this.state.modules}
            columnDefs={this.props.columnDefs}
            rowData={this.props.data}
            defaultColDef={this.state.defaultColDef}
            animateRows={true}
            getRowNodeId={this.state.getRowNodeId}
            onGridReady={this.onGridReady}
            editType= "fullRow"
            onRowValueChanged={(row)=>{console.log('iwaschanged', row.data); this.props.onUpdate(row.data._id, row.data)}}
            getContextMenuItems={this.props.getContextMenuItems}
          />
        </div>
      </div>
      </React.Fragment>  )
    }
    private  onGridReady =(params:any)=> {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };
}






const mapStateToProps = (state: IApplicationState, ownProps?:any) => ({
    data:state.gamesReducer.games?state.gamesReducer.games:[],
    columnDefs:[{
        headerName: "Name",
        field: "name"
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
    dispatch(GameActions.getGameListStartAction());
    // start initializing the state
  },
  onAdd:()=>{
    console.log('Buttong click to add ' )
    dispatch(GameActions.createGameStartAction("New Game"));
  },
  onUpdate:(id:string, row:any)=>{
    dispatch(GameActions.updateGameStartAction(id, row));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableView);
