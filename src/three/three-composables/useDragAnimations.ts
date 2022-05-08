import {Camera, Object3D, Raycaster, Vector2, Vector3} from 'three';

enum Axis {
    horizontal = 'horizontal',
    vertical = 'vertical'
}

export interface DragAnimatable {
    animationProgress: number
    handle?: Object3D
    movement?: Vector2

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
    camera: Camera
): DragAnimation {
    let dragging = false
    let mouseStart = 0
    const pointer = new Vector2()
    let startProgress = 0
    let movement: Vector2 = new Vector2()
    let startPoint: Vector2 = new Vector2()

    const raycaster = new Raycaster()

    const updatePointer = (e) => {
        pointer.x = (e.clientX / dragEventsSource.clientWidth) * 2 - 1;
        pointer.y = -(e.clientY / dragEventsSource.clientHeight) * 2 + 1;
    }
    const intersect = (e) => {
        updatePointer(e)
        raycaster.setFromCamera(pointer, camera);
        return raycaster.intersectObjects([target.handle]);
    }

    const onMouseDown = (e) => {
        const intersects = intersect(e)
        if (intersects.length === 0) {
            return
        }
        dragging = true
        mouseStart = e.layerX
        startProgress = target.animationProgress
        startPoint = pointer.clone()
        dragEventsSource.style.cursor = 'grabbing'
    }
    const onMouseUp = () => {
        if (dragging) {
            dragEventsSource.style.cursor = 'grab'
        }
        dragging = false
        target.snapAnimation?.()
    }
    const onMouseMove = (e) => {
        if (dragging) {
            updatePointer(e)
            // @ts-ignore
            const vecToStart = new Vector3(...pointer.clone().sub(startPoint), 0)
            // @ts-ignore
            const angle = vecToStart.angleTo(new Vector3(...movement, 0))
            const projectedDistance = Math.cos(angle) * vecToStart.length()
            const offsetProgress = projectedDistance / movement.length()

            target.animationProgress = startProgress + offsetProgress
        } else {
            const intersects = intersect(e)
            if (intersects.length) {
                dragEventsSource.style.cursor = 'grab'
            } else {
                dragEventsSource.style.cursor = 'auto'
            }
        }
    }

    const bindEvents = () => {
        dragEventsSource.addEventListener('mousedown', onMouseDown)
        dragEventsSource.addEventListener('mouseup', onMouseUp)
        dragEventsSource.addEventListener('mousemove', onMouseMove)
    }

    const bind = (opts?: DragOptions) => {
        if (opts?.target) {
            target = opts.target
        }
        if (opts?.dragEventsSource) {
            dragEventsSource = opts.dragEventsSource
        }
        if (opts?.camera) {
            camera = opts.camera
        }
        if (target.movement) {
            movement = target.movement
            bindEvents()
            return
        }
        if (!target.handle) {
            throw new Error('A DragAnimatable must at least have a handle or a movement')
        }

        const vector = new Vector3()
        target.handle.getWorldPosition(vector)
        vector.project(camera)

        const start = new Vector2(vector.x, vector.y)

        target.animationProgress = 1
        target.handle.getWorldPosition(vector)
        vector.project(camera)

        const end = new Vector2(vector.x, vector.y)

        movement = end.sub(start)
        target.animationProgress = 0
        bindEvents()
    }
    const unbind = () => {
        dragging = false
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
