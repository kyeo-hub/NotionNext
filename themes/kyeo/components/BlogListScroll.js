import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import BlogItem from './BlogItem'
/**
 * 使用滚动无限加载的博客列表
 * @param {*} props
 * @returns
 */
export const BlogListScroll = props => {
  const { posts } = props
  const { locale, NOTION_CONFIG } = useGlobal()
  const [page, updatePage] = useState(1)
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const BLOG_TITLE = siteConfig('EXAMPLE_BLOG_TITLE', '探索灵感与创意', CONFIG)

  let hasMore = false
  const postsToShow = posts
    ? Object.assign(posts).slice(0, POSTS_PER_PAGE * page)
    : []

  if (posts) {
    const totalCount = posts.length
    hasMore = page * POSTS_PER_PAGE < totalCount
  }
  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  const targetRef = useRef(null)

  // 监听滚动自动分页加载
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY + window.outerHeight
      const clientHeight = targetRef
        ? targetRef.current
          ? targetRef.current.clientHeight
          : 0
        : 0
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    }, 500)
  )
  const showPageCover = siteConfig('EXAMPLE_POST_LIST_COVER', null, CONFIG)

  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)

    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  return (
    <div
      id='posts-wrapper'
      className='w-full md:px-12 lg:px-16 xl:px-32 mb-12'
      ref={targetRef}>
      <div className='flex flex-col space-y-2'>
        <div className="banner-section px-4 md:px-0 max-w-4xl mx-auto space-y-4 mt-8">

          {/* 标语 - 大标题 */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {BLOG_TITLE}
          </h1>

          {/* 简介文本 */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            这是一个展示文章分类的地方，你可以点击不同的分类来浏览相关内容。
          </p>

          {/* 分类菜单 */}
          {/* <div className="flex justify-center flex-wrap gap-3 mt-6">
            {['技术', '设计', '生活', '旅行', '摄影'].map((cat, index) => (
              <Link
                key={index}
                href={`/category/${cat}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize
            ${cat === '技术'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:from-blue-600 hover:to-indigo-700'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
          `}
              >
                {cat}
              </Link>
            ))} 
          </div>*/}
        </div>

      </div>
      <div className="homePosts grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
        {postsToShow?.map((post, index) => (
          <BlogItem key={post.id} post={post} index={index} />
        ))}
      </div>
      <div
        onClick={handleGetMore}
        className='w-full my-4 py-4 text-center cursor-pointer '>
        {' '}
        {hasMore ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE} 😰`}{' '}
      </div>
    </div>
  )
}

