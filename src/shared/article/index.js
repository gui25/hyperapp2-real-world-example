import {Http} from "../../web_modules/@kwasniew/hyperapp-fx.js";
import {API_ROOT} from "../../config.js";
import {authHeader} from "../authHeader.js";
import {LogError} from "../errors.js";

const SetArticle = (state, { article }) => ({ ...state, ...article });

export const FetchArticle = ({ slug, token }) => {
    return Http({
        url: API_ROOT + "/articles/" + slug,
        options: { headers: authHeader(token) },
        action: SetArticle,
        error: LogError
    });
};