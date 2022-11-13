import { createSignal, createMemo } from "solid-js"

export const createI18nContext = <T>(dictinary_: T, language_: keyof T) => {
  const [language, setLanguage] = createSignal(language_)
  const [dictinary, setDictinary] = createSignal(dictinary_)
  const languages = () => Object.keys(dictinary() as object) as (keyof T)[]
  const translations = createMemo(() => dictinary()[language()])

  function lookup(object: T[keyof T], path: string[], defaultValue: any) {
    // @ts-ignore
    const value = path.reduce((obj, key) => obj ? obj[key] : undefined, object)
    return value === undefined ? defaultValue : value
  }

  function substitute(translation: string, params: Params) {
    return translation.replace(/{{(.*?)}}/g, (_, param) => params[param])
  }

  function translate(path: Path<T[keyof T]>, params?: Params) {
    const value = lookup(translations(), path as string[], "")
    switch (typeof value) {
      case "function": return value(params)
      case "string": return params ? substitute(value, params) : value
      default: return value
    }
  }

  return { translate, language, languages, setLanguage, dictinary, setDictinary }
}