import React from 'react'
import { Root } from 'react-dom/client'

export type Component =
  | React.ComponentClass<any, any>
  | React.FunctionComponent<any>

export interface Adapter {
  mount: (
    spec: ElementSpec,
    root: Root,
    props: {},
    element: HTMLElement | null
  ) => void
  update: (
    spec: ElementSpec,
    root: Root,
    props: {},
    element: HTMLElement | null
  ) => void
  unmount: (spec: ElementSpec, root: Root) => void
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
  onMount: (source: HTMLElement, root: Root) => void
  onUpdate: (source: HTMLElement, root: Root) => void
  onUnmount: (source: HTMLElement, root: Root) => void
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
  | (<T>(list: HTMLCollectionOf<T>, fn: (item: T) => any) => void)
  | ((list: HTMLCollection, fn: (item: HTMLElement) => any) => void)
//  | (<T>(list: T[], fn: (item: T) => any) => void)
