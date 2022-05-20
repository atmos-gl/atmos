import assiette from '../assets/img/intro/assiette.png'
import chocolat from '../assets/img/intro/chocolat.png'
import cafe from '../assets/img/intro/cafe.png'
import couverts from '../assets/img/intro/couvert.png'
import avocat from '../assets/img/intro/Avocat.png'
import vegan from '../assets/img/intro/vegan.png'
import img100 from '../assets/img/intro/100.png'
import baguette from '../assets/img/intro/baguette.png'
import ananas from '../assets/img/intro/ananas.png'
import cactus from '../assets/img/intro/Cactus.png'
import eclair from '../assets/img/intro/eclair.png'
import pillule from '../assets/img/intro/pillule.png'
const data = [
    {
        title: "Le monde entier dans votre assiette",
        text: "Vous en avez marre de manger toujours les mêmes choses ? Vous rêvez d’essayer les fruits et légumes du monde entier mais vous ne les trouvez jamais en magasins ? Grâce à la serre Atmos faites pousser chez vous les fruits et légumes d’ailleurs. Transformer l’exotique en local, en réduisant l’impact de l’importation des fruits et légumes.",
        models: [
            {
                src: assiette,
                alt: 'Assiette',
                classes: 'absolute h-70 top-30 left-0'
            },
            {
                src: chocolat,
                alt: 'Chocolat',
                classes: 'absolute h-40 top-30 right-0'
            },
            {
                src: cafe,
                alt: 'Graine de café',
                classes: 'absolute h-20 bottom-30 right-20'
            }
        ],
        isReversed: false
    },
    {
        title: "Manger végan, sain et équilibré",
        text: "Vous êtes attachés à la cause animale ou vous voulez simplement réduire votre consommation de viande ? Passez à la serre. Notre marque est 100% cruelty Free et tous nos produits sont végan. Grâce à la serre Atome il vous sera beaucoup facile de manger 5 fruits et légumes par jour. Vous développerez de meilleures habitudes alimentaires.",
        models: [
            {
                src: couverts,
                alt: 'Couverts',
                classes: 'absolute w-50 top-0 left-0'
            },
            {
                src: avocat,
                alt: 'Avocat',
                classes: 'absolute w-25 bottom-30 right-15'
            },
            {
                src: vegan,
                alt: 'Vegan',
                classes: 'absolute h-25 bottom-0 left-35'
            }
        ],
        isReversed: true
    },
    {
        title: "Faites tout pousser en un clin d’œil",
        text: "Grâce à notre technologie à base de nucléaires, les plantes bénéficient d’un bienfait révolutionnaire qui permet de les faire pousser 100 plus rapidement qu’une plantation classique. Et tout cela dans le respect des traditions de leurs pays d’origine. Nous avons développé toute une gamme de produits venant du monde entier afin de vous permettre de développer tout type de fruits et légumes.",
        models: [
            {
                src: img100,
                alt: '100',
                classes: 'absolute h-20 top-15 left-20'
            },
            {
                src: baguette,
                alt: 'Baguette magique',
                classes: 'absolute w-60 bottom-0 left-0'
            },
            {
                src: ananas,
                alt: 'Ananas',
                classes: 'absolute w-40 bottom-0 right-0'
            }
        ],
        isReversed: false
    },
    {
        title: "Autonome et connecté",
        text: "Peur de la facture énergétique ? Plus besoin d’électricité pour alimenter votre serre. La serre est alimentée par un système à fission nucléaire grâce à une microscopique pilule d’uranium. Et cela pour plusieurs centaines d’années, il s’agit d’une énergie durable qui pourrait profiter à votre famille sur plusieurs décennies. De plus, vous pouvez agir sur votre serre à n’importe quel moment grâce à l’application connectée à celle-ci.",
        models: [
            {
                src: cactus,
                alt: 'Cactus',
                classes: 'absolute w-60 bottom-0 left-40'
            },
            {
                src: eclair,
                alt: 'Eclair',
                classes: 'absolute h-40 top-0 left-0'
            },
            {
                src: pillule,
                alt: 'Pillule',
                classes: 'absolute h-25 top-20 right-0'
            }
        ],
        isReversed: true
    },

]

export default data
