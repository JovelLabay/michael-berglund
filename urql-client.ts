import {
    cacheExchange, createClient, dedupExchange, Exchange, fetchExchange, RequestPolicy
} from "@urql/core"
import { retryExchange } from "@urql/exchange-retry"
import invariant from "tiny-invariant"

// retry options
const options = { maxNumberAttempts: 3 }

// disable cache during dev phase
const isCacheDisabled = process.env.WP_DISABLE_CACHE === "1"
const requestPolicy: RequestPolicy = isCacheDisabled ? "network-only" : "cache-first"
const exchanges: Exchange[] = isCacheDisabled
  ? [dedupExchange, retryExchange(options), fetchExchange]
  : [dedupExchange, cacheExchange, retryExchange(options), fetchExchange]

// create default urql client
invariant(process.env.WP_GRAPHQL_ENDPOINT, "WP_GRAPHQL_ENDPOINT is undefined")
const urqlClient = createClient({
  url: process.env.WP_GRAPHQL_ENDPOINT,
  requestPolicy,
  exchanges,
})

export default urqlClient
