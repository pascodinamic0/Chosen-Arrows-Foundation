/**
 * /as (search web)
 *
 * When uncertain, do not answer directly. Instead, perform a web search for the user's query or topic.
 *
 * Steps:
 *   1. Detect uncertainty or factual insufficiency in the prompt.
 *   2. Compose a web search query from the prompt or question.
 *   3. Search authoritative sources (e.g., Google, official documentation).
 *   4. Return only verified, referenced, and direct factual information—no speculation.
 *
 * Example handler pseudocode:
 *   if unsure or incomplete knowledge:
 *     response = search_web(prompt)
 *     return response
 *   else:
 *     return factually certain answer
 *
 * Notes:
 *   - Never guess, hallucinate, or answer on incomplete information.
 *   - Always cite or link sources if information comes from search.
 *   - Trigger a search on any nontrivial uncertainty.
 */
