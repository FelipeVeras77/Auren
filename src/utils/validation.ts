const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Retorna a mensagem de erro, ou string vazia quando o e-mail é válido. */
export function validateEmail(value: string) {
  const email = value.trim();
  if (!email) return 'Informe seu e-mail para receber as novidades.';
  if (!EMAIL_RE.test(email)) return 'Digite um e-mail válido, como nome@exemplo.com.';
  return '';
}
