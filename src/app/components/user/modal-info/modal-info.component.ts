import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})

export class ModalInfoComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<ModalInfoComponent>
    ) { }

    ngOnInit(): void {
    }

    onClose(): void {
        this.dialogRef.close();
    }


}
