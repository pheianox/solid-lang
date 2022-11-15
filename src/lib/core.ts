import { createSignal, createMemo } from "solid-js"

const TEMPLATE_REGEX = /{{(.*?)}}/g
const PATH_DELIMINATOR = "."

export const createI18nContext = <T>(dictinary_: T, language_: keyof T) => {
  const [language, setLanguage] = createSignal(language_)
  const [dictinary, setDictinary] = createSignal(dictinary_)
  const translation = createMemo(() => dictinary()[language()])
  const languages = () => Object.keys(dictinary() as object) as (keyof T)[]

  function lookup(object: T[keyof T], path: string[], defaultValue: any) {
    const value = path.reduce((obj, key) => obj ? obj[key] : undefined, object)
    return value === undefined ? defaultValue : value
  }

  function substitute(translation: string, params: Params) {
    return translation.replace(TEMPLATE_REGEX, (_, param) => params[param])
  }

  function translate(path: string, params?: Params) {
    const keyList = path.trim().split(PATH_DELIMINATOR)
    const value = lookup(translation(), keyList, "")
    switch (typeof value) {
      case "function": return value(params)
      case "string": return params ? substitute(value, params) : value
      default: return value
    }
  }

  return { translate, languages, language, setLanguage, dictinary, translation, setDictinary }
}
