import { Home } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import MenuGroup from './LogoMenuGroup'
import MenuItem from './LogoMenuItem'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import Image from 'next/image'
import { useState,useRef } from 'react'

const menuData = [
  {
    title: "博客",
    items: [
      {
        href: "https://zhheo.com/",
        title: "访问主页",
        target: "_blank",
        rel: "external nofollow",
        iconSrc: "https://p.zhheo.com/20232e121c3fb2daa71897d26a515e030f49073402.png!cover_mini",
        alt: "主页图标",
        text: "主页"
      },
      {
        href: "/",
        title: "访问博客",
        target: "_self",
        iconSrc: "https://p.zhheo.com/20234681e06b8e086aa5b15481cb89fd38c7071002.png!cover_mini",
        alt: "博客图标",
        text: "博客"
      },
      {
        href: "https://plog.zhheo.com/",
        title: "访问图片博客",
        target: "_blank",
        rel: "external nofollow",
        iconSrc: "https://p.zhheo.com/20236a16354d7c333cc7595efaee4b8c5667074602.png!cover_mini",
        alt: "图片博客图标",
        text: "图片博客"
      },
      {
        href: "https://bbs.zhheo.com/",
        title: "访问HeoBBS",
        target: "_blank",
        rel: "external nofollow",
        iconSrc: "https://p.zhheo.com/ALLFXg25490881723790334420.png!cover_mini",
        alt: "HeoBBS图标",
        text: "HeoBBS"
      }
    ]
  },
  {
    title: "应用",
    items: [
      {
        href: "/p/671f98c8.html",
        title: "访问敲木鱼",
        target: "_self",
        iconSrc: "https://p.zhheo.com/20238366720da498fb5755e8c714128097fc074102.png!cover_mini",
        alt: "敲木鱼图标",
        text: "敲木鱼"
      },
      {
        href: "https://apps.apple.com/cn/app/dns%E6%B5%8B%E9%80%9F/id6470105015",
        title: "访问DNS测速",
        target: "_blank",
        rel: "external nofollow",
        iconSrc: "https://p.zhheo.com/xnbgWd22890381711434808769.png!cover_mini",
        alt: "DNS测速图标",
        text: "DNS测速"
      },
      {
        href: "/p/4db484b3.html",
        title: "访问轻节食",
        target: "_self",
        iconSrc: "https://p.zhheo.com/20234f148f46262a7b29a22d617eef8afe1b075002.png!cover_mini",
        alt: "轻节食图标",
        text: "轻节食"
      },
      {
        href: "/p/a170ac02.html",
        title: "访问DelSpace",
        target: "_self",
        iconSrc: "https://p.zhheo.com/2023e5a7bc74e6fa27400c4a15dbaafeead7070002.png!cover_mini",
        alt: "DelSpace图标",
        text: "DelSpace"
      },
      {
        href: "/p/9df485ea.html",
        title: "访问比例计",
        target: "_self",
        iconSrc: "https://p.zhheo.com/20238814e8e0a0af915c47e3d91e001127f6071302.png!cover_mini",
        alt: "比例计图标",
        text: "比例计"
      },
      {
        href: "/p/1b0d95ef.html",
        title: "访问摸鱼",
        target: "_self",
        iconSrc: "https://p.zhheo.com/20239c4796c9958a3fe54f7d1aabfecdc352072402.png!cover_mini",
        alt: "摸鱼图标",
        text: "摸鱼"
      }
    ]
  },
  {
    title: "服务",
    items: [
      {
        href: "https://postchat.zhheo.com/",
        title: "访问洪墨AI",
        target: "_blank",
        rel: "external nofollow",
        iconSrc: "https://p.zhheo.com/EOjpsa22490781720592484600.png!cover_mini",
        alt: "洪墨AI图标",
        text: "洪墨AI"
      },
      {
        href: "https://music.zhheo.com/?id=8668419170&amp;server=tencent",
        title: "访问HeoMusic",
        target: "_blank",
        rel: "external nofollow",
        iconSrc: "https://p.zhheo.com/jcwF4v20890381678676288724.webp!cover_mini",
        alt: "HeoMusic图标",
        text: "HeoMusic"
      },
      {
        href: "https://wechat.zhheo.com/",
        title: "访问公众号",
        target: "_blank",
        rel: "external nofollow",
        iconSrc: "https://p.zhheo.com/202319c8ac4827b3c198908bfebf6867d971074702.png!cover_mini",
        alt: "公众号图标",
        text: "公众号"
      },
      {
        href: "https://icon.zhheo.com/",
        title: "访问应用图标库",
        target: "_blank",
        rel: "external nofollow",
        iconSrc: "https://p.zhheo.com/202300b4b458642ccff4f63554897fffbb83075702.png!cover_mini",
        alt: "应用图标库图标",
        text: "应用图标库"
      }
    ]
  },
  {
    title: "表情",
    items: [
      {
        href: "/p/2daa6a7b.html",
        title: "访问Heo",
        target: "_self",
        iconSrc: "https://p.zhheo.com/2023af0657c4847e2b4ebc558f382ca5119c073402.png!cover_mini",
        alt: "Heo图标",
        text: "Heo"
      },
      {
        href: "/p/5115d869.html",
        title: "访问熊猫二憨",
        target: "_self",
        iconSrc: "https://p.zhheo.com/2023ce09680d1c1b2c334a6f832a7db9336f074402.png!cover_mini",
        alt: "熊猫二憨图标",
        text: "熊猫二憨"
      }
    ]
  }
]



