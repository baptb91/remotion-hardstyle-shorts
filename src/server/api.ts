import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Endpoint pour générer une vidéo avec les données de beats
app.post('/generate-video', upload.single('audio'), async (req, res) => {
  try {
    const { kickTimes, dropTimes, buildUpTimes, duration = 30 } = req.body;
    
    // Parse les timestamps si ils sont en string
    const parsedKickTimes = Array.isArray(kickTimes) ? kickTimes : JSON.parse(kickTimes || '[]');
    const parsedDropTimes = Array.isArray(dropTimes) ? dropTimes : JSON.parse(dropTimes || '[]');
    const parsedBuildUpTimes = Array.isArray(buildUpTimes) ? buildUpTimes : JSON.parse(buildUpTimes || '[]');

    console.log('Génération vidéo avec:', {
      kickTimes: parsedKickTimes,
      dropTimes: parsedDropTimes,
      buildUpTimes: parsedBuildUpTimes,
      duration
    });

    // Bundle le projet Remotion
    const bundled = await bundle({
      entryPoint: path.resolve('./src/index.ts'),
      webpackOverride: (config) => config,
    });

    // Sélectionne la composition
    const composition = await selectComposition({
      serveUrl: bundled,
      id: 'MainComposition',
      inputProps: {
        kickTimes: parsedKickTimes,
        dropTimes: parsedDropTimes,
        buildUpTimes: parsedBuildUpTimes,
      },
    });

    // Ajuste la durée basée sur les paramètres
    const durationInFrames = Math.floor(duration * 60); // 60fps

    const outputPath = `out/hardstyle-${Date.now()}.mp4`;

    // Render la vidéo
    await renderMedia({
      composition: {
        ...composition,
        durationInFrames,
      },
      serveUrl: bundled,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: {
        kickTimes: parsedKickTimes,
        dropTimes: parsedDropTimes,
        buildUpTimes: parsedBuildUpTimes,
      },
    });

    res.json({
      success: true,
      videoPath: outputPath,
      message: 'Vidéo générée avec succès!'
    });

  } catch (error) {
    console.error('Erreur génération vidéo:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la génération';
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
});

// Endpoint pour servir les vidéos générées
app.get('/video/:filename', (req, res) => {
  const filename = req.params.filename;
  const videoPath = path.resolve(`out/${filename}`);
  res.sendFile(videoPath);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur Remotion hardstyle démarré sur le port ${PORT}`);
  console.log(`📹 Prêt à générer des vidéos YouTube Shorts!`);
});
