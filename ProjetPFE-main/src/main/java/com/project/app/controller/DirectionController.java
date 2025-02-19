package com.project.app.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.app.model.Direction;

import com.project.app.service.DirectionService;

@RestController
@RequestMapping("/api/directions")
public class DirectionController {
	
@Autowired
private DirectionService directionservice;

	
@PostMapping("/ajouter")
public Direction ajouterdirection(@RequestBody Direction direction) {
	return directionservice.ajouterDirection(direction) ;
}
@GetMapping
public List<Direction> getAllDirectionsnonArchivés() {
    return directionservice.getAllDirectionsnonArchivés();
}

@PutMapping("/{id}/archiver")
public Direction archiverDirection(@PathVariable Long id) {
    return directionservice.archiverDirection(id);
}

@GetMapping("/liste-directions-archivés")
public List<Direction> getAllDirectionsArchivés() {
    return directionservice.getAllDirectionsArchivés();
}

@PutMapping("/{id}/desarchiver")
public Direction desarchiverDirection(@PathVariable Long id) {
    return directionservice.desarchiverDirection(id);
}

@PutMapping("/{id}")
public ResponseEntity<Direction> updateDirection(@PathVariable Long id, @RequestBody Direction directionDetails) {
	Direction updatedDirection = directionservice.updateDirection(id, directionDetails);
    if (updatedDirection != null) {
        return ResponseEntity.ok(updatedDirection);  
    } else {
        return ResponseEntity.notFound().build(); 
    }
}

}

