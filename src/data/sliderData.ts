import planet_amazonie from '../assets/img/shop/planets/amazonie.png'
import planet_himalaya from '../assets/img/shop/planets/himalaya.png'
import planet_recycle from '../assets/img/shop/planets/recycle.png'
import planet_sahara from '../assets/img/shop/planets/sahara.png'
import planet_yosemite from '../assets/img/shop/planets/yosemite.png'
import label_equitable from '../assets/img/labels/label_equitable.svg'
import label_local from '../assets/img/labels/label_local.svg'
import label_natural from '../assets/img/labels/label_natural.svg'
import label_recyclable from '../assets/img/labels/label_recyclable.svg'
import label_vegan from '../assets/img/labels/label_vegan.svg'
import water_amazonie from '../assets/img/shop/water/water_amazonie.png'
import water_ecolo from '../assets/img/shop/water/water_ecolo.png'
import water_Himalaya from '../assets/img/shop/water/water_himalaya.png'
import water_sahara from '../assets/img/shop/water/water_sahara.png'
import water_yosemite from '../assets/img/shop/water/water_yosemite.png'
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
import uranium from '../assets/img/shop/uranium/uranium.png'
import pack_amazonie from '../assets/img/shop/packs/pack_amazonie.png'
import pack_ecolo from '../assets/img/shop/packs/pack_ecolo.png'
import pack_Himalaya from '../assets/img/shop/packs/pack_himalaya.png'
import pack_sahara from '../assets/img/shop/packs/pack_sahara.png'
import pack_yosemite from '../assets/img/shop/packs/pack_yosemite.png'

