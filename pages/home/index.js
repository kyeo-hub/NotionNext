import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'

/**
 * Home页
 * @param {*} props
 * @returns
 */
export default function Item(props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutHome' {...props} />
}

export async function getStaticProps({ locale }) {
  const from = 'category-props'
  let props = await getGlobalData({ from, locale })

  // 提取数据
  const allPages = props.allPages || []

  // 筛选逻辑
  const items = allPages.filter(p => p.type === 'Item' && p.status === 'Published').slice(0, 5)
  const aboutPage = allPages.find(p => p.type === 'Page' && p.slug === 'about') || null
  const firstPost = allPages.find(p => p.type === 'Post' && p.status === 'Published') || null

  while (items.length < 5) {
    items.push(null)
  }
  // 合并成一个数组（最多 5 + 1 + 1 = 7）
  const posts = [
    ...items,
    ...(aboutPage ? [aboutPage] : []),
    ...(firstPost ? [firstPost] : [])
  ]
  // 强制补全到 7 个元素
  while (posts.length < 7) {
    posts.push(null)
  }

  // 赋值给 props.posts
  props.posts = posts

  delete props.allPages

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
        'NEXT_REVALIDATE_SECOND',
        BLOG.NEXT_REVALIDATE_SECOND,
        props.NOTION_CONFIG
      )
  }
}
