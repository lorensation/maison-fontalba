  export type PieceMeta = {
    slug: string;
    order: number;
    title: string;      // Pièce I, etc.
    subtitle: string;
    quote: string;
  };

  export const pieces: PieceMeta[] = [
    {
      slug: "behind-the-veil",
      order: 1,
      title: "Pièce I",
      subtitle: "Where voice meets intention",
      quote:
        "To reveal is not to expose. To design is to choose what to make visible, and what to protect."
    },
    {
      slug: "threads",
      order: 2,
      title: "Pièce II",
      subtitle: "Craft, instinct, precision",
      quote:
        "Every skill is a thread. And the way I sew them together is what shapes my architecture."
    },
    {
      slug: "concrete-poetry",
      order: 3,
      title: "Pièce III",
      subtitle: "Matter, memory, intention",
      quote:
        "In each built line, I leave an emotion. Architecture is not just space — it’s presence materialized."
    },
    {
      slug: "choreographing-intuition",
      order: 4,
      title: "Pièce IV",
      subtitle: "When design escapes the blueprint",
      quote: "Sometimes I let the hand think first. In movement, I find form."
    },
    {
      slug: "the-raw-draft",
      order: 5,
      title: "Pièce V",
      subtitle: "Origins, obsessions, creative process & competitions",
      quote: "This is the space where precision hasn't arrived yet. But vision has."
    }
  ];

  export const lists = {
    tools: [
      "Rhinoceros 3D","AutoCAD","SketchUp","Revit",
      "Adobe Photoshop","InDesign","Illustrator","Enscape",
      "Microsoft Office Suite","Canva"
    ],
    skills: [
      "Project management","Creative direction","Client communication",
      "Team coordination","Concept development","Detail drawing",
      "On-site execution","Real estate insight"
    ],
    languages: [
      "Spanish (native)","English (native)","French (intermediate)"
    ]
  };

  export const contact = {
    closingQuote: "L’espace est une écriture silencieuse.",
    emails: ["lucia@maisonfontalba.com","luciafernandezfontalba@gmail.com"],
    phone: "+34 674 266 777"
  };

  export type SpreadImage = { src: string; alt: string };
  export type SpreadBlock = {
    type: "spread";
    layout: "single" | "diptych";
    images: SpreadImage[];
    caption?: string;
  };
  export type MasonryBlock = {
    type: "masonry";
    images: SpreadImage[];
  };
  export type GalleryBlock = SpreadBlock | MasonryBlock;

  export const galleries: Record<string, GalleryBlock[]> = {
    "concrete-poetry": [
      { type: "spread", layout: "single", images: [{ src: "/pieces/piece-3/01.jpg", alt: "Project hero" }] },
      { type: "spread", layout: "diptych", images: [
        { src: "/pieces/piece-3/02.jpg", alt: "Detail A" },
        { src: "/pieces/piece-3/03.jpg", alt: "Detail B" },
      ] }
    ],
    "choreographing-intuition": [
      { type: "spread", layout: "single", images: [{ src: "/pieces/piece-4/01.jpg", alt: "Furniture — Of Volume and Touch" }] },
      { type: "spread", layout: "single", images: [{ src: "/pieces/piece-4/02.jpg", alt: "Clothing — To Drape an Idea" }] }
    ],
    "the-raw-draft": [
      { type: "masonry", images: [
        { src: "/pieces/piece-5/01.jpg", alt: "Sketch 1" },
        { src: "/pieces/piece-5/02.jpg", alt: "Sketch 2" },
        { src: "/pieces/piece-5/03.jpg", alt: "Model 1" }
      ] }
    ]
  };

  export const longformBio = `
P I È C E  I  B E H I N D  T H E  V E I L  
W h e r e  v o i c e  m e e t s  i n t e n t i o n
I  t r a i n e d  a s  a n  a r c h i t e c t  i n  M a d r i d ,  c o m p l e t i n g  m y  s t u d i e s
b e t w e e n  C E U  S a n  P a b l o  a n d  U n i v e r s i d a d  E u r o p e a .  M y  e a r l y
y e a r s  w e r e  s h a p e d  b y  a  d e e p  c u r i o s i t y  f o r  h o w  s p a c e  h o l d s
e m o t i o n  a n d  a  d e s i r e  t o  e x p r e s s  i d e n t i t y  t h r o u g h  b u i l t  f o r m .
O v e r  t h e  p a s t  s i x  y e a r s ,  I ’ v e  w o r k e d  o n  h i g h - e n d  r e s i d e n t i a l
v i l l a s ,  
c o m m e r c i a l  
i n t e r i o r s ,  
a n d  
h o s p i t a l i t y  
c o n c e p t s .  
I ’ v e
c o l l a b o r a t e d  
c l o s e l y  
w i t h  
c l i e n t s ,  
l e d  
c r e a t i v e  
d i r e c t i o n ,
c o o r d i n a t e d  c o n s u l t a n t s ,  a n d  f o l l o w e d  p r o j e c t s  f r o m  s k e t c h  t o
s i t e .
A t  M a r e n g o  I n t e r i o r i s m o ,  I  m a n a g e d  l u x u r y  d e s i g n  p r o j e c t s  f r o m
c o n c e p t  t o  c o m p l e t i o n .  A t  A r c h i d o m  S t u d i o ,  I  w a s  r e s p o n s i b l e  f o r
d e v e l o p i n g  “ l o o k  &  f e e l ”  p r o p o s a l s ,  3 D  p r e s e n t a t i o n s ,  a n d  o n -
s i t e  e x e c u t i o n .  E a r l i e r ,  a t  I n h a b i t  A r c h i t e c t s ,  I  b e g a n  d i r e c t i n g
d e s i g n  d e c i s i o n s  a n d  g u i d i n g  c l i e n t  c o m m u n i c a t i o n ;  o p p o r t u n i t i e s
t h a t  t a u g h t  m e  t o  l e a d  w i t h  b o t h  c l a r i t y  a n d  c a r e .
M y  a e s t h e t i c  i s  s h a p e d  n o t  o n l y  b y  a r c h i t e c t u r e  b u t  a l s o  b y
f a s h i o n ,  w h e r e  p r o p o r t i o n ,  t e n s i o n  a n d  g e s t u r e  a r e  e v e r y t h i n g .  I
o n c e  d e s i g n e d  a n d  h a n d m a d e  a  g a l a  d r e s s  f o r  a n  i m p o r t a n t
w e d d i n g ,  s i m p l y  b e c a u s e  I  n e e d e d  t o  s e e  a n  i d e a  t a k e  f o r m
b e y o n d  p a p e r .  T h a t  s a m e  i n s t i n c t  l e d  m e  t o  c r e a t e  M a i s o n
F o n t a l b a ,  a  s p a c e  w h e r e  a r c h i t e c t u r e ,  p r o p e r t y  a n d  d e s i g n
b e c o m e  o n e  v i s i o n   “ u n e  v i s i o n  d ’ a u t e u r. ”
I ’ m  a  l i c e n s e d  a r c h i t e c t ,  t r i l i n g u a l ,  a n d  c o m m i t t e d  t o  m e a n i n g f u l ,
e l e g a n t  w o r k .  I  m o v e  b e t w e e n  d i s c i p l i n e s  f r e e l y  b e c a u s e  I ’ v e
n e v e r  s e e n  b o r d e r s ,  o n l y  t h r e a d s .  “ H i l o s  q u e  s e  c r u z a n ,  s e
a n u d a n  y  d a n  f o r m a  a  l o  e s e n c i a l . ”
`;
