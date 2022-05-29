import {Directive, DirectiveBinding, onBeforeUnmount, onMounted, reactive, ref} from 'vue';

const cursor = reactive({
    x: 0,
    y: 0
})
const lerpCursor = reactive({
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
        lerpCursor.x += (cursor.x - lerpCursor.x) * 0.05;
        lerpCursor.y += (cursor.y - lerpCursor.y) * 0.05;
    }
    animate()

    window.addEventListener('mousemove', onMouseMove)
    onBeforeUnmount(() => {
        window.removeEventListener('mousemove', onMouseMove)
        running = false
    })
    return {cursor, lerpCursor, cursorProps}
}

const mouseEnterClick = () => {
    cursorProps.class = 'click'
}
const mouseLeave = () => {
    cursorProps.class = ''
}

export const createCursorDirective = (): Directive => ({
    created(el: HTMLElement, binding: DirectiveBinding) {
        if (binding.modifiers.click) {
            el.addEventListener('mouseover', mouseEnterClick)
            el.addEventListener('mouseout', mouseLeave)
        }
    },
})
