import { Home } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'

const Logo = props => {
  const { siteInfo } = props
  return (
    <>
      <div className='group relative'>
        <div className='cursor-pointer'>
          <LazyImage
            src={siteInfo?.icon}
            width={24}
            height={24}
            alt={siteConfig('AUTHOR')}
            className='mr-4 hidden md:block'
          />
        </div>
        <div className='absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-200'>
          <Link href="/blog" className='block p-2 hover:bg-gray-100'>博客</Link>
          <Link href="/projects" className='block p-2 hover:bg-gray-100'>项目</Link>
          <Link href="/about" className='block p-2 hover:bg-gray-100'>关于</Link>
        </div>
      </div>
      <Link href='/' passHref legacyBehavior>
        <div className='flex flex-nowrap items-center cursor-pointer font-extrabold'>
          <div id='logo-text' className='group rounded-2xl flex-none relative'>
            <div className='logo group-hover:opacity-0 opacity-100 visible group-hover:invisible text-lg my-auto rounded dark:border-white duration-200'>
              {siteConfig('TITLE')}
            </div>
            <div data-tip='返回博客主页' className='flex justify-center rounded-2xl group-hover:bg-indigo-600 w-full group-hover:opacity-100 opacity-0 invisible group-hover:visible absolute top-0 py-1 duration-200'>
              <Home className={'w-6 h-6 stroke-white stroke-2 '} />
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
export default Logo
