export function zipCodeMask(value: string): string {
  return value
    .replace(/\D/g, "")  // remove qualquer caractere que não seja número
    .slice(0, 8)        // limita a 8 dígitos
    .replace(/(\d{5})(\d)/, "$1-$2");  // insere o traço depois do quinto dígito
}

export function nationalRegistrationMask(value: string): string {
  return value
    .replace(/\D/g, "")  // remove qualquer caractere que não seja número
    .slice(0, 11)  // limita a 11 dígitos
    .replace(/(\d{3})(\d)/, "$1.$2")  // insere o primeiro ponto após o terceiro dígito
    .replace(/(\d{3})(\d)/, "$1.$2")  // insere o segundo ponto após o sexto dígito
    .replace(/(\d{3})(\d{1,2})/, "$1-$2");  // insere o traço após o nono dígito
}

export function stateRegistrationMask(value: string): string {
  return value
    .replace(/\D/g, "")  // remove qualquer caractere que não seja número
    .slice(0, 9)  // limita a 9 dígitos
    .replace(/(\d{2})(\d)/, "$1.$2")  // insere o primeiro ponto após o segundo dígito
    .replace(/(\d{3})(\d)/, "$1.$2")  // insere o segundo ponto após o quinto dígito
    .replace(/(\d{3})(\d{1})/, "$1-$2");  // insere o traço após o oitavo dígito
}

export function monthYearMask_2(value: string): string {
  return value
    .replace(/\D/g, "")  // remove qualquer caractere que não seja número
    .slice(0, 6)  // limita a 6 dígitos
    .replace(/(\d{2})(\d)/, "$1/$2");  // insere a barra após o segundo dígito
}

export function monthYearMask(value: string): string {
  // Remove qualquer caractere que não seja número e limita a 6 dígitos
  value = value.replace(/\D/g, "").slice(0, 6);
  
  // Extrai a primeira e segunda partes
  const monthPart = value.slice(0, 2);
  const yearPart = value.slice(2);

  // Valida a parte do mês (deve ser entre 1 e 12)
  let validMonthPart = monthPart;
  const monthPartNumeric = parseInt(monthPart, 10);
  if (monthPartNumeric > 12 || (monthPartNumeric < 1 && monthPart.length === 2)) {
    validMonthPart = "";
  }

  // Valida a parte do ano (deve ser entre 199 e 2999)
  let validYearPart = yearPart;
  const yearPartNumeric = parseInt(yearPart, 10);
  if ((yearPartNumeric > 2999 || yearPartNumeric < 199) && yearPart.length === 4) {
    validYearPart = "";
  }

  // Combina as partes válidas e insere a barra
  const combined = `${validMonthPart}${validYearPart}`;
  return combined.replace(/(\d{2})(\d)/, "$1/$2");
}

export function driversLicenceCategoryMask(value: string): string {
  // Primeiro, removemos caracteres indesejados e limitamos o tamanho
  let cleanedValue = value
    .toUpperCase()
    .replace(/[^A-E1-4/]/g, "")
    .slice(0, 10);
  
  if (cleanedValue.length > 4) {
    cleanedValue = cleanedValue.substr(0, 4) + '/' + cleanedValue[4];
  } else {
    if (cleanedValue.length > 2 && cleanedValue[0] === 'A' && cleanedValue[2] !== '/') {
      if (cleanedValue[0] === cleanedValue[2]) {
        cleanedValue = cleanedValue[0] + cleanedValue[1];  
      } else {
        cleanedValue = cleanedValue[0] + cleanedValue[1] + '/' + cleanedValue[2];
      };
    } else {
      if (cleanedValue.length === 2 && cleanedValue[0] !== 'A') {
        cleanedValue = cleanedValue[0] + '/' + cleanedValue[1];
      };
    }
  };
  // Separamos os valores por '/'
  const partialCategories = cleanedValue.split('/');
  
  // Filtramos com base nas categorias aceitáveis
  const filteredCategories = partialCategories
    .map(part => part.trim())
    .filter(part => part === "" || ["A1", "A2", "A3", "A4", "B", "C", "D", "E"].some(cat => cat.startsWith(part)));
  
  // Rastreia se já temos uma categoria "A" e uma não-"A"
  let hasACategory = false;
  let hasNonACategory = false;
  const finalCategories = [];
  for (const part of filteredCategories) {
    if (part.startsWith('A')) {
      if (!hasACategory) {
        finalCategories.push(part);
        hasACategory = true;
      }
    } else {
      if (!hasNonACategory) {
        finalCategories.push(part);
        hasNonACategory = true;
      }
    }
  }

  // Removemos duplicatas e reconstruímos a string
  // const uniqueCategories = Array.from(new Set(finalCategories));

  return finalCategories.join('/');
}
