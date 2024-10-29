import { policiesForAllNodes } from './i-policies-for-all';
import { ugCollegePoliciesNodes } from './ii-ug-college-policies';
import { policiesForLanguageSchoolsNodes } from './iii-policies-for-the-language-schools';
import { policiesForInstituteNodes } from './iv-policies-for-the-institute';
import { policiesForSchoolsAbroadNodes } from './v-policies-for-schools-abroad';
import { policiesForInstituteOnline } from './vi-policies-for-middlebury-institute-online';
import { handbookArchiveNodes } from './vii-handbook-archive';
 
export const nodes = [
  ...policiesForAllNodes,
  ...ugCollegePoliciesNodes,
  ...policiesForLanguageSchoolsNodes,
  ...policiesForInstituteNodes,
  ...policiesForSchoolsAbroadNodes,
  ...policiesForInstituteOnline,
  ...handbookArchiveNodes
];
