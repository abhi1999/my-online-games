import React, { Component } from 'react';
import { AgGridReact } from "@ag-grid-community/react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
// import { S_IFBLK } from 'constants';

var newCount = 1;
function createNewRowData() {
  var newData = {
    make: "Toyota " + newCount,
    model: "Celica " + newCount,
    price: 35000 + newCount * 17,
    zombies: "Headless",
    style: "Little",
    clothes: "Airbag"
  };
  newCount++;
  return newData;
}
export default class Employees extends Component<any, any> {
    gridApi:any={};
    gridColumnApi:any={};
    public constructor(props:any) {
        super(props);
    
        this.state = {
          modules: AllCommunityModules,
          columnDefs: [
            {
              headerName: "Make",
              field: "make"
            },
            {
              headerName: "Model",
              field: "model"
            },
            {
              headerName: "Price",
              field: "price",
              filter: "agNumberColumnFilter"
            },
            {
                headerName: "ID",
                field: "id"
            },
            {
                headerName: "First Name",
                field: "firstName"
            },
            {
                headerName: "Last Name",
                field: "lastName"
            },
            {
                headerName: "Phone Number",
                field: "phoneNumber"
            }
          ],
          rowData: [
            {
              id: "aa",
              make: "Toyota",
              model: "Celica",
              price: 35000
            },
            {
              id: "bb",
              make: "Ford",
              model: "Mondeo",
              price: 32000
            },
            {
              id: "cc",
              make: "Porsche",
              model: "Boxter",
              price: 72000
            },
            {
              id: "dd",
              make: "BMW",
              model: "5 Series",
              price: 59000
            },
            {
              id: "ee",
              make: "Dodge",
              model: "Challanger",
              price: 35000
            },
            {
              id: "ff",
              make: "Mazda",
              model: "MX5",
              price: 28000
            },
            {
              id: "gg",
              make: "Horse",
              model: "Outside",
              price: 99000
            }
          ],
          defaultColDef: {
            editable: true,
            sortable: true,
            filter: true
          },
          getRowNodeId: function(data:any) {
            return data.id;
          }
        };
    }
    
    private  onGridReady =(params:any)=> {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();;
    };

    private onAddRow=()=> {
        var newItem = createNewRowData();
        this.gridApi.updateRowData({ add: [newItem] });
      }
    private onButtonClick =()=>{
      if(this.props.onRequestNewNumber){
        this.props.onRequestNewNumber();
        this.props.notifyInfo({message:'hi-'+ new Date()})
      }
      else {alert('no method found')}
      /*<button onClick={this.onButtonClick}>Request new number</button>
        {this.props.numberCollection? this.props.numberCollection.map((n:number)=> <li key={n}>{n}</li>):"no numbers"}
        */
    }
      public render() {
        return (
          <div style={{ width: "100%", height: "75vh" }}>
            
            <div style={{ marginBottom: "5px" }}>
                <button onClick={this.onAddRow.bind(this)}>Add Row</button>
           
            </div>
            <div style={{ height: "calc(100% - 25px)" }}>
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
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                  defaultColDef={this.state.defaultColDef}
                  animateRows={true}
                  getRowNodeId={this.state.getRowNodeId}
                  onGridReady={this.onGridReady}
                  editType= "fullRow"
                />
              </div>
            </div>
          </div>
        );
      }
}