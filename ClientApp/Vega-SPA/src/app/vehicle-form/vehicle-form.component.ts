import { Component, OnInit } from '@angular/core';
import { MakeService } from '../services/make.service';
import { FeatureService } from '../services/feature.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {forkJoin} from 'rxjs';
import { SaveVehicle, Vehicle } from '../models/vehicle';
import * as _ from 'underscore';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  };

  constructor(private makeService: MakeService, private featureService: FeatureService, private toasty: ToastyService,
              private route: ActivatedRoute, private router: Router) {
                route.params.subscribe(p => {
                  this.vehicle.id = +p['id'];
                });
               }

  ngOnInit() {
    const sources = [
      this.makeService.getMakes(),
      this.featureService.getFeatures()
    ];
    if (this.vehicle.id) {
      sources.push(this.makeService.getVehicle(this.vehicle.id));
    }

    this.requestMultipleDataFromDifferentSources(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];
      if (this.vehicle.id) {
        this.setVehicle(data[2]);
        this.populateModels();
      }
    }, err => {
      if (err.status == 404) {
        this.router.navigate(['/not-found']);
      }
    });

    this.makeService.getMakes().subscribe(x => {
      this.toasty.success({title: 'success', msg: 'pobrane', theme: 'bootstrap', showClose: true, timeout: 5000});
    });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    console.log('to jest wazne, set mth' , this.vehicle.id);
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.features = _.pluck(v.features, 'id');
    this.vehicle.contact = v.contact;
  }

  requestMultipleDataFromDifferentSources(sources: any[]): Observable<any[]> {
    return forkJoin(sources);
  }
  onMakeChange() {
   this.populateModels();
     delete this.vehicle.modelId;
  }

  private populateModels() {
    const selectedMake = this.makes.find(x => x.id == this.vehicle.makeId);
     this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }
  onDelete() {
    if (confirm('Are you sure?')) {
      this.makeService.delete(this.vehicle.id).subscribe( x => {
        this.toasty.success({title: 'success', msg: 'deleted', theme: 'bootstrap', showClose: true, timeout: 5000});
        this.router.navigate(['/vehicles']);
      });
    }
  }

  submit() {
    if (this.vehicle.id) {
      this.makeService.update(this.vehicle).subscribe(x => {
        this.toasty.success({title: 'success', msg: 'updated', theme: 'bootstrap', showClose: true, timeout: 5000});
      });
    } else {
      console.log(this.vehicle.id+1);
      this.makeService.create(this.vehicle).subscribe(console.log);
  }
}

}
