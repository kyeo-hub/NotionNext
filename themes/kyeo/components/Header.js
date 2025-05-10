import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import Image from 'next/image'

/**
 * 网站顶部
 * LOGO 和 菜单
 * @returns
 */
export const Header = props => {
  return (
    <header className='w-full px-6 bg-black dark:bg-white text-white dark:text-black relative z-20'>
        <Link
          href='/'
          className='logo py-6 w-full md:text-left md:w-auto text-gray-dark no-underline flex items-center'>
            <Image
              src={siteConfig('EXAMPLE_BLOG_AVATAR', '/avatar.png')}
              alt='avatar'
              width={72}
              height={72}
              className='rounded-full'
            />
          {siteConfig('TITLE')}
        </Link>
    </header>
  )
}
