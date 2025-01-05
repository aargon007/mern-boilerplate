import { Link } from 'react-router';

const NavBar = () => {
    return (
        <nav className="flex h-[80px] items-center justify-between px-5">
            <ul className="flex list-none items-center justify-between gap-x-5">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/components">Components</Link>
                </li>
                <li>
                    <Link to="/docs">Docs</Link>
                </li>
            </ul>

            <h2>Aargon Inc.</h2>

            <ul className="flex list-none items-center justify-between gap-x-5">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/components">Components</Link>
                </li>
                <li>
                    <Link to="/docs">Docs</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