const data = [
    {
        title: "Eau",
        products: [
            {
                src: water_amazonie,
                alt: 'Eau d\'Amazonie',
                card: {
                    title: "Eau d'Amazonie",
                    subtitle: "Pérou",
                    localisation: planet_amazonie,
                    content: [
                        {
                            text: "L'eau d'Amazonie est très riche en minéraux. Le climat humide de cette région contribue grandement à la prolifération des plantations. Tout droit sortie de l'Amazone vos plantes poussent comme à l'état sauvage."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Cupuaçu, Manioc, Açaï, Noix du brésil, Tucuma, Banane..."
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
                alt: 'Eau Écologique',
                card: {
                    title: "Eau Écologique",
                    subtitle: "Allemagne",
                    localisation: planet_recycle,
                    content: [
                        {
                            text: "L'eau Écologique est une eau 100% recyclée. Recueillie en Europe, elle contribue grandement à la pousse des plantations.On utilise des eaux usées recyclées principalement de Berlin, Munich, Hambourg…"
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Tomate, Avocat, Carotte, Salade, Courgette, Persil, Romarin, Haricot..."
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
                    subtitle: "Népal",
                    localisation: planet_himalaya,
                    content: [
                        {
                            text: "L'eau de l'Himalaya est très riche en sodium. Le climat subtropical de cette région contribue grandement à la croissance des plantations. Tout droit sortie du Gandaki vos plantes poussent comme à l'état sauvage."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Mandarine, Combava, Citron, Poire Asiatique, Baie de myrica..."
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
                    subtitle: "Maroc",
                    localisation: planet_sahara,
                    content: [
                        {
                            text: "L'eau du Sahara est très riche en calcium. Le climat aride de cette région contribue grandement au développement des plantations. Tout droit sortie du Tamanrasset vos plantes poussent comme à l'état sauvage."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Palmier dattier, Cactus, Baies, Jujube..."
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
                alt: 'Eau du Yosemite',
                card: {
                    title: "Eau du Yosemite",
                    subtitle: "États-Unis",
                    localisation: planet_yosemite,
                    content: [
                        {
                            text: "L'eau du Yosémite est très riche en magnésium. Le climat méditerranéen de cette région contribue grandement à l’évolution des plantations. Tout droit sortie du Eel River vos plantes poussent comme à l'état sauvage."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Ginseng, Cranberry, Maïs, Fleurs sauvages..."
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
                    subtitle: "Pérou",
                    localisation: planet_amazonie,
                    content: [
                        {
                            text: "Le CO2 d'Amazonie est très riche en minéraux. Le climat humide de cette région contribue grandement à la prolifération des plantations. Ce CO2 est recueilli principalement dans les centrales à charbon de Lima, Brazilia, Manaus…"
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Cupuaçu, Manioc, Açaï, Noix du brésil, Tucuma, Banane..."
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
                alt: 'CO2 Écologique',
                card: {
                    title: "CO2 Écologique",
                    subtitle: "Allemagne",
                    localisation: planet_recycle,
                    content: [
                        {
                            text: "Le CO2 Écologique est un CO2 100% recyclé. Recueillie en Europe, elle contribue grandement à la pousse des plantations. Ce CO2 est recueilli principalement dans les centrales à charbon  de Berlin, Munich, Hambourg…"
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Tomate, Avocat, Carotte, Salade, Courgette, Persil, Romarin, Haricot..."
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
                    subtitle: "Népal",
                    localisation: planet_himalaya,
                    content: [
                        {
                            text: "Le CO2 de l'Himalaya est très riche en sodium. Le climat subtropical de cette région contribue grandement à la croissance des plantations. Ce CO2 est recueilli principalement dans les centrales à charbon de Katmandou, New Delhi…"
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Mandarine, Combava, Citron, Poire Asiatique, Baie de myrica..."
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
                    subtitle: "Maroc",
                    localisation: planet_sahara,
                    content: [
                        {
                            text: "Le CO2 du Sahara est très riche en calcium. Le climat aride de cette région contribue grandement au développement des plantations. Ce CO2 est recueilli principalement dans les centrales à charbon de Marrakech, Tombouctou…"
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Palmier dattier, Cactus, Baies, Jujube..."
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
                alt: 'CO2 de Yosemite',
                card: {
                    title: "CO2 de Yosemite",
                    subtitle: "États-Unis",
                    localisation: planet_yosemite,
                    content: [
                        {
                            text: "Le CO2 du Yosémite est très riche en magnésium. Le climat méditerranéen de cette région contribue grandement à l’évolution des plantations. Ce CO2 est recueilli principalement dans les centrales à charbon de Las Vegas, Sacramento…"
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Ginseng, Cranberry, Maïs, Fleurs sauvages..."
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
        title: "Fertilisants",
        products: [
            {
                src: fertilizer_amazonie,
                alt: 'Fertilisant d\'Amazonie',
                card: {
                    title: "Fertilisant d'Amazonie",
                    subtitle: "Pérou",
                    localisation: planet_amazonie,
                    content: [
                        {
                            text: "Le fertilisant d'Amazonie est très riche en minéraux. Le climat humide de cette région contribue grandement à la prolifération des plantations. Ce fertilisant est produit dans le respect des traditions du Pérou."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Cupuaçu, Manioc, Açaï, Noix du brésil, Tucuma, Banane..."
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
                alt: 'Fertilisant Écologique',
                card: {
                    title: "Fertilisant Écologique",
                    subtitle: "Allemagne",
                    localisation: planet_recycle,
                    content: [
                        {
                            text: "Le fertilisant Écologique est un fertilisant 100% recyclé. Recueillie en Europe, elle contribue grandement à la pousse des plantations. Ce fertilisant est produit dans le respect des traditions de l’Allemagne."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Tomate, Avocat, Carotte, Salade, Courgette, Persil, Romarin, Haricot..."
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
                alt: 'Fertilisant d\'Himalaya',
                card: {
                    title: "Fertilisant d\'Himalaya",
                    subtitle: "Népal",
                    localisation: planet_himalaya,
                    content: [
                        {
                            text: "Le fertilisant d’Himalaya est très riche en sodium. Le climat subtropical de cette région contribue grandement à la croissance des plantations. Ce fertilisant est produit dans le respect des traditions du Népal."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Mandarine, Combava, Citron, Poire Asiatique, Baie de myrica..."
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
                alt: 'Fertilisant du Sahara',
                card: {
                    title: "Fertilisant du Sahara",
                    subtitle: "Maroc",
                    localisation: planet_sahara,
                    content: [
                        {
                            text: "Le fertilisant du Sahara est très riche en calcium. Le climat aride de cette région contribue grandement au développement des plantations. Ce fertilisant est produit dans le respect des traditions du Niger."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Palmier dattier, Cactus, Baies, Jujube..."
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
                alt: 'Fertilisant de Yosemite',
                card: {
                    title: "Fertilisant de Yosemite",
                    subtitle: "États-Unis",
                    localisation: planet_yosemite,
                    content: [
                        {
                            text: "Le fertilisant du Yosémite est très riche en magnésium. Le climat méditerranéen de cette région contribue grandement à l’évolution des plantations. Ce fertilisant est produit dans le respect des traditions des États-Unis."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Ginseng, Cranberry, Maïs, Fleurs sauvages..."
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
    {
        title: "Uranium",
        products: [
            {
                src: uranium,
                alt: "Pilule d'Uranium",
                card: {
                    title: "Pilule d'Uranium",
                    subtitle: "France",
                    localisation: planet_amazonie,
                    content: [
                        {
                            text: "L’uranium est notre produit sensation ! Le secret du pousse exceptionnel ! " +
                                "Et cela pour plusieurs centaines d’années, il s’agit d’une énergie durable qui " +
                                "pourrait profiter à votre famille sur plusieurs décennies. " +
                                "Plus besoin d’électricité pour alimenter votre serre et pas d’augmentation de facture non plus."
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
    {
        title: "Coffrets",
        products: [
            {
                src: pack_amazonie,
                alt: 'Pack Amazonie',
                card: {
                    title: "Pack Amazonie",
                    subtitle: "Pérou",
                    localisation: planet_amazonie,
                    content: [
                        {
                            text: "Notre coffret d’Amazonie vous permet d'acheter tous les produits de la gamme de cette région. Économisez jusqu’à 50 % du prix des produits vendus séparément. Ne passez pas à côté !"
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
                src: pack_ecolo,
                alt: 'Pack écologique',
                card: {
                    title: "Pack écologique",
                    subtitle: "Allemagne",
                    localisation: planet_recycle,
                    content: [
                        {
                            text: "Notre coffret Écologique vous permet d'acheter tous les produits de la gamme 100% recyclés. Économisez jusqu’à 50 % du prix des produits vendus séparément. Ne passez pas à côté !"
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
                src: pack_Himalaya,
                alt: 'Pack Himalaya',
                card: {
                    title: "Pack Himalaya",
                    subtitle: "Népal",
                    localisation: planet_himalaya,
                    content: [
                        {
                            text: "Notre coffret de l'Himalaya vous permet d'acheter tous les produits de la gamme de cette région. Économisez jusqu’à 50 % du prix des produits vendus séparément. Ne passez pas à côté !"
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
                src: pack_sahara,
                alt: 'Pack Sahara',
                card: {
                    title: "Pack Sahara",
                    subtitle: "Maroc",
                    localisation: planet_sahara,
                    content: [
                        {
                            text: "Notre coffret du Sahara vous permet d'acheter tous les produits de la gamme de cette région. Économisez jusqu’à 50 % du prix des produits vendus séparément. Ne passez pas à côté !"
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
                src: pack_yosemite,
                alt: 'Pack Yosemite',
                card: {
                    title: "Pack Yosemite",
                    subtitle: "États-Unis",
                    localisation: planet_yosemite,
                    content: [
                        {
                            text: "Notre coffret du Yosémite vous permet d'acheter tous les produits de la gamme de cette région. Économisez jusqu’à 50 % du prix des produits vendus séparément. Ne passez pas à côté !"
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
