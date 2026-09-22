declare module 'vue-writer' {
  import type { DefineComponent, Plugin } from 'vue'

  export interface VueWriterProps {
    array: string[]
    typeSpeed?: number
    eraseSpeed?: number
    delay?: number
    intervals?: number
    iterations?: number
    start?: number
    caret?: 'cursor' | 'underscore'
  }

  export const VueWriter: DefineComponent<VueWriterProps>

  const VueWriterPlugin: Plugin
  export default VueWriterPlugin
}
