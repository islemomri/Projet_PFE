import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Diplome } from '../model/diplome';
import { TypeDiplome } from '../model/type-diplome';
import { TypeDiplomeService } from '../service/type-diplome.service';
import { DiplomeService } from '../service/diplome.service';
import { DiplomeRequest } from '../model/diplome-request';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-diplome',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TableModule, DialogModule, ButtonModule, 
    InputTextModule, DropdownModule, PaginatorModule, ToastModule, ConfirmDialogModule,RouterModule
  ],
  templateUrl: './list-diplome.component.html',
  styleUrl: './list-diplome.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ListDiplomeComponent implements OnInit {
  diplomes: Diplome[] = [];
  typeDiplomes: TypeDiplome[] = [];
  visible = false;
  editVisible = false;
  selectedTypeId: number | null = null;
  libelleDiplome = '';
  editingDiplome: Diplome | null = null;

  constructor(
    private diplomeService: DiplomeService,
    private typeDiplomeService: TypeDiplomeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllDiplomes();
    this.getAllTypeDiplomes();
  }

  getAllDiplomes(): void {
    this.diplomeService.getAllDiplomes().subscribe((data) => {
      this.diplomes = data;
    });
  }

  getAllTypeDiplomes(): void {
    this.typeDiplomeService.getAllTypeDiplomes().subscribe((data) => {
      this.typeDiplomes = data;
    });
  }

  showAddDialog(): void {
    this.libelleDiplome = '';
    this.selectedTypeId = null;
    this.visible = true;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || !this.selectedTypeId) return;
    const newDiplome: Diplome = {
      libelle: this.libelleDiplome,
      typeDiplome: { id: this.selectedTypeId } as TypeDiplome
    };
    this.diplomeService.addDiplome(newDiplome).subscribe(() => {
      this.getAllDiplomes();
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Diplôme ajouté avec succès' });
      this.visible = false;
      form.resetForm();
    });
  }

  showEditDialog(diplome: Diplome): void {
    this.editingDiplome = { ...diplome };
    this.selectedTypeId = diplome.typeDiplome?.id || null;
    this.editVisible = true;
  }

  onUpdateSubmit(form: NgForm): void {
    if (form.invalid || !this.selectedTypeId || !this.editingDiplome) return;

    const diplomeRequest: DiplomeRequest = {
      idType: this.selectedTypeId,
      libelleTypeDiplome: this.editingDiplome.typeDiplome.libelleTypeDiplome,
      libelle: this.editingDiplome.libelle
    };

    this.diplomeService.updateDiplome(this.editingDiplome.id!, diplomeRequest).subscribe(() => {
      this.getAllDiplomes();
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Diplôme mis à jour avec succès' });
      this.editVisible = false;
    });
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce diplôme ?',
      accept: () => this.deleteDiplome(id),
    });
  }

  deleteDiplome(id: number): void {
    this.diplomeService.deleteDiplome(id).subscribe(() => {
      this.getAllDiplomes();
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Diplôme supprimé avec succès' });
    });
  }
}