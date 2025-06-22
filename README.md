
# 🎧 Killer Reps Radio

Bienvenue sur **Killer Reps Radio** – la playlist ultime pour vos sessions de musculation. Une application moderne construite avec **Next.js 14**, **TypeScript** et **MongoDB**, dotée d'une interface dynamique avec drag-and-drop, audio player personnalisé.

![Screenshot de l’app](./public/preview.png)

---

##  Fonctionnalités

* 🎵 Lecture audio (play, pause, repeat)
* 📦 Drag-and-drop des titres (grâce à `@dnd-kit`)
* 🔁 Bouton Repeat avec effet visuel
* 💗 Bouton Like (stocké dans MongoDB)
* 📶 Lecture via une playlist backend stockée sur MongoDB Atlas
* 📱 Responsive avec TailwindCSS et animations subtiles

---

## Stack technique

* **Next.js 14 (App Router)**
* **TypeScript**
* **MongoDB Atlas** pour stocker la playlist et les likes
* **TailwindCSS** pour le style
* **@dnd-kit** pour le drag-and-drop
* **Lucide-react** pour les icônes

---

## 🧪 Démo Vercel

👉 À venir : `https://killer-reps-radio.vercel.app`

---

## 📦 Lancer en local

```bash
# 1. Cloner le repo
git clone https://https://github.com/Bor030/drag-and-drop
cd killer-reps-radio

# 2. Installer les dépendances
npm install

# 3. Ajouter un fichier .env.local avec l’URI MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/playlistDB

# 4. Démarrer le projet
turbo dev
```

---

## Organisation du projet

```
/lib/mongodb.ts        // Connexion MongoDB
/app/api/like/route.ts // API Likes
/app/api/tracks/route.ts // API Tracks
/components/           // UI (SortableRow, PlayPauseButton, etc)
/context/AudioPlayerContext.tsx // Gestion audio
```

---




