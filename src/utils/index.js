import { CallSearchProducts } from "api/products"
import { CallSearchKits } from "api/kit"

function makeQuickSearch(fn) {
    let controller

    return async query => {
        if (controller) controller.abort()

        controller = new AbortController()
        const { signal } = controller

        const response = await fn(query, signal)
        return response
    }
}

export const productsQuickSearch = makeQuickSearch(CallSearchProducts)
export const kitsQuickSearch = makeQuickSearch(CallSearchKits)
