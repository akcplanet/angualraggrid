import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { RedComponentComponent } from "../red-component/red-component.component";
import { ConfigService } from '../services/config.service';
import { ModalService } from '../services/model.service';
import { GridCellEditorComponent } from "../grid-cell-editor/grid-cell-editor.component";

@Component({
    selector: 'app-my-grid-application',
    templateUrl: './my-grid-application.component.html',
    styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {

    private gridOptions: GridOptions;

    private gridApi;
    private gridColumnApi;

    private columnDefs;
    private defaultColDef;
    private groupDefaultExpanded;
    private rowData: [];

    private frameworkComponents;

    ngOnInit() {
    }

    constructor(private configService: ConfigService, private modalService: ModalService) {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs = [
            {
                headerName: "ID",
                field: "id",
                width: 100,
                sortable: true,
                filter: true,
                editable: true,
           //     cellEditor: "gridCellEditorComponent",
            },
            {
                headerName: "Start Date",
                field: "startDate",
                editable: true,
                cellRendererFramework: RedComponentComponent,
                cellEditor: "gridCellEditorComponent",
                //   width: 100,
                sortable: true,
                filter: true,
            }, {
                headerName: "Start Time",
                field: "startTime",
                editable: true,
                cellRendererFramework: RedComponentComponent,
               cellEditor: "gridCellEditorComponent",
                //  width: 100,
                sortable: true,
                filter: true,
            }, {
                headerName: "End Date",
                field: "endDate",
                editable: true,
                cellRendererFramework: RedComponentComponent,
                  cellEditor: "gridCellEditorComponent",
                //     width: 100,
                sortable: true,
                filter: true,
            }, {
                headerName: "End Time",
                field: "endTime",
                editable: true,
                cellRendererFramework: RedComponentComponent,
                  cellEditor: "gridCellEditorComponent",
                //     width: 100,
                sortable: true,
                filter: true,
            }, {
                headerName: "Description",
                field: "description",
                editable: true,
                cellRendererFramework: RedComponentComponent,
                 cellEditor: "gridCellEditorComponent",
                //   width: 100,
                sortable: true,
                filter: true,
            },

        ];
    this.navigateToNextCell = this.navigateToNextCell.bind(this);
    this.tabToNextCell = this.tabToNextCell.bind(this);
    this.frameworkComponents = {
      gridCellEditorComponent: GridCellEditorComponent
    };
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.showInitData();
    }

    onCellClicked($event){
    console.log($event);
  //  this.modalService.open("custom-modal-1");
}

    showInitData() {
        this.configService.getConfig().subscribe(result => {
            this.rowData = result.gridData;
        }, error => console.error(error));
    };

    

   tabToNextCell(params) {
    let previousCell = params.previousCellDef;
    let lastRowIndex = previousCell.rowIndex;
    let nextRowIndex = params.backwards ? lastRowIndex + 1 : lastRowIndex - 1;
    let renderedRowCount = this.gridApi.getModel().getRowCount();
    if (nextRowIndex < 0) {
      nextRowIndex = 0;
    }
    if (nextRowIndex >= renderedRowCount) {
      nextRowIndex = renderedRowCount - 1;
    }
    let result = {
      rowIndex: nextRowIndex,
      column: previousCell.column,
      floating: previousCell.floating
    };
    return result;
  }

  navigateToNextCell(params) {
    let previousCell = params.previousCellDef;
    let suggestedNextCell = params.nextCellDef;
    switch (params.key) {
      case 38:
        var nextRowIndex = previousCell.rowIndex - 1;
        if (nextRowIndex < 0) {
          return null;
        } else {
          return {
            rowIndex: nextRowIndex,
            column: previousCell.column,
            floating: previousCell.floating
          };
        }
      case 40:
        var nextRowIndex : number = previousCell.rowIndex + 1;
        var renderedRowCount = this.gridApi.getModel().getRowCount();
        if (nextRowIndex >= renderedRowCount) {
          return null;
        } else {
          return {
            rowIndex: nextRowIndex,
            column: previousCell.column,
            floating: previousCell.floating
          };
        }
      case 37:
      case 39:
        return suggestedNextCell;
      default:
        throw "this will never happen, navigation is always one of the 4 keys above";
    }
  }




}
