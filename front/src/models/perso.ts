export const caracteristiques = <const>['Force', 'Intelligence', 'Coordination', 'Presence', 'Resistance', 'Volonte', 'Perception', 'Empathie'];
export const attributs = <const>['Physique', 'Mental', 'Manuel', 'Social', 'Magie instinctive', 'Magie invocatoire', 'Sorcellerie'];
export const competences = <const>[
    'Armes articulées',
    'Armes contondantes',
    'Armes de choc',
    'Armes de jet',
    'Armes doubles',
    'Armes d\'hast',
    'Armes tranchantes',
    'Cimeterre',
    'Poings',
    'Bouclier',
    'Corps à corps',
    'Acrobatie',
    'Athlétisme',
    'Equitation',
    'Escalade',
    'Esquive',
    'Natation',
    'Castes',
    'Connaissance de la magie',
    'Connaissance des animaux',
    'Connaissance des dragons',
    'Géographie',
    'Histoire',
    'Lois',
    'Orientation',
    'Stratégie',
    'Alchimie',
    'Astrologie',
    'Cartographie',
    'Estimation',
    'Herboristerie',
    'Lire et écrire',
    'Matières premières',
    'Médecine',
    'Premiers soins',
    'Survie (forêt)',
    'Survie (plaines)',
    'Survie (collines)',
    'Survie (marais)',
    'Vie en cité',
    'Armes de siège',
    'Artisanat (Archerie)',
    'Contrefaçon',
    'Discrétion',
    'Pièges',
    'Pister',
    'Armes à projectiles',
    'Attelages',
    'Déguisement',
    'Déverrouillage',
    'Don artistique ()',
    'Faire les poches',
    'Jeu',
    'Jongler',
    'Baratin',
    'Conte',
    'Eloquence',
    'Marchandage',
    'Psychologie',
    'Art de la scène',
    'Commandement',
    'Diplomatie',
    'Dressage',
    'Intimidation',
    'Séduction',
    'Feu',
    'Rêves',
    'Cité',
    'Non trouvé'
];

export type CaracteristiqueKey = typeof caracteristiques[number];
export type CaracteristiqueValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type AttributKey = typeof attributs[number];
export type AttributValue = 0  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type InitiativeValue = 1 | 2 | 3 | 4 | 5;

export interface Caracteristique {
    key: CaracteristiqueKey;
    value: CaracteristiqueValue;
}

export interface Attribut {
    key: AttributKey;
    value: AttributValue;
}

export type CompetenceKey = typeof competences[number];

export interface Competence {
    key: CompetenceKey;
    value: number;
}

export class Personnage {
    constructor(
        public name: string, 
        public image: string,
        public initiative: InitiativeValue,
        public caracteristiques: [Caracteristique, Caracteristique, Caracteristique, Caracteristique, Caracteristique, Caracteristique, Caracteristique, Caracteristique],
        public attributs: Attribut[],
        public competences: Competence[]
    ) {}
}


