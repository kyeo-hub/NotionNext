import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import { useCurrentBreakpoint } from './Breakpoint'

/**
 * 博客列表的单个卡片
 * @param {*} param0
 * @returns
 */
const BlogItem = ({ post, index }) => {
  const showPageCover =
    siteConfig('EXAMPLE_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail
  const currentBreakpoint = useCurrentBreakpoint()
  function getColSpanByBreakpoint(index, breakpoint) {
    switch (breakpoint) {
      case '2xl':
        if (index % 6 === 0) return 'col-span-6'; // 全宽
        if ([1, 2, 3].includes(index % 6)) return 'col-span-2'; // 1/3
        if ([4, 5].includes(index % 6)) return 'col-span-3'; // 1/2
        break;

      case 'xl':
        if (index % 3 === 0) return 'col-span-6'; // 全宽
        if (index % 3 === 1 || index % 3 === 2) return 'col-span-3'; // 半宽
        break;
      case 'lg':
        if (index % 3 === 0) return 'col-span-6'; // 全宽
        if (index % 3 === 1 || index % 3 === 2) return 'col-span-3'; // 半宽
        break;
      case 'md':
        if (index % 3 === 0) return 'col-span-6'; // 全宽
        if (index % 3 === 1 || index % 3 === 2) return 'col-span-3'; // 半宽
        break;

      default:
        return ''; // 默认单列
    }
    return '';
  }
  const colSpanClass = getColSpanByBreakpoint(index, currentBreakpoint);

  // 判断是否是全宽卡片
  const isFullWidthCard = ['col-span-6'].includes(colSpanClass)

  // 图片和内容区域样式
  let imageClassName = 'w-full h-44 overflow-hidden rounded-t-md'
  let contentClassName = ''

  if (isFullWidthCard) {
    imageClassName = 'md:w-7/12 w-full h-full min-h-full overflow-hidden rounded-l-md'
    contentClassName = 'md:w-5/12'
  }

  return (
    <article
      className={`${colSpanClass} flex ${isFullWidthCard ? 'flex-col md:flex-row max-h-[300px] md:max-h-[240px]' : 'flex-col'} mx-6 my-4 md:m-0 bg-white dark:bg-gray-800 rounded-md shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300`}>

      {/* 图片封面 */}
      {showPageCover && (
        <div className={`${imageClassName}`}>
          <Link href={post?.href} passHref legacyBehavior>
            <div>
              <LazyImage src={post?.pageCoverThumbnail} className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
      )}

      {/* 内容区 */}
      <div className={`${contentClassName} p-6 flex-1 flex flex-col`}>

        {/* 分类 */}
        {post.category && (
          <Link href={`/blog/${post.category}`} className="text-gray-700 dark:text-gray-300 hover:underline mb-2">
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
