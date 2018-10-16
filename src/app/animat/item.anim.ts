import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const itemAnim = trigger('item', [
    state('in', style({'borderLeftWidth': '3px'})),
    state('out', style({'borderLeftWidth': '8px'})),
    transition('in => out', animate('200ms ease-in')),
    transition('out => in', animate('200ms ease-out')),
]);
