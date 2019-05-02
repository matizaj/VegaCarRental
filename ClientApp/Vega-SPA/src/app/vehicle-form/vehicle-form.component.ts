import { Component, OnInit } from '@angular/core';
import { MakeService } from '../services/make.service';
import { FeatureService } from '../services/feature.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: any = {
    features: [],
    contact: {}
  };
  constructor(private makeService: MakeService, private featureService: FeatureService) { }

  ngOnInit() {
    this.makeService.getMakes().subscribe((makes: any[]) => {
      this.makes = makes;
    });

    this.featureService.getFeatures().subscribe((features: any[]) => this.features = features);
  }
  onMakeChange() {
    console.log(this.vehicle);
    const selectedMake = this.makes.find(x => x.id == this.vehicle.makeId);
    // console.log(selectedModels);
     this.models = selectedMake ? selectedMake.models : [];
     delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.makeService.create(this.vehicle).subscribe(console.log);
  }

}
