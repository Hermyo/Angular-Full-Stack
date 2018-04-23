import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DwarfService } from '../services/dwarf.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Dwarf } from '../shared/models/dwarf.model';

@Component({
  selector: 'app-dwarfs',
  templateUrl: './dwarfs.component.html',
  styleUrls: ['./dwarfs.component.css'],
})
export class DwarfsComponent implements OnInit {

  dwarf = new Dwarf();
  dwarfs: Dwarf[] = [];
  isLoading = true;
  isEditing = false;

  addDwarfForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private dwarfService: DwarfService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getDwarfs();
    this.addDwarfForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight,
    });
  }

  getDwarfs() {
    this.dwarfService.getDwarfs().subscribe(
      data => this.dwarfs = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addDwarf() {
    this.dwarfService.addDwarf(this.addDwarfForm.value).subscribe(
      (res) => {
        this.dwarfs.push(res);
        this.addDwarfForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  enableEditing(dwarf: Dwarf) {
    this.isEditing = true;
    this.dwarf = dwarf;
  }

  cancelEditing() {
    this.isEditing = false;
    this.dwarf = new Dwarf();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the dwarfs to reset the editing
    this.getDwarfs();
  }

  editDwarf(dwarf: Dwarf) {
    this.dwarfService.editDwarf(dwarf).subscribe(
      () => {
        this.isEditing = false;
        this.dwarf = dwarf;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteDwarf(dwarf: Dwarf) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dwarfService.deleteDwarf(dwarf).subscribe(
        () => {
          const pos = this.dwarfs.map(elem => elem._id).indexOf(dwarf._id);
          this.dwarfs.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
