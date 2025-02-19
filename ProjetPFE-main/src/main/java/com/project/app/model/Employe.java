package com.project.app.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
@Data
@Entity
public class Employe {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String nom;
	    private String prenom;
	  
	   
	    private Integer matricule;

	
	    private LocalDate dateNaissance;
	    private LocalDate dateRecrutement;
	    private String sexe;
	    private String email;
	    private String lieuNaissance;
	    private String codeQualification;
	    private String descriptionQualification;
	    private String departement;
	    private String poste;
	    private String photo;
	    
	   
		 
}
