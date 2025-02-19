import { Component, OnInit } from '@angular/core';
import { Poste } from '../model/poste';
import { PosteService } from '../service/poste.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-list-poste',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule
  ],
  templateUrl: './list-poste.component.html',
  styleUrl: './list-poste.component.css'
})
export class ListPosteComponent implements OnInit {

  postes: Poste[] = [];
  selectedPostes: Poste[] = [];
  searchText: string = '';
  visibleUpdateDialog: boolean = false;
  selectedPoste: Poste = new Poste();
  visible: boolean = false;


  constructor(private posteService: PosteService) {}

  ngOnInit(): void {
    this.loadPostes();
  }
  openEditDialog(poste: Poste): void {
    this.selectedPoste = { ...poste }; // Clonage pour éviter la modification directe dans la liste
    this.visibleUpdateDialog = true; // Affichage du dialogue d'édition
  }
  

  loadPostes(): void {
    this.posteService.getAllPostesnonArchives().subscribe((data) => {
      this.postes = data;
    });
  }

  deletePoste(poste: Poste): void {
    if (confirm(`Voulez-vous vraiment supprimer le poste "${poste.titre}" ?`)) {
      this.posteService.archiverPoste(poste.id!).subscribe(() => {
        this.postes = this.postes.filter(p => p.id !== poste.id);
      });
    }
  }

  exportPostes(): void {
    if (this.selectedPostes.length > 0) {
      const csvData = this.convertToCSV(this.selectedPostes); 
      this.downloadCSV(csvData);
    } else {
      const csvData = this.convertToCSV(this.postes); 
      this.downloadCSV(csvData);
    }
  }
  
  
  convertToCSV(data: any[]): string {
    if (data.length === 0) return '';
  
    const headers = Object.keys(data[0]); 
    const rows = data.map(row => headers.map(header => row[header]).join(','));
  
    return [headers.join(','), ...rows].join('\n');
  }
  
  downloadCSV(csvData: string): void {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Postes.csv';
    link.click();
  }

  editPoste(poste: Poste): void {
    this.selectedPoste = { ...poste };
    this.visibleUpdateDialog = true;
  }

  updatePoste(): void {
    if (!this.selectedPoste.id) {
      console.error("L'ID du poste est manquant !");
      return;
    }
    
    this.posteService.updatePoste(this.selectedPoste.id, this.selectedPoste).subscribe(() => {
      const index = this.postes.findIndex(p => p.id === this.selectedPoste.id);
      if (index !== -1) {
        this.postes[index] = { ...this.selectedPoste };
      }
      this.visibleUpdateDialog = false;
    }, error => {
      console.error('Erreur lors de la mise à jour du poste', error);
    });
  }
  
  
}
