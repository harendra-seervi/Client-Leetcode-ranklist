import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
// import { DialogRef  } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  userForm: FormGroup;

  constructor(private _fb:FormBuilder,private _userService:UserService,private _dialogRef:MatDialogRef<UserAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    
    ){
    this.userForm = this._fb.group({
      id:'',
      name:'',
      email:'',
      institute:'',
      country:'',
      lusername:'',
    })
  }

  ngOnInit(): void {
      this.userForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.data){
      //for update
      this._userService.updateUser(this.data.id,this.userForm.value).subscribe(
        (response: HttpResponse<any>) => {
          console.log("RRRResponse status",response.status); // Access the HTTP status code
          if (response.status === 201){
            // Successful response
            console.log(response.body); // Access the response body
            const responseBody = response.body;
            if (responseBody && responseBody.message) {
              alert(responseBody.message); // Show the success message to the user
              this._dialogRef.close(true);
            }
          } 
          else{
            alert("Failed to add the user to the database");
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    else{
      //for new user
      this._userService.addUser(this.userForm.value).subscribe(
        (response: HttpResponse<any>) => {
          console.log("RRRResponse status",response.status); // Access the HTTP status code
          if (response.status === 201){
            // Successful response
            console.log(response.body); // Access the response body
            const responseBody = response.body;
            if (responseBody && responseBody.message) {
              alert(responseBody.message); // Show the success message to the user
              this._dialogRef.close(true);
            }
          } 
          else{
            alert("Failed to add the user to the database");
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
}
