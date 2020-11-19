import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { House } from 'src/app/shared/house.model';
import { HouseService } from 'src/app/shared/house.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { Router } from "@angular/router";


@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styles: [
  ]
})

export class HouseListComponent implements OnInit {
  houseReactiveForm = new FormGroup({
    HId: new FormControl(null),
    HouseNumber: new FormControl(null),
    HouseCity: new FormControl(''),
    HouseCountry: new FormControl(''),
    HouseStreet: new FormControl(''),
    HousePostIndex: new FormControl(''),
  });
  closeResult: string;
  editForm: FormGroup;
  test: string;

  house: House;

  constructor(
    public service: HouseService,
    public toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.service.refreshList();

  }

  populateForm(h: House) {
    this.test = 'Details';
    this.houseReactiveForm.setValue(Object.assign({}, h));
  }


  open(test: any) {
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


  onSubmitTest(houseReactiveForm: FormGroup) {
    if (this.service.formGroup.HId == null)
      this.insertRecord(houseReactiveForm);
    else
      this.updateRecord(houseReactiveForm)

  }
  insertRecord(houseReactiveForm: FormGroup) {
    this.service.formGroup = houseReactiveForm.value;
    this.service.postHouse().subscribe(
      res => {
        this.resetForm()
        this.service.refreshList();
        this.toastr.success("Submitted successfully", "House Register");
      },
      err => {
        console.log(err);
      }
    )
  }

  updateRecord(houseReactiveForm: FormGroup) {
    this.service.formGroup = houseReactiveForm.value;
    this.service.putHouse().subscribe(
      res => {
        this.resetForm()
        this.service.refreshList();
        this.toastr.info("Submitted successfully", "House Register");
      },
      err => {
        console.log(err);
      }
    )
  }

  openDetails(targetModal: any, house: House) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('hCity').setAttribute('value', house.HouseCity);
    document.getElementById('hStreet').setAttribute('value', house.HouseCity);
    document.getElementById('hCountry').setAttribute('value', house.HouseCountry);
    document.getElementById('hNumber').setAttribute('value', house.HouseNumber.toString());
    document.getElementById('hpIndex').setAttribute('value', house.HousePostIndex);
  }

  resetForm() {
    this.test = 'New';
    if (this.houseReactiveForm != null)
      this.houseReactiveForm.reset({ HId: null, HouseNumber: null, HouseCity: '', HouseStreet: '', HouseCountry: '', HousePostIndex: '' })
  }

  // openDetailsModal() {
  //   this.modalRef = this.modalService.show(Content,
  //     {
  //       animated: true,
  //       class: 'details-modal',
  //       initialState: {
  //         houseForm: this.HouseComponent,
  //       }
  //     });
  // }

  // open(content) {
  //   this.modalService.open(content);
  // }
  onDelete(HId: any) {
    if (confirm("Are u sure to delete this record ? ")) {
      this.service.deleteHouse(HId)
        .subscribe(res => {
          this.service.refreshList();
          this.toastr.warning("Deleted successfully", "House Register");
        },
          err => {
            console.log(err);
          })
    }
  }


}
