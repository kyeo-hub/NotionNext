import Link from 'next/link'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  const toggleMenu = () => {
    if (hasSubMenu) {
      changeShow(!show)
    }
  }

  return (
    <ul>
      <li
        className='cursor-pointer'
        onMouseOver={() => hasSubMenu && changeShow(true)}
        onMouseOut={() => hasSubMenu && changeShow(false)}
        onClick={toggleMenu}
        role="menuitem"
        tabIndex={0}
        aria-haspopup={hasSubMenu}
        aria-expanded={hasSubMenu ? show : undefined}>
        {!hasSubMenu && (
          <div className='rounded px-2 md:pl-0 md:mr-3 my-4 md:pr-3 text-white dark:text-black no-underline'>
            <Link href={link?.href} target={link?.target}>
              {link?.icon && <i className={link?.icon} />} {link?.name}
              {hasSubMenu && <i className='px-2 fa fa-angle-down'></i>}
            </Link>
          </div>
        )}

        {hasSubMenu && (
          <div className='rounded px-2 md:pl-0 md:mr-3 my-4 md:pr-3 text-gray-700 dark:text-gray-200 no-underline flex justify-between items-center'>
            {link?.icon && <i className={link?.icon} />} {link?.name}
            <i
              className={`fas fa-chevron-down duration-500 transition-all ${show ? ' rotate-180' : ''}`}
            />
          </div>
        )}

        {hasSubMenu && (
          <ul
            className={`${
              show ? 'scale-y-100 opacity-100 top-12' : 'scale-y-0 opacity-0 top-10'
            } border-gray-100 bg-white dark:bg-black dark:border-gray-800 transition-all duration-300 z-20 absolute block drop-shadow-lg transform origin-top`}>
            {link.subMenus.map((sLink, idx) => (
              <li
                key={sLink.id || idx}
                className='not:last-child:border-b-0 border-b text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 tracking-widest transition-all duration-200 dark:border-gray-800 py-3 pr-6 pl-3'>
                <Link href={sLink.href} target={link?.target}>
                  <span className='text-sm text-nowrap font-extralight'>
                    {sLink.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    </ul>
  )
}