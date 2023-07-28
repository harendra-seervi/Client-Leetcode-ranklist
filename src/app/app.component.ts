import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserService } from './services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {AfterViewInit, ViewChild} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-client';
  displayedColumns: string[] = ['id','name', 'country', 'email', 'institute','lusername','rat','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog:MatDialog, private _userService:UserService){ }

  openAddEditUserForm(){
    const dialogRef=this._dialog.open(UserAddEditComponent);
    // this.getUserList();
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val==true){
          this.executeFunctions();
        }
      }
    })
  }

  ngOnInit():void{
    // this.getUserList();
    // // console.log(this._userService.getRating("harenrda_seervi"));
    // this.showRating();
    this.executeFunctions();
  }

  // Inside your AppComponent class
  async executeFunctions() {
    try {
      const userList = await this.getUserList();
      const ratingData = await this.showRating();
      console.log('User List:', userList);
      console.log('Rating Data:', ratingData);
    } catch (error) {
      console.log(error);
    }
  }


  getUserList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._userService.getUserList().subscribe(
        (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }
  
  async updateTableRating(lusername: any): Promise<any> {
    try {
      const response = await this._userService.getRating(lusername).toPromise();
      return response.data.rating;
    } catch (error) {
      console.error(error);
      return 0; // or any default value to handle errors
    }
  }
  

  async showRating(): Promise<void> {
    try {
      const newData = await Promise.all(
        this.dataSource.data.map(async (row) => {
          console.log(row.lusername);
          const r = await this.updateTableRating(row.lusername);
          return { ...row, rat: r };
        })
      );
      this.dataSource.data = newData;
    } catch (error) {
      console.error(error);
    }
  }
  
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id:number){
    console.log(id);
    // As of now i did not handle the error and next part---------------->
    this._userService.deleteUser(id).subscribe();
    alert("Deleted");
    // this.getUserList();
    this.executeFunctions()
  }

  openEditForm(data:any){ 
    const dialogRef=this._dialog.open(UserAddEditComponent,{
      data,
    });
    
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val==true){
          this.executeFunctions()
        }
      }
    })
  }


  
  

  
  
}

// showRating(){

//   this.dataSource.data.map((row)=>{
//     console.log(row);
//   })
  
// }