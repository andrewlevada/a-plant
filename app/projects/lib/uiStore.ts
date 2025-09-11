"use client"

import { useRef, useSyncExternalStore } from 'react'

type Listener = () => void

class UIStore {
  private listeners: Set<Listener> = new Set()
  private createTaskOpen = false

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private emit() {
    for (const l of this.listeners) l()
  }

  // Create Task Modal API
  getCreateTaskOpen(): boolean {
    return this.createTaskOpen
  }

  openCreateTask() {
    if (!this.createTaskOpen) {
      this.createTaskOpen = true
      this.emit()
    }
  }

  closeCreateTask() {
    if (this.createTaskOpen) {
      this.createTaskOpen = false
      this.emit()
    }
  }
}

export const uiStore = new UIStore()

export function useCreateTaskModalOpen(): boolean {
  const subscribeRef = useRef(uiStore.subscribe)
  const getSnapshot = () => uiStore.getCreateTaskOpen()
  return useSyncExternalStore(subscribeRef.current, getSnapshot, () => false)
}


