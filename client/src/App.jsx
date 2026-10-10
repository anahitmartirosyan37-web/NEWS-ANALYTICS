import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PoliticsPage } from "./containers/politic/politics";
import { HomePage } from "./containers/home";
import { ContactPage } from "./containers/contact/contact";
import { TermsPage } from "./containers/TermsPage";
import { TrustPage } from "./containers/TrustPage";
import { MyHeader } from "./components/header";
import { Footer } from "./components/Footer";
import { ContactEditorialPage } from "./containers/ContactEditorialPage";
import { CookiesPage } from "./containers/CookiesPage";
import { SocietyPage } from "./containers/society/society";
import { EconomyPage } from "./containers/economy/economy";
import { WorldPage } from "./containers/world/world";
import { ArticlePage } from "./containers/ArticlePage";
import "./app.css"
import { AdminPage } from "./containers/admin/AdminPage";
function App() {
    return (
        <Router>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh"
                }}
            >

                <MyHeader />

                <div style={{ flex: "1" }}>

                    <Routes>

                        {/* ГЛАВНАЯ */}
                        <Route
                            path="/"
                            element={<HomePage />}
                        />

                        {/* СТРАНИЦЫ */}
                        <Route
                            path="/contact"
                            element={<ContactPage />}
                        />

                        <Route
                            path="/politics"
                            element={<PoliticsPage />}
                        />

                        <Route
                            path="/society"
                            element={<SocietyPage />}
                        />

                        <Route
                            path="/economy"
                            element={<EconomyPage />}
                        />

                        <Route
                            path="/world"
                            element={<WorldPage />}
                        />

                        {/* СЛУЖЕБНЫЕ СТРАНИЦЫ */}
                        <Route
                            path="/terms"
                            element={<TermsPage />}
                        />

                        <Route
                            path="/trust"
                            element={<TrustPage />}
                        />

                        <Route
                            path="/contact-editorial"
                            element={<ContactEditorialPage />}
                        />

                        <Route
                            path="/cookies"
                            element={<CookiesPage />}
                        />

                        {/* =====================================
                            УНИВЕРСАЛЬНАЯ СТРАНИЦА СТАТЬИ
                        ===================================== */}

                        <Route
                            path="/article/:id"
                            element={<ArticlePage />}
                        />
       

<Route
    path="/admin"
    element={<AdminPage />}
/>

                    </Routes>

                </div>

                <Footer />

            </div>

        </Router>
    );
}

export default App;