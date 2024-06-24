import { Link } from "react-router-dom";
import Button from "@/components/UI/Button";

const Home = () => {
    return (
        <div>
            {/* header  */}
            <nav className="flex items-center justify-between h-[80px] px-5">
                <ul className="list-none flex items-center justify-between gap-x-5">
                    <li>
                        <Link to="/">Home</Link>
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
                    <Button>
                        Button
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
