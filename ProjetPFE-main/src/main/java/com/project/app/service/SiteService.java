package com.project.app.service;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.app.dto.SiteRequest;
import com.project.app.model.Direction;
import com.project.app.model.Site;
import com.project.app.repository.DirectionRepository;
import com.project.app.repository.SiteRepository;

import jakarta.transaction.Transactional;

@Service
public class SiteService implements SiteImpl {
	@Autowired
    private SiteRepository siteRepository;
	@Autowired
    private DirectionRepository directionRepository;


	@Override
	public Site ajouterSite(Site site) {
		 return siteRepository.save(site);
	}


	@Override
	public List<Site> getAllSites() {
		return siteRepository.findAll();
	}


	
	/*@Override
	public Site updateSite(Long id, Site siteDetails) {
		Optional<Site> siteOpt = siteRepository.findById(id);
        if (siteOpt.isPresent()) {
            Site site = siteOpt.get();
            site.setNom_site(siteDetails.getNom_site());  
            return siteRepository.save(site);
        } else {
            return null; 
        }
	}
*/
	@Override
	public Site updateSite(Long id, SiteRequest updatedSiteDTO) throws Exception {
        // Recherche du site par son ID
        Site site = siteRepository.findById(id).orElseThrow(() -> new RuntimeException("Site non trouvé"));
        
        // Mise à jour du nom du site
        site.setNom_site(updatedSiteDTO.getNom_site());

        // Récupération des directions par leurs IDs
        Set<Long> directionIds = updatedSiteDTO.getDirectionIds();
        Set<Direction> directions = new HashSet<>(directionRepository.findAllById(directionIds));

        // Associer les directions récupérées au site
        site.setDirections(directions);
        
        // Sauvegarde et renvoi du site mis à jour
        return siteRepository.save(site);
    }
	@Override
	public boolean deleteSite(Long id) {
		 Optional<Site> siteOpt = siteRepository.findById(id);
	        if (siteOpt.isPresent()) {
	            siteRepository.deleteById(id);
	            return true;
	        } else {
	            return false;
	        }
	}


	@Override
	public Site archiverSite(Long id) {
		 Site site = siteRepository.findById(id).orElseThrow(() -> new RuntimeException("Site not found"));
	        site.archiver(); 
	        return siteRepository.save(site);
	}


	@Override
	public List<Site> getAllSitesArchivés() {
		return siteRepository.findByArchiveTrue();
	}


	@Override
	public List<Site> getAllSitesnonArchivés() {
		return siteRepository.findByArchiveFalse();
	}


	@Override
	public Site desarchiverSite(Long id) {
		Site site = siteRepository.findById(id).orElseThrow(() -> new RuntimeException("site non trouvée"));
    site.desarchiver();
    return siteRepository.save(site);
	}
	
	@Override
	@Transactional
    public Site addSiteWithDirections(Site site, Set<Long> directionIds) {
        Set<Direction> directions = new HashSet<>(directionRepository.findAllById(directionIds));
        site.setDirections(directions);
        return siteRepository.save(site);
    }
	
	

}
