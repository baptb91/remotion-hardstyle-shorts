# Remotion Hardstyle Shorts Generator

Générateur d'effets visuels hardstyle pour YouTube Shorts avec synchronisation des beats.

## 🚀 Installation locale

```bash
# Clone le repository
git clone https://github.com/TON_USERNAME/remotion-hardstyle-shorts.git
cd remotion-hardstyle-shorts

# Installation des dépendances
npm install

# Démarre le studio Remotion pour prévisualiser
npm start

# Démarre le serveur API
npm run server
```

## 📁 Structure du projet

```
src/
├── Video.tsx           # Composant principal avec effets hardstyle
├── Root.tsx           # Configuration des compositions
├── index.ts           # Point d'entrée Remotion
└── server/
    └── api.ts         # Serveur API pour génération
public/
└── kickwavebass-bg.jpg # Ton image de fond
```

## 🎵 API Usage

### Générer une vidéo avec beats synchronisés

```bash
curl -X POST http://localhost:3000/generate-video \
  -H "Content-Type: application/json" \
  -d '{
    "kickTimes": [1, 2, 3, 5, 6, 7, 9, 10],
    "dropTimes": [4, 8, 12],
    "buildUpTimes": [3.5, 7.5, 11.5],
    "duration": 30
  }'
```

### Intégration avec ton système Suno

```javascript
// Exemple d'intégration
const beatData = {
  kickTimes: [1.2, 2.4, 3.6, 4.8], // Timestamps des kicks
  dropTimes: [8.0, 16.0],           // Timestamps des drops
  buildUpTimes: [7.5, 15.5],        // Timestamps des build-ups
  duration: 30                       // Durée en secondes
};

const response = await fetch('https://ton-app.onrender.com/generate-video', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(beatData)
});
```

## 🎨 Effets disponibles

- **Flash Effect** : Flash blanc synchronisé sur les kicks
- **Zoom Effect** : Zoom dramatique sur les drops
- **Particle System** : Particules énergétiques animées
- **Background Rotation** : Rotation subtile du fond
- **Energy Lines** : Lignes d'énergie rotatives
- **Dynamic Brightness** : Modulation de la luminosité

## ⚙️ Configuration format YouTube Shorts

Le projet est configuré pour :
- **Résolution** : 1080x1920 (9:16)
- **FPS** : 60 (pour des effets fluides)
- **Codec** : H.264
- **Durée** : 15-60 secondes (configurable)

## 🚀 Déploiement sur Render

1. **Connecte ton GitHub à Render.com**
2. **Crée un nouveau Web Service**
3. **Sélectionne ce repository**
4. **Render détectera automatiquement** le fichier `render.yaml`
5. **Deploy !**

## 🔧 Variables d'environnement

```env
NODE_ENV=production
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
CHROMIUM_PATH=/usr/bin/google-chrome-stable
PORT=3000
```

## 📊 Monitoring

- Health check : `/health`
- Logs de génération dans la console
- Vidéos générées dans `/out`

## 🎯 Prochaines étapes

1. Ajouter plus d'effets visuels
2. Support des logos/textes personnalisés
3. Templates de couleurs multiples
4. Cache intelligent des rendus
5. Webhook notifications

## 🤝 Contribution

1. Fork le projet
2. Crée une branche (`git checkout -b feature/amazing-effect`)
3. Commit tes changements (`git commit -m 'Add amazing effect'`)
4. Push (`git push origin feature/amazing-effect`)
5. Ouvre une Pull Request
