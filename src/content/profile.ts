export const profile = {
  name: 'Syed Aliyaan Ahmed', displayName: 'Aliyaan Ahmed', location: 'Karachi, Pakistan',
  positioning: 'Power Apps Consultant · Software Engineer',
  bio: 'Syed Aliyaan Ahmed builds enterprise applications with Power Apps, Power Pages, React, and AI, connecting clear interfaces with automated workflows.',
  links: {
    linkedin: 'https://www.linkedin.com/in/aliyaanahmed',
    linkedinMessage: 'https://www.linkedin.com/messaging/compose/?profileUrn=urn%3Ali%3Afsd_profile%3AACoAADCPvC4BWrk9PzGdE0cdiOlFuho3f4WrfHQ&recipient=ACoAADCPvC4BWrk9PzGdE0cdiOlFuho3f4WrfHQ&screenContext=NON_SELF_PROFILE_VIEW&interop=msgOverlay',
    email: null as string | null, github: null as string | null, resume: null as string | null,
  },
  portrait: '/images/FormalDress.png' as string | null,
  avatar: '/images/Avatar.png',
};
function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://www.aliyaanahmed.site';
  const url = new URL(configured);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be the public site origin, for example https://portfolio.example.com (without a path, query, or credentials).');
  }
  return url.origin;
}
export const siteUrl = getSiteUrl();
export const navigation = [['Work','work'],['Expertise','expertise'],['Journey','journey'],['About','about'],['Contact','contact']] as const;
export const education = [{ school: 'Salim Habib University', course: 'BS Computer Science', dates: 'September 2019–June 2023' }, { school: 'Institute of Business Administration', course: 'Diploma, Digital Marketing', dates: 'March 2024–September 2024' }];
