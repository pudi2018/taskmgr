import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const cardAnim = trigger('card', [
    state('out', style({transform: 'scale(1)', 'boxShadow': 'none'})),
    state('hover', style({transform: 'scale(1.05)', 'boxShadow': '0px 0px 10px 4px #666'})),
    transition('out => hover', animate('200ms ease-in')),
    transition('hover => out', animate('200ms ease-out')),
]);
