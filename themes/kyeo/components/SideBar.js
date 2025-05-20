
import { Header } from './Header'
import { MenuList } from './MenuList'


/**
 * 侧边栏
 */
export const SideBar = props => {

  return (
    <>
      <div className='lg:pt-16 bg-black dark:bg-white text-white dark:text-black'>
        <div className='flex justify-between lg:flex lg:flex-col lg:flex-row'>
          {/* 页头 */}
          <Header {...props} />
          {/* 菜单 */}
          <MenuList {...props} />
        </div>
      </div>
    </>
  )
}
