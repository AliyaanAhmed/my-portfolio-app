export type Role = { title: string; dates: string; description: string; current?: boolean };
export type Employer = { name: string; location: string; type: string; roles: Role[] };
export const experience: Employer[] = [
  { name: 'Datanox', location: 'Karachi, Pakistan', type: 'Employment', roles: [
    { title: 'Power Platform Consultant — Code Apps (React/TS), Power Pages, AI & Frontend Architecture', dates: 'February 2026–Present', current: true, description: 'Focus: Power Apps Code Apps with React and TypeScript, Power Pages, AI integration, and frontend architecture.' },
    { title: 'Microsoft Power Pages Consultant & Frontend Developer', dates: 'March 2025–April 2026', description: 'Focus: Power Pages interfaces and frontend development for enterprise applications.' },
    { title: 'UI/UX Consultant', dates: 'August 2024–March 2025', description: 'Focus: interface design and user experience for digital products.' },
  ]},
  { name: 'MechConnect', location: 'Remote · Frankfurt-based company', type: 'Contract', roles: [{ title: 'Frontend Developer', dates: 'March 2024–July 2024', description: 'Frontend development using React, SASS, Axios, JavaScript, and API integration.' }] },
  { name: 'Seamless Solutions Pvt Ltd', location: 'Karachi, Pakistan', type: 'Employment', roles: [ { title: 'Frontend Developer', dates: 'October 2023–June 2024', description: 'Focus: frontend development and web interfaces.' }, { title: 'Junior Web Developer', dates: 'July 2023–October 2023', description: 'Early software development experience building web interfaces.' } ] },
  { name: 'Next Generation Esports', location: 'Karachi, Pakistan', type: 'Earlier chapter · Operations', roles: [ { title: 'Head of Operations', dates: 'July 2022–January 2023', description: 'An earlier chapter in operations and coordination, before my software development career.' }, { title: 'Senior League Operation Executive', dates: 'September 2021–June 2022', description: 'League operations and coordination.' }, { title: 'Junior In-Game Director', dates: 'August 2020–August 2021', description: 'In-game direction and operational coordination.' } ] },
];
