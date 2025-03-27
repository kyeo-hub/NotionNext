import { Home } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import MenuGroup from './LogoMenuGroup'
import MenuItem from './LogoMenuItem'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'



const Logo = props => {
  const { siteInfo } = props
  const [isOpen, changeIsOpen] = useState(false)
  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen)
    console.log(isOpen)
  }

  return (
    <>
      <div className='relative'>
        <div className='cursor-pointer' 
            onClick={toggleOpenSubMenu}>
          <LazyImage
            src={siteInfo?.icon}
            width={24}
            height={24}
            alt={siteConfig('AUTHOR')}
            className='mr-4 hidden md:block'
          />
        </div>
          <div className={`absolute top-8 origin-top-left left-0 bg-white/85 rounded-xl border border-[#e3e8f7] hover:border-indigo-600 flex flex-col text-xs text-[rgba(60,60,67,0.8)] shadow-[0_8px_16px_-4px_rgba(44,45,48,0.05)] transition-all duration-300 backdrop-blur-[20px] overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {/* <div className='absolute top-[45px] left-0 bg-white shadow-lg rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-200'>
        absolute top-[2.81rem] left-[1.50rem] bg-white opacity-85 rounded-xl flex-col text-xs text-var(--heo-secondtext) opacity-0 backdrop-blur-[20px] */}
            {/* 博客部分 */}
            <MenuGroup title="博客">
              <MenuItem
                href="https://zhheo.com/"
                title="访问主页"
                target="_blank"
                rel="external nofollow"
                iconSrc="https://p.zhheo.com/20232e121c3fb2daa71897d26a515e030f49073402.png!cover_mini"
                alt="主页图标"
                text="主页"
              />
              <MenuItem
                href="/"
                title="访问博客"
                target="_self"
                iconSrc="https://p.zhheo.com/20234681e06b8e086aa5b15481cb89fd38c7071002.png!cover_mini"
                alt="博客图标"
                text="博客"
              />
              <MenuItem
                href="https://plog.zhheo.com/"
                title="访问图片博客"
                target="_blank"
                rel="external nofollow"
                iconSrc="https://p.zhheo.com/20236a16354d7c333cc7595efaee4b8c5667074602.png!cover_mini"
                alt="图片博客图标"
                text="图片博客"
              />
              <MenuItem
                href="https://bbs.zhheo.com/"
                title="访问HeoBBS"
                target="_blank"
                rel="external nofollow"
                iconSrc="https://p.zhheo.com/ALLFXg25490881723790334420.png!cover_mini"
                alt="HeoBBS图标"
                text="HeoBBS"
              />
            </MenuGroup>

            {/* 应用部分 */}
            <MenuGroup title="应用">
              <MenuItem
                href="/p/671f98c8.html"
                title="访问敲木鱼"
                target="_self"
                iconSrc="https://p.zhheo.com/20238366720da498fb5755e8c714128097fc074102.png!cover_mini"
                alt="敲木鱼图标"
                text="敲木鱼"
              />
              <MenuItem
                href="https://apps.apple.com/cn/app/dns%E6%B5%8B%E9%80%9F/id6470105015"
                title="访问DNS测速"
                target="_blank"
                rel="external nofollow"
                iconSrc="https://p.zhheo.com/xnbgWd22890381711434808769.png!cover_mini"
                alt="DNS测速图标"
                text="DNS测速"
              />
              <MenuItem
                href="/p/4db484b3.html"
                title="访问轻节食"
                target="_self"
                iconSrc="https://p.zhheo.com/20234f148f46262a7b29a22d617eef8afe1b075002.png!cover_mini"
                alt="轻节食图标"
                text="轻节食"
              />
              <MenuItem
                href="/p/a170ac02.html"
                title="访问DelSpace"
                target="_self"
                iconSrc="https://p.zhheo.com/2023e5a7bc74e6fa27400c4a15dbaafeead7070002.png!cover_mini"
                alt="DelSpace图标"
                text="DelSpace"
              />
              <MenuItem
                href="/p/9df485ea.html"
                title="访问比例计"
                target="_self"
                iconSrc="https://p.zhheo.com/20238814e8e0a0af915c47e3d91e001127f6071302.png!cover_mini"
                alt="比例计图标"
                text="比例计"
              />
              <MenuItem
                href="/p/1b0d95ef.html"
                title="访问摸鱼"
                target="_self"
                iconSrc="https://p.zhheo.com/20239c4796c9958a3fe54f7d1aabfecdc352072402.png!cover_mini"
                alt="摸鱼图标"
                text="摸鱼"
              />
            </MenuGroup>

            {/* 服务部分 */}
            <MenuGroup title="服务">
              <MenuItem
                href="https://postchat.zhheo.com/"
                title="访问洪墨AI"
                target="_blank"
                rel="external nofollow"
                iconSrc="https://p.zhheo.com/EOjpsa22490781720592484600.png!cover_mini"
                alt="洪墨AI图标"
                text="洪墨AI"
              />
              <MenuItem
                href="https://music.zhheo.com/?id=8668419170&amp;server=tencent"
                title="访问HeoMusic"
                target="_blank"
                rel="external nofollow"
                iconSrc="https://p.zhheo.com/jcwF4v20890381678676288724.webp!cover_mini"
                alt="HeoMusic图标"
                text="HeoMusic"
              />
              <MenuItem
                href="https://wechat.zhheo.com/"
                title="访问公众号"
                target="_blank"
                rel="external nofollow"
                iconSrc="https://p.zhheo.com/202319c8ac4827b3c198908bfebf6867d971074702.png!cover_mini"
                alt="公众号图标"
                text="公众号"
              />
              <MenuItem
                href="https://icon.zhheo.com/"
                title="访问应用图标库"
                target="_blank"
                rel="external nofollow"
                iconSrc="https://p.zhheo.com/202300b4b458642ccff4f63554897fffbb83075702.png!cover_mini"
                alt="应用图标库图标"
                text="应用图标库"
              />
            </MenuGroup>

            {/* 表情部分 */}
            <MenuGroup title="表情">
              <MenuItem
                href="/p/2daa6a7b.html"
                title="访问Heo"
                target="_self"
                iconSrc="https://p.zhheo.com/2023af0657c4847e2b4ebc558f382ca5119c073402.png!cover_mini"
                alt="Heo图标"
                text="Heo"
              />
              <MenuItem
                href="/p/5115d869.html"
                title="访问熊猫二憨"
                target="_self"
                iconSrc="https://p.zhheo.com/2023ce09680d1c1b2c334a6f832a7db9336f074402.png!cover_mini"
                alt="熊猫二憨图标"
                text="熊猫二憨"
              />
            </MenuGroup>

            {/* 底部按钮 */}
            <Link
              href="https://zhheo.com/"
              rel="external nofollow"
              target="_blank"
              className="back-menu-bottom-btn"
            >
              <Image
                src="https://p.zhheo.com/8DSTSS20990281646044689944.PNG!cover_mini"
                alt="返回主站图标"
                width={24}
                height={24}
                className="back-menu-bottom-btn-icon entered loading"
              />
              <span className="back-menu-bottom-btn-text">更多我的项目</span>
            </Link>
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
