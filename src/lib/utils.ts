// Esta função 'cn' junta todas as classes fornecidas num único string,
// ignorando valores falsos, útil para manipulação de classes com Tailwind.
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
