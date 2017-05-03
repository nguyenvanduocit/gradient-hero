import Clipboard from 'clipboard'
export const startListenClipboardTrigger = () => {
  /* eslint-disable no-new */
  let clipboard = new Clipboard('.clipboard')
  clipboard.on('success', (e) => {
    let event = new Event('copied')
    e.trigger.dispatchEvent(event)
    e.clearSelection()
  })
}
