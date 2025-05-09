import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'

/**
 * 博客列表的单个卡片
 * @param {*} param0
 * @returns
 */
const BlogItem = ({ post, index }) => {
  const showPageCover =
    siteConfig('EXAMPLE_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail

  let blogItemClassName = 'mb-12 ';
  let imageClassName = 'w-full h-44 overflow-hidden';
  let contentClassName = '';

  if (index === 0) {
    blogItemClassName += 'md:col-span-2 2xl:col-span-3';
    imageClassName = 'md:w-7/12 w-full h-44 overflow-hidden';
    contentClassName = 'md:w-5/12';
  } else {
    blogItemClassName += 'md:w-1/2 lg:w-1/3 ';
    imageClassName = 'w-full h-44 overflow-hidden';
    contentClassName = '';
  }
  if (index % 3 === 2) {
    blogItemClassName += 'md:w-1/3 ';
  } else {
    blogItemClassName += 'md:w-1/3 ';
  }

  return (
    <article
  className={`${blogItemClassName} flex flex-col bg-white dark:bg-gray-800 rounded-md shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300`}>
  
  {/* 图片封面 */}
  {showPageCover && (
    <div className={`${imageClassName} rounded-t-md overflow-hidden`}>
      <Link href={post?.href} passHref legacyBehavior>
        <LazyImage src={post?.pageCoverThumbnail} className="w-full h-full object-cover" />
      </Link>
    </div>
  )}

  {/* 内容区 */}
  <div className="p-6 flex-1 flex flex-col">
    
    {/* 分类 */}
    {post.category && (
      <Link href={`/category/${post.category}`} className="text-gray-700 dark:text-gray-300 hover:underline mb-2">
        {post.category}
      </Link>
    )}

    {/* 标题 */}
    <h2 className="mb-4">
      <Link
        href={post?.href}
        className="text-black dark:text-gray-100 text-xl md:text-2xl no-underline hover:underline">
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post.pageIcon} />}
        {post?.title}
      </Link>
      <p>{index}</p>
    </h2>

    {/* 摘要 */}
    {!post.results && (
      <p className="line-clamp-3 text-gray-700 dark:text-gray-400 leading-normal mb-4 flex-1">
        {post.summary}
      </p>
    )}

    {/* 搜索结果摘要 */}
    {post.results && (
      <p className="line-clamp-3 mt-4 text-gray-700 dark:text-gray-300 text-sm font-light leading-7 flex-1">
        {post.results.map((r, index) => (
          <span key={index}>{r}</span>
        ))}
      </p>
    )}

    {/* 日期固定在底部 */}
    <div className="mt-auto pt-2 text-sm text-gray-500 dark:text-gray-400">
      📅 {post.date?.start_date || post.createdTime}
    </div>

  </div>
</article>
  )
}

export default BlogItem
