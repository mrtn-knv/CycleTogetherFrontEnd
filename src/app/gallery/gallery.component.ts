import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery } from '../services/gallery';
import { Picture } from '../models/picture';

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
  fileData: File = null;
  selectedFile: ImageSnippet;

  constructor(private galleryService:Gallery, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');        
  });

    this.galleryService.getAll(this.id).subscribe(imgs => {
      this.pictures = imgs;
    });      
  }

processFile(imageInput: any){
  const file: File = imageInput.files[0];
  const reader = new FileReader();
  debugger;
  reader.addEventListener('load', (event:any) => {
    this.selectedFile = new ImageSnippet(event.target.result, file);

    this.galleryService.upload(this.selectedFile.file, this.id).subscribe((res) =>{
        debugger;
        this.pictures.push(res);
    }, (err) =>{
      debugger;
      console.log(err);
    })
  });

  reader.readAsDataURL(file);
}

}
