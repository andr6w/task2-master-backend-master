import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Flat } from 'src/app/shared/flat.model';
import { FlatService } from 'src/app/shared/flat.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm } from '@angular/forms';
import { House } from 'src/app/shared/house.model';
import { HouseService } from 'src/app/shared/house.service';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.component.html',
  styles: [
  ]
})
export class FlatListComponent implements OnInit {

  hSelected: number;
  closeResult: string;
  editForm: FormGroup;
  sName: string;

  constructor(
    public service: FlatService,
    public houseService: HouseService,
    public toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.resetForm();
    this.service.refreshList();
    this.service.refreshHouseList().subscribe(res => {
      this.service.houseIdList = res as House[];

    });
  }

  populateForm(formFlat: Flat) {
    this.service.formData = Object.assign({}, formFlat);
  }

  test(HId) {
    for (let i = 0; i < this.service.listForAllFlats.length; i++) {
      if (this.service.houseIdList[i].HId == HId) {
        return this.service.houseIdList[i].HouseStreet;
      }
    }
  }

  onDelete(FlatId) {
    if (confirm("Are u sure to delete this record ? ")) {
      this.service.deleteFlat(FlatId)
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
    this.modalService.open(test, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
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
    if (formFlat != null)
      formFlat.resetForm();
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
    if (this.service.formData.FlatId == 0)
      this.insertRecord(formFlat);
    else
      this.updateRecord(formFlat)
  }

  insertRecord(formFlat: NgForm) {
    this.service.postFlat().subscribe(
      res => {
        this.resetForm(formFlat);
        this.service.refreshList();
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
        this.service.refreshList();
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
