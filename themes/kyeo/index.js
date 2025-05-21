'use client'

import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BlogListArchive from './components/BlogListArchive'
import { BlogListScroll } from './components/BlogListScroll'
import { ItemList } from './components/ItemList'
import { PostLock } from './components/PostLock'
import SearchInput from './components/SearchInput'
import { SideBar } from './components/SideBar'
import TitleBar from './components/TitleBar'
import TitleBg from './components/TitleBg'
import CONFIG from './config'
import { Style } from './style'
import { Footer } from './components/Footer'
import ItemItem from './components/ItemItem'



/**
 * 基础布局框架
 * 1.其它页面都嵌入在LayoutBase中
 * 2.采用左右两侧布局，移动端使用顶部导航栏
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, post } = props
  const { onLoading, fullWidth, locale } = useGlobal()

  // 文章详情页左右布局改为上下布局
  const LAYOUT_VERTICAL = siteConfig('EXAMPLE_ARTICLE_LAYOUT_VERTICAL', false, CONFIG) && post

  // 网站左右布局颠倒
  const LAYOUT_SIDEBAR_REVERSE = siteConfig('LAYOUT_SIDEBAR_REVERSE', false)

  return (
    <div
      id='theme-example'
      className={`${siteConfig('FONT_STYLE')} dark:text-gray-300  bg-white dark:bg-black scroll-smooth`}>
      <Style />

      {/* 主体 */}
      <div id='container-inner' className='w-full relative z-10'>
        <div
          id='container-wrapper'
          className={`relative mx-auto justify-center lg:flex
          ${LAYOUT_SIDEBAR_REVERSE ? 'flex-row-reverse' : ''} 
          ${LAYOUT_VERTICAL ? 'items-center flex-col' : 'items-start'} 
          `}>
          {/* 侧边栏 */}
          {!fullWidth && (
            <div
              className={`${LAYOUT_VERTICAL
                ? 'flex space-x-0 md:space-x-2 md:flex-row flex-col w-full max-w-5xl justify-center xl:px-14 lg:px-4'
                : 'lg:w-72 w-full lg:fixed lg:top-0 lg:left-0 lg:h-screen overflow-y-auto z-20 bg-black dark:bg-white text-white dark:text-black'
                }`}>
              <SideBar {...props} />
            </div>
          )}
          {/* 内容 */}
          <div
            className={`${fullWidth ? '' : LAYOUT_VERTICAL ? 'max-w-5xl' : 'lg:ml-72 flex-1 min-w-0'} w-full`}>
            <Transition
              show={!onLoading}
              appear={true}
              enter='transition ease-in-out duration-700 transform order-first'
              enterFrom='opacity-0 translate-y-16'
              enterTo='opacity-100'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-16'
              unmount={false}>
              {/* 嵌入模块 */}
              {props.slotTop}
              {children}
            </Transition>
          </div>
          {/* 页脚 */}
          <div className='lg:w-72 w-full relative lg:fixed lg:bottom-0 lg:left-0 lg:z-40'>
            <Footer {...props} />
          </div>
        </div>
      </div>

      {/* 回顶按钮 */}
      <div className='fixed right-4 bottom-4 z-10'>
        <div
          title={locale.POST.TOP}
          className='cursor-pointer p-2 text-center'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <i className='fas fa-angle-up text-2xl' />
        </div>
      </div>
    </div>
  )
}

/**
 * 首页
 * 重定向到Home页
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  const router = useRouter()
  const index = 'home'
  const [hasRedirected, setHasRedirected] = useState(false) // 添加状态追踪是否已重定向

  useEffect(() => {
    const tryRedirect = async () => {
      if (!hasRedirected) {
        // 仅当未重定向时执行
        setHasRedirected(true) // 更新状态，防止多次执行

        // 重定向到指定文章
        router.push(index).then(() => {
          setTimeout(() => {
            const article = document.querySelector(
              '#article-wrapper #notion-article'
            )
            if (!article) {
              console.log(
                '请检查您的Notion数据库中是否包含此slug页面： ',
                index
              )

              // 显示错误信息
              const containerInner = document.querySelector(
                '#theme-gitbook #container-inner'
              )
              const newHTML = `<h1 class="text-3xl pt-12 dark:text-gray-300">配置有误</h1><blockquote class="notion-quote notion-block-ce76391f3f2842d386468ff1eb705b92"><div>请在您的notion中添加一个slug为${index}的文章</div></blockquote>`
              containerInner?.insertAdjacentHTML('afterbegin', newHTML)
            }
          }, 2000)
        })
      }
    }

    if (index) {
      console.log('重定向', index)
      tryRedirect()
    } else {
      console.log('无重定向', index)
    }
  }, [index, hasRedirected]) // 将 hasRedirected 作为依赖确保状态变更时更新

  return null // 不渲染任何内容
}

/**
 * 首页
 * @param {*} props
 * @returns 此主题首页块结构
 */
