# Ckredence homepage visual audit

November 23, 2026. The comparison used the rendered MiraFolio homepage in Chrome, computed styles, element bounding boxes, and pointer interaction. The desktop and phone screenshots were compared with the local Ckredence build at the same widths. [MiraFolio reference](https://mirafolio.framer.website/?ref=saaspo.com)

## Grid and type

| Measurement | 1440 px viewport | 820 px viewport | 390 px viewport |
| --- | --- | --- | --- |
| Reference featured grid | 1000 px | 741 px | 345 px |
| Local service grid | 1000 px | 741 px | 345 px |
| Reference and local column widths | 488 px each | 358.5 px each | 345 px, stacked |
| Reference and local card proportions | 4:5 | 4:5 | 4:5 |
| Hero type size and line height | 64 / 76.8 px | 51 / 61.2 px | 41 / 49.2 px |
| Section title size and line height | 42 / 50.4 px | 34 / 40.8 px | 27 / 32.4 px |
| Hero top and bottom padding | 160 / 120 px | 160 / 120 px | 128 / 64 px |
| Heading to featured grid | 32 px | 32 px | 16 px |

The typography changes at 1200 and 810 px. MiraFolio uses Geist at weight 700 with −1.8 px hero tracking and −0.25 px section-title tracking. Ckredence uses those settings with its own Sora display face. Its longer wording and different glyph widths change line endings. The neutral canvas is #F1F1F3, the light panels are #FCFCFD, and the heading ink is #1B202A.

## Composition and interaction

| Reference observation | Ckredence application |
| --- | --- |
| A compact navigation pill floats above the centered content. Small icon targets keep the navigation visually separate from the headline. | The dock contains the Ckredence logo, four labeled navigation links, and the investment CTA. Desktop links expose labels on hover or keyboard focus. The phone menu exposes all four labels. |
| The hero pairs statement-sized type with smaller white text capsules and rounded images. Desktop image capsules are 80 × 62 px. Headline rows are separated by 12 px. A small 8 px dot draws attention to the opening badge. | The badge carries the original PMS ranking. The brand mark, name capsule, and growth image sit within the headline. Contact, market insights, and the two highlights share the action area. |
| The featured projects occupy two columns with a 24 px gap. Cards have 32 px corners, a 4 px inset, and a 28 px inner radius. The light header measures 84 px at rest and 130 px after pointer entry. | Each investment service has an illustrated cover, title, description, and service-detail destination. The title panel expands on hover and keyboard focus. Touch users have a permanently visible detail link. |
| Small filled dots occur in individual badges. The inspected hero uses a solid background. | Ckredence uses a solid hero, blue badge dots, and a localized dotted texture behind its service illustrations. The cover texture is a brand adaptation. |
| The desktop FAQ uses 323 px and 645 px columns with a 32 px gutter. Collapsed cards have 32 px corners, a 76 px height for a single-line question, and a 28 px control. | The investor FAQ follows the split layout and allows longer financial questions to wrap. Seven questions appear initially and the expansion control reveals all 27. |
| Testimonials use a three-card composition with rounded attribution blocks. Blog entries use thumbnail rows with metadata, a title, and a trailing action. | Reviews retain their author, review age, and attribution. The four latest articles use thumbnail rows. |
| Primary actions use dark gradient pills and rolling labels. Media-led cards have a separate hover response. | Buttons retain the rolling-label effect. Service illustrations lift on hover, while reduced-motion settings remove movement. |

## Content and verification

The existing sequence runs from the announcement, navigation, and hero through services, investment approaches, PMS statistics, fund manager, mutual fund app, blogs, awards, communities, FAQs, testimonials, expert assistance, complaint reports, and footer. Ckredence owns the service context and destination links. The first three service illustrations come from its PMS, mutual fund, and equity pages. [Ckredence Wealth](https://ckredencewealth.com/)

Browser checks covered widths of 320, 390, 768, 809, 810, 820, 1199, and 1440 px. Interaction checks covered mobile navigation, hero highlights, all four strategy tabs, FAQ expansion and the sixth answer’s source link, review navigation, all three complaint-report links, the article count, and image decoding.
