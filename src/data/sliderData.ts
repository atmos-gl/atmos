import localisation from '../assets/img/labels/label_local.svg'
import label_equitable from '../assets/img/labels/label_equitable.svg'
import label_local from '../assets/img/labels/label_local.svg'
import label_natural from '../assets/img/labels/label_natural.svg'
import label_recyclable from '../assets/img/labels/label_recyclable.svg'
import label_vegan from '../assets/img/labels/label_vegan.svg'
import water_amazonie from '../assets/img/shop/water/bouteille_Amazonie.png'
import water_ecolo from '../assets/img/shop/water/bouteille_Ecolo.png'
import water_Himalaya from '../assets/img/shop/water/Bouteille_Himalaya_Couleurs.png'
import water_sahara from '../assets/img/shop/water/Bouteille_Sahara_Couleurs.png'
import water_yosemite from '../assets/img/shop/water/bouteille_Yosemite.png'
import CO2_amazonie from '../assets/img/shop/CO2/CO2_Amazonie.png'
import CO2_ecolo from '../assets/img/shop/CO2/CO2_Ecolo.png'
import CO2_Himalaya from '../assets/img/shop/CO2/CO2_Himalaya.png'
import CO2_sahara from '../assets/img/shop/CO2/CO2_Sahara.png'
import CO2_yosemite from '../assets/img/shop/CO2/CO2_Yosemite.png'
import fertilizer_amazonie from '../assets/img/shop/fertilizer/fertilisant_amazonie.png'
import fertilizer_ecolo from '../assets/img/shop/fertilizer/fertilisant_ecolo.png'
import fertilizer_Himalaya from '../assets/img/shop/fertilizer/fertilisant_himalaya.png'
import fertilizer_sahara from '../assets/img/shop/fertilizer/fertilisant_sahara.png'
import fertilizer_yosemite from '../assets/img/shop/fertilizer/fertilisant_yosemite.png'

