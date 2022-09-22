import React from 'react'

export type Component =
  | React.ComponentClass<any, any>
  | React.FunctionComponent<any>

export interface Adapter {
  mount: (
    spec: ElementSpec,
    mountPoint: HTMLElement,
    props: {},
    element: HTMLElement | null
  ) => void
  update: (
    spec: ElementSpec,
    mountPoint: HTMLElement,
    props: {},
    element: HTMLElement | null
  ) => void
  unmount: (spec: ElementSpec, mountPoint: HTMLElement) => void
}

export interface PropertyMap {
  [key: string]: string | null
}

export interface ElementMap {
  [key: string]: ElementSpec | Component
}

export interface Defaults {
  attributes?: string[]
  quiet?: boolean
  shadow?: boolean
  retarget?: boolean
}

export interface ElementSpec {
  component: Component
  adapter?: Adapter
  attributes?: Array<string>
  quiet?: boolean
  shadow?: boolean
  retarget?: boolean
}

export type ReactAdapter = Adapter

export interface ElementEvents {
  onMount: (source: HTMLElement, mountPoint: HTMLElement) => void
  onUpdate: (source: HTMLElement, mountPoint: HTMLElement) => void
  onUnmount: (source: HTMLElement, mountPoint: HTMLElement) => void
}

export interface Strategy {
  name: string
  defineElement: (
    elSpec: ElementSpec,
    name: string,
    events: ElementEvents
  ) => void
  isSupported: () => boolean
  supportsShadow: () => boolean
}

export interface ObserverList {
  [key: string]: MutationObserver
}

export type Each =
  | ((list: NodeList, fn: (item: Node) => any) => void)
  | (<T extends Element>(list: HTMLCollectionOf<T>, fn: (item: T) => any) => void)
  | ((list: HTMLCollection, fn: (item: HTMLElement) => any) => void)
