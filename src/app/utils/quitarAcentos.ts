//Quitar letras con acentos ni caracteres especiales
export const removerAcentos = (str: string): string => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
