import * as fs from 'fs';
import { proceduresData } from './src/app/data/proceduresData';

const esData = proceduresData.ES;
const enData = proceduresData.EN;

const newCategories = esData.categories.map((esCat) => {
    const enCat = enData.categories.find(c => c.id === esCat.id);
    return {
        id: esCat.id,
        name: {
            es: esCat.name,
            en: enCat?.name || ''
        },
        description: {
            es: esCat.description,
            en: enCat?.description || ''
        },
        procedures: esCat.procedures.map((esProc, idx) => {
            const enProc = enCat?.procedures[idx];
            return {
                name: {
                    es: esProc.name,
                    en: enProc?.name || ''
                },
                description: {
                    es: esProc.description,
                    en: enProc?.description || ''
                },
                link: esProc.link
            };
        })
    };
});

const newProceduresData = {
    title: {
        es: esData.title,
        en: enData.title || ''
    },
    description: {
        es: esData.description,
        en: enData.description || ''
    },
    emptyMessage: {
        es: esData.emptyMessage,
        en: enData.emptyMessage || ''
    },
    categories: newCategories
};

const fileContent = `export interface BilingualString {
  es: string;
  en: string;
}

export interface Procedure {
  name: BilingualString;
  description: BilingualString;
  link?: string;
}

export interface Category {
  id: string;
  name: BilingualString;
  description: BilingualString;
  procedures: Procedure[];
}

export interface ProceduresSection {
  title: BilingualString;
  description: BilingualString;
  emptyMessage: BilingualString;
  categories: Category[];
}

export const proceduresData: ProceduresSection = ${JSON.stringify(newProceduresData, null, 2)};
`;

fs.writeFileSync('./src/app/data/proceduresData.ts', fileContent, 'utf-8');
console.log('Successfully refactored proceduresData.ts');
