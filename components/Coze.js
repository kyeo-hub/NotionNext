import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

/**
 * Coze-AI机器人
 * @returns
 */

const fetchToken = async () => {
  try {
    const response = await fetch('/api/auth/coze')
    const data = await response.json()
    return data.token
  }catch (error) {
    console.error('Failed to fetch token:', error)
  }
}
export default function Coze() {
  const cozeSrc = siteConfig(
    'COZE_SRC_URL',
    'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.6/libs/cn/index.js'
  )
  const title = siteConfig('COZE_TITLE', 'NotionNext助手')
  const botId = siteConfig('COZE_BOT_ID')
  const company_url = siteConfig('COZE_COMPANY_URL', 'https://kyeo.top')
  const company_icon = siteConfig('COZE_COMPANY_ICON', 'https://kyeo.top/assets/images/0.png')
  const user_avatar = siteConfig('COZE_USER_AVATARA','https://gallerystatic.vivo.com.cn/HOPcey2rug8vvl0V/20240416/feee19d26cc6b5f87d46c99a2a961ffa.jpg')
  const loadCoze = async () => {
    await loadExternalResource(cozeSrc)
    const access_token = await fetchToken()
    const CozeWebSDK = window?.CozeWebSDK
    if (CozeWebSDK) {
      const cozeClient = new CozeWebSDK.WebChatClient({
        config: {
          bot_id: botId
        },
        auth: {
          type: 'token',
          token: access_token,
          onRefreshToken: async () => access_token,
        },
        userInfo: {
          id: 'user',
          url: user_avatar,
          nickname: '我',
        },
        ui: {
          base: {
            icon: company_icon,
            layout: 'pc',
            lang: 'zh-CN',
            zIndex: 1000,
          },
          chatBot: {
            title: title,
            uploadable: true,
            width: 300
          },
          asstBtn: {
            isNeed: true,
          },
          footer: {
            isShow: true,
            expressionText: 'Powered by {{company}}',
            linkvars: {
              company: {
                text: title,
                link: company_url
              }
            }
          }
        }

      })
      console.log('coze', cozeClient)
    }
  }

  useEffect(() => {
    if (!botId) {
      return
    }
    loadCoze()
  }, [])
  return <></>
}
