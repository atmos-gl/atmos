import {AmbientLight, Object3D, PointLight, Vector3} from 'three';
import {BaseScene} from './BaseScene';
import {ExplorePoiObject} from './objects/ExplorePoi';
import {DragAnimation} from './three-composables/useDragAnimations';
import {CSS2DObject, CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import CustomCamera from "./CustomCamera";

export class ExplorePoi extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private explorePoiObject: ExplorePoiObject;
    private xOffset: number;
    private openDoorInteraction: DragAnimation;
    private labelRenderer: CSS2DRenderer;
    private poiObjects: Array<{
        camPos: Vector3,
        objInstance: Object3D
    }> = []

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)
        // this.enableControls()
        this.ambientLight = new AmbientLight('#ffffff', 0.3)
        this.scene.add(this.ambientLight)

        const pointLight = new PointLight('#4453b2', 0.9)
        pointLight.position.x = -10
        pointLight.position.y = 10
        pointLight.position.z = 10
        this.scene.add(pointLight)
        this.pointLight = new PointLight('#99e1cb', 0.9)
        this.pointLight.position.x = 10
        this.pointLight.position.y = 10
        this.pointLight.position.z = 10
        this.scene.add(this.pointLight)

        this.explorePoiObject = new ExplorePoiObject()
        this.explorePoiObject.mesh.rotateY(Math.PI)
        this.scene.add(this.explorePoiObject.mesh)

        this.camera.position.x = 4
        this.camera.position.y = 5
        this.camera.position.z = 15
        this.camera.lookAt(0, 0, 0)

        // this.scene.add(new Mesh(
        //     new BoxGeometry(5, 5),
        //     new MeshPhongMaterial({color: '#f00'})
        // ))

        this.resizeRendererToDisplaySize()
        this.camera.updateMatrixWorld()
        // this.openDoorInteraction = useDragAnimation(this.box.door, this.canvas, this.camera)
        //
        // this.openDoorInteraction.bind()
        // this.box.door.onOpen = () => {
        //     this.openDoorInteraction.unbind()
        // }

        // Watering
        this.poiObjects.push({
            camPos: new Vector3(1.4540604173045868, 1.2172741970719216, 1.7441767779243642),
            objInstance: this.explorePoiObject.mesh.getObjectByName('Serre').getObjectByName('spray_2')
        })

        // Speakers
        this.poiObjects.push({
            camPos: new Vector3(-0.7083525562764238, 1.2927609887630331, 1.1327723884841376),
            objInstance: this.explorePoiObject.mesh.getObjectByName('Serre').getObjectByName('enceinte_1')
        })

        // Pipe
        this.poiObjects.push({
            camPos: new Vector3(2.4472711249308396, -2.9288871737952995, 1.931505296936661),
            objInstance: this.explorePoiObject.mesh.getObjectByName('pipe')
        })

        // Power Plant
        this.poiObjects.push({
            camPos: new Vector3(1.9319959043329842, -2.1286130154035687, 6.3185349634937085),
            objInstance: this.explorePoiObject.mesh.getObjectByName('centrale')
        })

        // GreenHouse
        // this.poiObjects.push({
        //     camPos: new Vector3(),
        //     objInstance: this.explorePoiObject.mesh.getObjectByName('Serre').getObjectByName('spray_2')
        // })
        // this.poiObjects.push(this.explorePoiObject.mesh.getObjectByName('Serre'))

        this.poiObjects.forEach(object => {
            const poi = document.createElement('div')
            poi.innerHTML = '+'
            poi.classList.add('poi')
            const objectCSS = new CSS2DObject(poi)
            objectCSS.position.set(0, 0, 0)
            poi.addEventListener("click", async () => {
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
                console.log("j'ai fini de bouger")
            })
            object.objInstance.add(objectCSS)
        })

        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize( window.innerWidth, window.innerHeight );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        document.getElementById( 'labels' ).appendChild( this.labelRenderer.domElement );

        // this.controls = new OrbitControls( this.camera, this.labelRenderer.domElement );
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
