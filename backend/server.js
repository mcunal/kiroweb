const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001; // Backend'in çalışacağı port
const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json()); // Gelen JSON verilerini okumak için

// Veritabanı okuma/yazma yardımcı fonksiyonları
const readDB = () => {
    const dbRaw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(dbRaw);
};

const writeDB = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// --- ÜRÜN API ROTALARI ---

// Tüm ürünleri getir
app.get('/api/products', (req, res) => {
    const db = readDB();
    res.json(db.products);
});

// Yeni ürün ekle
app.post('/api/products', (req, res) => {
    try {
        const db = readDB();
        const newProduct = { id: Date.now().toString(), ...req.body };
        db.products.push(newProduct);
        writeDB(db);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Veritabanına ürün eklenirken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası: Ürün eklenemedi." });
    }
});

// Ürün güncelle
app.put('/api/products/:id', (req, res) => {
    try {
        const db = readDB();
        const productId = req.params.id;
        const updatedProduct = req.body;
        db.products = db.products.map(p => p.id === productId ? { ...p, ...updatedProduct } : p);
        writeDB(db);
        res.json(updatedProduct);
    } catch (error) {
        console.error("Veritabanında ürün güncellenirken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası: Ürün güncellenemedi." });
    }
});

// Ürün sil
app.delete('/api/products/:id', (req, res) => {
    try {
        const db = readDB();
        const productId = req.params.id;
        db.products = db.products.filter(p => p.id !== productId);
        writeDB(db);
        res.status(204).send(); // No content
    } catch (error) {
        console.error("Veritabanından ürün silinirken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası: Ürün silinemedi." });
    }
});


// --- FIRSAT SLIDER API ROTALARI ---

// Tüm fırsatları getir
app.get('/api/opportunities', (req, res) => {
    try {
        const db = readDB();
        res.json(db.opportunities);
    } catch (error) {
        console.error("Fırsatlar okunurken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası: Fırsatlar alınamadı." });
    }
});

// Yeni fırsat ekle
app.post('/api/opportunities', (req, res) => {
    try {
        const db = readDB();
        const newOpportunity = { id: Date.now().toString(), ...req.body };
        db.opportunities.push(newOpportunity);
        writeDB(db);
        res.status(201).json(newOpportunity);
    } catch (error) {
        console.error("Veritabanına fırsat eklenirken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası: Fırsat eklenemedi." });
    }
});

// Fırsat sil
app.delete('/api/opportunities/:id', (req, res) => {
    try {
        const db = readDB();
        const opportunityId = req.params.id;
        db.opportunities = db.opportunities.filter(op => op.id !== opportunityId);
        writeDB(db);
        res.status(204).send();
    } catch (error) {
        console.error("Veritabanından fırsat silinirken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası: Fırsat silinemedi." });
    }
});


app.listen(PORT, () => {
    console.log(`Backend sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});