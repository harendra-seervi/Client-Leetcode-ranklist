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
  displayedColumns: string[] = ['id','name', 'country', 'email', 'institute','lusername','action'];
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
          this.getUserList();
        }
      }
    })
  }

  ngOnInit():void{
    this.getUserList();
  }

  getUserList(){
    this._userService.getUserList().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error:(err)=>{
        console.log(err);
      }
    })
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
    this.getUserList();
  }

  openEditForm(data:any){ 
    const dialogRef=this._dialog.open(UserAddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val==true){
          this.getUserList();
        }
      }
    })
  }
}
