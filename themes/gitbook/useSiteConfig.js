// lib/hooks/useSiteConfig.js
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

export const useSiteConfig = (configKeys) => {
  return configKeys.map(([key, defaultValue]) => 
    siteConfig(key, defaultValue, CONFIG)
  )
}