import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import data from '../assets/users.json'
import { FormBuilder, FormGroup } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  @ViewChild('modalClose',{ static: true }) modalClose:ElementRef;
  constructor(private formbuilder: FormBuilder) {}
  ngOnInit() {
    this.AdduserForm = this.formbuilder.group({
      username: [],
      salary: []
    })
    this.getuserdata();
  }
  initUser(){
    this.AdduserForm.reset();
		this.formFlag = 'add';
  }
  getuserdata() {
    this.userdata = data;
  }
  getEditData(user) {
    user.isEditable =true;
    this.AdduserForm.patchValue(user);
    this.formFlag = 'edit';

    console.log("Selected Player",user);
  }
  deletePlayer(user) {
    console.log("Deleted Player", user);
    confirm("Do you want to delete " + user.username);
    this.userdata.data.splice(this.userdata.data.indexOf(user), 1);
  }
  // submitEditedform() {
  //   var index = this.userdata.data.findIndex(x => x.id == this.AdduserForm.value.id);
  //   if (index !== -1) {
  //     this.userdata.data[index] = this.AdduserForm.value;
  //   }
  //   this.getuserdata()
  // }
  adduserdata() {
    if (this.formFlag == 'add') {
      this.AdduserForm.value.id = this.userdata.data.length + 1;
      this.userdata.data.unshift(this.AdduserForm.value);
      alert("Added " + this.AdduserForm.value.username + " successfully");
      console.log("The user to be added is: ", this.AdduserForm.value.username);
     
    }
    else {
      console.log("Helllo");
      let i = this.userdata.data.findIndex(x => x.id == this.AdduserForm.value.id);
      if (i !== -1) {
        alert(this.userdata[i]);
        this.userdata.data[i] = this.AdduserForm.value;
      }
    }
		//Close modal
		this.modalClose.nativeElement.click();
		//User form reset
		this.AdduserForm.reset();
  }
  saveData(data){
    let i = this.userdata.data.findIndex(x => x.id == data.id);
    if (i !== -1) {
      this.userdata.data[i] = data;
    }
  }
}
