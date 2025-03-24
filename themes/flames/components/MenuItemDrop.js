import Link from 'next/link'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0
  // 在组件中添加防抖状态
  let timeoutId;

  // 修改事件处理函数
  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    changeShow(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => changeShow(false), 150); // 150ms 延迟
  };

  if (!link || !link.show) {
    return null
  }

  return (
    <div
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
      className="relative mx-1 flex flex-col items-center">

      {/* 不含子菜单 */}
      {!hasSubMenu && (
        <Link
          target={link?.target}
          href={link?.href}
          className=' hover:bg-indigo-600 hover:text-white rounded-full flex justify-center items-center px-3 py-1 no-underline tracking-widest transition duration-300 ease-in-out'>
          {link?.icon && <i className={link?.icon} />} {link?.name}
        </Link>
      )}
      {/* 含子菜单的按钮 */}
      {hasSubMenu && (
        <>
          <div className={`cursor-pointer  ${show ? 'bg-indigo-600 text-white' : ''} hover:bg-indigo-600 hover:text-white rounded-full flex justify-center items-center px-3 py-1 no-underline tracking-widest transition duration-300 ease-in-out`}>
            {link?.icon && <i className={link?.icon} />} {link?.name}
          </div>
        </>
      )}
      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          className={`
            ${show ? 'visible opacity-100 top-14 scale-100' : 'invisible opacity-0 top-0 scale-0'}
            rounded-full border bg-indigo-600 bg-white/90 backdrop-blur-3xl
            absolute z-20 px-3 py-2 mx-8
            left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-800 ease-in-out
          `}>
          {link.subMenus.map((sLink, index) => {
            return (
              <li
                key={index}
                className='cursor-pointer hover:bg-indigo-600 dark:hover:bg-yellow-600 hover:text-white text-gray-900 dark:text-gray-100 tracking-widest transition-transform duration-200 scale-100 hover:scale-105 inline-flex rounded-full px-3 py-1'>
                <Link href={sLink.href} target={link?.target}>
                  <span className='text-sm text-nowrap font-extralegal'>
                    {link?.icon && <i className={link?.icon}> &nbsp; </i>}
                    {sLink.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
