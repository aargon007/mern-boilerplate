export default function Documentation() {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-x-8">
                            <span className="text-xl font-bold text-white">MERN Turbo Docs</span>
                            <div className="hidden md:block">
                                <div className="flex items-baseline space-x-4">
                                    <a href="#getting-started" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Getting Started
                                    </a>
                                    <a href="#packages" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Managing Packages
                                    </a>
                                    <a href="#commands" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Commands
                                    </a>
                                    <a href="#guides" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
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
                        <h2 className="text-3xl font-bold text-white mb-8">
                            Getting Started
                        </h2>
                        <div className="rounded-lg bg-gray-800 p-6">
                            <pre className="text-sm text-gray-300">
                                <code>
                                    {`git clone https://github.com/aargon007/mern-turbo-boilerplate
cd mern-turbo-boilerplate
yarn install
yarn dev`}
                                </code>
                            </pre>
                        </div>
                    </section>

                    {/* Managing Packages Section */}
                    <section id="packages" className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            Managing Packages
                        </h2>

                        <div className="grid gap-6">
                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Adding New Packages
                                </h3>
                                <p className="text-gray-300 mb-4">
                                    To add a new package to your apps folder:
                                </p>
                                <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded">
                                    <code>yarn workspace appFolderName add packageName</code>
                                </pre>
                            </div>

                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Package Structure
                                </h3>
                                <p className="text-gray-300 mb-4">
                                    Recommended structure for new packages:
                                </p>
                                <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded">
                                    <code>
                                        {`apps/
  ├── frontend/
  │   ├── src/
  │   ├── package.json
  │   ├── tsconfig.json
  │
  ├── server
  │   ├── app/
  │   ├── package.json
  │   ├── tsconfig.json   `}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Commands Section */}
                    <section id="commands" className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            Turbo Commands
                        </h2>

                        <div className="grid gap-6">
                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Development
                                </h3>
                                <div className="grid gap-4">
                                    <div>
                                        <p className="text-gray-300 mb-2">
                                            Run all apps in development mode:
                                        </p>
                                        <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded">
                                            <code>turbo run dev</code>
                                        </pre>
                                    </div>
                                    <div>
                                        <p className="text-gray-300 mb-2">
                                            Run specific app:
                                        </p>
                                        <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded">
                                            <code>turbo run dev --filter=web...</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Building
                                </h3>
                                <div className="grid gap-4">
                                    <div>
                                        <p className="text-gray-300 mb-2">
                                            Build all packages:
                                        </p>
                                        <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded"><code>turbo run build</code></pre>
                                    </div>
                                    <div>
                                        <p className="text-gray-300 mb-2">
                                            Build specific package:
                                        </p>
                                        <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded"><code>turbo run build --filter=web</code></pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Additional Guides Section */}
                    <section id="guides" className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8">Additional Guides</h2>

                        <div className="grid gap-6">
                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">Filtering Tasks</h3>
                                <p className="text-gray-300 mb-4">Turbo provides powerful filtering capabilities:</p>
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    <li>Filter by dependencies: <code className="text-sm bg-gray-900/50 px-2 py-1 rounded">--filter=...{`{dependencies}`}</code></li>
                                    <li>Filter by package name: <code className="text-sm bg-gray-900/50 px-2 py-1 rounded">--filter=web</code></li>
                                    <li>Filter since last change: <code className="text-sm bg-gray-900/50 px-2 py-1 rounded">--since=main</code></li>
                                </ul>
                            </div>

                            <div className="rounded-lg bg-gray-800/50 p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Common Issues
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-white font-medium mb-2">
                                            Cache Issues
                                        </p>
                                        <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded">
                                            <code>turbo clean # Clear the Turbo cache</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

