/**
 * Sombra do preview de dashboard.
 * Usamos `filter: drop-shadow()` em vez de `box-shadow`: no `<img>` com `object-contain`,
 * box-shadow segue o retângulo do elemento (área total do box) e pode ler como “fundo branco”
 * junto com letterboxing; drop-shadow respeita melhor o alpha do PNG (silhueta do tablet).
 */
export const PRODUCT_DASHBOARD_PREVIEW_FILTER =
  "drop-shadow(14px 22px 36px rgba(30,30,31,0.18)) drop-shadow(6px 10px 20px rgba(30,30,31,0.12))";
