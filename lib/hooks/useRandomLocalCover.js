// /lib/hooks/useRandomLocalCover.js

const LOCAL_COVERS = [
    '/images/covers/cover1.png',
    '/images/covers/cover2.png',
    '/images/covers/cover3.png',
    '/images/covers/cover4.png',
    '/images/covers/cover5.png',
    '/images/covers/cover6.png',
    '/images/covers/cover7.png',
    '/images/covers/cover8.png',
    '/images/covers/cover9.png',
    '/images/covers/cover10.png',
    '/images/covers/cover11.png',
    '/images/covers/cover12.png',
    '/images/covers/cover13.png',
    '/images/covers/cover14.png',
    '/images/covers/cover15.png',
    '/images/covers/cover16.png',
    '/images/covers/cover17.png',
    '/images/covers/cover18.png',
    '/images/covers/cover19.png',
    '/images/covers/cover20.png',
    '/images/covers/cover21.png',
    '/images/covers/cover22.png'

]

/**
 * 获取一个随机的本地封面图 URL
 * @returns {string}
 */
export function useRandomLocalCover() {
    return LOCAL_COVERS[Math.floor(Math.random() * LOCAL_COVERS.length)]
}