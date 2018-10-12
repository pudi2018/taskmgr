import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/img';
  const avatarDir = `${imgDir}/avatar`;
  const iconDir = `${imgDir}/icons`;

  ir.addSvgIcon('check', ds.bypassSecurityTrustResourceUrl('assets/check.svg'));

  ir.addSvgIconSetInNamespace('avatars', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));

  ir.addSvgIcon('move', ds.bypassSecurityTrustResourceUrl(`${iconDir}/move.svg`));

  ir.addSvgIcon('unassigned', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/unassigned.svg`));
};
