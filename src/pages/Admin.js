import React, { useState } from "react";
import "./Admin.css";

const Admin = ({
    addProduct,
    products,
    removeProduct,
    updateProduct,
    opportunities,
    addOpportunity,
    removeOpportunity
}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [sophierUrl, setSophierUrl] = useState("");

    // Güncelleme modunu kontrol etmek için
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Fırsatlar için state
    const [newOpportunityUrl, setNewOpportunityUrl] = useState('');

    const handleSubmit = async (e) => { // async anahtar kelimesi eklendi
        e.preventDefault();
        if (!name || !price || !category || !image || !description || !sophierUrl) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        try {
            if (isEditing) {
                // Güncelleme işlemi
                await updateProduct(editingId, { // await eklendi
                    id: editingId,
                    name,
                    price,
                    category,
                    image,
                    description,
                    sophierUrl
                });
                setIsEditing(false);
                setEditingId(null);
                alert("Ürün başarıyla güncellendi!");
            } else {
                // Yeni ürün ekleme
                await addProduct({ // await eklendi
                    name, price, category, image, description, sophierUrl
                });
                alert("Ürün başarıyla eklendi!");
            }
        } catch (error) {
            console.error("Ürün işlemi sırasında hata oluştu:", error);
            alert("Ürün işlemi sırasında bir hata oluştu. Konsolu kontrol edin.");
        }

        // Formu temizle
        setName("");
        setPrice("");
        setCategory("");
        setImage("");
        setDescription("");
        setSophierUrl("");
    };

    const handleEdit = (product) => {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setImage(product.image);
        setDescription(product.description || "");
        setSophierUrl(product.sophierUrl || "");
        setIsEditing(true);
        setEditingId(product.id);

        // Formu yukarı kaydır
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingId(null);
        setName("");
        setPrice("");
        setCategory("");
        setImage("");
        setDescription("");
        setSophierUrl("");
    };

    const handleDelete = async (productId, productName) => {
        if (window.confirm(`"${productName}" ürününü silmek istediğinizden emin misiniz?`)) {
            try {
                await removeProduct(productId);
                // Eğer silinen ürün düzenleme modundaysa, düzenleme modunu iptal et
                if (editingId === productId) {
                    handleCancelEdit();
                }
                alert("Ürün başarıyla silindi!");
            } catch (error) {
                console.error("Ürün silinirken hata oluştu:", error);
                alert("Ürün silinirken bir hata oluştu. Konsolu kontrol edin.");
            }
        }
    };

    const handleAddOpportunity = async (e) => { // async anahtar kelimesi eklendi
        e.preventDefault();
        if (!newOpportunityUrl.trim()) {
            alert('Lütfen bir resim URL\'si girin.');
            return;
        }
        try {
            await addOpportunity({ // await eklendi
                imageUrl: newOpportunityUrl
            });
            setNewOpportunityUrl(''); // Formu temizle
            alert('Fırsat resmi başarıyla eklendi!');
        } catch (error) {
            console.error("Fırsat eklenirken hata oluştu:", error);
            alert("Fırsat eklenirken bir hata oluştu. Konsolu kontrol edin.");
        }
    };

    const handleRemoveOpportunity = async (id) => {
        if (window.confirm("Bu fırsat resmini silmek istediğinizden emin misiniz?")) {
            try {
                await removeOpportunity(id);
                alert("Fırsat resmi başarıyla silindi.");
            } catch (error) {
                console.error("Fırsat silinirken hata oluştu:", error);
                alert("Fırsat silinirken bir hata oluştu. Konsolu kontrol edin.");
            }
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-header">Admin Panel</h1>

            <div className="admin-section">
                <h2>Fırsat Slider'ı Yönetimi</h2>
                <form onSubmit={handleAddOpportunity} className="admin-form">
                    <input
                        type="url"
                        name="opportunityUrl"
                        placeholder="Fırsat Slider'ı için Resim URL'si"
                        value={newOpportunityUrl}
                        onChange={(e) => setNewOpportunityUrl(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Fırsat Ekle</button>
                </form>

                <h3>Mevcut Fırsatlar</h3>
                <div className="admin-list">
                    {opportunities && opportunities.length > 0 ? (
                        opportunities.map(op => (
                            <div key={op.id} className="admin-list-item">
                                <img src={op.imageUrl} alt="Fırsat" style={{ width: '150px', height: '50px', objectFit: 'cover', marginRight: '1rem', borderRadius: '4px', border: '1px solid #ddd' }} />
                                <span style={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{op.imageUrl}</span>
                                <button onClick={() => handleRemoveOpportunity(op.id)} className="btn btn-outline" style={{ borderColor: '#e63946', color: '#e63946', marginLeft: '1rem' }}>Sil</button>
                            </div>
                        ))
                    ) : (
                        <p>Henüz hiç fırsat eklenmemiş.</p>
                    )}
                </div>
            </div>

            <div className="admin-section">
                <h2>Ürün Yönetimi</h2>
                <div className="admin-content">
                    <form className="admin-form" onSubmit={handleSubmit}>
                        <h2 className="form-title">
                            {isEditing ? "Ürün Güncelle" : "Yeni Ürün Ekle"}
                        </h2>
                        {isEditing && (
                            <div className="edit-notice">
                                <p>Düzenleme modundasınız. Değişiklikleri kaydetmek için "Ürünü Güncelle" butonuna tıklayın.</p>
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="admin-btn cancel"
                                >
                                    İptal Et
                                </button>
                            </div>
                        )}

                        <label>Ürün Adı</label>
                        <input
                            type="text"
                            placeholder="Ürün Adı"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <label>Fiyat</label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Fiyat"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />

                        <label>Kategori</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Kategori Seç</option>
                            <option value="Rozet">Rozet</option>
                            <option value="Tıp Rozet">Tıp Rozet</option>
                            <option value="Eczacılık Rozet">Eczacılık Rozet</option>
                            <option value="Anahtarlık">Anahtarlık</option>
                            <option value="Duvar Süsleri">Duvar Süsleri</option>
                            <option value="Crocs Süsleri">Crocs Süsleri</option>
                            <option value="Çanta">Çanta</option>
                            <option value="Diş Hekimliği">Diş Hekimliği</option>
                            <option value="Sticker">Sticker</option>
                            <option value="Bez Çanta">Bez Çanta</option>
                            <option value="Kalemlik/Makyaj Çantası">Kalemlik/Makyaj Çantası</option>
                            <option value="Laboratuvar Ekipmanları">Laboratuvar Ekipmanları</option>
                            <option value="Diğer">Diğer</option>
                        </select>

                        <label>Ürün Açıklaması</label>
                        <textarea
                            placeholder="Ürün açıklaması yazın..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            required
                        />

                        <label>Resim URL</label>
                        <input
                            type="url"
                            placeholder="Resim URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />

                        <label>SophieR Ürün Linki</label>
                        <input
                            type="url"
                            placeholder="https://sophier.com/urun/..."
                            value={sophierUrl}
                            onChange={(e) => setSophierUrl(e.target.value)}
                            required
                        />

                        {/* Resim önizlemesi */}
                        {image && (
                            <div className="image-preview">
                                <label>Resim Önizlemesi:</label>
                                <img src={image} alt="Önizleme" className="preview-img" />
                            </div>
                        )}

                        <button type="submit" className="admin-btn primary">
                            {isEditing ? "Ürünü Güncelle" : "Ürün Ekle"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="admin-product-list">
                <h2>Mevcut Ürünler ({products.length})</h2>
                {products.length === 0 ? (
                    <p className="no-products">Henüz ürün eklenmedi.</p>
                ) : (
                    <div className="product-grid">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`product-card ${editingId === product.id ? 'editing' : ''}`}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-img"
                                />
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p className="price">{product.price}₺</p>
                                    <p className="category">{product.category}</p>
                                    {product.description && (
                                        <p className="description">
                                            {product.description.length > 100
                                                ? `${product.description.substring(0, 100)}...`
                                                : product.description
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="product-actions">
                                    {product.sophierUrl && (
                                        <button
                                            className="admin-btn sophier"
                                            onClick={() => window.open(product.sophierUrl, '_blank')}
                                        >
                                            🛒 SophieR'da Gör
                                        </button>
                                    )}
                                    <button
                                        className="admin-btn edit"
                                        onClick={() => handleEdit(product)}
                                        disabled={isEditing && editingId !== product.id}
                                    >
                                        Düzenle
                                    </button>
                                    <button
                                        className="admin-btn danger"
                                        onClick={() => handleDelete(product.id, product.name)}
                                    >
                                        Sil
                                    </button>
                                </div>
                                {editingId === product.id && (
                                    <div className="editing-indicator">
                                        Düzenleniyor...
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;