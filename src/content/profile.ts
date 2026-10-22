export const profile = {
  name: 'Syed Aliyaan Ahmed', displayName: 'Aliyaan Ahmed', location: 'Karachi, Pakistan',
  positioning: 'Microsoft Power Platform Consultant · Enterprise Frontend Developer',
  bio: 'I build applications and automations that make complex work easier to do. My focus brings together Microsoft Power Platform, Power Automate, React, and AI integration—with close attention to the people using the system.',
  links: { linkedin: 'https://www.linkedin.com/in/aliyaanahmed', email: null as string | null, github: null as string | null, resume: null as string | null },
  portrait: '/images/FormalDress.png' as string | null,
  avatar: '/images/Avatar.png',
};
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || undefined;
export const navigation = [['Work','work'],['Expertise','expertise'],['Journey','journey'],['About','about'],['Contact','contact']] as const;
export const education = [{ school: 'Salim Habib University', course: 'BS Computer Science', dates: 'September 2019–June 2023' }, { school: 'Institute of Business Administration', course: 'Diploma, Digital Marketing', dates: 'March 2024–September 2024' }];
