package com.project.app.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.app.model.Direction;
import com.project.app.model.Site;
import com.project.app.repository.DirectionRepository;
import com.project.app.repository.SiteRepository;





@Service
public class DirectionService implements IDirection {
	
	@Autowired
    private DirectionRepository directionRepository;

	@Autowired
    private SiteRepository siteRepository ;

	@Override
	public Direction ajouterDirection(Direction direction) {
		return directionRepository.save(direction);
	}

	@Override
	public List<Direction> getAllDirectionsnonArchivés() {
		return directionRepository.findByArchiveFalse();
	}
	
	@Override
	public List<Direction> getAllDirectionsArchivés() {
		return directionRepository.findByArchiveTrue();
	}

	@Override
	public Direction archiverDirection(Long id) {
		 Direction direction = directionRepository.findById(id).orElseThrow(() -> new RuntimeException("Direction not found"));
	        direction.archiver(); 
	        return directionRepository.save(direction);
	}
	
	
	public Direction desarchiverDirection(Long id) {
        Direction direction = directionRepository.findById(id).orElseThrow(() -> new RuntimeException("Direction non trouvée"));
        direction.desarchiver();
        return directionRepository.save(direction);
    }
	
	
	@Override
	public Direction updateDirection(Long id, Direction Details) {
		Optional<Direction> directionOpt = directionRepository.findById(id);
        if (directionOpt.isPresent()) {
        	Direction Direction = directionOpt.get();
        	
        	Direction.setNom_direction(Details.getNom_direction()); 
          
            return directionRepository.save(Direction);
        } else {
            return null; 
        }
	}

	@Override
	 public Set<Direction> getDirectionsBySiteId(Long siteId) {
	        Site site = siteRepository.findById(siteId)
	                .orElseThrow(() -> new RuntimeException("Site not found"));
	        return site.getDirections();
	    }
	
	
}
