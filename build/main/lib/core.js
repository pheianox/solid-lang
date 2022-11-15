"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createI18nContext = void 0;
const solid_js_1 = require("solid-js");
const TEMPLATE_REGEX = /{{(.*?)}}/g;
const PATH_DELIMINATOR = ".";
const createI18nContext = (dictinary_, language_) => {
    const [language, setLanguage] = (0, solid_js_1.createSignal)(language_);
    const [dictinary, setDictinary] = (0, solid_js_1.createSignal)(dictinary_);
    const translation = (0, solid_js_1.createMemo)(() => dictinary()[language()]);
    const languages = () => Object.keys(dictinary());
    function lookup(object, path, defaultValue) {
        const value = path.reduce((obj, key) => obj ? obj[key] : undefined, object);
        return value === undefined ? defaultValue : value;
    }
    function substitute(translation, params) {
        return translation.replace(TEMPLATE_REGEX, (_, param) => params[param]);
    }
    function translate(path, params) {
        const keyList = path.trim().split(PATH_DELIMINATOR);
        const value = lookup(translation(), keyList, "");
        switch (typeof value) {
            case "function": return value(params);
            case "string": return params ? substitute(value, params) : value;
            default: return value;
        }
    }
    return { translate, languages, language, setLanguage, dictinary, translation, setDictinary };
};
exports.createI18nContext = createI18nContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBbUQ7QUFFbkQsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFBO0FBQ25DLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFBO0FBRXJCLE1BQU0saUJBQWlCLEdBQUcsQ0FBSSxVQUFhLEVBQUUsU0FBa0IsRUFBRSxFQUFFO0lBQ3hFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBQSx1QkFBWSxFQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3ZELE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsSUFBQSx1QkFBWSxFQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQzFELE1BQU0sV0FBVyxHQUFHLElBQUEscUJBQVUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDN0QsTUFBTSxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQVksQ0FBZ0IsQ0FBQTtJQUV6RSxTQUFTLE1BQU0sQ0FBQyxNQUFrQixFQUFFLElBQWMsRUFBRSxZQUFpQjtRQUNuRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUMzRSxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0lBQ25ELENBQUM7SUFFRCxTQUFTLFVBQVUsQ0FBQyxXQUFtQixFQUFFLE1BQWM7UUFDckQsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFFRCxTQUFTLFNBQVMsQ0FBQyxJQUFZLEVBQUUsTUFBZTtRQUM5QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDbkQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNoRCxRQUFRLE9BQU8sS0FBSyxFQUFFO1lBQ3BCLEtBQUssVUFBVSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDckMsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1lBQ2hFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFBO1NBQ3RCO0lBQ0gsQ0FBQztJQUVELE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsQ0FBQTtBQUM5RixDQUFDLENBQUE7QUExQlksUUFBQSxpQkFBaUIscUJBMEI3QiJ9