package com.project.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

import lombok.Data;

@Entity
@Data
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Utilisateur {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;
	private String nom;
    private String prenom;
    private String email;
    private String password;
    private String role;
	

}
