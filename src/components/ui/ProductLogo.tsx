import Image from 'next/image';

export const productLogos = {
  'Power Apps': '/logos/power-apps.svg',
  'Code Apps': '/logos/power-apps.svg',
  'Power Automate': '/logos/power-automate.svg',
  Dataverse: '/logos/dataverse.svg',
  'Power Pages': '/logos/power-pages.svg',
  'AI Builder': '/logos/ai-builder.svg',
  'Copilot Studio': '/logos/copilot-studio.svg',
  'Azure Document Intelligence': '/logos/azure-document-intelligence.svg',
  React: '/logos/react.svg',
  'React SPA': '/logos/react.svg',
  TypeScript: '/logos/typescript.svg',
} as const;

export type ProductName = keyof typeof productLogos;

export function ProductLogo({ name, size = 32 }: { name: ProductName; size?: number }) {
  return <Image src={productLogos[name]} width={size} height={size} alt="" aria-hidden="true" style={{ objectFit: 'contain', flexShrink: 0 }} />;
}