// const LayoutHome = props => {
//   const posts = props.posts?.slice(0, 7)
//   const firstProject = posts[0]
//   const secondProject = posts[1]
//   const thirdProject = posts[2]
//   const fourthProject = posts[3]
//   const fifthProject = posts[4]
//   const aboutPage = posts[5]
//   const writing = posts[6]

//   return (
//     <div className='w-full md:h-screen'>
//       {/* 响应式网格容器 */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-3 gap-0 w-full h-full">

//         {/* first-project */}
//         <div className="lg:col-span-3 xl:col-span-1 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//           {firstProject ? (
//             <div className='w-full z-20'><ItemItem post={firstProject} /></div>
//           ) : (
//             <div className="text-gray-500">暂无项目</div>
//           )}
//         </div>

//         {/* about-us */}
//         <div className="lg:col-span-3 xl:col-span-2 lg:row-span-1 xl:row-span-1 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//           {aboutPage ? (
//             <div className='w-full z-20'><ItemItem post={aboutPage} /></div>
//           ) : (
//             <div className="text-gray-500">暂无项目</div>
//           )
//           }
//         </div>

//         {/* three-projects (3 rows on mobile, spans multiple cols) */}
//         <div className="md:col-span-2 lg:col-span-1 xl:col-span-1 bg-blue-200 dark:bg-blue-900 flex items-center justify-center">
//           {secondProject ? (
//             <div className='w-full z-20'><ItemItem post={secondProject} /></div>
//           ) : (
//             <div className="text-gray-500">暂无项目</div>
//           )}
//         </div>
//         <div className="md:col-span-2 lg:col-span-1 xl:col-span-1 bg-blue-200 dark:bg-blue-900 flex items-center justify-center">
//           {thirdProject ? (
//             <div className='w-full z-20'><ItemItem post={thirdProject} /></div>
//           ) : (
//             <div className="text-gray-500">暂无项目</div>
//           )}
//         </div>
//         <div className="md:col-span-2 lg:col-span-1 xl:col-span-1 bg-blue-200 dark:bg-blue-900 flex items-center justify-center">
//           {fourthProject ? (
//             <div className='w-full z-20'><ItemItem post={fourthProject} /></div>
//           ) : (
//             <div className="text-gray-500">暂无项目</div>
//           )}
//         </div>

//         {/* writing */}
//         <div className="md:col-span-1 lg:col-span-3 xl:col-span-2 bg-green-200 dark:bg-green-900 flex items-center justify-center">
//           {writing ? (
//             <div className='w-full z-20'><ItemItem post={writing} /></div>
//           ) : (
//             <div className="text-gray-500">暂无文章</div>
//           )}
//         </div>

