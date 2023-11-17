export type AnimationObject = [Keyframe[], KeyframeAnimationOptions];

export const rightFadeinAnimation = [
  [
    { opacity: '0', transform: 'translateX(10px)', visibility: 'hidden' },
    { opacity: '1', transform: 'translateX(0px)', visibility: 'visible' },
  ],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
] as AnimationObject;

export const rightFadeoutAnimation = [
  [
    { opacity: '1', transform: 'translateX(0px)', visibility: 'visible' },
    { opacity: '0', transform: 'translateX(-10px)', visibility: 'hidden' },
  ],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
] as AnimationObject;

export const leftFadeinAnimation = [
  [
    { opacity: '0', transform: 'translateX(-10px)', visibility: 'hidden' },
    { opacity: '1', transform: 'translateX(0px)', visibility: 'visible' },
  ],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
] as AnimationObject;

export const leftFadeoutAnimation = [
  [
    { opacity: '1', transform: 'translateX(0px)', visibility: 'visible' },
    { opacity: '0', transform: 'translateX(10px)', visibility: 'hidden' },
  ],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
] as AnimationObject;

export const bottomFadeinAnimation = [
  [
    { opacity: '0', transform: 'translateY(10px)', visibility: 'hidden' },
    { opacity: '1', transform: 'translateY(0px)', visibility: 'visible' },
  ],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
] as AnimationObject;

export const bottomFadeoutAnimation = [
  [
    { opacity: '1', transform: 'translateY(0px)', visibility: 'visible' },
    { opacity: '0', transform: 'translateY(-10px)', visibility: 'hidden' },
  ],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
] as AnimationObject;

export const topFadeinAnimation = [
  [
    { opacity: '0', transform: 'translateY(-10px)', visibility: 'hidden' },
    { opacity: '1', transform: 'translateY(0px)', visibility: 'visible' },
  ],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
] as AnimationObject;

export const topFadeoutAnimation = [
  [
    { opacity: '1', transform: 'translateY(0px)', visibility: 'visible' },
    { opacity: '0', transform: 'translateY(10px)', visibility: 'hidden' },
  ],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
] as AnimationObject;

export const opacityFadeinAnimation = [
  [
    { opacity: '0', visibility: 'hidden' },
    { opacity: '1', visibility: 'visible' },
  ],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
] as AnimationObject;

export const opacityFadeoutAnimation = [
  [
    { opacity: '1', visibility: 'visible' },
    { opacity: '0', visibility: 'hidden' },
  ],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
] as AnimationObject;
