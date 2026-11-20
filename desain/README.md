# Portfólio Crijolise Morglia Marçal — Design Brief

Brief untuk **Claude Code**: semua informasi yang dibutuhkan untuk membangun website portofolio ini dari desain di folder `design/`.
Desain (file HTML/PDF hasil ekspor) adalah **acuan visual yang harus diikuti persis**. File ini adalah sumber untuk warna, font, ukuran, aturan, dan semua teks.

---

## 1. Ringkasan

| Item | Isi |
|---|---|
| Pemilik | Crijolise Morglia Marçal ("Querry") |
| Profesi (wajib menonjol) | **Junior Full-Stack Web Developer** · Portugal |
| Bahasa website | Portugis (Portugal), `lang="pt-PT"` |
| Domain & hosting | Vercel (domain sendiri) |
| Website lama (sumber konten) | https://crijolise.com |

## 2. Teknologi

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS** (token di bawah dimasukkan ke `tailwind.config` / `@theme`)
- Font lewat `next/font/google`
- Gambar lewat `next/image`, file di `public/`
- Ikon teknologi: **Devicon** (https://devicon.dev)
- Deploy: push ke GitHub → import di Vercel

### Prompt untuk Claude Code

```
Baca README.md ini dan file desain di folder design/.
Bangun portofolio ini dengan Next.js (App Router), React, TypeScript, dan Tailwind CSS.
Ikuti desainnya persis. Simpan semua konten di folder data/ dan buat satu komponen per section.
Patuhi warna, tipografi, breakpoint, dan aturan di README. Semua teks dalam bahasa Portugis.
Siapkan untuk deploy ke Vercel.
```

---

## 3. Warna — palet "Hot Orange"

Satu aksen saja (jingga). Latar gelap, teks putih.

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `bg` | `#0E0E0E` | Latar utama |
| `bg-alt` | `#080808` | Section selang-seling (Sobre, Projetos) |
| `card` | `#262626` | Kartu, kotak ikon, tombol menu |
| `text` | `#FFFFFF` | Teks utama |
| `text-muted` | `rgba(255,255,255,0.75–0.9)` | Paragraf, teks sekunder |
| `border` | `rgba(255,255,255,0.14)` | Garis tepi kartu |
| `accent` | `#FBA92C` | Tombol utama, titik di logo, sorotan, kartu ReservaJá, pita teknologi |
| `accent-soft` | `rgba(251,169,44,0.12)` | Latar badge section |
| `on-accent` | `#0E0E0E` | Teks di atas jingga |

Aturan 60-30-10: ±60% latar gelap, ±30% teks/kartu, ±10% jingga. Jingga hanya untuk hal yang harus menarik perhatian.

## 4. Tipografi

| Font | Dipakai untuk | Weight |
|---|---|---|
| **Outfit** | Judul, menu, tombol, label, nama | 400, 500, 700, 800 |
| **Lora** (serif) | Semua paragraf | 400, 500 |
| **JetBrains Mono** | Stiker kode dan teks footer | 400 |

### Skala ukuran font

| Peran | PC (px) | HP (px) |
|---|---|---|
| Nama raksasa "crijolise." | `clamp(96px, 19vw, 260px)` | otomatis (clamp) |
| Judul proyek di halaman detail | 56 | 36–40 |
| Judul kartu ReservaJá | 56 | 40 |
| Judul section | 40 | 28–32 |
| Profesi di hero ("Junior Full-Stack Web Developer") | 32 | 28 |
| Subjudul | 24 | 20 |
| Nama proyek di kartu | 20 | 20 |
| Paragraf pembuka (hero, detail proyek) | 18 | 16 |
| **Paragraf (base)** | **16** | **16** |
| Menu, tombol, teks sekunder | 14 | 14 |
| Label, tag, badge (huruf kapital, letter-spacing 0.14–0.18em) | 12 | 12 |

Paragraf tidak pernah di bawah 16 px. Ukuran terkecil 12 px.

## 5. Shadow, radius, spacing

- **Shadow kecil saja** (jangan dibesarkan):
  - Kartu: `0 4px 12px rgba(0,0,0,0.25)`
  - Kartu ReservaJá: `0 6px 16px rgba(0,0,0,0.3)`
  - Tombol jingga: `0 2px 8px rgba(251,169,44,0.18)`
  - Kotak ikon: `0 2px 6px rgba(0,0,0,0.22)`
  - Foto hero: `filter: drop-shadow(0 8px 14px rgba(0,0,0,0.3))`
- **Radius:** tombol pill `999px` atau `10–12px`; kartu `18–22px`; kartu ReservaJá `28px`; kotak ikon `10–12px`.
- **Container:** max-width 1200px (hero 1280px), padding samping 24px. Padding vertikal section ±88–96px.

## 6. Aturan desain

- **Tanpa anak panah** (↗ → ↓) di tombol atau link.
- Tidak ada persentase skill palsu. Level hanya "À vontade" dan "Familiaridade".
- Foto di hero **selalu di tengah**.
- Seluruh kartu proyek bisa diklik dan membuka halaman detailnya.
- Animasi pita teknologi berhenti jika `prefers-reduced-motion: reduce`.
- Aksesibel: `<button>` dan `<a>` asli, `alt` di semua gambar, `aria-label` di tombol ikon, kontras teks minimal 4.5:1.

---

## 7. Struktur proyek

```
app/
  layout.tsx                 font, metadata, lang="pt-PT", favicon
  page.tsx                   Header, Hero, Sobre, Experiencia, Competencias, Projetos, Contactos, Footer
  projetos/[slug]/page.tsx   satu template detail proyek (generateStaticParams dari data/projetos.ts)
components/                  satu komponen per section + Logo, Button, Tag, ProjectCard, FeaturedProject
data/
  projetos.ts
  experiencias.ts
  competencias.ts
public/
  retrato.png                ilustrasi (latar transparan)
  favicon.svg                ikon "cm"
  projetos/                  gambar proyek
```

Menambah proyek atau pengalaman baru cukup dengan menambah satu entri di `data/`.

## 8. Halaman utama — urutan dan isi

### 8.1 Header
- Kiri: logo "cm" (lihat §11) + wordmark **crijolise marçal** (titik di akhir berwarna jingga).
- Tengah: menu — Início · Sobre · Experiência · Competências · Projetos · Contactos. Item aktif: garis bawah jingga.
- Kanan: tombol jingga **Contacte-me** → `mailto:crijolisemor25@gmail.com`.

### 8.2 Hero (`#inicio`)
- Badge: ● **DISPONÍVEL PARA NOVAS OPORTUNIDADES**
- Teks kecil jingga "OLÁ, EU SOU", lalu nama raksasa **crijolise.** di tengah (titik jingga).
- Di bawahnya tiga kolom, **foto di tengah**; kolom kiri dan kanan sama lebar:
  - **Kiri:** "PORTUGAL" (label) · **Junior** / **Full-Stack Web Developer** (32px, bagian kedua jingga) · garis jingga pendek.
  - **Tengah:** ilustrasi `retrato.png` (480px) di depan lingkaran jingga 400px + cincin putus-putus 470px. Foto menimpa bagian bawah nama raksasa (`margin-top: -9vw`).
  - **Kanan (rata kanan):** paragraf + tombol **Ver projetos** (jingga) dan **Descarregar CV** (garis putih).
- Paragraf: *Desenvolvo aplicações web com foco no frontend e no backend, combinando uma formação em Design Multimédia com aprendizagem prática em desenvolvimento web.*
- Pita jingga berjalan (ticker): HTML ✦ CSS ✦ JavaScript ✦ PHP ✦ React ✦ TypeScript ✦ Node.js ✦ Tailwind CSS ✦ MySQL ✦ PostgreSQL ✦ Docker ✦ Git ✦

### 8.3 Sobre mim (`#sobre`, latar `bg-alt`, rata tengah)
- Badge: SOBRE MIM
- Judul: **Design, código e vontade de evoluir.**
- Paragraf:
  1. Sou Crijolise, venho de Timor-Leste e concluí a Licenciatura em Design e Multimédia na Universidade de Coimbra.
  2. Atualmente, dedico-me ao desenvolvimento web, explorando tanto o frontend como o backend.
  3. Gosto de aprender, experimentar novas ideias e continuar a evoluir através de novos projetos.
- Tombol garis: **Ver experiência** → `#experiencia`

### 8.4 Experiência (`#experiencia`)
- Kiri: badge EXPERIÊNCIA · judul **Aprendizagem em contexto real.** · *O meu percurso profissional, do mais recente para o mais antigo.*
- Kanan: daftar kartu pengalaman (tanpa titik/garis timeline). Data:

```ts
{
  type: 'ESTÁGIO', place: 'AVEIRO',
  period: '1 de junho de 2026 — atualidade',
  company: 'BSWebConnect',
  title: 'Desenvolvimento da aplicação ReservaJá',
  desc: 'Durante o estágio, desenvolvo a ReservaJá, uma aplicação web de marcação entre profissionais e clientes, com funcionalidades de gestão de reservas, pagamentos online e outras ferramentas de apoio ao negócio.',
  areas: ['Frontend', 'Backend', 'Integração de dados', 'Pagamentos online'],
  link: '/projetos/reservaja', linkLabel: 'Ver projeto ReservaJá'
}
```

### 8.5 Competências (`#competencias`)
- Label COMPETÊNCIAS · judul **Tecnologias com que trabalho**
- **PC/tablet:** grid; tiap baris = kotak ikon + nama + level + bar (penuh = À vontade, setengah = Familiaridade).
- **HP (≤600px):** dua kartu, **hanya logo** (grid 5 kolom, tanpa nama/bar):
  - "À vontade com" (kotak bergaris jingga)
  - "Familiaridade"

| Teknologi | Level | Devicon class | SVG |
|---|---|---|---|
| HTML | À vontade | `devicon-html5-plain` | `html5/html5-original.svg` |
| CSS | À vontade | `devicon-css3-plain` | `css3/css3-original.svg` |
| Bootstrap | À vontade | `devicon-bootstrap-plain` | `bootstrap/bootstrap-original.svg` |
| JavaScript | À vontade | `devicon-javascript-plain` | `javascript/javascript-original.svg` |
| PHP | À vontade | `devicon-php-plain` | `php/php-original.svg` |
| React | Familiaridade | `devicon-react-original` | `react/react-original.svg` |
| Vite | Familiaridade | `devicon-vitejs-plain` | `vitejs/vitejs-original.svg` |
| Tailwind CSS | Familiaridade | `devicon-tailwindcss-original` | `tailwindcss/tailwindcss-original.svg` |
| TypeScript | Familiaridade | `devicon-typescript-plain` | `typescript/typescript-original.svg` |
| MySQL | Familiaridade | `devicon-mysql-plain` | `mysql/mysql-original.svg` |
| PostgreSQL | Familiaridade | `devicon-postgresql-plain` | `postgresql/postgresql-original.svg` |
| Node.js | Familiaridade | `devicon-nodejs-plain` | `nodejs/nodejs-original.svg` |
| Express | Familiaridade | `devicon-express-original` | `express/express-original.svg` |
| Git | Familiaridade | `devicon-git-plain` | `git/git-original.svg` |
| GitHub | Familiaridade | `devicon-github-original` | `github/github-original.svg` |
| Docker | Familiaridade | `devicon-docker-plain` | `docker/docker-original.svg` |

URL SVG: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/<path>`. Nama ikon perlu dicek sekali di devicon.dev.

### 8.6 Projetos (`#projetos`, latar `bg-alt`)
- Label PROJETOS · judul **Aplicações que estou a construir** · kanan: "05 projetos · clique para ver detalhes"
- **Kartu ReservaJá (proyek utama), lebar penuh:** latar jingga, badge navy "★ PROJETO PRINCIPAL", judul 56px, kalimat pendek, tag (latar gelap), tombol gelap **Ver projeto completo**, keterangan "EM DESENVOLVIMENTO · ESTÁGIO BSWEBCONNECT", gambar dalam mockup jendela browser yang sedikit miring (−2°), angka "01" raksasa samar di latar.
- **4 kartu lain (grid):** gambar di atas (badge nomor di pojok), lalu nama, tag teknologi, tombol jingga **Ver projeto completo**. PC 4 kolom, tablet 2–3, HP 1.

### 8.7 Contactos (`#contactos`)
Dua kolom, jarak lebar (gap 120px, HP 56px):
- Kiri: label CONTACTOS · **Vamos trabalhar juntos?** · *Estou disponível para conversar sobre projetos, oportunidades e novas formas de aprender.* · tombol **Enviar email**.
- Kanan: SIGA-ME → GitHub · Crijo-Mcal, crijolisemor25@gmail.com, Descarregar CV (masing-masing dengan kotak ikon).

### 8.8 Footer
- `© 2026 Crijolise Morglia Marçal. Todos os direitos reservados.`
- (mono) `<code exists /> aprendendo a construir.`

## 9. Halaman detail proyek (`/projetos/[slug]`)

Urutan: header (logo + tombol **Voltar aos projetos**) → gambar besar 21:9 → badge "nomor · kategori", judul 56px, deskripsi (18px) → tombol **Ver demo do website** (jingga) dan **Ver repositório no GitHub** (garis) → kartu **Sobre o projeto** ("O que a aplicação faz", daftar fitur), **Tecnologias**, **Contexto** (hanya ReservaJá), **Tipo** → footer.

```ts
export const projetos = [
  {
    slug: 'reservaja', num: '01', kind: 'PROJETO EM DESTAQUE', name: 'ReservaJá', featured: true,
    type: 'Aplicação web full-stack · em desenvolvimento no estágio',
    desc: 'Aplicação web de marcação para clientes e profissionais, com serviços, horários, sistema de reservas, pagamentos online e avaliações.',
    features: ['Gestão de serviços e horários dos profissionais', 'Sistema de reservas para clientes', 'Pagamentos online com Stripe', 'Avaliações dos serviços'],
    tags: ['HTML', 'CSS', 'PHP', 'JavaScript', 'Bootstrap', 'MySQL', 'Stripe'],
    live: '', repo: '', // [links a adicionar]
    context: { label: 'ESTÁGIO BSWEBCONNECT', title: 'Frontend & Backend', text: 'Desenvolvimento de interfaces, funcionalidades backend, integração de dados e implementação de novas funcionalidades para a aplicação.' }
  },
  {
    slug: 'to-do-list', num: '02', kind: 'FRONTEND · BACKEND · API', name: 'To-Do List',
    type: 'Aplicação web full-stack',
    desc: 'Aplicação de gestão de tarefas desenvolvida para explorar autenticação e autorização em aplicações React.',
    features: ['Criação e gestão de tarefas', 'Autenticação de utilizadores com JWT', 'Autorização de acesso aos dados', 'Base de dados PostgreSQL'],
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'JWT', 'PostgreSQL'],
    live: '', repo: '' // [links a adicionar]
  },
  {
    slug: 'weather-app', num: '03', kind: 'FRONTEND · BACKEND · API', name: 'Weather App',
    type: 'Aplicação web · frontend e backend separados',
    desc: 'Aplicação web para consultar informações meteorológicas através de uma arquitetura frontend e backend separada.',
    features: ['Consulta de informações meteorológicas', 'Frontend em React com TypeScript e Vite', 'Backend em Express', 'Redis integrado no backend'],
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express', 'Redis'],
    live: 'https://weather-app.crijolise.com/', repo: 'https://github.com/Crijo-Mcal/Weather-API'
  },
  {
    slug: 'movie-explorer', num: '04', kind: 'FRONTEND · API', name: 'Movie Explorer',
    type: 'Aplicação web frontend',
    desc: 'Aplicação web para pesquisar e explorar informações sobre filmes através de uma API.',
    features: ['Pesquisa de filmes', 'Exploração de informações sobre cada filme', 'Dados obtidos através de uma API'],
    tags: ['React', 'Vite', 'API', 'Tailwind CSS'],
    live: 'https://movie-explorer.crijolise.com/', repo: 'https://github.com/Crijo-Mcal/Movie-Explorer'
  },
  {
    slug: 'recipe-finder', num: '05', kind: 'FRONTEND · API', name: 'Recipe Finder',
    type: 'Aplicação web frontend',
    desc: 'Aplicação web para pesquisar e explorar receitas através de uma API.',
    features: ['Pesquisa de receitas', 'Exploração de cada receita', 'Dados obtidos através de uma API'],
    tags: ['React', 'Vite', 'API', 'Tailwind CSS'],
    live: 'https://recipe-finder.crijolise.com/', repo: 'https://github.com/Crijo-Mcal/Recipe-Finder'
  }
];
```

Jika `live`/`repo` kosong, tombol tetap tampil tetapi nonaktif dengan catatan kecil "[links a adicionar]".

## 10. Responsif

| Breakpoint | Perubahan |
|---|---|
| ≥ 901px (PC) | Layout lengkap seperti di atas |
| ≤ 900px (tablet) | Menu → tombol hamburger 44×44 (harus benar-benar membuka menu). Hero ditumpuk di tengah: nama → foto → profesi → paragraf → tombol. Lingkaran jingga selalu bulat: `width: min(400px, 86vw); aspect-ratio: 1/1`. Gambar kartu ReservaJá pindah ke atas. |
| ≤ 600px (HP) | Tombol "Contacte-me" di header disembunyikan. Competências jadi kartu logo. Kartu ReservaJá: padding 24px, judul 40px. Kartu proyek 1 kolom. Judul memakai skala HP (§4). |

## 11. Logo dan aset

- **Ikon "cm"** (juga favicon), SVG 64×64:

```html
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="14" fill="#FFFFFF"/>
  <path d="M25 46 A11 11 0 0 1 25 24 A8.5 8.5 0 0 1 33.5 32.5 V46 M33.5 32.5 A8.5 8.5 0 0 1 50.5 32.5 V46"
        fill="none" stroke="#0E0E0E" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="51" cy="14" r="5.5" fill="#FBA92C"/>
</svg>
```

- **Wordmark:** "crijolise marçal" — Outfit 800, `letter-spacing: -0.03em`, titik akhir jingga.
- **Aset di folder `assets/`** (salin ke `public/`):
  - `retrato.png` — ilustrasi hero, latar transparan
  - `favicon.svg` — ikon "cm"
  - `projetos/*.png` — gambar proyek sementara (ganti dengan screenshot asli)

## 12. Checklist sebelum deploy

- [ ] Semua teks dalam bahasa Portugis, `lang="pt-PT"`
- [ ] Metadata: title "Crijolise Marçal — Full-Stack Web Developer", description, favicon, Open Graph
- [ ] Menu hamburger berfungsi di tablet dan HP
- [ ] Ikon Devicon tampil di Competências
- [ ] Link demo & repo ReservaJá dan To-Do List diisi (jika sudah ada)
- [ ] Gambar proyek diganti screenshot asli
- [ ] Dicek di 390px, 834px, dan 1440px
- [ ] Push ke GitHub → deploy di Vercel → sambungkan domain
