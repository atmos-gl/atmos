import {AmbientLight, Object3D, PointLight, PointLightHelper, Vector3} from 'three';
import {BaseScene} from './BaseScene';
import {ExplorePoiObject} from './objects/ExplorePoi';
import {CSS2DObject, CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import {Ref} from "vue";
import {createExpoIn, easeOut, mirrorEasing} from "popmotion";

export class ExplorePoi extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private explorePoiObject: ExplorePoiObject;
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

    constructor(poiDesc: Ref<string>, showBgText: Ref<boolean>) {
        super();
        this.poiDesc = poiDesc
        this.poiDescDefault = poiDesc.value
        this.showBgText = showBgText
    }

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)
        // this.enableControls()
        this.ambientLight = new AmbientLight('#ffffff', 0.6)
        this.scene.add(this.ambientLight)

        this.pointLight = new PointLight('#fff', 0.9)
        this.pointLight.position.x = 0
        this.pointLight.position.y = 2
        this.pointLight.position.z = 10
        const helper = new PointLightHelper(this.pointLight)
        this.scene.add(this.pointLight)
        this.scene.add(helper)
        this.enableControls()

        this.explorePoiObject = new ExplorePoiObject()
        this.explorePoiObject.mesh.rotateY(Math.PI)
        this.scene.add(this.explorePoiObject.mesh)

        this.camera.position.set(this.defaultCamPos.x, this.defaultCamPos.y, 35)
        this.camera.lookAt(this.defaultCamLookAt)

        this.resizeRendererToDisplaySize()
        this.camera.updateMatrixWorld()

        // Watering
        this.poiObjects.push({
            camPos: new Vector3(1.4540604173045868, 1.2172741970719216, 1.7441767779243642),
            objInstance: this.explorePoiObject.mesh.getObjectByName('Serre').getObjectByName('spray_2'),
            textContainer: "js-watering",
            isClickable: true,
            poiDesc: 'Arrosage'
        })

        // Speakers
        this.poiObjects.push({
            camPos: new Vector3(-0.7083525562764238, 1.2927609887630331, 1.1327723884841376),
            objInstance: this.explorePoiObject.mesh.getObjectByName('Serre').getObjectByName('enceinte_1'),
            textContainer: "js-speaker",
            isClickable: true,
            poiDesc: 'Enceinte'
        })

        // Pipe
        this.poiObjects.push({
            camPos: new Vector3(2.4472711249308396, -2.9288871737952995, 1.931505296936661),
            objInstance: this.explorePoiObject.mesh.getObjectByName('pipe'),
            textContainer: "js-pipe",
            isClickable: true,
            poiDesc: 'Tuyau'
        })

        // Power Plant
        this.poiObjects.push({
            camPos: new Vector3(1.9319959043329842, -2.1286130154035687, 6.3185349634937085),
            objInstance: this.explorePoiObject.mesh.getObjectByName('centrale'),
            textContainer: "js-powerPlant",
            isClickable: true,
            poiDesc: 'Centrale'
        })

        this.poiObjects.forEach((object, i) => {
            const poi = document.createElement('div')
            poi.innerHTML = '+'
            poi.classList.add('poi')
            this.poiList.push(poi)
            const objectCSS = new CSS2DObject(poi)
            objectCSS.position.set(0, 0, 0)
            poi.addEventListener("click", async () => {
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

        // this.controls = new OrbitControls( this.camera, this.labelRenderer.domElement );
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

        // this.controls.addEventListener('end', (e) => {
        //     console.log(this.camera.position)
        // })

        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
