// Scrape command for BambiSleep Wiki using MCP Cursor tools

/**
 * BambiScrape Command: Iterative, robust wiki scraper for BambiSleep Wiki.
 *
 * Usage: /scrape
 * 
 * - Reads and updates progress in bambiland/bambiland/data/wiki-scraper-progress.json
 * - Navigates, scrapes, and processes new pages iteratively using browser scripting tools
 * - Produces a complete dump at bambiland/bambiland/data/bambi-sleep-wiki-complete.json when finished
 *
 * --- Iterative Steps ---
 * 
 * 1. Load progress state from wiki-scraper-progress.json:
 *    - scrapedPages: { url, title, content, scraped_at }
 *    - visitedUrls: [string]
 *    - toVisit: [string]
 *
 * 2. While toVisit is not empty AND total scraped pages < 500:
 *    a. Pick the next url from toVisit list (FIFO)
 *    b. Navigate to the URL using `mcp_cursor_browser_extension_browser_navigate`
 *    c. Wait 2 seconds with `mcp_cursor_browser_extension_browser_wait_for`
 *    d. Extract data via:
 *         mcp_cursor_browser_extension_browser_evaluate
 *         Script:
 *         (() => {
 *           const BASE_URL = 'https://bambisleep.info';
 *           const links = Array.from(document.querySelectorAll('a[href]'))
 *             .map(a => {
 *               try {
 *                 const url = new URL(a.href, BASE_URL);
 *                 return url.href.split('#')[0].replace(/\/?$/, '');
 *               } catch {
 *                 return null;
 *               }
 *             })
 *             .filter(href => {
 *               if (!href) return false;
 *               try {
 *                 const url = new URL(href, BASE_URL);
 *                 return url.origin === new URL(BASE_URL).origin && 
 *                        !href.includes('Special:') &&
 *                        !href.includes('User:') &&
 *                        !href.includes('Talk:') &&
 *                        !href.includes('action=edit') &&
 *                        !href.includes('action=history') &&
 *                        !href.includes('oldid=') &&
 *                        !href.includes('.pdf') &&
 *                        !href.includes('.jpg') &&
 *                        !href.includes('.png') &&
 *                        !href.startsWith('javascript:') &&
 *                        !href.startsWith('mailto:');
 *               } catch {
 *                 return false;
 *               }
 *             });
 *           const uniqueLinks = [...new Set(links)];
 *           const mainContent = document.querySelector('#mw-content-text') || document.querySelector('main') || document.body;
 *           return {
 *             url: window.location.href,
 *             title: document.title,
 *             content: mainContent.innerText || mainContent.textContent || '',
 *             links: uniqueLinks,
 *             linkCount: uniqueLinks.length
 *           };
 *         })()
 *    e. On success:
 *       - Add the page data (url, title, content, scraped_at: <UTC timestamp>) to scrapedPages.
 *       - Add the URL to visitedUrls.
 *       - For each new extracted link:
 *         - If it's not in visitedUrls or toVisit, append to toVisit.
 *       - Remove current URL from toVisit.
 *    f. On navigation or evaluation error:
 *       - Log error (if possible in the progress file or an error log)
 *       - Move on to next URL.
 *    g. After each iteration, write updated progress back to wiki-scraper-progress.json.
 *
 * 3. Exit condition:
 *    - When toVisit is empty, or 500 pages (or configured limit) scraped.
 *
 * 4. On completion:
 *    - Write full scrapedPages array as JSON to bambiland/bambiland/data/bambi-sleep-wiki-complete.json.
 *
 * 5. Notes:
 *    - Robust to partial failures (continues on navigation/runtime errors)
 *    - All paths are relative to project root (ensure correct working directory)
 *    - Wiki can grow, so scraping is resumable via the progress JSON
 */