const data = [
    {
        title: "Eau",
        products: [
            {
                src: water_amazonie,
                alt: 'Eau d\'Amazonie',
                card: {
                    title: "Eau d'Amazonie",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "L'eau d'Amazonie est très riche en minéraux.Le" +
                            "climat humide de cette région contribue" +
                            "grandement à la prolifération des plantations. Tout" +
                            "droit sortie de l'Amazone vos plantates pousseront" +
                            "comme à l'état sauvage."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_equitable
                        },
                        {
                            src: label_local
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: water_ecolo,
                alt: 'Eau écologique',
                card: {
                    title: "Eau écologique",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "L'eau d'Amazonie est très riche en minéraux.Le" +
                            "climat humide de cette région contribue" +
                            "grandement à la prolifération des plantations. Tout" +
                            "droit sortie de l'Amazone vos plantates pousseront" +
                            "comme à l'état sauvage."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_equitable
                        },
                        {
                            src: label_local
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: water_Himalaya,
                alt: 'Eau d\'Himalaya',
                card: {
                    title: "Eau d\'Himalaya",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "L'eau d'Amazonie est très riche en minéraux.Le" +
                            "climat humide de cette région contribue" +
                            "grandement à la prolifération des plantations. Tout" +
                            "droit sortie de l'Amazone vos plantates pousseront" +
                            "comme à l'état sauvage."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_equitable
                        },
                        {
                            src: label_local
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: water_sahara,
                alt: 'Eau du Sahara',
                card: {
                    title: "Eau du Sahara",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "L'eau d'Amazonie est très riche en minéraux.Le" +
                            "climat humide de cette région contribue" +
                            "grandement à la prolifération des plantations. Tout" +
                            "droit sortie de l'Amazone vos plantates pousseront" +
                            "comme à l'état sauvage."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_equitable
                        },
                        {
                            src: label_local
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: water_yosemite,
                alt: 'Eau de yosemite',
                card: {
                    title: "Eau de yosemite",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "L'eau d'Amazonie est très riche en minéraux.Le" +
                            "climat humide de cette région contribue" +
                            "grandement à la prolifération des plantations. Tout" +
                            "droit sortie de l'Amazone vos plantates pousseront" +
                            "comme à l'état sauvage."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_equitable
                        },
                        {
                            src: label_local
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            }
        ],
    },
    {
        title: "CO2",
        products: [
            {
                src: CO2_amazonie,
                alt: 'CO2 d\'Amazonie',
                card: {
                    title: "CO2 d'Amazonie",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "Ce coffret regroupe tous les ingrédients\n" +
                                "          nécessaires pour faire pousser vos plantes\n" +
                                "          européennes. Ce pack vient de matière 100%\n" +
                                "          recyclés d'usine et de centrale. Contribuons\n" +
                                "          ensemble à réduire l'effet de serre."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_recyclable
                        },
                        {
                            src: label_natural
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: CO2_ecolo,
                alt: 'CO2 écologique',
                card: {
                    title: "CO2 écologique",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "Ce coffret regroupe tous les ingrédients\n" +
                                "          nécessaires pour faire pousser vos plantes\n" +
                                "          européennes. Ce pack vient de matière 100%\n" +
                                "          recyclés d'usine et de centrale. Contribuons\n" +
                                "          ensemble à réduire l'effet de serre."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_recyclable
                        },
                        {
                            src: label_natural
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: CO2_Himalaya,
                alt: 'CO2 d\'Himalaya',
                card: {
                    title: "CO2 d\'Himalaya",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "Ce coffret regroupe tous les ingrédients\n" +
                                "          nécessaires pour faire pousser vos plantes\n" +
                                "          européennes. Ce pack vient de matière 100%\n" +
                                "          recyclés d'usine et de centrale. Contribuons\n" +
                                "          ensemble à réduire l'effet de serre."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_recyclable
                        },
                        {
                            src: label_natural
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: CO2_sahara,
                alt: 'CO2 du Sahara',
                card: {
                    title: "CO2 du Sahara",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "Ce coffret regroupe tous les ingrédients\n" +
                                "          nécessaires pour faire pousser vos plantes\n" +
                                "          européennes. Ce pack vient de matière 100%\n" +
                                "          recyclés d'usine et de centrale. Contribuons\n" +
                                "          ensemble à réduire l'effet de serre."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_recyclable
                        },
                        {
                            src: label_natural
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: CO2_yosemite,
                alt: 'CO2 de yosemite',
                card: {
                    title: "CO2 de yosemite",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "Ce coffret regroupe tous les ingrédients\n" +
                                "          nécessaires pour faire pousser vos plantes\n" +
                                "          européennes. Ce pack vient de matière 100%\n" +
                                "          recyclés d'usine et de centrale. Contribuons\n" +
                                "          ensemble à réduire l'effet de serre."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_recyclable
                        },
                        {
                            src: label_natural
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            }
        ],
    },
    {
        title: "fertilisant",
        products: [
            {
                src: fertilizer_amazonie,
                alt: 'fertilisant d\'Amazonie',
                card: {
                    title: "fertilisant d'Amazonie",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "Ce coffret regroupe tous les ingrédients\n" +
                                "          nécessaires pour faire pousser vos plantes\n" +
                                "          européennes. Ce pack vient de matière 100%\n" +
                                "          recyclés d'usine et de centrale. Contribuons\n" +
                                "          ensemble à réduire l'effet de serre."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_vegan
                        },
                        {
                            src: label_natural
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: fertilizer_ecolo,
                alt: 'fertilisant écologique',
                card: {
                    title: "fertilisant écologique",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "Ce coffret regroupe tous les ingrédients\n" +
                                "          nécessaires pour faire pousser vos plantes\n" +
                                "          européennes. Ce pack vient de matière 100%\n" +
                                "          recyclés d'usine et de centrale. Contribuons\n" +
                                "          ensemble à réduire l'effet de serre."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_vegan
                        },
                        {
                            src: label_natural
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: fertilizer_Himalaya,
                alt: 'fertilisant d\'Himalaya',
                card: {
                    title: "fertilisant d\'Himalaya",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "Ce coffret regroupe tous les ingrédients\n" +
                                "          nécessaires pour faire pousser vos plantes\n" +
                                "          européennes. Ce pack vient de matière 100%\n" +
                                "          recyclés d'usine et de centrale. Contribuons\n" +
                                "          ensemble à réduire l'effet de serre."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_vegan
                        },
                        {
                            src: label_natural
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: fertilizer_sahara,
                alt: 'fertilisant du Sahara',
                card: {
                    title: "fertilisant du Sahara",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "Ce coffret regroupe tous les ingrédients\n" +
                                "          nécessaires pour faire pousser vos plantes\n" +
                                "          européennes. Ce pack vient de matière 100%\n" +
                                "          recyclés d'usine et de centrale. Contribuons\n" +
                                "          ensemble à réduire l'effet de serre."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_vegan
                        },
                        {
                            src: label_natural
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            },
            {
                src: fertilizer_yosemite,
                alt: 'fertilisant de yosemite',
                card: {
                    title: "fertilisant de yosemite",
                    subtitle: "France",
                    localisation: localisation,
                    content: [
                        {
                            text: "Ce coffret regroupe tous les ingrédients\n" +
                                "          nécessaires pour faire pousser vos plantes\n" +
                                "          européennes. Ce pack vient de matière 100%\n" +
                                "          recyclés d'usine et de centrale. Contribuons\n" +
                                "          ensemble à réduire l'effet de serre."
                        },
                        {
                            text: "Super pour faire pousser :\n" +
                                "          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,\n" +
                                "          Tomate, Avocat, Tomate, Avocat,..."
                        }
                    ],
                    labels: [
                        {
                            src: label_vegan
                        },
                        {
                            src: label_natural
                        }
                    ],
                    delivery: "Livraison en 2 à 4 jours ouvrés"
                },
            }
        ],
    },
]

export default data
