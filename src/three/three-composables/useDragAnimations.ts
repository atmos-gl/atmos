import {Camera, Object3D, Raycaster, Vector2, Vector3} from 'three';

enum Axis {
    horizontal = 'horizontal',
    vertical = 'vertical'
}

export interface DragAnimatable {
    animationProgress: number
    handle: Object3D
    animationProgressBy(offset: number): void
    snapAnimation?(): void
}

export interface DragAnimation {
    bind(opts?: DragOptions): void
    unbind(): void
}

interface DragOptions {
    target: DragAnimatable,
    dragEventsSource: HTMLElement,
    camera: Camera,
}

export default function useDragAnimation(
    target: DragAnimatable,
    dragEventsSource: HTMLElement,
    camera: Camera,
    axis: Axis = Axis.horizontal
): DragAnimation {

    const isHorizontal = axis === Axis.horizontal
    let dragging = false
    let mouseStart = 0
    const pointer = new Vector2()
    let startProgress = 0
    let progressOffset

    const raycaster = new Raycaster()

    const onMouseDown = (e) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects([target.handle]);

        if (intersects.length === 0) {
            return
        }
        dragging = true
        mouseStart = isHorizontal ? e.layerX : e.layerY
        startProgress = target.animationProgress
        dragEventsSource.style.cursor = 'grabbing'
    }
    const onMouseUp = (e) => {
        dragging = false
        dragEventsSource.style.cursor = 'grab'
        target.snapAnimation?.()
    }
    const onMouseMove = (e) => {
        if (dragging) {
            const val = isHorizontal ? e.layerX : e.layerY
            const offset = val - mouseStart
            target.animationProgress = startProgress + offset / progressOffset
        } else {
            pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObjects([target.handle]);

            if (intersects.length) {
                dragEventsSource.style.cursor = 'grab'
            } else {
                dragEventsSource.style.cursor = 'auto'
            }
        }
    }

    const bind = (opts?: DragOptions) => {
        if (opts?.target) {target = opts.target}
        if (opts?.dragEventsSource) {dragEventsSource = opts.dragEventsSource}
        if (opts?.camera) {camera = opts.camera}
        const vector = new Vector3()
        target.handle.getWorldPosition(vector)
        vector.project(camera)

        const s2 = isHorizontal
        ? (dragEventsSource.clientWidth / 2)
        : (dragEventsSource.clientHeight / 2)


        const startVal = ((isHorizontal ? vector.x : vector.y) * s2) + s2

        target.animationProgress = 1
        target.handle.getWorldPosition(vector)
        vector.project(camera)

        const endVal = ((isHorizontal ? vector.x : vector.y) * s2) + s2

        progressOffset = endVal - startVal - 100
        target.animationProgress = 0

        dragEventsSource.addEventListener('mousedown', onMouseDown)
        dragEventsSource.addEventListener('mouseup', onMouseUp)
        dragEventsSource.addEventListener('mousemove', onMouseMove)
    }
    const unbind = () => {
        dragEventsSource.style.cursor = 'auto'
        dragEventsSource.removeEventListener('mousedown', onMouseDown)
        dragEventsSource.removeEventListener('mouseup', onMouseUp)
        dragEventsSource.removeEventListener('mousemove', onMouseMove)
    }
    return {
        bind,
        unbind

    }
}
