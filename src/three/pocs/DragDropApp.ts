import {
    AmbientLight, BoxGeometry,
    Color, DirectionalLight, GridHelper,
    Mesh, MeshBasicMaterial, MeshLambertMaterial,
    PerspectiveCamera, PlaneGeometry,
    Raycaster,
    Scene, Vector2,
    WebGLRenderer
} from 'three'

export class DragDropApp {
    private camera;
    private scene;
    private renderer;
    private plane;
    private pointer: Vector2;
    private raycaster: Raycaster;
    private isShiftDown = false;

    private rollOverMesh;
    private rollOverMaterial;
    private cubeGeo;
    private cubeMaterial;

    private objects = [];

    public init(canvas: HTMLCanvasElement) {
        this.camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.set( 500, 800, 1300 );
        this.camera.lookAt( 0, 0, 0 );

        this.scene = new Scene();
        this.scene.background = new Color( 0xf0f0f0 );

        // roll-over helpers

        const rollOverGeo = new BoxGeometry( 50, 50, 50 );
        this.rollOverMaterial = new MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
        this.rollOverMesh = new Mesh( rollOverGeo, this.rollOverMaterial );
        this.scene.add( this.rollOverMesh );

        // cubes

        this.cubeGeo = new BoxGeometry( 50, 50, 50 );
        this.cubeMaterial = new MeshLambertMaterial( { color: 0xfeb74c } );

        // grid

        const gridHelper = new GridHelper( 1000, 20 );
        this.scene.add( gridHelper );

        //

        this.raycaster = new Raycaster();
        this.pointer = new Vector2();

        const geometry = new PlaneGeometry( 1000, 1000 );
        geometry.rotateX( - Math.PI / 2 );

        this.plane = new Mesh( geometry, new MeshBasicMaterial( { visible: false } ) );
        this.scene.add( this.plane );

        this.objects.push( this.plane );

        // lights

        const ambientLight = new AmbientLight( 0x606060 );
        this.scene.add( ambientLight );

        const directionalLight = new DirectionalLight( 0xffffff );
        directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
        this.scene.add( directionalLight );

        this.renderer = new WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        document.addEventListener( 'pointermove', this.onPointerMove );
        document.addEventListener( 'pointerdown', this.onPointerDown );
        document.addEventListener( 'keydown', this.onDocumentKeyDown );
        document.addEventListener( 'keyup', this.onDocumentKeyUp );

        //

        window.addEventListener( 'resize', this.onWindowResize );
    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.render();

    }

    onPointerMove( event ) {

        this.pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

        this.raycaster.setFromCamera( this.pointer, this.camera );

        const intersects = this.raycaster.intersectObjects( this.objects, false );

        if ( intersects.length > 0 ) {

            const intersect = intersects[ 0 ];

            this.rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
            this.rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

            this.render();

        }

    }

    onPointerDown( event ) {

        this.pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

        this.raycaster.setFromCamera( this.pointer, this.camera );

        const intersects = this.raycaster.intersectObjects( this.objects, false );

        if ( intersects.length > 0 ) {

            const intersect = intersects[ 0 ];

            // delete cube

            if ( this.isShiftDown ) {

                if ( intersect.object !== this.plane ) {

                    this.scene.remove( intersect.object );

                    this.objects.splice( this.objects.indexOf( intersect.object ), 1 );

                }

                // create cube

            } else {

                const voxel = new Mesh( this.cubeGeo, this.cubeMaterial );
                voxel.position.copy( intersect.point ).add( intersect.face.normal );
                voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
                this.scene.add( voxel );

                this.objects.push( voxel );

            }

            this.render();

        }

    }

    onDocumentKeyDown( event ) {

        switch ( event.keyCode ) {

            case 16: this.isShiftDown = true; break;

        }

    }

    onDocumentKeyUp( event ) {

        switch ( event.keyCode ) {

            case 16: this.isShiftDown = false; break;

        }

    }

    render() {

        this.renderer.render( this.scene, this.camera );

    }




    animate() {
        // window.requestAnimationFrame(this.animate.bind(this))
        //
        // const elapsedTime = this.clock!.getElapsedTime()
        // // Update ...
        // if (this.resizeRendererToDisplaySize()) {
        //     const gl = this.renderer!.getContext()
        //     this.camera!.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
        //     this.camera!.updateProjectionMatrix()
        // }

        // @ts-ignore
        // this.cube.mesh.position.clamp(new Vector3(-45, 5, -45), new Vector3(45, 5, 45))
        // this.cube.mesh.position.set(mouse.x, 5, 0)

        // this.render()
    }
    //
    //
    // // Run app, load things, add listeners, ...
    run() {
        console.log("Dragdrop App run")

        this.render()
        // this.animate()
    }

    // Memory management
    // destroy() {
    //     this.scene = null
    //     this.camera = null
    //     this.renderer = null
    //     this.canvas = null
    // }
}
