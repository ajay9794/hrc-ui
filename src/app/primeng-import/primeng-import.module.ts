import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule } from "primeng/panel";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PanelMenuModule,
    FileUploadModule,
    ButtonModule,
    TableModule,
    PanelModule,
    OverlayPanelModule,
    SidebarModule,
    MultiSelectModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    RadioButtonModule,          
    MessagesModule,
    ToastModule, 
    CheckboxModule,
    ScrollPanelModule,
    BadgeModule,
    CardModule,
    DropdownModule,
    ProgressSpinnerModule,
    InputNumberModule,
    KeyFilterModule,
    AccordionModule,
    InputSwitchModule,
    CalendarModule,
    TagModule,
    ImageModule
  ],
  
  exports: [
    PanelMenuModule,
    FileUploadModule,
    ButtonModule,
    TableModule,
    PanelModule,
    OverlayPanelModule,
    SidebarModule,
    MultiSelectModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    RadioButtonModule,          
    MessagesModule,
    ToastModule, 
    CheckboxModule,
    ScrollPanelModule,
    BadgeModule,
    CardModule,
    DropdownModule,
    ProgressSpinnerModule,
    InputNumberModule,
    KeyFilterModule,
    AccordionModule,
    InputSwitchModule,
    CalendarModule,
    TagModule,
    ImageModule
  ],

  providers: [ConfirmationService,MessageService],
})
export class PrimengImportModule { }
