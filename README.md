A local-first Electron desktop app for developers working with multiple C# Azure Function Apps that share environment variables across different environments.
Two core features (v1)

1. Environment variable manager
   A table view of all your variables. Each variable has a name (the key), a description, a secret flag, and up to three values — one for dev, qa, and prod. When you click a row a detail panel slides in showing the full values per environment, where it's used across your function apps, and inline editing. You can create new variables, delete them, and filter by secrets or missing values.
2. Function app manager
   Import a function app by pointing at its folder. The app reads the existing local.settings.json and shows every key in a table. For each key you map it to one of your central variables — or leave it unmapped if it doesn't vary by environment. Each row has its own dev/qa/prod toggle so you can switch individual variables independently. There's also a "switch all" strip at the top to flip every row at once. When you apply an environment the app rewrites local.settings.json with the correct values for that environment, leaving unmapped keys untouched.
