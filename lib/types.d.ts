import React from 'react'

export type Component = React.Component<*, *> | React.FunctionComponent<*>

export interface Adapter {
  mount: (spec: ElementSpec, mountPoint: Element, props: {}) => void,
  update: (spec: ElementSpec, mountPoint: Element, props: {}) => void,
  unmount: (spec: ElementSpec, mountPoint: Element) => void
}

export interface PropertyMap {
  [key: string]: ?string
}

export interface ElementMap {
  [key: string]: ElementSpec | Component
}

export interface Defaults {
  attributes?: string[]
  quiet?: boolean,
  shadow?: boolean
}

export interface ElementSpec {
  component: Component,
  adapter?: Adapter,
  attributes?: Array<string>,
  quiet?: boolean,
  shadow?: boolean
}

export type ReactAdapter = Adapter

export interface ElementEvents {
  onMount: (source: Element, mountPoint: Element) => void,
  onUpdate: (source: Element, mountPoint: Element) => void,
  onUnmount: (source: Element, mountPoint: Element) => void
}

export interface Strategy {
  isSupported: () => boolean
}
