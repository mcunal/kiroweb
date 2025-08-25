import React, { useState } from 'react';
import './iletisim.css';

const Iletisim = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('Gönderiliyor...');

        try {
            const response = await fetch('http://localhost:5001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus(result.message);
                setFormData({ name: '', email: '', message: '' }); // Formu temizle
            } else {
                throw new Error(result.message || 'Bir hata oluştu.');
            }
        } catch (error) {
            setStatus(`Hata: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
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
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                        </button>
                        {status && (
                            <p className={`form-status ${status.startsWith('Hata') ? 'error' : 'success'}`}>{status}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Iletisim;