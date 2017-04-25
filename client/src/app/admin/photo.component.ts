import {Component, OnInit, ViewChild} from '@angular/core';
import { AdminService } from './admin.service';
import { PlantListService } from '../plants/plant-list.service';
import {Plant} from "../plants/plant";


@Component({
    selector: 'photo-component',
    templateUrl: 'photo.component.html',
})
export class PhotoComponent implements OnInit {
    public id: string;
    public plant: Plant;
    public clicked: boolean;
    public fileLocation: string;

    private url: string = API_URL;

    constructor(private adminService: AdminService, private plantListService: PlantListService) {

    }

    @ViewChild('fu') fu;

    filename:string;
    uploadAttempted:boolean = false;

    handleUpload(){
        this.fu.uploadPhoto(this.id).subscribe(
            response => {
                this.filename = response.json();
                this.uploadAttempted = true;
            },
            err => {
                this.uploadAttempted = true;
            }

        );
    }

    public getPlant(id: string): void {
        this.uploadAttempted = false;
        this.filename = undefined;
        this.clicked = true;
        this.id = id;
        this.fileLocation = ".plants/" + id + ".png";
        this.plantListService.getPlantById(id).subscribe(
            plant => this.plant = plant,
            err => {
                console.log(err);
            })
    }

    ngOnInit(): void {

    }
}