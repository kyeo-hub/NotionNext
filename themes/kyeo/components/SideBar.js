import Live2D from '@/components/Live2D'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import CONFIG from '../config'
import Announcement from './Announcement'
import Catalog from './Catalog'
import { Header } from './Header'
import { MenuList } from './MenuList'


const ExampleRecentComments = dynamic(
  () => import('./RecentCommentListForExample')
)


/**
 * 侧边栏
 */
export const SideBar = props => {
  const { locale } = useGlobal()
  const { latestPosts, categoryOptions, notice, post } = props
  // 评论相关
  const COMMENT_WALINE_SERVER_URL = siteConfig(
    'COMMENT_WALINE_SERVER_URL',
    false
  )
  const COMMENT_WALINE_RECENT = siteConfig('COMMENT_WALINE_RECENT', false)

  // 文章详情页特殊布局
  const HIDDEN_NOTIFICATION =
    post && siteConfig('EXAMPLE_ARTICLE_HIDDEN_NOTIFICATION', false, CONFIG)

  // 文章详情页左右布局改为上下布局
  const LAYOUT_VERTICAL =
    post && siteConfig('EXAMPLE_ARTICLE_LAYOUT_VERTICAL', false, CONFIG)

  return (
    <>
      <div className='flex flex-col lg:pt-16 bg-black dark:bg-white text-white dark:text-black'>

        <div className='flex-grow overflow-y-auto'>
          {/* 页头 */}
          <Header {...props} />
          {/* 菜单 */}
          <MenuList {...props} />
        </div>


        {/* 分类 */}
        {/* <aside className='w-full rounded shadow overflow-hidden mb-6'>
        <h3 className='text-sm bg-gray-100 text-gray-700 dark:bg-hexo-black-gray dark:text-gray-200 py-3 px-4 dark:border-hexo-black-gray border-b'>
          {locale.COMMON.CATEGORY}
        </h3>

        <div className='p-4'>
          <ul className='list-reset leading-normal'>
            {categoryOptions?.map(category => {
              return (
                <Link
                  key={category.name}
                  href={`/category/${category.name}`}
                  passHref
                  legacyBehavior>
                  <li>
                    {' '}
                    <a
                      href={`/category/${category.name}`}
                      className='text-gray-darkest text-sm hover:underline'>
                      {category.name}({category.count})
                    </a>
                  </li>
                </Link>
              )
            })}
          </ul>
        </div>
      </aside> */}
      </div>
    </>
  )
}
