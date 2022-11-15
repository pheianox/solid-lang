export declare const createI18nContext: <T>(dictinary_: T, language_: keyof T) => {
    translate: (path: string, params?: Params) => any;
    languages: () => (keyof T)[];
    language: import("solid-js").Accessor<keyof T>;
    setLanguage: import("solid-js").Setter<keyof T>;
    dictinary: import("solid-js").Accessor<T>;
    translation: import("solid-js").Accessor<T[keyof T]>;
    setDictinary: import("solid-js").Setter<T>;
};
