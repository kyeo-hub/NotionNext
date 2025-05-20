import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData, getPost } from '@/lib/db/getSiteData'
import { checkSlugHasMorThanTwoSlash, processPostData } from '@/lib/utils/post'
import { idToUuid } from 'notion-utils'
// import Slug from '..'
import useNotification from '@/components/Notification'
import OpenWrite from '@/components/OpenWrite'
import { useGlobal } from '@/lib/global'
import { getPageTableOfContents } from '@/lib/notion/getPageTableOfContents'
import { getPasswordQuery } from '@/lib/password'
import { DynamicLayout } from '@/themes/theme'
import md5 from 'js-md5'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Slug = props => {
    const { post } = props
    const router = useRouter()
    const { locale } = useGlobal()

    // 文章锁🔐
    const [lock, setLock] = useState(post?.password && post?.password !== '')
    const { showNotification, Notification } = useNotification()

    /**
     * 验证文章密码
     * @param {*} passInput
     */
    const validPassword = passInput => {
        if (!post) {
            return false
        }
        const encrypt = md5(post?.slug + passInput)
        if (passInput && encrypt === post?.password) {
            setLock(false)
            // 输入密码存入localStorage，下次自动提交
            localStorage.setItem('password_' + router.asPath, passInput)
            showNotification(locale.COMMON.ARTICLE_UNLOCK_TIPS) // 设置解锁成功提示显示
            return true
        }
        return false
    }

    // 文章加载
    useEffect(() => {
        // 文章加密
        if (post?.password && post?.password !== '') {
            setLock(true)
        } else {
            setLock(false)
        }

        // 读取上次记录 自动提交密码
        const passInputs = getPasswordQuery(router.asPath)
        if (passInputs.length > 0) {
            for (const passInput of passInputs) {
                if (validPassword(passInput)) {
                    break // 密码验证成功，停止尝试
                }
            }
        }
    }, [post])

    // 文章加载
    useEffect(() => {
        if (lock) {
            return
        }
        // 文章解锁后生成目录与内容
        if (post?.blockMap?.block) {
            post.content = Object.keys(post.blockMap.block).filter(
                key => post.blockMap.block[key]?.value?.parent_id === post.id
            )
            post.toc = getPageTableOfContents(post, post.blockMap)
        }
    }, [router, lock])

    props = { ...props, lock, validPassword }
    const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
    return (
        <>
            {/* 文章布局 */}
            <DynamicLayout theme={theme} layoutName='LayoutProject' {...props} />
            {/* 解锁密码提示框 */}
            {post?.password && post?.password !== '' && !lock && <Notification />}
            {/* 导流工具 */}
            <OpenWrite />
        </>
    )
}

/**
 * 根据notion的slug访问页面
 * 解析三级以上目录 /article/2023/10/29/test
 * @param {*} props
 * @returns
 */
const PrefixSlug = props => {
  return <Slug {...props} />
}

/**
 * 编译渲染页面路径
 * @returns
 */
export async function getStaticPaths() {
  if (!BLOG.isProd) {
    return {
      paths: [],
      fallback: true
    }
  }

  const from = 'slug-paths'
  const { allPages } = await getGlobalData({ from })
  const paths = allPages
    ?.filter(row => checkSlugHasMorThanTwoSlash(row))
    .map(row => ({
      params: {
        prefix: row.slug.split('/')[0],
        slug: row.slug.split('/')[1],
        suffix: row.slug.split('/').slice(2)
      }
    }))
  return {
    paths: paths,
    fallback: true
  }
}

/**
 * 抓取页面数据
 * @param {*} param0
 * @returns
 */
export async function getStaticProps({
  params: { prefix, slug, suffix },
  locale
}) {
  const fullSlug = prefix + '/' + slug + '/' + suffix.join('/')
  const from = `slug-props-${fullSlug}`
  const props = await getGlobalData({ from, locale })

  // 在列表内查找文章
  props.post = props?.allPages?.find(p => {
    return (
      p.type.indexOf('Menu') < 0 &&
      (p.slug === suffix ||
        p.slug === fullSlug.substring(fullSlug.lastIndexOf('/') + 1) ||
        p.slug === fullSlug ||
        p.id === idToUuid(fullSlug))
    )
  })

  // 处理非列表内文章的内信息
  if (!props?.post) {
    const pageId = fullSlug.slice(-1)[0]
    if (pageId.length >= 32) {
      const post = await getPost(pageId)
      props.post = post
    }
  }

  if (!props?.post) {
    // 无法获取文章
    props.post = null
  } else {
    await processPostData(props, from)
  }
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

export default PrefixSlug
