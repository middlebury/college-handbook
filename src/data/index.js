import { policiesForAllNodes } from './policies-for-all';
import { ugCollegePoliciesNodes } from './ug-college-policies';
import { policiesForLanguageSchoolsNodes } from './policies-for-the-language-schools';
import { policiesForInstituteNodes } from './policies-for-the-institute';
import { policiesForSchoolsAbroadNodes } from './policies-for-schools-abroad';
import { policiesForInstituteOnline } from './policies-for-middlebury-institute-online';
import { handbookArchiveNodes } from './handbook-archive';
 
export const nodes = [
  ...policiesForAllNodes,
  ...ugCollegePoliciesNodes,
  ...policiesForLanguageSchoolsNodes,
  ...policiesForInstituteNodes,
  ...policiesForSchoolsAbroadNodes,
  ...policiesForInstituteOnline,
  ...handbookArchiveNodes
];
