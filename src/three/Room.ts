import {AmbientLight, PointLight} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {BaseScene} from './BaseScene';
import {RoomObject} from './objects/Room';
import {DragAnimation} from './three-composables/useDragAnimations';
import {CSS2DObject, CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";

export class Room extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private room: RoomObject;
    private xOffset: number;
    private openDoorInteraction: DragAnimation;
    private labelRenderer;

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

        this.room = new RoomObject()
        this.scene.add(this.room.mesh)

        this.camera.position.x = 4
        this.camera.position.y = 5
        this.camera.position.z = 22
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



        const object = this.room.mesh.getObjectByName("Guitar")

        const poi = document.createElement('div')
        poi.innerHTML = '+'
        poi.classList.add('poi')
        const objectCSS = new CSS2DObject(poi)
        objectCSS.position.set(0, 0, 0)

        object.add(objectCSS)

        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize( window.innerWidth, window.innerHeight );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        document.getElementById( 'labels' ).appendChild( this.labelRenderer.domElement );

        const controls = new OrbitControls( this.camera, this.labelRenderer.domElement );
    }

    animate() {
        this.room.animate(this.clock.getDelta())

        this.labelRenderer.render( this.scene, this.camera );

        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
