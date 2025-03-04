import { useGlobal } from '@/lib/global'
const PrintComponent = () => {
    const { locale } = useGlobal()
    const handlePrint = () => {
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'position:fixed; right:-1000px; bottom:-1000px';

        const printContent = document.getElementById("article-wrapper").cloneNode(true);

        iframe.onload = () => {
            // 复制原页面所有样式
            Array.from(document.styleSheets).forEach(sheet => {
                try {
                    const rules = Array.from(sheet.cssRules)
                        .map(rule => rule.cssText)
                        .join('');
                    const style = document.createElement('style');
                    style.textContent = rules;
                    iframe.contentDocument.head.appendChild(style);
                } catch (e) {
                    console.log('Error copying styles:', e);
                }
            });

            // 添加打印专用样式
            const printStyle = document.createElement('style');
            printStyle.textContent = `@media print {
                                        @page {
                                            size: auto;
                                            margin: 2cm 1cm; /* 上下边距要留出页眉页脚空间 */
                                        }

                                        body {
                                            margin: 0;
                                            position: relative;
                                        }

                                        #page-container {
                                            margin-top: 70px;  /* 大于header高度 */
                                            margin-bottom: 50px; /* 大于footer高度 */
                                            page-break-inside: avoid;
                                        }

                                        .page-break {
                                            page-break-before: always;
                                            padding-top: 30px; /* 避免内容被截断 */
                                        }
                                    }
            `;
            iframe.contentDocument.head.appendChild(printStyle);
            const contentNodes = Array.from(printContent.children);
            let currentPageContent = document.createElement('div');

            contentNodes.forEach((node, index) => {
                currentPageContent.appendChild(node.cloneNode(true));

                // 根据内容高度自动分页（每800px分页）
                if (currentPageContent.offsetHeight > 700 || index === contentNodes.length - 1) {
                    const pageContainer = document.createElement('div');
                    pageContainer.className = 'page-container';
                    pageContainer.appendChild(currentPageContent.cloneNode(true));
                    iframe.contentDocument.body.appendChild(pageContainer);

                    if (index !== contentNodes.length - 1) {
                        iframe.contentDocument.body.appendChild(document.createElement('div').className = 'page-break');
                    }
                    currentPageContent = document.createElement('div');
                }
            });

            // 动态页码（使用伪元素）
            const style = document.createElement('style');
            style.textContent = `
                            @page {
                                @top-left {
                                    content: "®迈尔微视知识库";
                                    font-size: 24px;
                                    color: #666;
                                    border-bottom: 3px solid #ccc;  /* 下划线效果 */
                                    width: 100%;
                                }
  
                                @bottom-center {
                                    content: "第 " counter(page) " 页，共 " counter(pages) " 页";
                                }
                            }
                            `;
            iframe.contentDocument.head.appendChild(style);

            // 处理图片和字体
            setTimeout(() => {
                iframe.contentWindow.print();
                document.body.removeChild(iframe);
            }, 500); // 增加等待时间确保资源加载
        };

        document.body.appendChild(iframe);
    };

    return (
        <div>
            <button type="button" onClick={handlePrint} title={locale.COMMON.PRINT} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px'
            }}>
                <span className="text-sm font-semibold text-blue-500 leading-6 tracking-wide">{locale.COMMON.CONTENTS}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor" aria-label="print icon" name="print" style={{
                    width: '20px',
                    height: '20px',
                    flexShrink: 0  // 防止图标被压缩
                }}>
                    <path d="M819.2 364.8h-44.8V128c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v236.8h-44.8C145.067 364.8 96 413.867 96 473.6v192c0 59.733 49.067 108.8 108.8 108.8h44.8V896c0 17.067 14.933 32 32 32h460.8c17.067 0 32-14.933 32-32V774.4h44.8c59.733 0 108.8-49.067 108.8-108.8v-192c0-59.733-49.067-108.8-108.8-108.8zM313.6 160h396.8v204.8H313.6V160zm396.8 704H313.6V620.8h396.8V864zM864 665.6c0 25.6-19.2 44.8-44.8 44.8h-44.8V588.8c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v121.6h-44.8c-25.6 0-44.8-19.2-44.8-44.8v-192c0-25.6 19.2-44.8 44.8-44.8h614.4c25.6 0 44.8 19.2 44.8 44.8v192z"></path>
                </svg>
            </button>
        </div>
    );
};

export default PrintComponent;