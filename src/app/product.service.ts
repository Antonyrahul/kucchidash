import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  
  getalldata(data):Observable<any>{
    console.log(data)
//https://server.antonyrahul.site
    // { Authorization: "Bearer " + localStorage.getItem("token")})
    return this.http.post("http://localhost:4123/getalldata",data)
  }

  downloadFile(data, filename='data') {
    let csvData = this.ConvertToCSV(data, ['name','age', 'average', 'approved', 'description']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

ConvertToCSV(objArray, headerList) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     console.log(array)
     let str = '';
     let row = 'S.No,';

    //  for (let index in headerList) {
    //      row += headerList[index] + ',';
    //  }
    //  row = row.slice(0, -1);
    //  str += row + '\r\n';

    const result = array.map((obj) => {  
      return {
          key: Object.keys(obj)[0], 
          val: Object.values(obj)[0]
        }
    });
    console.log(result)
 
     for (let i = 0; i < array.length; i++) {
         let line = (i+1)+'';
         headerList=Object.keys(array[i]);
         console.log(headerList)
         for (let index in headerList) {
            let head = headerList[index];

             line += ',' +head+" : " + array[i][head];
         }
         str += line + '\r\n';
     }
     return str;
 }
}
