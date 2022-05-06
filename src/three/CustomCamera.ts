import {PerspectiveCamera, Vector3} from 'three';
import {animateAsync} from '../utils';
import {createExpoIn, mirrorEasing} from 'popmotion';

export default class CustomCamera extends PerspectiveCamera{
    public lastLookAt: Vector3
    lookAt(vector: Vector3 | number, y?: number, z?: number) {
        super.lookAt(vector, y, z);
        this.lastLookAt = typeof vector === 'object' ? vector : new Vector3(vector, y, z)
    }

    async move(to, from?, duration = 1500) {
        if (!to) {
            throw new Error('to param required')
        }
        if (!from) {
            const {x, y, z} = this.lastLookAt
            from = {
                ...this.position,
                tx: x,
                ty: y,
                tz: z,
            }
        }
        await animateAsync({
            from,
            to,
            onUpdate: (val) => {
                const {x, y, z, tx, ty, tz} = val
                this.position.set(x, y, z)
                this.lookAt(tx, ty, tz)
            },
            duration,
            ease: mirrorEasing(createExpoIn(4)),
        })
    }
}
