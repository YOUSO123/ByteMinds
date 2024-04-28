/* eslint-disable */
/**
 * This file was generated by 'vite-plugin-kit-routes'
 *
 *      >> DO NOT EDIT THIS FILE MANUALLY <<
 */

/**
 * PAGES
 */
const PAGES = {
  "/": `/`,
  "/email-verification": `/email-verification`,
  "/students": `/students`,
  "/about": `/about`,
  "/blog": `/blog`,
  "/blog/[slug]": (params: { slug: (string | number) }) => {
    return `/blog/${params.slug}`
  },
  "/contact-us": `/contact-us`,
  "/faqs": `/faqs`,
  "/login": `/login`,
  "/register": `/register`
}

/**
 * SERVERS
 */
const SERVERS = {
  
}

/**
 * ACTIONS
 */
const ACTIONS = {
  "verifyEmail /email-verification": `/email-verification?/verifyEmail`,
  "resendVerificationCode /email-verification": `/email-verification?/resendVerificationCode`,
  "default /login": `/login`,
  "default /logout": `/logout`,
  "default /register": `/register`
}

/**
 * LINKS
 */
const LINKS = {
  "facebook": `https://facebook.com/byteminds`,
  "youtube": `https://www.youtube.com/@bytemindstech`,
  "classroom": `https://classroom.jhenbert.com`,
  "githubAvatar": (params: { avatarId: (string | number) }) => {
    return `https://avatars.githubusercontent.com/u/${params.avatarId}?v=4`
  }
}

type ParamValue = string | number | undefined

/**
 * Append search params to a string
 */
export const appendSp = (sp?: Record<string, ParamValue | ParamValue[]>, prefix: '?' | '&' = '?') => {
  if (sp === undefined) return ''

  const params = new URLSearchParams()
  const append = (n: string, v: ParamValue) => {
    if (v !== undefined) {
      params.append(n, String(v))
    }
  }

  for (const [name, val] of Object.entries(sp)) {
    if (Array.isArray(val)) {
      for (const v of val) {
        append(name, v)
      }
    } else {
      append(name, val)
    }
  }

  const formatted = params.toString()
  if (formatted) {
    return `${prefix}${formatted}`
  }
  return ''
}

/**
 * get the current search params
 * 
 * Could be use like this:
 * ```
 * route("/cities", { page: 2 }, { ...currentSP() })
 * ```
 */ 
export const currentSp = () => {
  const params = new URLSearchParams(window.location.search)
  const record: Record<string, string> = {}
  for (const [key, value] of params.entries()) {
    record[key] = value
  }
  return record
}

function StringOrUndefined(val: any) {
  if (val === undefined) {
    return undefined
  }

  return String(val)
}

// route function helpers
type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
type FunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never

const AllObjs = { ...PAGES, ...ACTIONS, ...SERVERS, ...LINKS }
type AllTypes = typeof AllObjs

/**
 * To be used like this: 
 * ```ts
 * import { route } from './ROUTES'
 * 
 * route('site_id', { id: 1 })
 * ```
 */
export function route<T extends FunctionKeys<AllTypes>>(key: T, ...params: FunctionParams<AllTypes[T]>): string
export function route<T extends NonFunctionKeys<AllTypes>>(key: T): string
export function route<T extends keyof AllTypes>(key: T, ...params: any[]): string {
  if (AllObjs[key] as any instanceof Function) {
    const element = (AllObjs as any)[key] as (...args: any[]) => string
    return element(...params)
  } else {
    return AllObjs[key] as string
  }
}

/**
* Add this type as a generic of the vite plugin `kitRoutes<KIT_ROUTES>`.
*
* Full example:
* ```ts
* import type { KIT_ROUTES } from './ROUTES'
* import { kitRoutes } from 'vite-plugin-kit-routes'
*
* kitRoutes<KIT_ROUTES>({
*  PAGES: {
*    // here, key of object will be typed!
*  }
* })
* ```
*/
export type KIT_ROUTES = {
  PAGES: { '/': never, '/email-verification': never, '/students': never, '/about': never, '/blog': never, '/blog/[slug]': 'slug', '/contact-us': never, '/faqs': never, '/login': never, '/register': never }
  SERVERS: Record<string, never>
  ACTIONS: { 'verifyEmail /email-verification': never, 'resendVerificationCode /email-verification': never, 'default /login': never, 'default /logout': never, 'default /register': never }
  LINKS: { 'facebook': never, 'youtube': never, 'classroom': never, 'githubAvatar': 'avatarId' }
  Params: { slug: never, avatarId: never }
}
