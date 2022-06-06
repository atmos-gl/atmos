import {computed, ref} from 'vue';
import {shareUrl} from '../config';

const shareId = ref(null)
export default function useShareResult() {
    const uploadSceneData = async (sceneData) => {
        const result = await fetch(shareUrl + 'new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sceneData})
        }).then(r => r.text())
        shareId.value = result
    }

    const shareUrlBase = computed(() => `${shareUrl}${shareId.value}`)
    const shareMessage = computed(() => `Quelle belle récolte de tomates !

${shareUrlBase.value}`)

    const shareOnFacebookUrl = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${shareUrlBase.value}`)
    const shareOnTwitterUrl = computed(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage.value)}`)
    const imageDownloadUrl = computed(() => {
        return shareUrlBase.value + '/download'
    })

    return {
        shareId,
        uploadSceneData,
        shareOnFacebookUrl,
        shareOnTwitterUrl,
        imageDownloadUrl,
    }
}
