import React from 'react';
import { Composition } from 'remotion';
import { HardstyleVideo } from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainComposition"
        component={HardstyleVideo}
        durationInFrames={1800} // 30 secondes à 60fps
        fps={60}
        width={1080}
        height={1920}
        defaultProps={{
          kickTimes: [1, 2, 3, 5, 6, 7, 9, 10, 11], // Exemple de timestamps
          dropTimes: [4, 8, 12],
          buildUpTimes: [3.5, 7.5, 11.5],
        }}
      />
    </>
  );
};
