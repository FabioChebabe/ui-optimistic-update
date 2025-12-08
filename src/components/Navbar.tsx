import { NavLink } from "react-router";

export default function Navbar() {
    return (
        <nav className="flex justify-end gap-4 p-4 text-white">
            <NavLink to="/" end>
                Optmistic Update
            </NavLink>
            <NavLink to="/form" end>
                React hook Form
            </NavLink>
        </nav>
    );
}