//         {/* end-project */}
//         <div className="md:col-span-1 lg:col-span-3 xl:col-span-1 bg-pink-200 dark:bg-pink-900 flex items-center justify-center">
//           {fifthProject ? (
//             <div className='w-full z-20'><ItemItem post={fifthProject} /></div>
//           ) : (
//             <div className="text-gray-500">暂无文章</div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
const LayoutHome = props => {
  const posts = props.posts
  // 定义展示顺序：item[1], about, item[2], item[3], item[4], post, item[5]
  const displayOrder = [0, 5, 1, 2, 3, 6, 4]

  // 每个区块对应的样式和 key（可自定义）
  const blockConfig = [
    { key: 'project-1', col: 'lg:col-span-3 xl:col-span-1' },
    { key: 'about-us', col: 'lg:col-span-3 xl:col-span-2' },
    { key: 'project-2', col: 'md:col-span-2 lg:col-span-1 xl:col-span-1' },
    { key: 'project-3', col: 'md:col-span-2 lg:col-span-1 xl:col-span-1' },
    { key: 'project-4', col: 'md:col-span-2 lg:col-span-1 xl:col-span-1' },
    { key: 'writing', col: 'md:col-span-1 lg:col-span-3 xl:col-span-2' },
    { key: 'project-5', col: 'md:col-span-1 lg:col-span-3 xl:col-span-1' }
  ]

  return (
    <div className='w-full md:h-screen'>
      {/* 响应式网格容器 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-3 gap-0 w-full h-full">
        {blockConfig.map((config, idx) => {
          const post = posts[displayOrder[idx]]
          return (
            <div
              key={config.key}
              className={`${config.col} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}
            >

              <div className='w-full'>
                <ItemItem post={post} />
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 文章列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {

  return (
    <>
      <BlogListScroll {...props} />
    </>
  )
}

/**
 * 项目列表
 * @param {*} props
 * @returns
 */
const LayoutItemList = props => {

  return (
    <>
      <ItemList {...props} />
    </>
  )
}

/**
 * 文章详情页
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector('#article-wrapper #notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  return (
    <>
      {lock ? (
        <PostLock validPassword={validPassword} />
      ) : post && (
        <div className='lg:pt-14 lg:px-14'>
          {/* 标题栏 */}
          <TitleBar {...props} />
          <div id='article-wrapper' className='w-[90%] mx-auto'>
            <NotionPage post={post} />
            <ShareBar post={post} />
          </div>
          <Comment frontMatter={post} />
        </div>
      )}
    </>
  )
}

/**
 * 项目详情页
 * @param {*} props
 * @returns
 */
const LayoutProject = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector('#article-wrapper #notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  return (
    <>
      {lock ? (
        <PostLock validPassword={validPassword} />
      ) : post && (
        <div>
          {/* 大图标题 */}
          <TitleBg {...props} />
          <div id='Weapons-wrapper' className='bg-gray-300 px-4 md:px-8 lg:px-16 xl:px-48'>
            <NotionPage post={post} />
          </div>
        </div>
      )}
    </>
  )
}

/**
 * 404页
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      const article = isBrowser && document.getElementById('article-wrapper')
      if (!article) {
        router.push('/').then(() => {
          // console.log('找不到页面', router.asPath)
        })
      }
    }, 3000)
  }, [])

  return <>
    <div className='md:-mt-20 text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
      <div className='dark:text-gray-200'>
        <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'><i className='mr-2 fas fa-spinner animate-spin' />404</h2>
        <div className='inline-block text-left h-32 leading-10 items-center'>
          <h2 className='m-0 p-0'>页面无法加载，即将返回首页</h2>
        </div>
      </div>
    </div>
  </>
}

/**
 * 搜索页
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  useEffect(() => {
    if (isBrowser) {
      // 高亮搜索到的结果
      const container = document.getElementById('posts-wrapper')
      if (keyword && container) {
        replaceSearchResult({
          doms: container,
          search: keyword,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }
    }
  }, [router])

  return (
    <>
      <div className='pb-12'>
        <SearchInput {...props} />
      </div>
      <LayoutPostList {...props} />
    </>
  )
}

/**
 * 归档列表
 * @param {*} props
 * @returns 按照日期将文章分组排序
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <>
      <div className='mb-10 pb-20 md:py-12 p-3  min-h-screen w-full'>
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogListArchive
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archivePosts}
          />
        ))}
      </div>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  return (
    <>
      <div id='category-list' className='duration-200 flex flex-wrap'>
        {categoryOptions?.map(category => (
          <Link
            key={category.name}
            href={`/category/${category.name}`}
            passHref
            legacyBehavior>
            <div
              className={
                'hover:text-black dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600 px-5 cursor-pointer py-2 hover:bg-gray-100'
              }>
              <i className='mr-4 fas fa-folder' />
              {category.name}({category.count})
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <>
      <div id='tags-list' className='duration-200 flex flex-wrap'>
        {tagOptions.map(tag => (
          <div key={tag.name} className='p-2'>
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag.name)}`}
              passHref
              className={`cursor-pointer inline-block rounded hover:bg-gray-500 hover:text-white duration-200 mr-2 py-1 px-2 text-xs whitespace-nowrap dark:hover:text-white text-gray-600 hover:shadow-xl dark:border-gray-400 notion-${tag.color}_background dark:bg-gray-800`}>
              <div className='font-light dark:text-gray-400'>
                <i className='mr-1 fas fa-tag' />{' '}
                {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutHome,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  LayoutItemList,
  LayoutProject,
  CONFIG as THEME_CONFIG
}
