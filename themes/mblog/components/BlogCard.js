import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'

/**
 * 文章列表卡片
 * @param {*} param0
 * @returns
 */
const BlogCard = ({ showAnimate, post, showSummary }) => {
  const { siteInfo } = useGlobal()
  const showPreview =
    siteConfig('MBLOG_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  // fukasawa 强制显示图片
  if (
    siteConfig('MBLOG_POST_LIST_COVER_FORCE', null, CONFIG) &&
    post &&
    !post.pageCover
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('MBLOG_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail

  const MBLOG_POST_LIST_ANIMATION = siteConfig(
    'MBLOG_POST_LIST_ANIMATION',
    null,
    CONFIG
  ) || showAnimate

  // 动画样式  首屏卡片不用，后面翻出来的加动画
  const aosProps = MBLOG_POST_LIST_ANIMATION
    ? {
      'data-aos': 'fade-up',
      'data-aos-duration': '300',
      'data-aos-once': 'true',
      'data-aos-anchor-placement': 'top-bottom'
    }
    : {}

  return (
    <article
      {...aosProps}
      style={{
        maxHeight: '60rem',
        position: 'relative' // 为绝对定位标题做准备
      }}
      className="w-full lg:max-w-sm p-3 shadow mb-4 mx-2 bg-white dark:bg-hexo-black-gray hover:shadow-lg duration-200 group">

      {/* 背景图容器 */}
      {showPageCover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* 背景图 */}
          <LazyImage
            src={post?.pageCoverThumbnail}
            alt={post?.title || siteConfig('TITLE')}
            className="object-cover w-full h-full"
          />
          {/* 毛玻璃遮罩层 */}
          <div className="absolute inset-0 bg-white/30 dark:bg-black/50 backdrop-blur-sm" />
        </div>
      )}
      {/* 悬停时显示的标题 */}
      <div className="absolute inset-0 flex items-center justify-center px-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 drop-shadow-md">
          <Link
            passHref
            href={post?.href}
            className="break-words cursor-pointer hover:underline">
            {/* {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post.pageIcon} />} */}
            {post.title}
          </Link>
        </h2>
      </div>

      <div className='flex flex-col justify-between h-full relative'>
        {/* 修改后的封面图部分 */}
        {showPageCover && (
          <Link href={post?.href} passHref legacyBehavior>
            <div className='flex-grow mb-3 w-full duration-200 cursor-pointer transform overflow-hidden group-hover:opacity-0 transition-opacity'>
              <LazyImage
                src={post?.pageCoverThumbnail}
                alt={post?.title || siteConfig('TITLE')}
                className='object-cover w-full h-full hover:scale-125 transform duration-500'
              />
            </div>
          </Link>
        )}

        {/* 修改后的文字部分 */}
        <div className="flex flex-col w-full relative z-10">
          <h2 className="text-center opacity-100 group-hover:opacity-0 transition-opacity">
            <Link
              passHref
              href={post?.href}
              className={`break-words cursor-pointer font-bold text-xl text-gray-800 dark:text-gray-300 ${showPreview ? 'justify-center' : 'justify-start'} leading-tight`}>
              {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post.pageIcon} />}
              {post.title}
            </Link>
          </h2>


          {/* 其他内容需要悬停时隐藏 */}
          <div>
            {(!showPreview || showSummary) && (
              <main className='my-2 tracking-wide line-clamp-3 group-hover:z-10 text-gray-800 dark:text-gray-300 text-md font-light leading-6'>
                {post.summary}
              </main>
            )}

            {/* 分类标签 */}
            <div className='mt-auto justify-between flex'>
              {post.category && (
                <Link
                  href={`/category/${post.category}`}
                  passHref
                  className='cursor-pointer dark:text-gray-300 font-light text-sm hover:underline hover:text-indigo-700 dark:hover:text-indigo-400 transform'>
                  <i className='mr-1 far fa-folder' />
                  {post.category}
                </Link>
              )}
              <div className='md:flex-nowrap flex-wrap md:justify-start inline-block'>
                <div>
                  {post.tagItems?.map(tag => (
                    <TagItemMini key={tag.name} tag={tag} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
    // <article
    //   {...aosProps}
    //   style={{ maxHeight: '60rem' }}
    //   className='w-full lg:max-w-sm p-3 shadow mb-4 mx-2 bg-white dark:bg-hexo-black-gray hover:shadow-lg duration-200'>
    //   <div className='flex flex-col justify-between h-full'>
    //     {/* 封面图 */}
    //     {showPageCover && (
    //       <Link href={post?.href} passHref legacyBehavior>
    //         <div className='flex-grow mb-3 w-full duration-200 cursor-pointer transform overflow-hidden'>
    //           <LazyImage
    //             src={post?.pageCoverThumbnail}
    //             alt={post?.title || siteConfig('TITLE')}
    //             className='object-cover w-full h-full hover:scale-125 transform duration-500'
    //           />
    //         </div>
    //       </Link>
    //     )}

    //     {/* 文字部分 */}
    //     <div className='flex flex-col w-full'>
    //       <h2>
    //         <Link
    //           passHref
    //           href={post?.href}
    //           className={`break-words cursor-pointer font-bold hover:underline text-xl ${showPreview ? 'justify-center' : 'justify-start'} leading-tight text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400`}>
    //           {siteConfig('POST_TITLE_ICON') && (
    //             <NotionIcon icon={post.pageIcon} />
    //           )}{' '}
    //           {post.title}
    //         </Link>
    //       </h2>

    //       {(!showPreview || showSummary) && (
    //         <main className='my-2 tracking-wide line-clamp-3 text-gray-800 dark:text-gray-300 text-md font-light leading-6'>
    //           {post.summary}
    //         </main>
    //       )}

    //       {/* 分类标签 */}
    //       <div className='mt-auto justify-between flex'>
    //         {post.category && (
    //           <Link
    //             href={`/category/${post.category}`}
    //             passHref
    //             className='cursor-pointer dark:text-gray-300 font-light text-sm hover:underline hover:text-indigo-700 dark:hover:text-indigo-400 transform'>
    //             <i className='mr-1 far fa-folder' />
    //             {post.category}
    //           </Link>
    //         )}
    //         <div className='md:flex-nowrap flex-wrap md:justify-start inline-block'>
    //           <div>
    //             {post.tagItems?.map(tag => (
    //               <TagItemMini key={tag.name} tag={tag} />
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </article>
  )
}

export default BlogCard
