/*
* Format: optional cmd + key (ex "⌘K")
*/
export function isShortcutUSed(e: KeyboardEvent, shortcut: string): boolean {
  const isCmdRequired = shortcut.includes('⌘') // or ctrl for windows

  // First we check for the modifier key
  if (isCmdRequired) {
    if (isMac() && !e.metaKey) return false
    if (!isMac() && !e.ctrlKey) return false
  }
  
  // Then we check for the key
  const key = shortcut.replace('⌘', '').toLowerCase()
  return e.key.toLowerCase() === key
}

export function isMac(): boolean {
  return navigator.platform.toUpperCase().includes('MAC')
}