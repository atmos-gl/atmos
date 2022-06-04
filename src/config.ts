const defaultShareUrl = 'https://share.atmos-serre.com/'
export const
    shareUrl = import.meta.env.PROD ? defaultShareUrl : (
        import.meta.env.VITE_APP_SHARE_URL ?? defaultShareUrl
    )

