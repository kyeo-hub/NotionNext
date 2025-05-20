import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { PostMeta } from './PostMeta'


/**
 * 大图标题
 */
export default function TitleBg(props) {
  const { post } = props
  const { fullWidth, siteInfo } = useGlobal()

  const title = post?.title || siteConfig('TITLE')
  const description = post?.description || siteConfig('AUTHOR')
  const headerImage = post?.pageCoverThumbnail
    ? post.pageCoverThumbnail
    : siteInfo?.pageCover

  const TITLE_BG = siteConfig('EXAMPLE_TITLE_IMAGE', false, CONFIG)

  return (
    <>
      {/* 大图标题 */}
      {!fullWidth && (
        <div className='relative overflow-hidden text-center w-full h-screen bg-gray-100 flex flex-col justify-end items-center'>
          <div className='relative z-10 w-full text-white px-24 md:px-16 pb-16 md:pb-36 text-left'>
            <h1 className='title-1 relative text-xl md:text-6xl font-extrabold py-6'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon icon={post?.pageIcon} />
              )}
              {title}
            </h1>
            <p className='title-2 relative leading-loose text-base md:text-xl'>
              {description}
            </p>
            <PostMeta post={post} />
          </div>
          {TITLE_BG && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={headerImage}
                className='absolute rounded object-cover top-0 left-0 w-full h-full select-none opacity-70 z-0'
              />
            </>
          )}
        </div>
      )}
    </>
  )
}
