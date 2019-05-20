import { ActivatedRoute, Router } from '@angular/router';
import { MakeService } from './../services/make.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {
  vehicle: any;
  vehicleId: number;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private make: MakeService, private route: ActivatedRoute, private router: Router, private photo: PhotoService) {
   route.params.subscribe(p => {
     this.vehicleId = +p['id'];
     if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
       this.router.navigate(['/vehicles']);
     }
   })
  }

  ngOnInit( ) {
  }
  uploadPhoto() {
    const nativElement = this.fileInput.nativeElement;
    this.photo.upload(this.vehicleId, nativElement.files[0]).subscribe(console.log);
  }
}
