import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import data from '../assets/users.json'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiCallsService } from './services/api-calls.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userdata: any = [];
  title = 'useofjson';
  playerName: any;
  formFlag = 'add';
  // isEditable:boolean=false;
  AdduserForm: FormGroup;

  @ViewChild('modalClose', { static: true }) modalClose: ElementRef;
  constructor(private formbuilder: FormBuilder, private service: ApiCallsService,private toastr: ToastrService) { }
  ngOnInit() {
    this.AdduserForm = this.formbuilder.group({
      username: [],
      salary: []
    })
    this.getuserdata();
  }
  initUser() {
    this.AdduserForm.reset();
    this.formFlag = 'add';
  }
  getuserdata() {
    this.service.getUsers().subscribe(res => {
      this.userdata = res;
    })
  }
  getEditData(user) {
    user.isEditable = true;
    this.AdduserForm.patchValue(user);
    this.formFlag = 'edit';

    console.log("Selected Player", user);
  }
  deletePlayer(user) {
    this.service.deleteUser(user.Id).subscribe(res=>{
      if(res){
        this.toastr.error(`${user.UserName} successfully deleted !!`);
        this.getuserdata();
      }
    })
  }
 
  adduserdata() {
    if (this.formFlag == 'add') {
      this.service.insertUser(this.AdduserForm.value)
      .pipe(finalize(()=>{
    this.AdduserForm.reset();
      }))
      .subscribe(res => {
        if (res) {
          this.toastr.success(`${this.AdduserForm.value.username} successfully Added !!`);
          this.getuserdata();
        }
      });
      
    //Close modal
    this.modalClose.nativeElement.click();
    }
  }
  saveData(data) {
    delete data['isEditable'];
    let i = this.userdata.findIndex(x => x.Id == data.Id);
    if (i !== -1) {
      this.userdata[i] = data;
      this.service.updateUser(this.userdata[i].Id, this.userdata[i]).subscribe(res => {
        this.toastr.success(`${this.userdata[i].UserName} is Successfully updated.`);
        this.getuserdata();
      })
    }
  }
}
