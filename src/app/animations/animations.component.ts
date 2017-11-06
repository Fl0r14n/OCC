import {
  animate,
  AnimationStyleMetadata,
  group,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata
} from '@angular/animations';
import {Component} from '@angular/core';

export interface AnimationsDescriptor {
  name?: string
  value?: any
  values?: any[]
  timing?: number
}

const easeIn = (timing: number): string => {
  return `${timing}s ease-in`;
};

const ease = (timing: number): string => {
  return `${timing}s ease`;
};

const animation = (name: string,
                   from: AnimationStyleMetadata,
                   to: AnimationStyleMetadata,
                   timings: string): AnimationTriggerMetadata => {
  return trigger(name, [
    state('inactive', from),
    state('active', to),
    state('in', to),
    transition('inactive => active', animate(timings)),
    transition('active => inactive', animate(timings)),
    transition('void => in', [from, animate(timings)]),
  ]);
};

@Component({template: ''})
export class AnimationsComponent {

  static show({name = 'show', value = 'block', timing = 2}: AnimationsDescriptor = {}): any {
    let timings = easeIn(timing);
    let from = style({
      display: 'none'
    });
    let to = style({
      display: value
    });
    return animation(name, from, to, timings);
  }

  static hide({name = 'hide', value = 'block', timing = 2}: AnimationsDescriptor = {}): any {
    let timings = easeIn(timing);
    let from = style({
      display: value
    });
    let to = style({
      display: 'none'
    });
    return animation(name, from, to, timings);
  }

  static rotate({name = 'rotate', value = 45, timing = 0.3}: AnimationsDescriptor = {}): any {
    let timings = easeIn(timing);
    let from = style({
      transform: `rotate(0deg)`
    });
    let to = style({
      transform: `rotate(${value}deg)`
    });
    return animation(name, from, to, timings);
  }

  static rotateAndTranslateY({name = 'rotate', value = null, values = [45, '-100%'], timing = 0.3}: AnimationsDescriptor = {}): any {
    let timings = easeIn(timing);
    let rotate = value || values[0];
    let translate = values[1];
    let from = style({
      transform: `rotate(0deg) translateY(0)`
    });
    let to = style({
      transform: `rotate(${rotate}deg) translateY(${translate})`
    });
    return animation(name, from, to, timings);
  }

  static dim({name = 'dim', value = 0, timing = 0.3}: AnimationsDescriptor = {}): any {
    let timings = easeIn(timing);
    let from = style({
      opacity: 'initial'
    });
    let to = style({
      opacity: value
    });
    return animation(name, from, to, timings);
  }

  static bolder({name = 'bolder', value = 900, timing = 0.3}: AnimationsDescriptor = {}): any {
    let timings = easeIn(timing);
    let from = style({
      fontWeight: 'initial'
    });
    let to = style({
      fontWeight: value
    });
    return animation(name, from, to, timings);
  }

  static scale({name = 'scale', value = 1.1, timing = 0.3}: AnimationsDescriptor = {}): any {
    let timings = easeIn(timing);
    let from = style({
      zIndex: '1',
      transform: 'scale(1)'
    });
    let to = style({
      zIndex: '2',
      transform: `scale(${value})`
    });
    return animation(name, from, to, timings);
  }

  static scaleY({name = 'scale', value = 1.1, timing = 0.3}: AnimationsDescriptor = {}): any {
    let timings = easeIn(timing);
    let from = style({
      zIndex: '1',
      transform: 'scaleY(1)'
    });
    let to = style({
      zIndex: '2',
      transform: `scaleY(${value})`
    });
    return animation(name, from, to, timings);
  }

  static scaleX({name = 'scale', value = 1.1, timing = 0.3}: AnimationsDescriptor = {}): any {
    let timings = easeIn(timing);
    let from = style({
      zIndex: '1',
      transform: 'scaleX(1)'
    });
    let to = style({
      zIndex: '2',
      transform: `scaleX(${value})`
    });
    return animation(name, from, to, timings);
  }

