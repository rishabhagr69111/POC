import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { CustomerService } from '../customer/customer.service';



@Component({
  selector: 'app-importexcel',
  templateUrl: './importexcel.component.html',
  styleUrls: ['./importexcel.component.css']
})
export class ImportexcelComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }
  DisplayData = [
    "firstName",
    "Début calculé Activité",
    "lastName",
    "emailId"
];
DisplayData1 = [
  "firstName",
  "Début calculé Activité",
    "lastName",
    "emailId"
];
display : boolean;


//inside export class

arrayBuffer: any;
file:File;
incomingfile(event) 
  {
  this.file= event.target.files[0]; 
  }

 Upload() {
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
           
            this.DisplayData = XLSX.utils.sheet_to_json(worksheet,{raw:true});
           // console.log(this.DisplayData);
            }
        fileReader.readAsArrayBuffer(this.file);
      }
      

Display() {
  this.DisplayData1 = this.DisplayData;
this.display=true;
 
 
}

saveFile() {
for(var i=0;i<this.DisplayData1.length;i++) 
 
  {
    var rv = {};
      rv[i] = this.DisplayData1[i];
  
   // console.log(rv[i]);
    this.customerService.exportExcel(rv[i])
      .subscribe(data => console.log(data), error => console.log(error));
  }

}

pageStart = 0;

  nextData() {
    this.pageStart += 100;  
       // Get the next 100 records
  }

  prevData() {
    this.pageStart -= 100;
            // Get the previous 100 records
  }



}
