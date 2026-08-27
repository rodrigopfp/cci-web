// CCI Data — registro central de capítulos de la scroll-story.
//
// Este array es la ÚNICA fuente del orden: ChapterNav y el render de DataStory
// iteran sobre él. Reordenar capítulos = mover una línea aquí. Añadir un capítulo
// = una entrada más. Los ids (cap1..capN) son anclas con redirects externos
// apuntando a ellas: no cambiarlos al reordenar.

import type { ComponentType, ReactNode } from "react";
import type { Study } from "@/data/types";
import { CapOportunidad } from "./CapOportunidad";
import { CapDesafio } from "./CapDesafio";
import { CapPorQue } from "./CapPorQue";
import { CapNoEsPrefabricar } from "./CapNoEsPrefabricar";
import { CapQueCambia } from "./CapQueCambia";
import { CapMejoraEscalar } from "./CapMejoraEscalar";
import { CapChileAvanza } from "./CapChileAvanza";
import { CapEvidencia } from "./CapEvidencia";
import { CapQueMedimos } from "./CapQueMedimos";

// Contrato uniforme de props para todos los capítulos: reciben `reduced` y los
// estudios internacionales que hoy pasa src/app/data/page.tsx (solo los usa
// CapQueCambia; el resto los ignora). Mantiene el render por map sin providers.
export interface CapituloProps {
  reduced: boolean;
  studiesInternacionales: Study[];
}

export interface Capitulo {
  id: string;
  num: string;
  etiqueta: string;
  labelPill: ReactNode;
  Componente: ComponentType<CapituloProps>;
}

export const CAPITULOS: Capitulo[] = [
  { id: "cap1", num: "01", etiqueta: "Oportunidad", labelPill: (<><span className="font-mono">01</span> Oportunidad</>), Componente: CapOportunidad },
  { id: "cap2", num: "02", etiqueta: "El desafío", labelPill: (<><span className="font-mono">02</span> El desafío</>), Componente: CapDesafio },
  { id: "cap3", num: "03", etiqueta: "Por qué", labelPill: (<><span className="font-mono">03</span> Por qué</>), Componente: CapPorQue },
  { id: "cap4", num: "04", etiqueta: "No es prefabricar", labelPill: (<><span className="font-mono">04</span> No es prefabricar</>), Componente: CapNoEsPrefabricar },
  { id: "cap5", num: "05", etiqueta: "Qué cambia", labelPill: (<><span className="font-mono">05</span> Qué cambia</>), Componente: CapQueCambia },
  // Capítulo nuevo (P1-4). id NO numérico a propósito: las anclas cap1..cap8
  // tienen redirects/enlaces y no deben cambiar. La pill visible es 06; los
  // siguientes corren su NÚMERO visible (07/08/09) sin cambiar su id.
  { id: "cap-escalar", num: "06", etiqueta: "Escalar la mejora", labelPill: (<><span className="font-mono">06</span> Escalar la mejora</>), Componente: CapMejoraEscalar },
  { id: "cap6", num: "07", etiqueta: "Chile avanza", labelPill: (<><span className="font-mono">07</span> Chile avanza</>), Componente: CapChileAvanza },
  { id: "cap7", num: "08", etiqueta: "La evidencia", labelPill: (<><span className="font-mono">08</span> La evidencia</>), Componente: CapEvidencia },
  { id: "cap8", num: "09", etiqueta: "Qué medimos", labelPill: (<><span className="font-mono">09</span> Qué medimos</>), Componente: CapQueMedimos },
];
