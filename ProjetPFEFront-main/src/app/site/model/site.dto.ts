export class SiteRequest {
  nom_site: string;
  directionIds: number[];
  postesIds: number[]; // Ajouter les IDs des postes

  constructor(nom_site: string, directionIds: number[], postesIds: number[]) {
    this.nom_site = nom_site;
    this.directionIds = directionIds;
    this.postesIds = postesIds; // Initialiser postesIds dans le constructeur
  }
}
