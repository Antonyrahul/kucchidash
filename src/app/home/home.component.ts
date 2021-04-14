import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formvisitcount;
  infovisitcount;
  kucchivisitcount;
  fontvisitcount;
  sitevisitcount;
  userdata=[];
  displayArr=[];
  currentData;
  exportarr=[];
  sortedarr=[];
  constructor(private productservice: ProductService) { 
    this.productservice.getalldata({dummyval:"dummyval"}).subscribe((data) => {
      console.log(data)
      console.log(data.data)
      this.fontvisitcount=data.data.fontvisitcount;
      this.sitevisitcount=data.data.sitevisitcount;
      this.kucchivisitcount=data.data.kucchivisitcount;
      this.infovisitcount=data.data.infovisitcount;
      this.userdata=data.data.userData;
      this.displayArr=this.userdata;
      this.sortedarr=this.userdata;
    })
  }

  ngOnInit(): void {
    
  }
  showalldata(details){
    console.log(details)
    this.currentData=details
  }

  toggleanswer(smName) {
    if (!this.exportarr.includes(smName)) {
      this.exportarr.push(smName)
    }
    else if (this.exportarr.includes(smName)) {
      this.exportarr = this.exportarr.filter(item => item !== smName)
    }
    console.log(this.exportarr)
  }

  sortbytimelowtoup(){
    this.displayArr.sort(function(a,b){
      return (a.time) -(b.time)
    })
    this.sortedarr=this.displayArr;
  }

  sortbytimeuptolow(){
    this.displayArr.sort(function(a,b){
      return (b.time) -(a.time)
    })
    this.sortedarr=this.displayArr;

  }

  search(searchstr){
  

  this.displayArr= this.sortedarr.filter((item)=>item.name.toLowerCase().includes(searchstr.toLowerCase())||item.email.toLowerCase().includes(searchstr.toLowerCase()))
    

  }

  
download(){
  if(this.exportarr.length==0){
    this.exportarr=this.userdata
  }
  
  this.productservice.downloadFile(this.exportarr, 'craetorsinc');
}

}
