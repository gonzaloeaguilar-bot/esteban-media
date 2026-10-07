export const scriptPacingHelp = {
  en: {
    heading: "How should I use the timing estimate?",
    intro: "Paste only the words you plan to say, choose a speaking pace, then read the script aloud to check the estimate.",
    updated: "Updated October 7, 2026",
    serviceLabel: "Explore Reels editing in Fort Lauderdale",
    serviceHref: "/services/reels-editor-fort-lauderdale",
    faqs: [
      {
        question: "How is the script duration calculated?",
        answer: "The calculator divides the number of words by the selected words per minute and multiplies by 60, then rounds to the nearest second. For example, 60 words at 120 words per minute gives an estimate of 30 seconds. It counts groups of characters separated by spaces, so a stage direction such as [pause] also counts if you leave it in the text. Paste spoken words only when checking duration. Changing the target duration changes the comparison with your estimate; it does not speed up the speaker or rewrite the script. Use the estimate to prepare a first read, then time that read before deciding what to cut.",
      },
      {
        question: "Does the estimate include pauses or silent shots?",
        answer: "No. The formula uses only word count and the speaking pace you select; it does not add time for breaths, demonstrations, silent shots, or a closing screen. A 60-word script at 120 words per minute estimates 30 seconds of speech. If you then add a separate silent shot lasting 5 seconds, the sequence takes about 35 seconds before other pauses or transitions. A shot shown while the speaker continues talking does not automatically add those 5 seconds. Read the script aloud and time the planned silent moments separately. Compare that combined time with your target, then shorten the wording or allow more time for the video.",
      },
      {
        question: "How do I check the pace before recording?",
        answer: "Choose the pace closest to your intended delivery and read the script aloud with a timer. The 100, 120, 140, and 160 words-per-minute options are calculator settings, not a promise that one speed will improve viewer retention. If your read runs longer, try a slower setting and remove repeated phrases before rushing the delivery. Keep spoken numbers and names in mind: a single written item can take several words to say. Repeat the read with the same pauses you intend to record. For an editing request, share the script, target duration, planned silent shots, and any footage you already have so the work can be scoped.",
      },
    ],
  },
  es: {
    heading: "¿Cómo uso la duración estimada?",
    intro: "Pega solo las palabras que vas a decir, elige un ritmo de lectura y lee el guion en voz alta para comprobar la estimación.",
    updated: "Actualizado el 7 de octubre de 2026",
    serviceLabel: "Ver edición de Reels en Fort Lauderdale",
    serviceHref: "/es/editor-de-reels-fort-lauderdale",
    faqs: [
      {
        question: "¿Cómo se calcula la duración del guion?",
        answer: "La calculadora divide la cantidad de palabras entre las palabras por minuto elegidas y multiplica por 60; después redondea al segundo más cercano. Por ejemplo, 60 palabras a 120 palabras por minuto dan una estimación de 30 segundos. Cuenta grupos de caracteres separados por espacios, así que una indicación como [pausa] también cuenta si la dejas en el texto. Pega solo las palabras que vas a decir al comprobar la duración. Cambiar la duración objetivo modifica la comparación con tu estimación; no acelera la voz ni reescribe el guion. Usa el resultado para preparar una primera lectura y cronómetrala antes de decidir qué recortar.",
      },
      {
        question: "¿La estimación incluye pausas o tomas sin voz?",
        answer: "No. La fórmula usa únicamente el número de palabras y el ritmo que eliges; no suma tiempo para respirar, mostrar una demostración, incluir tomas sin voz o dejar una pantalla de cierre. Un guion de 60 palabras a 120 palabras por minuto estima 30 segundos de voz. Si después añades una toma sin voz de 5 segundos, la secuencia dura unos 35 segundos antes de otras pausas o transiciones. Una toma que aparece mientras sigues hablando no añade automáticamente esos 5 segundos. Lee el guion en voz alta y mide aparte los momentos sin voz. Compara el tiempo total con tu objetivo y recorta el texto o permite más tiempo para el video.",
      },
      {
        question: "¿Cómo compruebo el ritmo antes de grabar?",
        answer: "Elige el ritmo más cercano a tu lectura prevista y lee el guion en voz alta con un cronómetro. Las opciones de 100, 120, 140 y 160 palabras por minuto son ajustes de la calculadora, no una promesa de que cierta velocidad mejore la retención. Si tardas más, prueba un ajuste más lento y elimina frases repetidas antes de acelerar la voz. Ten en cuenta números y nombres: un solo elemento escrito puede requerir varias palabras al decirlo. Repite la lectura con las pausas que usarás al grabar. Para pedir edición, comparte el guion, la duración objetivo, las tomas sin voz previstas y el material disponible para definir el trabajo.",
      },
    ],
  },
} as const;
