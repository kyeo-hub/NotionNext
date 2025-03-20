import Link from 'next/link'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0
  // const newStyleProps = {
  //   padding: '6px 3.5px',
  //   borderRadius: '100px',
  //   backgroundColor: 'rgba(255,255,255,0.1)',
  //   boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  //   border: '1px solid #e3e8f7',
  //   transition: '0.3s',
  //   top: '35px',
  //   position: 'absolute',
  //   marginTop: '8px',
  //   whiteSpace: 'nowrap',
  //   opacity: show ? 1 : 0, // 2. 动态控制透明度替代原opacity切换
  //   transform: show
  //     ? 'translateY(0) scale(1)'
  //     : 'translateY(-10px) scale(0.8)'
  // }

  if (!link || !link.show) {
    return null
  }

  return (
    <div
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {/* 不含子菜单 */}
      {!hasSubMenu && (
        <Link
          target={link?.target}
          href={link?.href}
          className=' hover:bg-blue-600 hover:text-white rounded-full flex justify-center items-center px-3 py-1 no-underline tracking-widest'>
          {link?.icon && <i className={link?.icon} />} {link?.name}
        </Link>
      )}
      {/* 含子菜单的按钮 */}
      {hasSubMenu && (
        <>
          <div className='cursor-pointer  hover:bg-blue-600 hover:text-white rounded-full flex justify-center items-center px-3 py-1 no-underline tracking-widest'>
            {link?.icon && <i className={link?.icon} />} {link?.name}
          </div>
        </>
      )}
      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          // style={{
          //   // 优先使用新样式
          //   ...newStyleProps,
          //   // 保留原模糊效果控制
          //   backdropFilter: 'blur(20px)',
          //   WebkitBackdropFilter: 'blur(20px)',
          // }}
          // 合并类名处理
          className={`
    ${show ? 'opacity-100 scale-100 translateY-0' : 'opacity-0 scale-90 translateY--10'}
    rounded-full border border-blue-600 bg-opacity-10 backdrop-blur-md
    transition-all duration-300 absolute z-20 px-6 py-2
    top-9 mt-2 whitespace-nowrap
  `}>

          {link.subMenus.map((sLink, index) => {
            return (
              <li
                key={index}
                className='cursor-pointer hover:bg-blue-600 dark:hover:bg-yellow-600 hover:text-white text-gray-900 dark:text-gray-100 tracking-widest transition-all duration-200 inline-flex rounded-full my-0  mx-1'>
                <Link href={sLink.href} target={link?.target}>
                  <span className='text-sm text-nowrap font-extralight'>
                    {link?.icon && <i className={sLink?.icon}> &nbsp; </i>}
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
