import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery } from '../services/gallery';
import { Picture } from '../models/picture';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  
  id:string;
  pictures:Picture[] = [];
  pathToImage:string;


  constructor(private galleryService:Gallery, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');        
  });

    this.galleryService.getAll(this.id).subscribe(imgs => {
      this.pictures = imgs;
    });      
  }
}