  static grow({name = 'grow', timing = 0.5, value = '100%'}: AnimationsDescriptor = {}): any {
    let timings = ease(timing);
    let from = style({
      height: '*'
    });
    let to = style({
      height: `${value}`
    });
    return animation(name, from, to, timings);
  }

  static expand({name = 'expand', timing = 0.5}: AnimationsDescriptor = {}): any {
    let timings = ease(timing);
    let from = style({
      height: 0,
      opacity: 0,
      overflow: 'hidden'
    });
    let to = style({
      height: '*',
      opacity: 1,
      overflow: 'hidden'
    });
    return animation(name, from, to, timings);
  }

  static collapse({name = 'collapse', timing = 0.5}: AnimationsDescriptor = {}): any {
    let timings = ease(timing);
    let from = style({
      height: '*',
      opacity: 1,
      overflow: 'hidden'
    });
    let to = style({
      height: 0,
      opacity: 0,
      overflow: 'hidden'
    });
    return animation(name, from, to, timings);
  }

  static flyInX({name = 'flyInX', value = '-100%', timing = 0.5}: AnimationsDescriptor = {}): any {
    let timings = ease(timing);
    let from = style({
      transform: `translateX(${value})`,
    });
    let to = style({
      transform: 'translateX(0)',
    });
    return animation(name, from, to, timings);
  }

  static flyOutX({name = 'flyOutX', value = '-100%', timing = 0.5}: AnimationsDescriptor = {}): any {
    let timings = ease(timing);
    let from = style({
      transform: 'translateX(0)',
    });
    let to = style({
      transform: `translateX(${value})`,
    });
    return animation(name, from, to, timings);
  }

  static flyInY({name = 'flyInY', value = '-100%', timing = 0.5}: AnimationsDescriptor = {}): any {
    let timings = ease(timing);
    let from = style({
      transform: `translateY(${value})`
    });
    let to = style({
      transform: 'translateY(0)'
    });
    return animation(name, from, to, timings);
  }

  static flyOutY({name = 'flyOutY', value = '-100%', timing = 0.5}: AnimationsDescriptor = {}): any {
    let timings = ease(timing);
    let from = style({
      transform: `translateY(0)`,
    });
    let to = style({
      transform: `translateY(${value})`,
    });
    return animation(name, from, to, timings);
  }

  static showAndFlyOutY({name = 'flyOutY', value = null, values = ['-100%', 'initial'], timing = 0.5}: AnimationsDescriptor = {}): any {
    let timings = ease(timing);
    let translate = value || values[0];
    let display = values[1];
    let from = style({
      transform: 'translateY(0)',
      display: 'none'
    });
    let to = style({
      transform: `translateY(${translate})`,
      display: display
    });
    return animation(name, from, to, timings);
  };

  static flyOutYCollapse({name = 'flyOutY', value = '-100%', timing = 0.5}: AnimationsDescriptor = {}): any {
    let timings = ease(timing);
    let from = style({
      height: '*',
      opacity: 1,
      transform: 'translateY(0)'
    });
    let to = style({
      height: 0,
      opacity: 0,
      transform: `translateY(${value})`
    });
    return animation(name, from, to, timings);
  }

  static growAndGetOver({name = 'grow', timing = 0.5,  values = ['100%', 'initial', '40%']}: AnimationsDescriptor = {}): any {
    let timings = ease(timing);
    let height =  values[0];
    let translate = values[1];
    let width = values[2];
    let from = style({
      height: '*',
      width: `${width}`,
      zIndex: '1',
      transform: `translateY(${translate})`
    });
    let to = style({
      height: `${height}`,
      width: '*',
      zIndex: '2',
      transform: 'translateY(0)'
    });
    return animation(name, from, to, timings);
  }
}
