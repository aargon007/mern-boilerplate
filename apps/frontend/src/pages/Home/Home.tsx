import Button from '@/components/ui/Button';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div>
            {/* header  */}
            <nav className="flex h-[80px] items-center justify-between px-5">
                <ul className="flex list-none items-center justify-between gap-x-5">
                    <li>
                        <Link  to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">Components</Link>
                    </li>
                    <li>
                        <Link to="/">Stack</Link>
                    </li>
                </ul>
                <h2>MERN Turbo Boilerplate</h2>
                {/* dark mode */}
                <button>dark</button>
            </nav>

            <div className="grid grid-cols-3">
                <div>
                    <Button>Button</Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
