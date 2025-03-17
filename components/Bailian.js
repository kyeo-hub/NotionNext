import { siteConfig } from '@/lib/config'
// import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

/**
 * 百炼大模型-WEB机器人
 * @returns
 */

export default function Bailian() {
    const bailianJs = siteConfig(
        'BAILIAN_JS_URL',
        'https://g.alicdn.com/aliyun-documentation/web-chatbot-ui/0.0.24/index.js'
    )
    const bailianCss = siteConfig(
        'BAILIAN_CSS_URL',
        'https://g.alicdn.com/aliyun-documentation/web-chatbot-ui/0.0.24/index.css'
    )
    const title = siteConfig('BAILIAN_TITLE', '百炼大模型')
    const BAILIAN_ENDPOINT = siteConfig('BAILIAN_ENDPOINT', 'http://webchat-bot-41fc.fcv3.1479781705739004.cn-hangzhou.fc.devsapp.net/chat')
    const CHATBOT_CONFIG = {
        endpoint: BAILIAN_ENDPOINT,
        displayByDefault: false, // 默认不显示 AI 助手对话框
        title: title, // 自定义 AI 助手标题
        draggable: true, // 是否开启拖拽
        aiChatOptions: { // 自定义取值参考：https://docs.nlkit.com/nlux/reference/ui/ai-chat#conversation-options
            conversationOptions: { // 自定义取值参考：https://docs.nlkit.com/nlux/reference/ui/ai-chat#conversation-options
                conversationStarters: [
                    { prompt: '推荐一款性价比高的3D避障产品。' },
                    { prompt: '介绍一下视觉SLAM定位导航。' },
                    { prompt: '介绍一下托盘/栈板识别方案。' },
                ]
            },
            displayOptions: { // 自定义取值参考：https://docs.nlkit.com/nlux/reference/ui/ai-chat#display-options
                height: 600,
                // width: 400,
            },
            personaOptions: { // 自定义取值参考：https://docs.nlkit.com/nlux/reference/ui/ai-chat#chat-personas
                assistant: {
                    name: '你好，我是你的 AI 助手',
                    // AI 助手的图标
                    avatar: 'https://img.alicdn.com/imgextra/i2/O1CN01Pda9nq1YDV0mnZ31H_!!6000000003025-54-tps-120-120.apng',
                    tagline: '您可以尝试点击下方的快捷入口开启体验！',
                }
            },
            messageOptions: { // 自定义取值参考：https://docs.nlkit.com/nlux/reference/ui/ai-chat#message-options
                waitTimeBeforeStreamCompletion: 'never'
            }
        },
        dataProcessor: {
            /**
            * 在向后端大模型应用发起请求前改写 Prompt。
            * 比如可以用于总结网页场景，在发送前将网页内容包含在内，同时避免在前端显示这些内容。
            * @param {string} prompt - 用户输入的 Prompt
            * @param {string}  - 改写后的 Prompt
            */
            rewritePrompt(prompt) {
                return prompt;
            }
        }
    }


    useEffect(() => {
        // 创建样式标签
        const styleTag = document.createElement('style')
        styleTag.innerHTML = `
        :root {
            --webchat-toolbar-background-color: #1464E4;
            --webchat-toolbar-text-color: #FFF;
        }
        .webchat-container {
            z-index: 100;
            bottom: 10px;
            right: 150px !important;
        }
        .webchat-bubble-tip {
            display: none !important;
        }
        ._closeButton_z6174_83 {
            display: none !important;
            }
    `
        document.head.appendChild(styleTag)
        let retryCount = 0
        const maxRetries = 3
        // const containerId = 'bailian-root'

        // 创建固定容器
        // const createContainer = () => {
        //     if (!document.getElementById(containerId)) {
        //         const div = document.createElement('div')
        //         div.id = containerId
        //         div.style.position = 'fixed'
        //         div.style.bottom = '20px'
        //         div.style.right = '20px'
        //         div.style.zIndex = '9999'
        //         document.body.appendChild(div)
        //     }
        // }

        const initChatbot = () => {
            // console.log('当前配置:', JSON.stringify(CHATBOT_CONFIG))
            if (window) {
                // console.log('[百炼] Chatbot 版本:', window)
                try {
                    window.CHATBOT_CONFIG = {
                        ...CHATBOT_CONFIG,
                        // container: document.getElementById(containerId)
                      }

                } catch (error) {
                    console.error('[百炼] 初始化失败:', error)
                }
            } else if (retryCount < maxRetries) {
                retryCount++
                console.warn(`[百炼] Chatbot 未加载，第${retryCount}次重试...`)
                setTimeout(initChatbot, 1000 * retryCount)
            } else {
                console.error('[百炼] 超过最大重试次数，加载失败')
            }
        }

        const loadResources = async () => {
            try {
                // createContainer()

                // 方法一：使用原生加载方式
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = bailianCss
                link.onerror = () => console.error('[百炼] CSS加载失败')
                document.head.appendChild(link)

                const script = document.createElement('script')
                script.src = bailianJs
                script.onload = initChatbot
                script.onerror = (e) => console.error('[百炼] JS加载失败:', e)
                document.body.appendChild(script)
                window.bailianLoaded = true;

                // 方法二：保留现有加载方式（需改造loadExternalResource）

                // await loadExternalResource(bailianCss, 'css', link => {
                //     link.onerror = () => console.error('[百炼] CSS加载失败')
                // })
                // await loadExternalResource(bailianJs, 'js', script => {
                //     script.onload = initChatbot
                //     script.onerror = (e) => console.error('[百炼] JS加载失败:', e)
                // })


            } catch (error) {
                console.error('[百炼] 资源加载异常:', error)
            }
        }

        if (BAILIAN_ENDPOINT) {
            loadResources()
        }
        

        return () => {
            styleTag?.remove() // 新增清理操作
            // const container = document.getElementById(containerId)
            // container?.remove()
            window.Chatbot?.destroy?.()

        }
    }, [BAILIAN_ENDPOINT]);

    return null;
}
