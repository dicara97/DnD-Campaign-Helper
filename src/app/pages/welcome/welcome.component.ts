import { Component, OnInit } from '@angular/core';
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

  data = [
    {
      title: 'Title 1',
      img: {url: undefined}
    },
    {
      title: 'Title 2',
      img: {url: undefined}
    },
    {
      title: 'Title 3',
      img: {url: undefined}
    },
    {
      title: 'Title 4',
      img: {url: undefined}
    },
    {
      title: 'Title 5',
      img: {url: undefined}
    },
    {
      title: 'Title 6',
      img: {url: undefined}
    }
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
  constructor(private msg: NzMessageService) { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('data') || '{}')
    if(data)
    this.data = data
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

}
