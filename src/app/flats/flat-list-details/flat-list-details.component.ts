import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Flat } from 'src/app/shared/flat.model';
import { FlatService } from 'src/app/shared/flat.service';
import { House } from 'src/app/shared/house.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-flat-list-details',
  templateUrl: './flat-list-details.component.html',
  styles: [
  ]
})
export class FlatListDetailsComponent implements OnInit {


  hSelected: number;
  closeResult: string;
  editForm: FormGroup;
  hTest: 6003;
  flatId: number;

  constructor(
    private route: ActivatedRoute,
    public service: FlatService,
    public toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    //  this.route.queryParams.subscribe(params => {
    //  this.flatId = params['flatId'];
    //  }),
    const id = this.route.snapshot.paramMap.get('flatId');
    this.resetForm();
    this.service.refreshList();
    this.service.getHouseFlats(id)
      .subscribe(res => {
        this.service.listForHouseFlats = res;
      });
    this.service.refreshHouseList()
      .subscribe(res => {
        this.service.houseIdList = res as House[];
        this.hSelected = this.service.hSelected;
      });
  }

  populateForm(formFlat: Flat) {
    this.service.formData = Object.assign({}, formFlat);
  }

  onDelete(flatId) {
    if (confirm("Are u sure to delete this record ? ")) {
      this.service.deleteFlat(flatId)
        .subscribe(res => {
          this.service.refreshFlatList(this.hSelected);
          this.toastr.warning("Deleted successfully", "Flat Register");
        },
          err => {
            console.log(err);
          })
    }
  }

  open(test) {
    this.modalService.open(test, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result
      .then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }

    else {
      return `with: ${reason}`;
    }
  }

  resetForm(formFlat?: NgForm) {
    if (formFlat) {
      formFlat.resetForm();
    }

    this.service.formData = {
      FlatId: 0,
      FlatNumber: null,
      FlatFloor: null,
      FlatRoomsAmmount: null,
      FlatResidentAmmount: null,
      FlatFullArea: null,
      FlatLivingSpaceArea: null,
      HouseId: null,
    }
  }
  onSubmit(formFlat: NgForm) {
    if (this.service.formData.FlatId === 0) {
      this.insertRecord(formFlat);
    }
    else {
      this.updateRecord(formFlat)
    }

  }


  insertRecord(formFlat: NgForm) {

    this.service.postFlat().subscribe(
      res => {
        // this.service.listForHouseFlats.push(res);
        this.resetForm(formFlat);
        this.service.refreshFlatList(this.hSelected);
        this.toastr.success("Submitted successfully", "House Register");
      },
      err => {
        console.log(err);
      }
    )

    this.hSelected = this.service.formData.HouseId;
  }

  updateRecord(formFlat: NgForm) {
    this.service.putFlat().subscribe(
      res => {
        this.resetForm(formFlat);
        this.service.refreshFlatList(this.hSelected);
        this.toastr.info("Submitted successfully", "House Register");
      },
      err => {
        console.log(err);
      }
    )
  }

  getFlatList(HId: any) {
    this.service.getHouseFlats(HId)
      .subscribe(res => {
        this.service.listForHouseFlats = res as Flat[];
      });
  }



}

