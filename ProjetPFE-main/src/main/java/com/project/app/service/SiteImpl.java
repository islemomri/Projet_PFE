package com.project.app.service;

import java.util.List;
import java.util.Set;

import com.project.app.dto.SiteRequest;
import com.project.app.model.Direction;
import com.project.app.model.Site;

public interface SiteImpl {
	 public Site ajouterSite(Site site);
	    public List<Site> getAllSites();
	 
	    public boolean deleteSite(Long id);
	    public Site archiverSite(Long id);
	    public List<Site> getAllSitesArchivés();
	    public List<Site> getAllSitesnonArchivés();
	    
	    public Site desarchiverSite(Long id) ;
	    public Site  addSiteWithDirections(Site site, Set<Long> directionIds) ;
	    public Site updateSite(Long id, SiteRequest updatedSiteDTO) throws Exception; 
}
