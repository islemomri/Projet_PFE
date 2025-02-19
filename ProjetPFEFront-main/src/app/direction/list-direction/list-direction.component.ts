import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';
import { Table, TableModule } from 'primeng/table';
import { Direction } from '../model/Direction';
import { DirectionService } from '../service/direction.service';
import { MenuItem } from 'primeng/api';
import { NgModule } from '@angular/core';





@Component({
  selector: 'app-list-direction',
  imports: [ TableModule,
      DialogModule,
      FormsModule,
      ButtonModule,
      InputTextModule,
      CommonModule,
      SpeedDialModule,
    
    ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list-direction.component.html',
  styleUrl: './list-direction.component.css'
})
export class ListDirectionComponent implements OnInit {

  directions: Direction[] = [];
  selectedDirections: Direction[] = [];
  visible: boolean = false;
  showDialog: boolean = false;  
  selectedDirection: Direction = { id: 0, nom_direction: '', archive: false };
  newDirection: Direction = { id: 0, nom_direction: '', archive: false };
  editVisible: boolean = false;  // Ajout pour gérer la visibilité du formulaire d'édition
  editForm!: FormGroup;  // Ajout du formulaire réactif

  searchText: string = '';
  @ViewChild('dt') dt!: Table;

  constructor(private directionService: DirectionService) {}


 ngOnInit(): void {
  this.getDirections();

  
 }
 saveDirection() {
  // Implémente la sauvegarde des modifications
  this.visible = false;
}

 getDirections(): void {
  this.directionService.getAllDirections().subscribe((data: Direction[]) => {
    this.directions = data;
    console.log('Directions chargées:', this.directions);
  });
}







getItems(direction: Direction): MenuItem[] {
  return [
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.deleteDirection(direction)
    },
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => this.openEditDialog(direction)
    }
  ];
}
deleteDirection(direction: Direction): void {
  if (direction.id === undefined) {
    console.error("Impossible de supprimer : l'ID de la direction est indéfini.");
    return;
  }

  if (confirm(`Voulez-vous vraiment archiver la direction ${direction.nom_direction} ?`)) {
    // Appel du service pour archiver la direction
    this.directionService.archiverDirection(direction.id).subscribe({
      next: (response) => {
        // Une fois archivée, mettez à jour localement la direction
        direction.archive = true;
        console.log('Direction archivée avec succès', response);
      },
      error: (err) => {
        console.error('Erreur lors de l\'archivage de la direction', err);
      }
    });
  }
}


openEditDialog(direction: Direction): void {
  this.selectedDirection = { ...direction };
  this.visible = true;
}

showAddDirectionDialog(): void {
  this.showDialog = true;
  this.newDirection = { id: 0, nom_direction: '', archive: false }; // Ajouter 'archive'
}

addDirection(): void {
  if (this.newDirection.nom_direction.trim() !== '') {
    const DirectionSansId = { 
      nom_direction: this.newDirection.nom_direction,
      archive: false // Ajouter la propriété archive ici
    };

    this.directionService.ajouterDirection(DirectionSansId).subscribe({
      next: (directionAjoute) => {
        this.directions.push(directionAjoute);
        console.log('Direction ajoutée avec succès:', directionAjoute);
        this.showDialog = false;
        this.newDirection = { id: 0, nom_direction: '', archive: false }; // Réinitialisation avec 'archive'
      },
      error: (err) => console.error("Erreur lors de l'ajout de la direction:", err)
    });
  } else {
    alert("Le nom de la direction ne peut pas être vide.");
  }
}
  

updateDirection(): void {
  if (this.selectedDirection.id === undefined) {
    console.error("Impossible de mettre à jour : l'ID du Direction est indéfini.");
    return;
  }

  this.directionService.updateDirection(this.selectedDirection.id, this.selectedDirection).subscribe({
    next: updatedSite => {
      const index = this.directions.findIndex(s => s.id === updatedSite.id);
      if (index !== -1) {
        this.directions[index] = updatedSite;
      }
      console.log('Mise à jour réussie:', updatedSite);
      this.visible = false;
    },
    error: err => console.error('Erreur lors de la mise à jour du Direction:', err)
  });
}

exportDirections(): void {
  if (this.selectedDirections.length > 0) {
    const csvData = this.convertToCSV(this.selectedDirections); // Utiliser le bon tableau
    this.downloadCSV(csvData);
  } else {
    const csvData = this.convertToCSV(this.directions); // Utiliser le tableau complet si aucun élément n'est sélectionné
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
  link.download = 'directions.csv';
  link.click();
}

}
