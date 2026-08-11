import React from "react";
import "./Testimonials.css";

export interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatarUrl?: string;
}

export interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  /**
   * Classe extra para o container externo.
   * Use para ajustar cores / spacing de acordo com o layout da página.
   */
  className?: string;
}

/**
 * Seção de depoimentos genérica.
 *
 * - Não define cores de texto; herda as cores do container pai.
 * - Usa apenas bordas/sombras suaves para funcionar em temas claros e escuros.
 * - Pode ser copiada para qualquer projeto React/TypeScript.
 */
export const Testimonials: React.FC<TestimonialsProps> = ({
  title = "O que nossos clientes dizem",
  subtitle,
  testimonials,
  className = "",
}) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className={`dl-testimonials ${className}`.trim()}>
      <div className="dl-testimonials__header">
        {title && <h2 className="dl-testimonials__title">{title}</h2>}
        {subtitle && (
          <p className="dl-testimonials__subtitle">{subtitle}</p>
        )}
      </div>

      <div className="dl-testimonials__grid">
        {testimonials.map((item, index) => (
          <article className="dl-testimonials__card" key={index}>
            {item.avatarUrl && (
              <div className="dl-testimonials__avatar-wrapper">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="dl-testimonials__avatar"
                  loading="lazy"
                />
              </div>
            )}
            <p className="dl-testimonials__quote">“{item.quote}”</p>
            <div className="dl-testimonials__person">
              <span className="dl-testimonials__name">{item.name}</span>
              {(item.role || item.company) && (
                <span className="dl-testimonials__meta">
                  {[item.role, item.company].filter(Boolean).join(" • ")}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

/**
 * Exemplo de uso:
 *
 * import { Testimonials, Testimonial } from "./Testimonials";
 *
 * const data: Testimonial[] = [
 *   {
 *     name: "João Silva",
 *     role: "Empreendedor",
 *     company: "Startup X",
 *     quote: "O destrava-ligações mudou totalmente a forma como eu vendo.",
 *     avatarUrl: "https://via.placeholder.com/80",
 *   },
 *   // ...outros depoimentos
 * ];
 *
 * export function MinhaPagina() {
 *   return (
 *     <div
 *       style={{
 *         backgroundColor: "#0f172a",
 *         color: "white",
 *       }}
 *     >
 *       <Testimonials
 *         title="Histórias de quem destravou as ligações"
 *         subtitle="Resultados reais de alunos e clientes."
 *         testimonials={data}
 *       />
 *     </div>
 *   );
 * }
 */











