import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import CopyRightDate from '@/components/CopyRightDate'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'
import SocialButton from './SocialButton'
import FooterGroup from './FooterGroup'
/**
 * 页脚
 * @returns
 */
const Footer = () => {
  const BEI_AN = siteConfig('BEI_AN')
  const BIO = siteConfig('BIO')
  const footerGroups = [
    {
      title: '软件',
      links: [
        { href: '/p/671f98c8.html', title: '敲木鱼', text: '敲木鱼', target: '_blank', rel: 'noopener external nofollow noreferrer' },
        { href: '/p/4db484b3.html', title: '轻节食', text: '轻节食', target: '_blank', rel: 'noopener external nofollow noreferrer' },
        { href: '/p/cb61a64e.html', title: 'PostChat', text: 'PostChat', target: '_blank', rel: 'noopener external nofollow noreferrer' },
        { href: '/p/9df485ea.html', title: '比例计', text: '比例计', target: '_blank', rel: 'noopener external nofollow noreferrer' },
      ],
    },
    {
      title: '产品',
      links: [
        { href: '/tags/%E8%AE%BE%E8%AE%A1%E6%8A%A5%E5%91%8A/', title: '设计报告', text: '设计报告', target: '_blank', rel: 'noopener external nofollow noreferrer' },
        { href: '/tags/%E4%BA%A7%E5%93%81/', title: '优质报告', text: '优质报告', target: '_blank', rel: 'noopener external nofollow noreferrer' },
      ],
    },
    // 其他分组数据...
  ]
  return (
    <footer className='relative flex-shrink-0 bg-white dark:bg-[#1a191d] justify-center text-center m-auto w-full leading-6  text-gray-600 dark:text-gray-100 text-sm'>
      {/* 颜色过度区 */}
      <div
        id='color-transition'
        className='h-32 bg-gradient-to-b from-[#f7f9fe] to-white  dark:bg-[#1a191d] dark:from-inherit dark:to-inherit'
      />

      {/* 社交按钮 */}
      <div className='w-full h-24'>
        <SocialButton />
      </div>

      {/* 导航分组 */}

      <div id="heo-footer"  className="flex flex-wrap justify-between p-5 bg-withe dark:bg-[#21232A]">
        {footerGroups.map((group, index) => (
          <FooterGroup key={index} title={group.title} links={group.links} />
        ))}
      </div>

      <br />

      {/* 底部页面信息 */}
      <div
        id='footer-bottom'
        className='w-full h-20 flex flex-col p-3 lg:flex-row justify-between px-6 items-center bg-[#f1f3f7] dark:bg-[#21232A] border-t dark:border-t-[#3D3D3F]'>
        <div id='footer-bottom-left' className='text-center lg:text-start'>
          <PoweredBy />
          <div className='flex gap-x-1'>
            <CopyRightDate />
            <a
              href={'/about'}
              className='underline font-semibold dark:text-gray-300 '>
              {siteConfig('AUTHOR')}
            </a>
            {BIO && <span className='mx-1'> | {BIO}</span>}
          </div>
        </div>

        <div id='footer-bottom-right'>
          {BEI_AN && (
            <>
              <i className='fas fa-shield-alt' />{' '}
              <a href='https://beian.miit.gov.cn/' className='mr-2'>
                {siteConfig('BEI_AN')}
              </a>
            </>
          )}
          <BeiAnGongAn />

          <span className='hidden busuanzi_container_site_pv'>
            <i className='fas fa-eye' />
            <span className='px-1 busuanzi_value_site_pv'> </span>{' '}
          </span>
          <span className='pl-2 hidden busuanzi_container_site_uv'>
            <i className='fas fa-users' />{' '}
            <span className='px-1 busuanzi_value_site_uv'> </span>{' '}
          </span>

          {/* <h1 className='text-xs pt-4 text-light-400 dark:text-gray-400'>{title} {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}</h1> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
