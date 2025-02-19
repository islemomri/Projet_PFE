package com.project.app.service;

import java.util.List;
import java.util.Set;

import com.project.app.model.Direction;



public interface IDirection {
	 public Direction ajouterDirection(Direction direction);
	 public List<Direction> getAllDirectionsnonArchivés();
	 public Direction archiverDirection(Long id);
	 public List<Direction> getAllDirectionsArchivés();
	 public Direction desarchiverDirection(Long id);
		public Direction updateDirection(Long id, Direction Details);
		 public Set<Direction> getDirectionsBySiteId(Long siteId);

}
