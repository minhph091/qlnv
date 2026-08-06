import { Link } from "react-router-dom";

import Home from "./Home";
import "./HomePage.css";
export default function HomePage() {
    return (
        <>
            <nav className="Header">
                <div class="logo">QLNV</div>

                <ul class="menu">
                    <Link to={"/"}>Trang chủ </Link>
                    <Link to={"/home"}>Danh sách nhân viên</Link>
                </ul>
            </nav>
            <div className="banner">
                <p>Đây là banner</p>
            </div>
            <div class="content">
                <main>
                    <h1>Xin chào!</h1>
                    <p>Đây là trang quản lý nhân viên.</p>
                </main>
            </div>

            <footer>© 2026 Minhph091</footer>
        </>
    );
}
