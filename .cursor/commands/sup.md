/**
 * /sup <supabase-command-or-prompt>
 *
 * Run a Supabase command using either 'mcp' or 'supabase' CLI. 
 * Pass all given arguments directly to the tool. Use this for
 * running any Supabase-related administrative or SQL tasks.
 *
 * Usage examples:
 *   /sup db push
 *   /sup gen types typescript --local
 *   /sup sql "select * from users limit 10"
 *
 * Implementation notes:
 * - If 'mcp' is available, prefer it: mcp supabase <args...>
 * - Otherwise, fallback to: supabase <args...>
 * - Pass all further args verbatim.
 * - Runs in project root; ensure Supabase env is configured
 * - Use for all infra/tasks requiring Supabase CLI access.
 */
//
// Example handler pseudocode (not executed here):
//    if (which('mcp')) run('mcp supabase', ...args)
//    else run('supabase', ...args)
