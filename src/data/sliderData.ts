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
                    subtitle: "P??rou",
                    localisation: planet_amazonie,
                    content: [
                        {
                            text: "L'eau d'Amazonie est tr??s riche en min??raux. Le climat humide de cette r??gion contribue grandement ?? la prolif??ration des plantations. Tout droit sortie de l'Amazone vos plantes poussent comme ?? l'??tat sauvage."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Cupua??u, Manioc, A??a??, Noix du br??sil, Tucuma, Banane..."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: water_ecolo,
                alt: 'Eau ??cologique',
                card: {
                    title: "Eau ??cologique",
                    subtitle: "Allemagne",
                    localisation: planet_recycle,
                    content: [
                        {
                            text: "L'eau ??cologique est une eau 100% recycl??e. Recueillie en Europe, elle contribue grandement ?? la pousse des plantations.On utilise des eaux us??es recycl??es principalement de Berlin, Munich, Hambourg???"
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: water_Himalaya,
                alt: 'Eau d\'Himalaya',
                card: {
                    title: "Eau d\'Himalaya",
                    subtitle: "N??pal",
                    localisation: planet_himalaya,
                    content: [
                        {
                            text: "L'eau de l'Himalaya est tr??s riche en sodium. Le climat subtropical de cette r??gion contribue grandement ?? la croissance des plantations. Tout droit sortie du Gandaki vos plantes poussent comme ?? l'??tat sauvage."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
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
                            text: "L'eau du Sahara est tr??s riche en calcium. Le climat aride de cette r??gion contribue grandement au d??veloppement des plantations. Tout droit sortie du Tamanrasset vos plantes poussent comme ?? l'??tat sauvage."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: water_yosemite,
                alt: 'Eau du Yosemite',
                card: {
                    title: "Eau du Yosemite",
                    subtitle: "??tats-Unis",
                    localisation: planet_yosemite,
                    content: [
                        {
                            text: "L'eau du Yos??mite est tr??s riche en magn??sium. Le climat m??diterran??en de cette r??gion contribue grandement ?? l?????volution des plantations. Tout droit sortie du Eel River vos plantes poussent comme ?? l'??tat sauvage."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Ginseng, Cranberry, Ma??s, Fleurs sauvages..."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
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
                    subtitle: "P??rou",
                    localisation: planet_amazonie,
                    content: [
                        {
                            text: "Le CO2 d'Amazonie est tr??s riche en min??raux. Le climat humide de cette r??gion contribue grandement ?? la prolif??ration des plantations. Ce CO2 est recueilli principalement dans les centrales ?? charbon de Lima, Brazilia, Manaus???"
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Cupua??u, Manioc, A??a??, Noix du br??sil, Tucuma, Banane..."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: CO2_ecolo,
                alt: 'CO2 ??cologique',
                card: {
                    title: "CO2 ??cologique",
                    subtitle: "Allemagne",
                    localisation: planet_recycle,
                    content: [
                        {
                            text: "Le CO2 ??cologique est un CO2 100% recycl??. Recueillie en Europe, elle contribue grandement ?? la pousse des plantations. Ce CO2 est recueilli principalement dans les centrales ?? charbon  de Berlin, Munich, Hambourg???"
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: CO2_Himalaya,
                alt: 'CO2 d\'Himalaya',
                card: {
                    title: "CO2 d\'Himalaya",
                    subtitle: "N??pal",
                    localisation: planet_himalaya,
                    content: [
                        {
                            text: "Le CO2 de l'Himalaya est tr??s riche en sodium. Le climat subtropical de cette r??gion contribue grandement ?? la croissance des plantations. Ce CO2 est recueilli principalement dans les centrales ?? charbon de Katmandou, New Delhi???"
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
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
                            text: "Le CO2 du Sahara est tr??s riche en calcium. Le climat aride de cette r??gion contribue grandement au d??veloppement des plantations. Ce CO2 est recueilli principalement dans les centrales ?? charbon de Marrakech, Tombouctou???"
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: CO2_yosemite,
                alt: 'CO2 de Yosemite',
                card: {
                    title: "CO2 de Yosemite",
                    subtitle: "??tats-Unis",
                    localisation: planet_yosemite,
                    content: [
                        {
                            text: "Le CO2 du Yos??mite est tr??s riche en magn??sium. Le climat m??diterran??en de cette r??gion contribue grandement ?? l?????volution des plantations. Ce CO2 est recueilli principalement dans les centrales ?? charbon de Las Vegas, Sacramento???"
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Ginseng, Cranberry, Ma??s, Fleurs sauvages..."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
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
                    subtitle: "P??rou",
                    localisation: planet_amazonie,
                    content: [
                        {
                            text: "Le fertilisant d'Amazonie est tr??s riche en min??raux. Le climat humide de cette r??gion contribue grandement ?? la prolif??ration des plantations. Ce fertilisant est produit dans le respect des traditions du P??rou."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Cupua??u, Manioc, A??a??, Noix du br??sil, Tucuma, Banane..."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: fertilizer_ecolo,
                alt: 'Fertilisant ??cologique',
                card: {
                    title: "Fertilisant ??cologique",
                    subtitle: "Allemagne",
                    localisation: planet_recycle,
                    content: [
                        {
                            text: "Le fertilisant ??cologique est un fertilisant 100% recycl??. Recueillie en Europe, elle contribue grandement ?? la pousse des plantations. Ce fertilisant est produit dans le respect des traditions de l???Allemagne."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: fertilizer_Himalaya,
                alt: 'Fertilisant d\'Himalaya',
                card: {
                    title: "Fertilisant d\'Himalaya",
                    subtitle: "N??pal",
                    localisation: planet_himalaya,
                    content: [
                        {
                            text: "Le fertilisant d???Himalaya est tr??s riche en sodium. Le climat subtropical de cette r??gion contribue grandement ?? la croissance des plantations. Ce fertilisant est produit dans le respect des traditions du N??pal."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
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
                            text: "Le fertilisant du Sahara est tr??s riche en calcium. Le climat aride de cette r??gion contribue grandement au d??veloppement des plantations. Ce fertilisant est produit dans le respect des traditions du Niger."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: fertilizer_yosemite,
                alt: 'Fertilisant de Yosemite',
                card: {
                    title: "Fertilisant de Yosemite",
                    subtitle: "??tats-Unis",
                    localisation: planet_yosemite,
                    content: [
                        {
                            text: "Le fertilisant du Yos??mite est tr??s riche en magn??sium. Le climat m??diterran??en de cette r??gion contribue grandement ?? l?????volution des plantations. Ce fertilisant est produit dans le respect des traditions des ??tats-Unis."
                        },
                        {
                            text: "Super pour faire pousser : " +
                                "Ginseng, Cranberry, Ma??s, Fleurs sauvages..."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
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
                            text: "L???uranium est notre produit sensation ! Le secret du pousse exceptionnel ! " +
                                "Et cela pour plusieurs centaines d???ann??es, il s???agit d???une ??nergie durable qui " +
                                "pourrait profiter ?? votre famille sur plusieurs d??cennies. " +
                                "Plus besoin d?????lectricit?? pour alimenter votre serre et pas d???augmentation de facture non plus."
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
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
                    subtitle: "P??rou",
                    localisation: planet_amazonie,
                    content: [
                        {
                            text: "Notre coffret d???Amazonie vous permet d'acheter tous les produits de la gamme de cette r??gion. ??conomisez jusqu????? 50 % du prix des produits vendus s??par??ment. Ne passez pas ?? c??t?? !"
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: pack_ecolo,
                alt: 'Pack ??cologique',
                card: {
                    title: "Pack ??cologique",
                    subtitle: "Allemagne",
                    localisation: planet_recycle,
                    content: [
                        {
                            text: "Notre coffret ??cologique vous permet d'acheter tous les produits de la gamme 100% recycl??s. ??conomisez jusqu????? 50 % du prix des produits vendus s??par??ment. Ne passez pas ?? c??t?? !"
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: pack_Himalaya,
                alt: 'Pack Himalaya',
                card: {
                    title: "Pack Himalaya",
                    subtitle: "N??pal",
                    localisation: planet_himalaya,
                    content: [
                        {
                            text: "Notre coffret de l'Himalaya vous permet d'acheter tous les produits de la gamme de cette r??gion. ??conomisez jusqu????? 50 % du prix des produits vendus s??par??ment. Ne passez pas ?? c??t?? !"
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
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
                            text: "Notre coffret du Sahara vous permet d'acheter tous les produits de la gamme de cette r??gion. ??conomisez jusqu????? 50 % du prix des produits vendus s??par??ment. Ne passez pas ?? c??t?? !"
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            },
            {
                src: pack_yosemite,
                alt: 'Pack Yosemite',
                card: {
                    title: "Pack Yosemite",
                    subtitle: "??tats-Unis",
                    localisation: planet_yosemite,
                    content: [
                        {
                            text: "Notre coffret du Yos??mite vous permet d'acheter tous les produits de la gamme de cette r??gion. ??conomisez jusqu????? 50 % du prix des produits vendus s??par??ment. Ne passez pas ?? c??t?? !"
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
                    delivery: "Livraison en 2 ?? 4 jours ouvr??s"
                },
            }
        ],
    },
]

export default data
