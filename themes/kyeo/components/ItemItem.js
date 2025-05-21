import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRandomLocalCover } from '@/lib/hooks/useRandomLocalCover'

const DEFAULT_COVER = '/default-cover.png' // 默认本地图片

/**
 * 博客列表的单个卡片
 * @param {*} param0
 * @returns
 */
const ItemItem = ({ post }) => {
  const [randomImage, setRandomImage] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const randomCover = useRandomLocalCover()

  useEffect(() => {
    setIsClient(true)

    if (!post?.pageCoverThumbnail) {
      setRandomImage(randomCover)
    }
  }, [post, randomCover])

  const getLinkPath = () => {
    if (!post) return '#'
    switch (post.type) {
      case 'Item':
        return `/projects/${post.slug}`
      case 'Page':
        return `/${post.slug}`
      case 'Post':
        return `/article/${post.slug}`
      default:
        return '#'
    }
  }

  const linkPath = getLinkPath()

  return (
    <article className="flex flex-col bg-white dark:bg-gray-800 h-80 md:h-[calc(100vh/3)] relative overflow-hidden">
      {/* 标题区 */}
      <div className="absolute top-4 right-4 z-10">
        <h2>
          <Link href={linkPath} passHref legacyBehavior>
            <div className="bg-white border border-black text-black font-bold text-lg md:text-xl p-2 inline-block hover:shadow-md transition-all duration-300 cursor-pointer">
              {siteConfig('POST_TITLE_ICON') && post?.pageIcon && <NotionIcon icon={post.pageIcon} />}
              {post ? post.title : '暂无内容'}
            </div>
          </Link>
        </h2>
      </div>

      {/* 图片封面 */}
      <div className="absolute w-full h-full inset-0">
        <Link href={linkPath} passHref legacyBehavior>
          <a className="block w-full h-full">
              <LazyImage
                src={post?.pageCoverThumbnail || randomImage || DEFAULT_COVER}
                alt={post?.title || '占位图片'}
                className="absolute object-cover w-full h-full hover:scale-105 transition-all duration-300"
              />
          </a>
        </Link>
      </div>
    </article>
  )
}

export default ItemItem