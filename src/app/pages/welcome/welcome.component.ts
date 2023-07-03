import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isVisibleCreate: boolean = false;
  selectedCampaign: any;
  addCampaignForm!: UntypedFormGroup;
  data = [
    {
      title: 'Title 1',
      img: {url: undefined},
      isEmpty: true
    },
  ];
  fileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: "",
    }
  ];
  previewImage: string | undefined = '';
  previewVisible = false;
  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit() {
    if(localStorage.getItem('data')){
      let data = JSON.parse(localStorage.getItem('data') || '{}')
      this.data = data
    }

  }


  handlePreview = async (file: NzUploadFile): Promise<void> => {
    console.log(file)
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  handleChange(event: any, index: number){
    this.data[index].img = {
      url: event.file.thumbUrl
    }
    localStorage.setItem('data', JSON.stringify(this.data))
  }

  addCampaign(campaing: any){
    this.isVisibleCreate = true;
    this.selectedCampaign = campaing;
  }

  
  handleCancelCreate() {
    this.isVisibleCreate = false;
  }


  deleteOrder(){
    // this.orderService.deleteOrder(this.deletedId).subscribe({
    //   next: () => {
    //     this.isVisibleDelete = false
    //     this.message.success('ordine eliminato correttamente')
    //     this.queryRequest()
    //   },
    //   error: (error) => {
    //     this.message.error(error.error);
    //   },
    // });
  }

  createForm(){
    this.addCampaignForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
