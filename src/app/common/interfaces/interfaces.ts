export namespace INTERFACE {
    
    export interface xlsFilterFeilds {
        itemName :string;

        qty :string;
        
        gst?: string;

        beforeGst?:number|null;

        amount :string
    }
    export interface excelFilterObject {
        excelFilter: string,
        list: xlsFilterFeilds[]
    }
    export interface itemName {
        name:string,
        code:string
    }
}