package com.project.app.dto;

import java.util.List;
import java.util.Set;

import com.project.app.model.Site;
import lombok.Data;

@Data
public class SiteRequest {
    private String nom_site;
    private Set<Long> directionIds;

}