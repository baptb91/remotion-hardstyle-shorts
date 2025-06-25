import {Config} from '@remotion/cli/config';

// Configuration optimisée pour YouTube Shorts (9:16)
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv420p');
Config.setCodec('h264');
Config.setCrf(18); // Qualité élevée pour les effets visuels

// Format YouTube Shorts
Config.setHeight(1920); // Portrait
Config.setWidth(1080);
Config.setFps(60); // 60fps pour les effets fluides

// Optimisations pour Render.com
Config.setChromiumOpenGlRenderer('egl');
Config.setBrowserExecutable(null);
Config.setChromiumHeadlessMode(true);
Config.setConcurrency(1); // Évite les problèmes mémoire

// Performance
Config.setMaxTimelineTracks(15);
Config.setTimeoutInMilliseconds(120000); // 2 minutes timeout
