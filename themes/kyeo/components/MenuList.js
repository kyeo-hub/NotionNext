import { useState } from 'react'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { MenuItemDrop } from './MenuItemDrop'

/**
 * 导航菜单列表（带响应式折叠功能）
 * @param {*} props
 * @returns
 */
export const MenuList = props => {
  const { customNav, customMenu } = props
  const { locale } = useGlobal()

  let links = [
    {
      id: 1,
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('EXAMPLE_MENU_SEARCH', null, CONFIG)
    },
    {
      id: 2,
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('EXAMPLE_MENU_ARCHIVE', null, CONFIG)
    },
    {
      id: 3,
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('EXAMPLE_MENU_CATEGORY', null, CONFIG)
    },
    {
      id: 4,
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('EXAMPLE_MENU_TAG', null, CONFIG)
    }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  // 如果 开启自定义菜单，则不再使用 Page生成菜单。
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }
  if (!links || links.length === 0) {
    return null
  }

  return <ResponsiveMenu links={links} locale={locale} />
}

/**
 * 响应式菜单组件（含移动端折叠）
 */
const ResponsiveMenu = ({ links, locale }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='w-full px-6 relative z-20 bg-black dark:bg-white text-white dark:text-black'>
      <div className='mx-auto max-w-4xl flex justify-between items-center text-sm md:text-md py-2'>
        {/* 桌面菜单 */}
        <ul className='hidden md:flex flex-col space-y-2 text-lg text-left'>
          {links.map((link, index) => (
            <MenuItemDrop key={index} link={link} />
          ))}
        </ul>

        {/* 手机菜单按钮 */}
        <div className='md:hidden flex justify-end w-full'>
          <button
            onClick={() => setIsOpen(true)}
            className='text-gray-700 focus:outline-none p-2'>
            <i className='fas fa-bars text-xl' />
          </button>
        </div>
      </div>

      {/* 折叠菜单面板 */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex flex-col items-center pt-20 px-6 space-y-6 text-lg transition-all duration-300 overflow-y-auto bg-black dark:bg-white text-white dark:text-black'>
          {/* 标题栏 */}
          <div className='absolute top-0 left-0 right-0 bg-white border-b py-4 px-6 flex justify-between items-center dark:bg-black dark:border-hexo-black-gray'>
            <span className='font-bold'>{locale.COMMON.MENU}</span>
            <button onClick={() => setIsOpen(false)} className='text-gray-700'>
              <i className='fas fa-times text-xl' />
            </button>
          </div>

          {/* 菜单项 */}
          <ul className='w-full space-y-4 mt-16'>
            {links.map((link, index) => (
              <li key={index} className='w-full'>
                <MenuItemDrop link={link} />
              </li>
            ))}
          </ul>
        </div>
      )}

      
    </nav>
  )
}