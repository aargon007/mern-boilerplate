import { Link } from "react-router";

const Hero = () => {
    return (
        <div className="relative isolate bg-inherit">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                    <div className="flex">
                        <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-400 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            <span className="font-semibold text-indigo-400">
                                What's new
                            </span>
                            <span
                                className="h-4 w-px bg-gray-900/10"
                                aria-hidden="true"
                            />
                            <Link to="#" className="flex items-center gap-x-1">
                                See our latest updates
                                <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </div>

                    <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        MERN Turbo Boilerplate
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        A modern full-stack development starter kit using
                        MongoDB, Express.js, React, and Node.js with Turborepo
                        for monorepo management.
                    </p>

                    <div className="mt-10 flex items-center gap-x-6">
                        <Link
                            to="https://turbo.build/repo/docs/getting-started"
                            target="_blank"
                            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                        >
                            Get started
                        </Link>
                        <Link
                            to="https://turbo.build/repo/docs"
                            target="_blank"
                            className="text-sm font-semibold leading-6 text-white"
                        >
                            Learn more <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>

                <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                    <div className="relative isolate overflow-hidden rounded-2xl bg-gray-800/50 p-5 sm:mx-auto sm:max-w-2xl sm:rounded-3xl lg:mx-0 lg:max-w-none">
                        <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                            <pre className="text-sm text-gray-300 text-left">
                                <code>
                                    {`git clone https://github.com/aargon007/mern-turbo-boilerplate
                                    
cd mern-turbo-boilerplate

npm install

npm run dev`}
                                </code>
                            </pre>
                        </div>
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gray-900/10" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
