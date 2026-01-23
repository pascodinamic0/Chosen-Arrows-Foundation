/**
 * /kill
 *
 * Kill all local server processes by identifying all matching PIDs and then killing them using `pkill -f`.
 *
 * Steps:
 *   1. List all matching PIDs:
 *        pids=$(pgrep -f 'next|node|vite')
 *   2. Print all found PIDs for reference:
 *        echo "Killing server PIDs: $pids"
 *   3. If any are found, kill them:
 *        if [ -n "$pids" ]; then
 *          kill $pids
 *        fi
 *   4. For a one-liner version (unsafe if $pids empty, so check first):
 *        pgrep -f 'next|node|vite' | xargs -r kill
 *
 * Note:
 *   - Prints all killed server PIDs.
 *   - Only matches processes with 'next', 'node', or 'vite' in their command line.
 *   - Requires sufficient permissions to kill the listed processes.
 *   - Use with caution: this can kill all relevant dev servers on localhost!
 *
 * Example usage:
 *    /kill
 */
//
// Example handler pseudocode:
//   pids = run('pgrep', '-f', 'next|node|vite').stdout
//   if pids: print('Killing server PIDs:', pids); run('kill', *pids.split())

