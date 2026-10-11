export default function Documentation() {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-x-8">
                            <span className="text-xl font-bold text-white">
                                MERN Turbo Docs
                            </span>
                            <div className="hidden md:block">
                                <div className="flex items-baseline space-x-4">
                                    <a
                                        href="#getting-started"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                                    >
                                        Getting Started
                                    </a>
                                    <a
                                        href="#packages"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                                    >
                                        Managing Packages
                                    </a>
                                    <a
                                        href="#commands"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                                    >
                                        Commands
                                    </a>
                                    <a
                                        href="#guides"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                                    >
                                        Guides
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="py-16">
                    {/* Getting Started Section */}
                    <section id="getting-started" className="mb-16">
                        <h2 className="mb-8 text-3xl font-bold text-white">
                            Getting Started
                        </h2>
                        <div className="rounded-lg bg-gray-800 p-6">
                            <pre className="text-sm text-gray-300">
                                <code>
                                    {`git clone https://github.com/aargon007/mern-boilerplate
cd mern-boilerplate
pnpm install
cp .env.example .env
pnpm dev`}
                                </code>
                            </pre>
                        </div>
                    </section>

                    {/* Managing Packages Section */}
                    <section id="packages" className="mb-16">
                        <h2 className="mb-8 text-3xl font-bold text-white">
                            Managing Packages
                        </h2>

                        <div className="grid gap-6">
                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="mb-4 text-xl font-semibold text-white">
                                    Adding New Packages
                                </h3>
                                <p className="mb-4 text-gray-300">
                                    To add a new package to your apps folder:
                                </p>
                                <pre className="rounded bg-gray-900/50 p-4 text-sm text-gray-300">
                                    <code>
                                        pnpm --filter frontend add packageName
                                    </code>
                                </pre>
                            </div>

                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="mb-4 text-xl font-semibold text-white">
                                    Package Structure
                                </h3>
                                <p className="mb-4 text-gray-300">
                                    Recommended structure for new packages:
                                </p>
                                <pre className="rounded bg-gray-900/50 p-4 text-sm text-gray-300">
                                    <code>
                                        {`apps/
  ├── frontend/
  │   ├── src/
  │   ├── package.json
  │   ├── tsconfig.json
  │
  ├── server
  │   ├── src/
  │   ├── package.json
  │   ├── tsconfig.json   `}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Commands Section */}
                    <section id="commands" className="mb-16">
                        <h2 className="mb-8 text-3xl font-bold text-white">
                            Turbo Commands
                        </h2>

                        <div className="grid gap-6">
                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="mb-4 text-xl font-semibold text-white">
                                    Development
                                </h3>
                                <div className="grid gap-4">
                                    <div>
                                        <p className="mb-2 text-gray-300">
                                            Run all apps in development mode:
                                        </p>
                                        <pre className="rounded bg-gray-900/50 p-4 text-sm text-gray-300">
                                            <code>pnpm turbo run dev</code>
                                        </pre>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-gray-300">
                                            Run specific app:
                                        </p>
                                        <pre className="rounded bg-gray-900/50 p-4 text-sm text-gray-300">
                                            <code>
                                                pnpm turbo run dev
                                                --filter=frontend...
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="mb-4 text-xl font-semibold text-white">
                                    Building
                                </h3>
                                <div className="grid gap-4">
                                    <div>
                                        <p className="mb-2 text-gray-300">
                                            Build all packages:
                                        </p>
                                        <pre className="rounded bg-gray-900/50 p-4 text-sm text-gray-300">
                                            <code>pnpm turbo run build</code>
                                        </pre>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-gray-300">
                                            Build specific package:
                                        </p>
                                        <pre className="rounded bg-gray-900/50 p-4 text-sm text-gray-300">
                                            <code>
                                                pnpm turbo run build
                                                --filter=frontend
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Additional Guides Section */}
                    <section id="guides" className="mb-16">
                        <h2 className="mb-8 text-3xl font-bold text-white">
                            Additional Guides
                        </h2>

                        <div className="grid gap-6">
                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="mb-4 text-xl font-semibold text-white">
                                    Filtering Tasks
                                </h3>
                                <p className="mb-4 text-gray-300">
                                    Turbo provides powerful filtering
                                    capabilities:
                                </p>
                                <ul className="list-inside list-disc space-y-2 text-gray-300">
                                    <li>
                                        Include dependencies:{' '}
                                        <code className="rounded bg-gray-900/50 px-2 py-1 text-sm">
                                            --filter=frontend...
                                        </code>
                                    </li>
                                    <li>
                                        Filter by package name:{' '}
                                        <code className="rounded bg-gray-900/50 px-2 py-1 text-sm">
                                            --filter=frontend
                                        </code>
                                    </li>
                                    <li>
                                        Filter since last change:{' '}
                                        <code className="rounded bg-gray-900/50 px-2 py-1 text-sm">
                                            --filter=[main]
                                        </code>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="mb-4 text-xl font-semibold text-white">
                                    Common Issues
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-2 font-medium text-white">
                                            Cache Issues
                                        </p>
                                        <pre className="rounded bg-gray-900/50 p-4 text-sm text-gray-300">
                                            <code>
                                                pnpm turbo run build --force #
                                                Rebuild without cache reads
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
