

import {NgModule} from '@angular/core';
import {  MatMomentDateModule } from '@coachcare/datepicker';
import {MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatMenuModule,
        MatTabsModule,
        MatRadioModule,MatListModule,
        MatNativeDateModule,MatDatepickerModule,
        MatExpansionModule, MatStepperModule,
        MatGridListModule}
        from '@angular/material';

@NgModule({
    imports:[MatButtonModule,MatCardModule,
        MatToolbarModule,MatInputModule,
        MatFormFieldModule, MatSelectModule,
        MatIconModule, MatMenuModule,
        MatTabsModule,MatRadioModule,
        MatListModule,MatDatepickerModule,MatNativeDateModule,
        MatMomentDateModule, MatExpansionModule,
        MatStepperModule, MatGridListModule],

    exports:[MatButtonModule, MatCardModule,
        MatToolbarModule,MatInputModule,
        MatFormFieldModule, MatSelectModule,
        MatIconModule,MatMenuModule,
        MatTabsModule,MatRadioModule,
        MatListModule,MatDatepickerModule,MatNativeDateModule,
        MatMomentDateModule, MatExpansionModule,
        MatStepperModule, MatGridListModule
    ]
})

export class MaterialModule{}
