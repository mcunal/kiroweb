import React, { useState } from 'react';
import './iletisim.css';

const Iletisim = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form gönderim işlemleri burada ele alınabilir
        console.log('Form gönderildi:', formData);
    };

    return (
        <div className="iletisim-container">
            <div className="container">
                <h2 className="section-title">İletişime Geçin</h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Bağlantı Kuralım</h3>
                        <p>
                            Ürünlerimiz hakkında sorularınız mı var veya iş birliği mi yapmak
                            istiyorsunuz? Sizden haber almak isteriz!
                        </p>
                        <div className="contact-methods">
                            <div className="contact-method">
                                <div className="method-icon">📧</div>
                                <div>
                                    <h4>E-posta</h4>
                                    <p>hello@luminesans.com</p>
                                </div>
                            </div>
                            <div className="contact-method">
                                <div className="method-icon">📱</div>
                                <div>
                                    <h4>Instagram</h4>
                                    <p>@luminesans_</p>
                                </div>
                            </div>
                            <div className="contact-method">
                                <div className="method-icon">🌐</div>
                                <div>
                                    <h4>Web Sitesi</h4>
                                    <p>www.luminesans.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">İsim</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-posta</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Mesaj</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Mesaj Gönder</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Iletisim;