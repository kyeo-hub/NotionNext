import styles from './floatmenu.module.css'

export default function FloatMenu(props) {
    return (
        <div className={styles["nav-servic"]}>
            <ul className={styles["nav-servic-li"]}> {/* 原 nav-servic-li */}

                <li className={styles["nsl-li"]}> {/* 原 nsl-li */}
                    <div className={styles["nsl-li-top"]}>
                        <div className={`${styles["nsl-li-top-icon"]} ${styles["ys-imgbox-cover"]}`}>
                            <img src="https://www.mrdvs.cn/static/picture/nav-icon.svg" alt="" />
                            <img src="https://www.mrdvs.cn/static/picture/nav-iconh.svg" alt="" />
                        </div>
                        <p>售前咨询</p>
                    </div>
                    <div className={styles["nsl-li-btm"]}>
                        <ul className={styles["nsl-li-btm-wrap"]}>
                            <li className={styles["nlbw-li"]}>
                                <div className={styles["nlbw-wrap"]}>
                                    <div className={styles["nlbw-wrap-tit"]}>
                                        <p>企业咨询</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-info"]}>
                                        <p>添加客服微信</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-img"]}>
                                        <img src="https://www.mrdvs.cn/uploadfile/202501/944d6e533155b09.jpg" alt="codes.png" />
                                    </div>
                                    <div className={styles["nlbw-wrap-sutit"]}>
                                        <p>企业咨询</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-btm"]}>
                                        <img src="https://www.mrdvs.cn/static/picture/syflopi.svg" alt="" />
                                        <p>400-025-6680</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>

                <li className={styles["nsl-li"]}>
                    <a href="https://work.weixin.qq.com/kfid/kfc1b4837e58e566f14" target="_blank" className={styles["nsl-li-top"]}>
                        <div className={`${styles["nsl-li-top-icon"]} ${styles["ys-imgbox-cover"]}`}>
                            <img src="https://www.mrdvs.cn/static/picture/nav-icon.svg" alt="" />
                            <img src="https://www.mrdvs.cn/static/picture/nav-iconh.svg" alt="" />
                        </div>
                        <p>在线客服</p>
                    </a>
                </li>

                <li className={styles["nsl-li"]}>
                    <div className={styles["nsl-li-top"]}>
                        <div className={`${styles["nsl-li-top-icon"]} ${styles["ys-imgbox-cover"]}`}>
                            <img src="https://www.mrdvs.cn/static/picture/nav-icon.svg" alt="" />
                            <img src="https://www.mrdvs.cn/static/picture/nav-iconh.svg" alt="" />
                        </div>
                        <p>扫码咨询</p>
                    </div>
                    <div className={styles["nsl-li-btm"]}>
                        <ul className={styles["nsl-li-btm-wrap"]}>
                            <li className={styles["nlbw-li"]}>
                                <div className={styles["nlbw-wrap"]}>
                                    <div className={styles["nlbw-wrap-tit"]}>
                                        <p>企业咨询</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-info"]}>
                                        <p>微信扫码咨询客服</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-img"]}>
                                        <img src="https://www.mrdvs.cn/uploadfile/202501/944d6e533155b09.jpg" alt="codes.png" />
                                    </div>
                                    <div className={styles["nlbw-wrap-sutit"]}>
                                        <p>服务热线</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-btm"]}>
                                        <img src="https://www.mrdvs.cn/static/picture/syflopi.svg" alt="" />
                                        <p>400-025-6680</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>

                <li className={`${styles["nsl-li"]} `} style={{ display: 'none' }}>
                    <div className={styles["nsl-li-top"]}>
                        <div className={`${styles["nsl-li-top-icon"]} ${styles["ys-imgbox-cover"]}`}>
                            <img src="https://www.mrdvs.cn/static/picture/nav-icon2.svg" alt="" />
                            <img src="https://www.mrdvs.cn/static/picture/nav-icon2h.svg" alt="" />
                        </div>
                        <p>在线客服</p>
                    </div>
                    <div className={styles["nsl-li-btm"]}>
                        <ul className={styles["nsl-li-btm-wrap"]}>
                            <li className={styles["nlbw-li"]}>
                                <div className={styles["nlbw-wrap"]}>
                                    <div className={styles["nlbw-wrap-tit"]}>
                                        <p>
                                            <a href="https://work.weixin.qq.com/kfid/kfc1b4837e58e566f14" target="_blank">
                                                点击打开-电脑端微信客服
                                            </a>
                                        </p>
                                    </div>
                                    <div className={styles["nlbw-wrap-info"]}>
                                        <p>微信扫码咨询在线客服</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-img"]}>
                                        <img src="/uploadfile/202409/b50610b5a56c1f4.jpg" alt="人事服务.jpg" />
                                    </div>
                                    <div className={styles["nlbw-wrap-sutit"]}>
                                        <p>服务热线</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-btm"]}>
                                        <img src="https://www.mrdvs.cn/static/picture/syflopi.svg" alt="" />
                                        <p>400-025-6680</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>

                <li className={`${styles["nsl-li"]} `} style={{ display: 'none' }}>
                    <div className={styles["nsl-li-top"]}>
                        <div className={`${styles["nsl-li-top-icon"]} ${styles["ys-imgbox-cover"]}`}>
                            <img src="https://www.mrdvs.cn/static/picture/nav-icon2.svg" alt="" />
                            <img src="https://www.mrdvs.cn/static/picture/nav-icon2h.svg" alt="" />
                        </div>
                        <p>个人服务</p>
                    </div>
                    <div className={styles["nsl-li-btm"]}>
                        <ul className={styles["nsl-li-btm-wrap"]}>
                            <li className={styles["nlbw-li"]}>
                                <div className={styles["nlbw-wrap"]}>
                                    <div className={styles["nlbw-wrap-tit"]}>
                                        <p>人事服务</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-info"]}>
                                        <p>扫码关注“迈尔微视"</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-img"]}>
                                        <img src="https://www.mrdvs.cn/uploadfile/202409/b50610b5a56c1f4.jpg" alt="人事服务.jpg" />
                                    </div>
                                    <div className={styles["nlbw-wrap-sutit"]}>
                                        <p>服务热线</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-btm"]}>
                                        <img src="https://www.mrdvs.cn/static/picture/syflopi.svg" alt="" />
                                        <p>400-025-6680</p>
                                    </div>
                                </div>
                            </li>
                            <li className={styles["nlbw-li"]}>
                                <div className={styles["nlbw-wrap"]}>
                                    <div className={styles["nlbw-wrap-tit"]}>
                                        <p>健康福利</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-info"]}>
                                        <p>扫码关注“迈尔微视"</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-img"]}>
                                        <img src="https://www.mrdvs.cn/uploadfile/202409/b50610b5a56c1f4.jpg" alt="迈尔微视.jpg" />
                                    </div>
                                    <div className={styles["nlbw-wrap-sutit"]}>
                                        <p>服务热线</p>
                                    </div>
                                    <div className={styles["nlbw-wrap-btm"]}>
                                        <img src="https://www.mrdvs.cn/static/picture/syflopi.svg" alt="" />
                                        <p>400-025-6680</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}