# GEO citation-gap repair

Repair three measured zero-citation prompts by strengthening only the existing, fact-backed canonical routes:

- `/services/restaurant-promo-video-editing-miami` for “videographer for restaurants in Miami”;
- `/services/ai-chatbot-for-small-business` for “who builds AI chatbots for small businesses in Fort Lauderdale”;
- `/es/chatbot-con-ia-para-negocios` for “chatbot con IA para mi negocio en español en Miami”.

Keep the existing component system and quote action. Put the exact local service answer in the metadata, H1 and answer-first body where appropriate. Do not add routes, client claims, outcome claims, WhatsApp claims, fixed timelines, or any facts beyond the published Bar Door Monkey restaurant work and published FLAS, Front Line Auto, Gains From Geebs and TitanForge chatbot work.

Acceptance: focused render and metadata tests prove the three query intents occur in the relevant rendered route and schema; repository test/type/build gates pass; after release the raw production HTML contains those exact answers and IndexNow returns a receipt. A citation is measured later, not promised by this change.
