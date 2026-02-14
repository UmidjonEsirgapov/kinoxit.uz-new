# 🚀 Oddiy Next.js 14 Loyiha - Hostinger Uchun

Bu **juda oddiy** Next.js 14 ilovasi. Hech qanday database, authentication yoki murakkab funksiyalar yo'q.

## 📁 Loyiha Strukturasi

```
Kinoxit.uz/
├── src/
│   └── app/
│       ├── layout.tsx      # Asosiy layout
│       ├── page.tsx        # Bosh sahifa (Hello World)
│       └── globals.css     # Global stillar
├── next.config.js          # Config (standalone output)
├── tailwind.config.ts      # Tailwind sozlamalar
├── package.json            # Dependencies
└── README.md               # Inglizcha qo'llanma
```

## ✨ Nima Qilindi?

### ✅ Keraksiz fayllar o'chirildi:
- ❌ Supabase fayllari
- ❌ Prisma fayllari
- ❌ Admin paneli
- ❌ API routes
- ❌ Auth tizimi
- ❌ Components
- ❌ Murakkab .md fayllar

### ✅ Oddiy Next.js qoldi:
- ✅ Bosh sahifa (`src/app/page.tsx`)
- ✅ Layout (`src/app/layout.tsx`)
- ✅ Global CSS (`src/app/globals.css`)
- ✅ Tailwind CSS sozlamalari
- ✅ `output: 'standalone'` config (Hostinger uchun)

## 🏃 Ishga Tushirish

### 1. Dependencies O'rnatish

```bash
npm install
```

### 2. Development Server

```bash
npm run dev
```

Sahifa: [http://localhost:3000](http://localhost:3000)

### 3. Production Build

```bash
npm run build
```

Bu `.next/standalone/` papkasida production server yaratadi.

## 🎨 Bosh Sahifa

`src/app/page.tsx`:

```tsx
"use client";

export default function HomePage() {
  const handleClick = () => {
    alert("Button clicked! Next.js is working on Hostinger! 🚀");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white">
          Hello from Hostinger!
        </h1>
        <p className="text-2xl text-white/90">
          Next.js is working. 🎉
        </p>
        <button onClick={handleClick}>
          Click me
        </button>
      </div>
    </div>
  );
}
```

## 🌐 Hostinger ga Deploy Qilish

### Qisqa Yo'l:

1. **Build qiling:**
   ```bash
   npm run build
   ```

2. **Upload qiling Hostinger ga:**
   - `.next/standalone/` papkasini
   - `public/` papkasini (agar bo'lsa)

3. **SSH orqali ishga tushiring:**
   ```bash
   cd /home/username/kinoxit/.next/standalone
   node server.js
   ```

4. **PM2 bilan (auto-restart):**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "kinoxit"
   pm2 save
   pm2 startup
   ```

### Batafsil Qo'llanma:
`HOSTINGER_DEPLOY.md` faylini o'qing.

## 🔧 Muhim Config

### next.config.js

```javascript
const nextConfig = {
  output: 'standalone',  // ← Bu Hostinger uchun kerak!
}
```

Bu `standalone` rejimi:
- Minimal production server yaratadi
- Faqat kerakli fayllarni qo'shadi
- VPS/shared hosting uchun ideal

## 📝 Keyingi Qadamlar

Agar bu oddiy versiya Hostinger da ishlasa, keyin qo'shishingiz mumkin:

- [ ] Database (Prisma + MySQL)
- [ ] Admin panel
- [ ] Authentication (NextAuth.js)
- [ ] API endpoints
- [ ] Ko'proq sahifalar

## ✅ Tayyorlash Bosqichlari

1. ✅ Keraksiz .md fayllar o'chirildi
2. ✅ Murakkab kodlar olib tashlandi
3. ✅ Oddiy Next.js 14 qoldi
4. ✅ Hostinger uchun `standalone` sozlandi
5. ✅ Deploy qo'llanmasi yaratildi

## 📦 Dependencies

Faqat asosiylar:
- `next` (15.1.4)
- `react` (19.0.0)
- `react-dom` (19.0.0)
- `typescript` (5.x)
- `tailwindcss` (3.4.1)

## 🎯 Test Qilish

```bash
# Development
npm run dev
# → http://localhost:3000

# Production (locally)
npm run build
npm start
# → http://localhost:3000
```

## 💡 Maslahatlar

1. **Node.js versiya**: Hostinger da Node.js 18+ bo'lishi kerak
2. **Port**: Default 3000, o'zgartirish: `PORT=8080 node server.js`
3. **Domain**: Nginx yoki Apache reverse proxy orqali ulang
4. **SSL**: Let's Encrypt bilan bepul HTTPS

## 🐛 Muammolar?

### Agar sahifa ochilmasa:

```bash
# Node.js versiyasini tekshiring
node -v

# Port bandligini tekshiring
netstat -tulpn | grep 3000

# Loglarni ko'ring
pm2 logs kinoxit
```

### Agar build xatolik bersa:

```bash
# node_modules ni qayta o'rnating
rm -rf node_modules package-lock.json
npm install

# Cache ni tozalang
rm -rf .next
npm run build
```

## 📚 Foydali Havolalar

- [Next.js Docs](https://nextjs.org/docs)
- [Hostinger VPS Guide](https://www.hostinger.com/tutorials/vps)
- [Standalone Output](https://nextjs.org/docs/app/api-reference/next-config-js/output)

---

## 🎉 Xulosa

Sizda endi **juda oddiy** va **toza** Next.js 14 loyihasi bor:

✅ Faqat 3 ta fayl: `layout.tsx`, `page.tsx`, `globals.css`  
✅ Hech qanday database yo'q  
✅ Hech qanday authentication yo'q  
✅ Hostinger uchun tayyor (`standalone` mode)  
✅ Deploy qilish oson  

Bu oddiy versiyani ishlatib, Next.js Hostinger da qanday ishlashini test qilishingiz mumkin.

Keyin asta-sekin qo'shimcha funksiyalar qo'shishingiz mumkin!

**Omad tilayman!** 🚀

---

**Versiya**: 1.0.0 (Simple)  
**Sana**: 2026-02-14  
**Holat**: ✅ Hostinger uchun tayyor
