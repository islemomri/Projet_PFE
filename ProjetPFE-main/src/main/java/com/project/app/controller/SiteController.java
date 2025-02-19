package com.project.app.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.app.dto.SiteRequest;
import com.project.app.model.Direction;
import com.project.app.model.Site;
import com.project.app.service.DirectionService;
import com.project.app.service.SiteService;

@RestController
@RequestMapping("/api/sites")
public class SiteController {
	 @Autowired
	    private SiteService siteService;
	 @Autowired
	    private DirectionService directionService;

	    
	    @PostMapping("/ajouter")
	    public Site ajouterSite(@RequestBody Site site) {
	        return siteService.ajouterSite(site);
	    }
	  
	    
	    @GetMapping("/non-archives")
	    public List<Site> getAllSitesnonArchivés() {
	        List<Site> sites = new ArrayList<>(siteService.getAllSitesnonArchivés());
	        return sites;
	    }

	  /*  @PutMapping("/{id}")
	    public ResponseEntity<Site> updateSite(@PathVariable Long id, @RequestBody Site siteDetails) {
	        Site updatedSite = siteService.updateSite(id, siteDetails);
	        if (updatedSite != null) {
	            return ResponseEntity.ok(updatedSite);  
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }*/
	    @PutMapping("/{id}")
	    public Site updateSite(@PathVariable Long id, @RequestBody SiteRequest updatedSiteDTO) throws Exception {
	        return siteService.updateSite(id, updatedSiteDTO);  // Appel du service pour mettre à jour le site
	    }
	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteSite(@PathVariable Long id) {
	        boolean deleted = siteService.deleteSite(id);
	        if (deleted) {
	            return ResponseEntity.noContent().build();  
	        } else {
	            return ResponseEntity.notFound().build();  
	        }
	    }
	    
	    @PutMapping("/{id}/archiver")
	    public Site archiverSite(@PathVariable Long id) {
	        return siteService.archiverSite(id);
	    }
	    @GetMapping("/liste-sites-archivés")
	    public List<Site> getAllsitesArchivés() {
	        return siteService.getAllSitesArchivés();
	    }
	    
	    
	    @PutMapping("/{id}/desarchiver")
	    public Site desarchiverSite(@PathVariable Long id) {
	        return siteService.desarchiverSite(id);
	    }
	    
	    
	    @PostMapping("/add")
	    public ResponseEntity<Site> createSite(@RequestBody SiteRequest siteRequest) {
	        Site site = new Site();
	        site.setNom_site(siteRequest.getNom_site());
	        Site savedSite = siteService.addSiteWithDirections(site, siteRequest.getDirectionIds());
	        return ResponseEntity.ok(savedSite);
	    } 
	    
	    @GetMapping("/{siteId}/directions")
	    public Set<Direction> getDirections(@PathVariable Long siteId) {
	        return directionService.getDirectionsBySiteId(siteId);
	    }
	    
	    
	    
	    
}
