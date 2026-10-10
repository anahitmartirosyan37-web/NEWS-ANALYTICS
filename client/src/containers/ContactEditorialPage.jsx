import { useState } from "react";
import { Link } from "react-router-dom";

export const ContactEditorialPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;
        setSubmitted(true);
    };

    return (
        <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontFamily: "Arial, sans-serif", color: "#121212" }}>
            <Link to="/" style={{ fontSize: "13px", color: "#666", textDecoration: "none" }}>← На главную</Link>
            
            <h1 style={{ fontSize: "32px", fontWeight: "800", margin: "15px 0 10px 0", borderBottom: "2px solid #b81d24", paddingBottom: "15px" }}>
                Связь с редакцией
            </h1>
            
            <p style={{ fontSize: "16px", color: "#444", lineHeight: "1.6", marginBottom: "30px" }}>
                Если у вас есть новости, пресс-релизы, замечания или предложения о сотрудничестве, вы можете связаться с редакционной коллегией через форму ниже или напрямую по электронной почте.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "40px" }}>
                <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>Контакты</h3>
                    <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5", margin: "5px 0" }}><strong>Электронная почта:</strong> editorial@newsportal.am</p>
                    <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5", margin: "5px 0" }}><strong>Пресс-служба:</strong> press@newsportal.am</p>
                    <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5", margin: "5px 0" }}><strong>Телефон:</strong> +374 (10) 00-00-00</p>
                </div>
                <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>Адрес редакции</h3>
                    <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5", margin: "5px 0" }}>Республика Армения, г. Ереван</p>
                    <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5", margin: "5px 0" }}>ул. Амиряна, 15</p>
                </div>
            </div>

            <div style={{ background: "#f9f9f9", padding: "30px", border: "1px solid #e0e0e0", borderRadius: "6px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>Написать в редакцию</h3>
                
                {submitted ? (
                    <div style={{ background: "#e6f4ea", border: "1px solid #34a853", padding: "20px", borderRadius: "4px", color: "#137333" }}>
                        <strong>Спасибо!</strong> Ваше сообщение успешно отправлено в редакцию. Мы свяжемся с вами в ближайшее время.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <div>
                            <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>Ваше имя:</label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
                                placeholder="Введите имя..."
                            />
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>Электронная почта:</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>Сообщение:</label>
                            <textarea 
                                rows="5"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                required
                                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
                                placeholder="Текст вашего сообщения или новости..."
                            />
                        </div>

                        <button 
                            type="submit" 
                            style={{ background: "#b81d24", color: "#fff", padding: "12px 20px", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", fontSize: "15px", alignSelf: "flex-start" }}
                        >
                            Отправить сообщение
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};