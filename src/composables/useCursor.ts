import {Directive, DirectiveBinding, onBeforeUnmount, onMounted, reactive, ref} from 'vue';

const cursor = reactive({
    x: 0,
    y: 0
})
const lerpCursor = reactive({
    x: 0,
    y: 0
})
const grabbingCursor = reactive({
    active: false,
    x: 0,
    y: 0
})
const cursorProps = reactive({
    class: ''
})
export default function useCursor() {
    let running = true
    const onMouseMove = (e: MouseEvent) => {
        cursor.x = e.pageX
        cursor.y = e.pageY
    }
    const animate = () => {
        if (!running) return
        requestAnimationFrame(animate)
        if (grabbingCursor.active) {
            lerpCursor.x += (grabbingCursor.x - lerpCursor.x) * 0.08;
            lerpCursor.y += (grabbingCursor.y - lerpCursor.y) * 0.08;
        } else {
            lerpCursor.x += (cursor.x - lerpCursor.x) * 0.05;
            lerpCursor.y += (cursor.y - lerpCursor.y) * 0.05;
        }
    }
    animate()

    window.addEventListener('mousemove', onMouseMove)
    onBeforeUnmount(() => {
        window.removeEventListener('mousemove', onMouseMove)
        running = false
    })
    return {cursor, lerpCursor, cursorProps}
}

const mouseLeave = () => {
    cursorProps.class = ''
    grabbingCursor.active = false
}

const hoverClass = className => () => {
    cursorProps.class = className
}

export const bindGrabCursor = (el: HTMLElement) => {
    el.addEventListener('mouseover', () => {
        const rect = el.getBoundingClientRect()
        cursorProps.class = 'grab'
        grabbingCursor.active = true
        grabbingCursor.x = rect.x + rect.width / 2
        grabbingCursor.y = rect.y + rect.height / 2
    })
    el.addEventListener('mouseout', mouseLeave)
}

export const createCursorDirective = (): Directive => ({
    created(el: HTMLElement, binding: DirectiveBinding) {
        if (binding.modifiers.click) {
            el.addEventListener('mouseover', hoverClass('click'))
            el.addEventListener('mouseout', mouseLeave)
        }
        if (binding.modifiers.grab) {
            bindGrabCursor(el)
        }
        if (binding.modifiers.button) {
            el.addEventListener('mouseover', hoverClass('button'))
            el.addEventListener('mouseout', mouseLeave)
        }
    },
})
