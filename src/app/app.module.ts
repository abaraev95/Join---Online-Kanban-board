import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BoardComponent } from './board/board.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogDeleteBacklogTaskComponent } from './dialog-delete-backlog-task/dialog-delete-backlog-task.component';
import { DialogOpenBacklogTaskComponent } from './dialog-open-backlog-task/dialog-open-backlog-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatCardModule} from '@angular/material/card';
import { FilterPipe } from './Pipes/filter.pipe';
import {MatSelectModule} from '@angular/material/select';
import { TrashComponent } from './trash/trash.component';
import { DialogOpenBoardTaskComponent } from './dialog-open-board-task/dialog-open-board-task.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PrivacyNoticeComponent } from './privacy-notice/privacy-notice.component';
import { AboutComponent } from './about/about.component';
import { ArchiveComponent } from './archive/archive.component';
import { HelpComponent } from './help/help.component';
import { DialogDeleteTaskForeverComponent } from './dialog-delete-task-forever/dialog-delete-task-forever.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BoardComponent,
    BacklogComponent,
    DialogDeleteBacklogTaskComponent,
    DialogOpenBacklogTaskComponent,
    AddTaskComponent,
    FilterPipe,
    TrashComponent,
    DialogOpenBoardTaskComponent,
    PrivacyNoticeComponent,
    AboutComponent,
    ArchiveComponent,
    HelpComponent,
    DialogDeleteTaskForeverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatInputModule,
    MatNativeDateModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  exports: [FilterPipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
