// FloatMenu.jsx
import { useEffect, useRef } from 'react';
import FloatToolbar from 'float-toolbar';

export default function FloatMenu() {
    const toolbarRef = useRef(null);

    useEffect(() => {
        const waitForBailian = () => {
            return new Promise((resolve) => {
                const check = () => {
                    if (window.bailianLoaded) {
                        resolve();
                    } else {
                        setTimeout(check, 100); // 每 100ms 检查一次
                    }
                };
                check();
            });
        };

        // 正确实例化
        const initToolbar = async () => {
            await waitForBailian();
            const container = document.getElementById('bailian-root');
            function showBailian() {
                container.style.display = 'block'; // 显示容器
            }
            const instance = new FloatToolbar({
                position: { right: '30px' },
                theme: 'light',
                breakpoint: 768,
                toggleIcon: 'https://www.mrdvs.cn/static/picture/navar.svg',
                items: [
                    {
                        type: 'popup',
                        text: '售前咨询',
                        icon: 'https://www.mrdvs.cn/static/picture/nav-iconh.svg',
                        popup: {
                            title: '企业咨询',
                            description: '添加客服微信',
                            qrCode: 'https://www.mrdvs.cn/uploadfile/202501/944d6e533155b09.jpg',
                            phone: '400-025-6680',
                            phoneIcon: 'https://www.mrdvs.cn/static/picture/syflopi.svg',
                        }
                    },
                    {
                        type: 'link',
                        text: '在线客服',
                        icon: 'https://www.mrdvs.cn/static/picture/nav-icon2h.svg',
                        link: 'https://work.weixin.qq.com/kfid/kfc1b4837e58e566f14'
                    },
                    {
                        type: 'function',
                        text: 'AI客服',
                        icon: 'https://img.alicdn.com/imgextra/i2/O1CN01Pda9nq1YDV0mnZ31H_!!6000000003025-54-tps-120-120.apng',
                        callback: () => showBailian()
                    }
                    // 其他配置项...
                ]
            });

            // 保存实例引用
            toolbarRef.current = instance;

            // 清理函数
            return () => {
                if (toolbarRef.current) {
                    toolbarRef.current.destroy();
                }
            };
        }
        initToolbar();
    }, []); // 空依赖数组表示只运行一次

    return null; // 不需要渲染 DOM 元素
}