const Logo = props => {
  const { siteInfo } = props
  const [isOpen, changeIsOpen] = useState(false)
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null) // 记录选中的 MenuGroup 索引
  const menuRef = useRef(null) // 用于引用 MenuGroup 的容器
  const timeoutRef = useRef(null) // 用于存储定时器

  const toggleOpenSubMenu = (open) => {
    changeIsOpen(open)
  }

  const handleMouseEnterLogo = () => {
    clearTimeout(timeoutRef.current) // 清除之前的定时器
    toggleOpenSubMenu(true) // 打开 MenuGroup
  }

  const handleMouseLeaveLogo = () => {
    // 设置延迟关闭的定时器
    timeoutRef.current = setTimeout(() => {
      toggleOpenSubMenu(false) // 关闭 MenuGroup
    }, 300) // 300ms 延迟
  }

  const handleMouseEnterMenu = () => {
    clearTimeout(timeoutRef.current) // 清除定时器，防止关闭
  }

  const handleMouseLeaveMenu = () => {
    // 设置延迟关闭的定时器
    timeoutRef.current = setTimeout(() => {
      toggleOpenSubMenu(false) // 关闭 MenuGroup
    }, 300) // 300ms 延迟
  }

  const handleMenuItemHover = (groupIndex) => {
    setSelectedGroupIndex(groupIndex) // 更新选中的 MenuGroup 索引
  }

  return (
    <>
      <div className='relative'>
        <div
          className='cursor-pointer'
          onMouseEnter={handleMouseEnterLogo}
          onMouseLeave={handleMouseLeaveLogo}
        >
          <LazyImage
            src={siteInfo?.icon}
            width={24}
            height={24}
            alt={siteConfig('AUTHOR')}
            className='mr-4 hidden md:block'
          />
        </div>
        <div
          ref={menuRef}
          className={`absolute top-12 origin-top-left left-0 bg-white/85 rounded-xl border border-[#e3e8f7] hover:border-indigo-600 flex flex-col text-xs text-[rgba(60,60,67,0.8)] shadow-[0_8px_16px_-4px_rgba(44,45,48,0.05)] transition-all duration-300 backdrop-blur-[20px] overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeaveMenu}
        >
          {menuData.map((group, groupIndex) => (
            <div
              key={groupIndex}
              onMouseEnter={() => handleMenuItemHover(groupIndex)}
              onMouseLeave={() => handleMenuItemHover(null)}
            >
              <MenuGroup
                title={group.title}
                text_color={selectedGroupIndex === groupIndex ? 'text-indigo-600' : 'text-black'}
              >
                {group.items.map((item, idx) => (
                  <MenuItem
                    key={idx}
                    href={item.href}
                    title={item.title}
                    target={item.target}
                    rel={item.rel}
                    iconSrc={item.iconSrc}
                    alt={item.alt}
                    text={item.text}
                  />
                ))}
              </MenuGroup>
            </div>
          ))}

          {/* 底部按钮 */}
          <Link
            href="https://zhheo.com/"
            rel="external nofollow"
            target="_blank"
            className="flex rounded-xl items-center justify-center gap-2 text-sm leading-none py-2 px-3 mx-2 mt-1 mb-2 bg-white hover:bg-indigo-600 border border-solid border-[#e3e8f7] text-black font-bold hover:text-white"
          >
            <Image
              src="https://p.zhheo.com/8DSTSS20990281646044689944.PNG!cover_mini"
              alt="返回主站图标"
              width={24}
              height={24}
              className="rounded-full entered loading"
            />
            <span className="">更多我的项目</span>
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
//   const toggleOpenSubMenu = () => {
//     changeIsOpen(!isOpen)
//   }
//   const handleMenuItemHover = (groupIndex) => {
//     setSelectedGroupIndex(groupIndex) // 更新选中的 MenuGroup 索引
//   }

//   return (
//     <>
//       <div className='relative'>
//         <div className='cursor-pointer'
//           onMouseEnter={toggleOpenSubMenu}
//           onMouseLeave={toggleOpenSubMenu}>
//           <LazyImage
//             src={siteInfo?.icon}
//             width={24}
//             height={24}
//             alt={siteConfig('AUTHOR')}
//             className='mr-4 hidden md:block'
//           />
//         </div>
//         <div className={`absolute top-12 origin-top-left left-0 bg-white/85 rounded-xl border border-[#e3e8f7] hover:border-indigo-600 flex flex-col text-xs text-[rgba(60,60,67,0.8)] shadow-[0_8px_16px_-4px_rgba(44,45,48,0.05)] transition-all duration-300 backdrop-blur-[20px] overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
         

//           {menuData.map((group, groupIndex) => (
//             <div onMouseEnter={() => handleMenuItemHover(groupIndex)}
//               onMouseLeave={() => handleMenuItemHover(null)}>
//               <MenuGroup
//                 key={groupIndex}
//                 title={group.title}
//                 text_color={selectedGroupIndex === groupIndex ? 'text-indigo-600' : 'text-black'}>
//                 {group.items.map((item, idx) => (
//                   <MenuItem
//                     key={idx}
//                     href={item.href}
//                     title={item.title}
//                     target={item.target}
//                     rel={item.rel}
//                     iconSrc={item.iconSrc}
//                     alt={item.alt}
//                     text={item.text}
//                   />
//                 ))}
//               </MenuGroup>
//             </div>
//           ))}

//           {/* 底部按钮 */}
//           <Link
//             href="https://zhheo.com/"
//             rel="external nofollow"
//             target="_blank"
//             className="flex rounded-xl items-center justify-center gap-2 text-sm leading-none py-2 px-3 mx-2 mt-1 mb-2 bg-white hover:bg-indigo-600 border border-solid border-[#e3e8f7] text-black font-bold hover:text-white"
//           >
//             <Image
//               src="https://p.zhheo.com/8DSTSS20990281646044689944.PNG!cover_mini"
//               alt="返回主站图标"
//               width={24}
//               height={24}
//               className="rounded-full entered loading"
//             />
//             <span className="">更多我的项目</span>
//           </Link>
//         </div>
//       </div>
//       <Link href='/' passHref legacyBehavior>
//         <div className='flex flex-nowrap items-center cursor-pointer font-extrabold'>
//           <div id='logo-text' className='group rounded-2xl flex-none relative'>
//             <div className='logo group-hover:opacity-0 opacity-100 visible group-hover:invisible text-lg my-auto rounded dark:border-white duration-200'>
//               {siteConfig('TITLE')}
//             </div>
//             <div data-tip='返回博客主页' className='flex justify-center rounded-2xl group-hover:bg-indigo-600 w-full group-hover:opacity-100 opacity-0 invisible group-hover:visible absolute top-0 py-1 duration-200'>
//               <Home className={'w-6 h-6 stroke-white stroke-2 '} />
//             </div>
//           </div>
//         </div>
//       </Link>
//     </>
//   )
// }
// export default Logo
