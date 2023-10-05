import { getPointResult } from "./utils";

export const fetchDataResults = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const resp = getPointResult(data)
            resolve(resp)
        }, 3000);
    });
}