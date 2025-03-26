import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import CONFIG from '@/themes/mblog/config'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import Announcement from './Announcement'
import Catalog from './Catalog'
import GroupCategory from './GroupCategory'
import GroupTag from './GroupTag'

/**
 * 侧边栏
 * @param {*} props
 * @returns
 */
function AsideLeft(props) {
  const {
    tagOptions,
    currentTag,
    categoryOptions,
    currentCategory,
    post,
    slot,
    notice
  } = props
  const router = useRouter()
  const { fullWidth } = useGlobal()

  const MBLOG_SIDEBAR_COLLAPSE_SATUS_DEFAULT =
    fullWidth ||
    siteConfig('MBLOG_SIDEBAR_COLLAPSE_SATUS_DEFAULT', null, CONFIG)

  const MBLOG_SIDEBAR_COLLAPSE_ON_SCROLL = siteConfig(
    'MBLOG_SIDEBAR_COLLAPSE_ON_SCROLL',
    false,
    CONFIG
  )

  const MBLOG_SIDEBAR_COLLAPSE_BUTTON = siteConfig(
    'MBLOG_SIDEBAR_COLLAPSE_BUTTON',
    null,
    CONFIG
  )

  // 侧边栏折叠从 本地存储中获取 open 状态的初始值
  const [isCollapsed, setIsCollapse] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('fukasawa-sidebar-collapse') === 'true' ||
        MBLOG_SIDEBAR_COLLAPSE_SATUS_DEFAULT
      )
    }
    return MBLOG_SIDEBAR_COLLAPSE_SATUS_DEFAULT
  })

  // 在组件卸载时保存 open 状态到本地存储中
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('fukasawa-sidebar-collapse', isCollapsed)
    }
  }, [isCollapsed])

  const isReverse = siteConfig('LAYOUT_SIDEBAR_REVERSE')
  const position = useMemo(() => {
    if (isCollapsed) {
      if (isReverse) {
        return 'right-2'
      } else {
        return 'left-2'
      }
    } else {
      if (isReverse) {
        return 'right-80'
      } else {
        return 'left-80'
      }
    }
  }, [isCollapsed])

  // 折叠侧边栏
  const toggleOpen = () => {
    setIsCollapse(!isCollapsed)
  }

  // 自动折叠侧边栏 onResize 窗口宽度小于1366 || 滚动条滚动至页面的300px时 ; 将open设置为false
  useEffect(() => {
    if (!MBLOG_SIDEBAR_COLLAPSE_ON_SCROLL) {
      return
    }
    const handleResize = debounce(() => {
      if (window.innerWidth < 1366 || window.scrollY >= 1366) {
        setIsCollapse(true)
      } else {
        setIsCollapse(false)
      }
    }, 100)

    if (post) {
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleResize, { passive: true })
    }

    return () => {
      if (post) {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleResize, { passive: true })
      }
    }
  }, [])

  return (
    <div
      className={`sideLeft relative ${isCollapsed ? 'w-0' : 'w-80'} duration-300 transition-all bg-white dark:bg-hexo-black-gray hidden lg:block z-20`}>
      {/* 悬浮的折叠按钮 */}
      {MBLOG_SIDEBAR_COLLAPSE_BUTTON && (
        <div
          className={`${position} hidden lg:block fixed top-16 cursor-pointer hover:scale-110 duration-300 px-3 py-2 dark:text-white`}
          onClick={toggleOpen}>
          {isCollapsed ? (
            <i className='fa-solid fa-indent text-xl'></i>
          ) : (
            <i className='fas fa-bars text-xl'></i>
          )}
        </div>
      )}

      <div className={`h-full ${isCollapsed ? 'hidden' : 'p-8'}`}>

        <section className='siteInfo flex flex-col dark:text-gray-300 pt-8'>
          {siteConfig('DESCRIPTION')}
        </section>

        {router.asPath !== '/tag' && (
          <section className='flex flex-col'>
            <div className='w-12 my-4' />
            <GroupTag tags={tagOptions} currentTag={currentTag} />
          </section>
        )}

        {router.asPath !== '/category' && (
          <section className='flex flex-col'>
            <div className='w-12 my-4' />
            <GroupCategory
              categories={categoryOptions}
              currentCategory={currentCategory}
            />
          </section>
        )}

        <section className='flex flex-col dark:text-gray-300'>
          <Announcement post={notice} />
        </section>
        
        <section className='sticky top-16 pt-12  flex flex-col max-h-screen '>
          <Catalog toc={post?.toc} />
          <div className='flex justify-center'>
            <div>{slot}</div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AsideLeft
