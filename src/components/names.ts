export const nameMatching = (name: string): string =>
  name === ''
    ? name
    : name === 'list_of_diseases_frontend'
    ? 'Заболевания'
   
    : name;