export const personnages = [
    new Personnage('Edonan', 'edonan.png', 3, [
        { key: 'Force', value: 6},
        { key: 'Intelligence', value: 4 },
        { key: 'Coordination', value: 5 },
        { key: 'Presence', value: 4 },
        { key: 'Resistance', value: 6 },
        { key: 'Volonte', value: 5 },
        { key: 'Perception', value: 7 },
        { key: 'Empathie', value: 3 },
    ], [
        { key: 'Physique', value: 6 },
        { key: 'Mental', value: 3 },
        { key: 'Manuel', value: 6 },
        { key: 'Social', value: 3 }
    ], [
        { key: 'Armes de choc', value: 2},
        { key: 'Corps à corps', value: 2 },
        { key: 'Acrobatie', value: 3 },
        { key: 'Athlétisme', value: 6 },
        { key: 'Escalade', value: 2 },
        { key: 'Esquive', value: 2 },
        { key: 'Natation', value: 2 },
        { key: 'Connaissance des animaux', value: 5 },
        { key: 'Connaissance des dragons', value: 1 },
        { key: 'Géographie', value: 5 },
        { key: 'Orientation', value: 4 },
        { key: 'Cartographie', value: 5 },
        { key: 'Herboristerie', value: 2 },
        { key: 'Premiers soins', value: 3 },
        { key: 'Survie (forêt)', value: 2 },
        { key: 'Survie (plaines)', value: 1 },
        { key: 'Survie (collines)', value: 1 },
        { key: 'Survie (marais)', value: 1 },
        { key: 'Artisanat (Archerie)', value: 3 },
        { key: 'Discrétion', value: 5 },
        { key: 'Pièges', value: 2 },
        { key: 'Pister', value: 5 },
        { key: 'Armes à projectiles', value: 6 },
        { key: 'Baratin', value: 4 },
        { key: 'Conte', value: 3 }
    ]),
    new Personnage('Bragon', 'bragon.png', 3, [
        { key: 'Force', value: 6 },
        { key: 'Intelligence', value: 4 },
        { key: 'Coordination', value: 5 },
        { key: 'Presence', value: 4 },
        { key: 'Resistance', value: 5 },
        { key: 'Volonte', value: 6 },
        { key: 'Perception', value: 5 },
        { key: 'Empathie', value: 5 },
    ], [
        { key: 'Physique', value: 6 },
        { key: 'Mental', value: 4 },
        { key: 'Manuel', value: 5 },
        { key: 'Social', value: 3 }
    ], [
        { key: 'Armes d\'hast', value: 1 },
        { key: 'Armes tranchantes', value: 8 },
        { key: 'Bouclier', value: 5 },
        { key: 'Corps à corps', value: 6 },
        { key: 'Cimeterre', value: 10 },
        { key: 'Poings', value: 9 },
        { key: 'Acrobatie', value: 1 },
        { key: 'Athlétisme', value: 2 },
        { key: 'Equitation', value: 4 },
        { key: 'Escalade', value: 2 },
        { key: 'Esquive', value: 5 },
        { key: 'Natation', value: 2 },
        { key: 'Stratégie', value: 1 },
        { key: 'Premiers soins', value: 2 },
        { key: 'Armes de siège', value: 1 },
        { key: 'Discrétion', value: 1 },
        { key: 'Armes à projectiles', value: 2 },
        { key: 'Attelages', value: 3 },
        { key: 'Jeu', value: 2 },
        { key: 'Commandement', value: 1 }
    ]),
    new Personnage('Jeremias Scrivner', 'scrivener.jpg', 3, [
        { key: 'Force', value: 3 },
        { key: 'Intelligence', value: 6 },
        { key: 'Coordination', value: 4 },
        { key: 'Presence', value: 5 },
        { key: 'Resistance', value: 3 },
        { key: 'Volonte', value: 8 },
        { key: 'Perception', value: 6 },
        { key: 'Empathie', value: 5 },
    ], [
        { key: 'Physique', value: 2 },
        { key: 'Mental', value: 6 },
        { key: 'Manuel', value: 5 },
        { key: 'Social', value: 5 },
        { key: 'Magie instinctive', value: 8 },
        { key: 'Magie invocatoire', value: 7 },
        { key: 'Sorcellerie', value: 0 }
    ], [
        { key: 'Connaissance de la magie', value: 4 },
        { key: 'Vie en cité', value: 1 },
        { key: 'Baratin', value: 3 },
        { key: 'Eloquence', value: 1 },
        { key: 'Art de la scène', value: 3 },
        { key: 'Intimidation', value: 3 }
    ]),
    new Personnage('Dalai', 'dalai.jpg', 3, [
        { key: 'Force', value: 4 },
        { key: 'Intelligence', value: 8 },
        { key: 'Coordination', value: 6 },
        { key: 'Presence', value: 3 },
        { key: 'Resistance', value: 5 },
        { key: 'Volonte', value: 6 },
        { key: 'Perception', value: 5 },
        { key: 'Empathie', value: 3 },
    ], [
        { key: 'Physique', value: 5 },
        { key: 'Mental', value: 7 },
        { key: 'Manuel', value: 4 },
        { key: 'Social', value: 2 }
    ], [
        { key: 'Armes tranchantes', value: 5 },
        { key: 'Athlétisme', value: 4 },
        { key: 'Castes', value: 6 },
        { key: 'Connaissance des dragons', value: 9 },
        { key: 'Histoire', value: 6 },
        { key: 'Lois', value: 1 },
        { key: 'Alchimie', value: 5 },
        { key: 'Herboristerie', value: 4 },
        { key: 'Lire et écrire', value: 5 },
        { key: 'Premiers soins', value: 4 },
        { key: 'Discrétion', value: 2 },
        { key: 'Baratin', value: 1 },
        { key: 'Psychologie', value: 4 }
    ])
];

export function searchAttributValue(personnage: Personnage, key: AttributKey) {
    return personnage.attributs.find(a => a.key == key)?.value || 0;
}

export function searchCompetenceValue(personnage: Personnage, key: CaracteristiqueKey | CompetenceKey) {
    return personnage.caracteristiques.find(a => a.key == key)?.value ||
        personnage.competences.find(a => a.key)?.value ||
        0;
}