import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExperienceService } from '../service/experience.service';
import { ExperienceAnterieure } from '../model/ExperienceAnterieure';
import { ExperienceAssad } from '../model/ExperienceAssad';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
   imports: [CommonModule,FormsModule, ReactiveFormsModule, DialogModule, ButtonModule,],
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  @Input() employeId!: number;
  @Input() experiencesAssad: ExperienceAssad[] = [];
  @Input() experiencesAnterieure: ExperienceAnterieure[] = [];
  @Output() experienceUpdated = new EventEmitter<void>();
  @Output() experienceAdded = new EventEmitter<void>();


  experienceAssadForm: FormGroup;
  visible: boolean = false;



  constructor(private experienceService: ExperienceService,private fb: FormBuilder) {


    this.experienceAssadForm = this.fb.group({
      debut: ['', Validators.required],
      fin: ['', Validators.required],
      poste: ['', Validators.required],
      direction: ['', Validators.required],
      modeAffectation: ['', Validators.required]
    });

    

  }

  ngOnInit(): void {
    if (this.employeId) {
      this.loadExperiences();
    }
  }


  experienceAnterieureForm = new FormGroup({
    poste: new FormControl('', Validators.required),
    dateDebut: new FormControl('', Validators.required),
    dateFin: new FormControl('', Validators.required),
    societe: new FormControl('', Validators.required)
  });

  visibleAssad = false;
  visibleAnterieure = false;
  selectedExperienceAssad: ExperienceAssad | null = null;
  selectedExperienceAnterieure: ExperienceAnterieure | null = null;

  showDialogAssad(experience: ExperienceAssad) {
    this.selectedExperienceAssad = experience;
    this.experienceAssadForm.patchValue({
      debut: experience.dateDebut,
      fin: experience.dateFin,
      poste: experience.poste,
      direction: experience.direction,
      modeAffectation: experience.modeAffectation
    });
    this.visibleAssad = true; // Assurez-vous que cette ligne est présente
  }
  
  showDialogAnterieure(experience: ExperienceAnterieure) {
    this.selectedExperienceAnterieure = experience;
    this.experienceAnterieureForm.patchValue({
      dateDebut: experience.dateDebut,
      dateFin: experience.dateFin,
      poste: experience.poste,
      societe: experience.societe
    });
    this.visibleAnterieure = true; // Assurez-vous que cette ligne est présente
  }

  updateExperienceAssad() {
    if (!this.selectedExperienceAssad || this.experienceAssadForm.invalid) {
      return;
    }

    const updatedExperience: ExperienceAssad = {
      id: this.selectedExperienceAssad.id,
      poste: this.experienceAssadForm.value.poste!,
      dateDebut: this.experienceAssadForm.value.debut!,
      dateFin: this.experienceAssadForm.value.fin!,
      direction: this.experienceAssadForm.value.direction!,
      modeAffectation: this.experienceAssadForm.value.modeAffectation!
    };

    this.experienceService.modifyExperienceAssad(updatedExperience.id!, updatedExperience).subscribe(
      response => {
        console.log('Expérience Assad mise à jour avec succès:', response);
        const index = this.experiencesAssad.findIndex(e => e.id === updatedExperience.id);
        if (index !== -1) {
          this.experiencesAssad[index] = response;
        }
        this.visibleAssad = false;
        this.experienceUpdated.emit();
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'expérience Assad:', error);
      }
    );
  }

  updateExperienceAnterieure() {
    if (!this.selectedExperienceAnterieure || this.experienceAnterieureForm.invalid) {
      return;
    }

    const updatedExperience: ExperienceAnterieure = {
      id: this.selectedExperienceAnterieure.id,
      poste: this.experienceAnterieureForm.value.poste!,
      dateDebut: this.experienceAnterieureForm.value.dateDebut!,
      dateFin: this.experienceAnterieureForm.value.dateFin!,
      societe: this.experienceAnterieureForm.value.societe!
    };

    this.experienceService.modifyExperienceAnterieure(updatedExperience.id!, updatedExperience).subscribe(
      response => {
        console.log('Expérience Antérieure mise à jour avec succès:', response);
        const index = this.experiencesAnterieure.findIndex(e => e.id === updatedExperience.id);
        if (index !== -1) {
          this.experiencesAnterieure[index] = response;
        }
        this.visibleAnterieure = false;
        this.experienceUpdated.emit();
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'expérience Antérieure:', error);
      }
    );
  }

  addExperienceAssad() {
    if (this.experienceAssadForm.invalid) {
      console.log("Tous les champs de l'expérience Assad sont requis !");
      return;
    }

    const newExperienceAssad: ExperienceAssad = {
      poste: this.experienceAssadForm.value.poste!,
      dateDebut: this.experienceAssadForm.value.debut!,
      dateFin: this.experienceAssadForm.value.fin!,
      direction: this.experienceAssadForm.value.direction!,
      modeAffectation: this.experienceAssadForm.value.modeAffectation!
    };

    this.experienceService.addExperienceAssad(this.employeId, newExperienceAssad).subscribe(
      response => {
        console.log('Expérience Assad ajoutée avec succès:', response);
        this.experiencesAssad.push(response);
        this.experienceAssadForm.reset();
        this.experienceAdded.emit(); 
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'expérience Assad:', error);
      }
    );
  }

  addExperienceAnterieure() {
    if (this.experienceAnterieureForm.invalid) {
      console.log("Tous les champs de l'expérience Antérieure sont requis !");
      return;
    }

    const newExperienceAnterieure: ExperienceAnterieure = {
      poste: this.experienceAnterieureForm.value.poste!,
      dateDebut: this.experienceAnterieureForm.value.dateDebut!,
      dateFin: this.experienceAnterieureForm.value.dateFin!,
      societe: this.experienceAnterieureForm.value.societe!
    };

    this.experienceService.addExperienceAnterieure(this.employeId, newExperienceAnterieure).subscribe(
      response => {
        console.log('Expérience Antérieure ajoutée avec succès:', response);
        this.experiencesAnterieure.push(response);
        this.experienceAnterieureForm.reset();
        this.experienceUpdated.emit();
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'expérience Antérieure:', error);
      }
    );
  }

 deleteExperienceAssad(experienceId: number) {
    this.experienceService.deleteExperienceAssad(this.employeId, experienceId).subscribe(
      () => {
        this.experiencesAssad = this.experiencesAssad.filter(e => e.id !== experienceId);
        console.log('Expérience Assad supprimée avec succès');
        this.experienceUpdated.emit();
      },
      error => {
        console.error('Erreur lors de la suppression de l\'expérience Assad:', error);
      }
    );
  }

  deleteExperienceAnterieure(experienceId: number) {
    this.experienceService.deleteExperienceAnterieure(this.employeId, experienceId).subscribe(
      () => {
        this.experiencesAnterieure = this.experiencesAnterieure.filter(e => e.id !== experienceId);
        console.log('Expérience Antérieure supprimée avec succès');
        this.experienceUpdated.emit();
      },
      error => {
        console.error('Erreur lors de la suppression de l\'expérience Antérieure:', error);
      }
    );
  }

  loadExperiences() {
    this.experienceService.getExperiencesAssad(this.employeId).subscribe(
      data => {
        this.experiencesAssad = data;
      },
      error => {
        console.error('Erreur lors du chargement des expériences Assad:', error);
      }
    );

    this.experienceService.getExperiencesAnterieure(this.employeId).subscribe(
      data => {
        this.experiencesAnterieure = data;
      },
      error => {
        console.error('Erreur lors du chargement des expériences Antérieures:', error);
      }
    );
  }
}
