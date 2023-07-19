import { Component, OnDestroy, OnInit } from '@angular/core';
import { xlsFilterService } from 'src/app/services/xls-filter-service';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import { INTERFACE } from 'src/app/common/interfaces/interfaces';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-xls-filter-component',
  templateUrl: './xls-filter-component.component.html',
  styleUrls: ['./xls-filter-component.component.scss']
})
export class XlsFilterComponentComponent implements OnInit, OnDestroy {

  // public xlsFilterFeilds!: FormGroup;
  public isProgressSpinnerActive : boolean = false;
  public fileUploadDisabled: boolean = false;
  public filterXlsRecords: INTERFACE.excelFilterObject[] = [];
  public files: any[] = [];
  public selectedFilter:string = "";
  public selectedItemName :any = undefined;
  public dropDownItemList: INTERFACE.itemName[] =[]
  constructor(
    private xls_filter_service: xlsFilterService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log("ng on distroy");
    this.xls_filter_service.uploadedFiles = [];
  }

  setSelectedFilter(selectedFilter:string) {
    setTimeout(() => {
      this.filterXlsRecords = [];
      if(selectedFilter === "itemName") {
        if(this.xls_filter_service.uploadedFiles.length) {
          let formData = new FormData();
          formData.append('files', this.xls_filter_service.uploadedFiles[0]);
          this.getItemList(formData);
        } else {
          this.messageService.add({ severity: 'info', summary: 'info', detail: `Select file to see item drop-down` });
        }
      } else if(selectedFilter === "gst") {
        this.dropDownItemList = [];
        this.selectedItemName = undefined;
      }
    }, 10);
  }
  
  filterXlsAcordingSelectedFilter() {
    let formData = new FormData();
    formData.append('files', this.xls_filter_service.uploadedFiles[0]);
    console.log(formData.getAll("files"));
    if(this.selectedFilter === "gst") {
      this.getGSTFilterExcelRecords(formData);
    } else if(this.selectedFilter === "itemName") {
      if(this.selectedItemName?.name) {
        this.getFilterExcelForItem(formData);
      } else {
        this.messageService.add({ severity: 'info', summary: 'info', detail: `Please select the item name from the drop down menu, as this category may no longer exist` });
      }
    }
  }
  private getItemList(formData: FormData) {
    this.dropDownItemList = [];
    this.isProgressSpinnerActive = true;
    this.xls_filter_service.getItemList(formData).subscribe({
      next: (response: string[]) => {
        console.log(response);
        if(response) {
          response.forEach((item)=> {
            let data:INTERFACE.itemName = {
              "name" : item,
              "code" : item
            }
            this.dropDownItemList.push(data);
          });
        }
        this.isProgressSpinnerActive = false;
      },
      error: (e) => {
        console.error(e);
        this.isProgressSpinnerActive = false;
      }
    });
  }

  private getGSTFilterExcelRecords(formData: FormData) {
    formData.append('itemFilter', 'item');
    this.filterXlsRecords = [];
    this.isProgressSpinnerActive = true;
    this.xls_filter_service.filterXls(formData, true).subscribe({
      next: (response: any[]) => {
        console.log(response);
        if(response) {
          response.forEach((item, index) => {
            if(item?.length) {
              let data: INTERFACE.excelFilterObject = {
                "excelFilter": index === 0 ? "5_PERCENTAGE" : 
                               index === 1 ? "12_PERCENTAGE" : 
                               index === 2 ? "14_PERECENTAGE" : 
                               index === 3 ? "18_PERCENTAGE" :
                               "BLANK_PERCENTAGE",
                "list": item
              }
              this.filterXlsRecords.push(data);
            }
          });
        }
        this.isProgressSpinnerActive = false;
      },
      error: (e) => {
        console.error(e);
        this.isProgressSpinnerActive = false;
      }
    });
  }

  onUpload(event: any) {
    if(this.selectedFilter) {
      console.log(event);
      this.xls_filter_service.uploadedFiles =[];
      for (let file of event.files) {
        this.xls_filter_service.uploadedFiles.push(file);
      }
      console.log(this.xls_filter_service.uploadedFiles);
      this.filterXlsAcordingSelectedFilter();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Select Filter` });
    }
   
  }

  onSelectFile(event: any) {
    this.filterXlsRecords = [];
    this.xls_filter_service.uploadedFiles = [];
    for (let file of event.files) {
      this.xls_filter_service.uploadedFiles.push(file);
    }
    if(this.selectedFilter === "itemName") {
      if(this.xls_filter_service.uploadedFiles.length) {
        let formData = new FormData();
        formData.append('files', this.xls_filter_service.uploadedFiles[0]);
        this.getItemList(formData);
      }
    }
  }

  exportAllGSTexcel(){
    if(this.filterXlsRecords?.length) {
      this.filterXlsRecords?.forEach(item=> {
        this.exportexcel(item.excelFilter);
      });
    }
  }

  exportexcel(filname: string): void
  {
    /* pass here the table id */
    let element = document.getElementById(filname);
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, `${filname}.xlsx`);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Excel file downloaded successfully "${filname}.xlsx"` });
    if(this.selectedItemName && this.selectedFilter === "itemName") {
      let index = this.dropDownItemList.findIndex(item=> item.name === this.selectedItemName?.name);
      if(index != -1) {
        this.dropDownItemList.splice(index,1);
      }
      this.selectedItemName = undefined;
    }
  }

  calculateTotalAmount(filterDataArray: INTERFACE.xlsFilterFeilds[]) :number {
    let totalAmount = 0 ;
    filterDataArray.forEach(item => {
      totalAmount = Number(item.amount) + totalAmount;
    });
    return totalAmount;
  }
  
  calculateTotalQuantity(filterDataArray: INTERFACE.xlsFilterFeilds[]) :number {
    let totalQuantity = 0 ;
    filterDataArray.forEach(item => {
      let qtyArray = item.qty.split(" ");
      totalQuantity = Number(qtyArray[0]) + totalQuantity;
    });
    return totalQuantity;
  }

  calculateTotalBeforGstAmount(filterDataArray: INTERFACE.xlsFilterFeilds[]) :string {
    let totalQuantity = 0 ;
    filterDataArray.forEach(item => {
      totalQuantity = (item.beforeGst ? item.beforeGst : 0 ) + totalQuantity;
    });
    return totalQuantity.toFixed(2);
  }

  onClearFile(event: any) {
    this.files =[];
    this.filterXlsRecords = [];
    this.dropDownItemList = [];
    this.selectedItemName = undefined;
    this.xls_filter_service.uploadedFiles = [];
  }

  onClickDropDown(event: any) {
    if(event?.value) {
      this.selectedItemName = event.value;
      if(this.xls_filter_service.uploadedFiles.length) {
        let formData = new FormData();
        formData.append('files', this.xls_filter_service.uploadedFiles[0]);
        formData.append('itemFilter', this.selectedItemName?.name);
        console.log(formData.getAll("files"));
        this.getFilterExcelForItem(formData);
      }
    }
  }

  private getFilterExcelForItem(formData:FormData) {
    this.filterXlsRecords = [];
    this.isProgressSpinnerActive = true;
    this.xls_filter_service.filterXls(formData, false).subscribe({
      next: (response: any[]) => {
        console.log(response);
        response.forEach(item=> {
          let data:INTERFACE.excelFilterObject = {
            "excelFilter" : this.selectedItemName?.name,
            "list": item
          }
          this.filterXlsRecords.push(data);
        });
        this.isProgressSpinnerActive = false;
      },
      error: (e) => {
        console.error(e);
        this.isProgressSpinnerActive = false;
      }
    });
  }
}

