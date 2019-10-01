import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery } from '../_services/gallery';
import { Picture } from '../_models/picture';
import { EventEmitter } from 'events';

class ImageSnippet{
  constructor(public src: string, public file: File){}
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {
  
  id:string;
  pictures:Picture[] = [];
  selectedFile: File = null;
 

  constructor(private galleryService:Gallery, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');        
  });

    this.galleryService.getAll(this.id).subscribe(imgs => {
      this.pictures = imgs;
    });      
  }

  public onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('pic', this.selectedFile);
    if(this.selectedFile){
      this.galleryService.uploadImg(formData, this.id).subscribe(pic => {
        if(pic){
          this.pictures.push(pic);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }
}
