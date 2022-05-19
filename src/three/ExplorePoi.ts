import {AmbientLight, Object3D, PointLight, PointLightHelper, Vector3} from 'three';
import {BaseScene} from './BaseScene';
import {ExploreGreenHouse} from './objects/ExploreGreenHouse';
import {CSS2DObject, CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import {Ref} from "vue";
import {createExpoIn, mirrorEasing, animate} from "popmotion";

export class ExplorePoi extends BaseScene {

    private pointLight: PointLight;
    private explorePoiObject: ExploreGreenHouse;
    private labelRenderer: CSS2DRenderer;
    private poiObjects: Array<{
        camPos: Vector3,
        objInstance: Object3D
        textContainer: string
        isClickable: Boolean
        poiDesc: string
    }> = []

    private defaultCamPos: Vector3 = new Vector3(4, 5, 15)
    private defaultCamLookAt: Vector3 = new Vector3()

    private poiList: Array<HTMLElement> = []

    private poiDescDefault: string
    private poiDesc: Ref<string>

    public onSelectPoi?: (poiIndex: number) => void;
    public currentPoiIndex?: number = null
    private showBgText: Ref<boolean>
    private secondGreenHouse: Object3D;
    private secondGreenHouseInitialPos: Vector3;
    private secondPipe: Object3D;
    private secondPipeInitialPos: Vector3;

    constructor(poiDesc: Ref<string>, showBgText: Ref<boolean>) {
        super();
        this.poiDesc = poiDesc
        this.poiDescDefault = poiDesc.value
        this.showBgText = showBgText
    }

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)

        // this.ambientLight = new AmbientLight('#ffffff', 0)
        // this.scene.add(this.ambientLight)

        this.pointLight = new PointLight('#fff', 0.9)
        this.pointLight.position.x = 2
        this.pointLight.position.y = 3
        this.pointLight.position.z = 8
        // const helper = new PointLightHelper(this.pointLight)
        this.scene.add(this.pointLight)
        // this.scene.add(helper)
        // this.enableControls()

        this.explorePoiObject = new ExploreGreenHouse()
        this.explorePoiObject.mesh.rotateY(Math.PI)
        this.scene.add(this.explorePoiObject.mesh)

        this.camera.position.set(this.defaultCamPos.x, this.defaultCamPos.y, 35)
        this.camera.lookAt(this.defaultCamLookAt)

        this.resizeRendererToDisplaySize()
        this.camera.updateMatrixWorld()

        // Watering
        this.poiObjects.push({
            camPos: new Vector3(1.457519042153834, 1.1014487223805816, 1.4552405242302724),
            objInstance: this.explorePoiObject.mesh.getObjectByName('Serre_2').getObjectByName('spray_2_2'),
            textContainer: "js-watering",
            isClickable: true,
            poiDesc: 'Arrosage'
        })

        // Speakers
        this.poiObjects.push({
            camPos: new Vector3(-0.30193644740226677, 1.447445584071967, 1.6421059736908377),
            objInstance: this.explorePoiObject.mesh.getObjectByName('Serre_2').getObjectByName('enceinte_1_2'),
            textContainer: "js-speaker",
            isClickable: true,
            poiDesc: 'Enceinte'
        })

        // Pipe
        this.poiObjects.push({
            camPos: new Vector3(2.515165572438983, -3.3411157760571015, 1.933085755182343),
            objInstance: this.explorePoiObject.mesh.getObjectByName('pipe'),
            textContainer: "js-pipe",
            isClickable: true,
            poiDesc: 'Tuyau'
        })

        // Power Plant
        this.poiObjects.push({
            camPos: new Vector3(2.3835515083476397, -2.68795178039041, 4.916199141662456),
            objInstance: this.explorePoiObject.mesh.getObjectByName('centrale_2'),
            textContainer: "js-powerPlant",
            isClickable: true,
            poiDesc: 'Centrale'
        })

        // Second GreenHouse
        this.secondGreenHouse = this.explorePoiObject.mesh.getObjectByName('Serre')
        this.secondPipe = this.explorePoiObject.mesh.getObjectByName('cable_2')
        this.secondGreenHouseInitialPos = this.secondGreenHouse.position.clone()
        this.secondPipeInitialPos = this.secondPipe.position.clone()
        const anchor = new Object3D()
        anchor.name = 'secondGreenHouse'
        anchor.position.set(-5, -1, 0)
        this.scene.add(anchor)
        this.poiObjects.push({
            camPos: new Vector3(-0.7253531798032511, 1.0134429123948978, 13.979589377261162),
            objInstance: anchor,
            textContainer: "js-powerPlant",
            isClickable: true,
            poiDesc: 'Serre'
        })

        this.secondGreenHouse.position.setY(2000)
        this.secondPipe.position.setY(2000)

        this.poiObjects.forEach((object, i) => {
            const poi = document.createElement('div')
            poi.innerHTML = '+'
            poi.classList.add('poi')
            this.poiList.push(poi)
            const objectCSS = new CSS2DObject(poi)
            objectCSS.position.set(0, 0, 0)
            poi.addEventListener("click", async () => {
                if (object.objInstance.name === "secondGreenHouse") {
                    animate({
                        from: this.secondGreenHouse.position,
                        to: this.secondGreenHouseInitialPos,
                        duration: 1000,
                        onUpdate: v => {
                            this.secondGreenHouse.position.copy(v)
                        }
                    })
                    animate({
                        from: this.secondPipe.position,
                        to: this.secondPipeInitialPos,
                        duration: 1000,
                        onUpdate: v => {
                            this.secondPipe.position.copy(v)
                        }
                    })
                }
                if (object.isClickable) {
                    this.showBgText.value = false
                    this.setObjectsClickable(false)
                    await this.openPoi(object, poi, i)
                }
            })
            poi.addEventListener('mouseenter', () => {
                this.poiDesc.value = object.poiDesc
            })
            poi.addEventListener('mouseleave', () => {
                this.poiDesc.value = this.poiDescDefault
            })
            object.objInstance.add(objectCSS)
        })

        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize( window.innerWidth, window.innerHeight );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        document.querySelector(".js-explore-labels").appendChild( this.labelRenderer.domElement );

        this.setupPostProcessing()
    }

    processExplore() {
        this.camera.move({
            x: this.defaultCamPos.x,
            y: this.defaultCamPos.y,
            z: this.defaultCamPos.z,
            tx: this.defaultCamLookAt.x,
            ty: this.defaultCamLookAt.y,
            tz: this.defaultCamLookAt.z,
        }, null, 1200, mirrorEasing(createExpoIn(4)))
    }

    setObjectsClickable(state: Boolean) {
        this.poiObjects.forEach(object => {object.isClickable = state})
    }

    async openPoi(object, poi, i) {
        const objPos = object.objInstance.getWorldPosition(new Vector3())
        poi.classList.toggle('hidden')
        await this.camera.move({
            x: object.camPos.x,
            y: object.camPos.y,
            z: object.camPos.z,
            tx: objPos.x,
            ty: objPos.y,
            tz: objPos.z,
        })
        this.onSelectPoi?.(i)
        this.currentPoiIndex = i
    }

    async closePoi(i) {
        await this.camera.move({
            x: this.defaultCamPos.x,
            y: this.defaultCamPos.y,
            z: this.defaultCamPos.z,
            tx: this.defaultCamLookAt.x,
            ty: this.defaultCamLookAt.y,
            tz: this.defaultCamLookAt.z,
        })
        this.poiList[i].classList.toggle('hidden')
        this.currentPoiIndex = null
        this.setObjectsClickable(true)
        this.showBgText.value = true
    }

    animate() {
        this.explorePoiObject.animate(this.clock.getDelta())

        this.labelRenderer.render( this.scene, this.camera );

        // this.controls.addEventListener('end', () => {
        //     console.log(this.camera.position)
        // })

        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
