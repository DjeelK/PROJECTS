let todoCount = 0;

export default class Item {
    constructor(titre,contenu){
        this.id = ++todoCount;
        this.titre=titre;
        this.contenu=contenu;
        this.isDone = false;
    }
}

