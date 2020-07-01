import {NgModule} from '@angular/core';
import {  MatMomentDateModule } from '@coachcare/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';


import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({

    imports:[MatButtonModule,MatCardModule,
        MatToolbarModule,MatInputModule,
        MatFormFieldModule, MatSelectModule,
        MatIconModule, MatMenuModule,
        MatTabsModule,MatRadioModule,
        MatListModule,MatDatepickerModule,
        MatMomentDateModule, MatExpansionModule,
        MatStepperModule, MatGridListModule,MatSnackBarModule,
        MatPaginatorModule, MatDividerModule, MatSlideToggleModule,
        MatDialogModule, MatProgressSpinnerModule],

    exports:[MatButtonModule, MatCardModule,
        MatToolbarModule,MatInputModule,
        MatFormFieldModule, MatSelectModule,
        MatIconModule,MatMenuModule,
        MatTabsModule,MatRadioModule,
        MatListModule,MatDatepickerModule,
        MatMomentDateModule, MatExpansionModule,
        MatStepperModule, MatGridListModule,
        MatSnackBarModule,MatDividerModule,MatSlideToggleModule,
        MatDialogModule, MatProgressSpinnerModule
    ]
})

export class MaterialModule{}
