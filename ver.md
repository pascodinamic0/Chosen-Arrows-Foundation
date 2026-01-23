To deploy (push) your app to Vercel through the CLI, follow these steps:

1. If you haven't already, install the Vercel CLI globally:
   ```sh
   npm install -g vercel
   ```
   or with pnpm:
   ```sh
   pnpm add -g vercel
   ```

2. Login to your Vercel account:
   ```sh
   vercel login
   ```

3. Deploy your app (run this from your project root):
   ```sh
   vercel
   ```
   The first time it will ask for some project information; after that, you can just use `vercel` or:
   ```sh
   vercel --prod
   ```
   to push directly to production.

4. Follow the prompted instructions if any, and your deployment URL will be shown at the end.

For more options, see https://vercel.com/docs/cli
