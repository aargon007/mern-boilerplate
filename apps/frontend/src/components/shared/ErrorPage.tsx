import { FiAlertTriangle } from 'react-icons/fi'
import { Link } from 'react-router'

interface ErrorPageProps {
    error?: Error
    resetErrorBoundary?: () => void
}

export default function ErrorPage({ error, resetErrorBoundary }: ErrorPageProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 lg:px-8">
            <div className="max-w-max">
                <main className="sm:flex">
                    <FiAlertTriangle className="h-12 w-12 text-red-500" aria-hidden="true" />
                    <div className="sm:ml-6">
                        <div className="sm:border-l sm:border-gray-700 sm:pl-6">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Oops! Something went wrong</h1>
                            <p className="mt-1 text-base text-gray-400">
                                {error?.message || "We're sorry, but an unexpected error occurred."}
                            </p>
                        </div>
                        <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                            <button
                                onClick={resetErrorBoundary}
                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none"
                            >
                                Try again
                            </button>
                            <Link
                                to="/"
                                className="inline-flex items-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
                            >
                                Go back home
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

