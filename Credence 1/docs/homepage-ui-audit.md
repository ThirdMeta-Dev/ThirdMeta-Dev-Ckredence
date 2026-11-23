# Ckredence Wealth homepage visual audit

23 November 2026

Ckredence uses the reference’s responsive grid, headline proportions, reading widths and component spacing. At 1440 px the hero, article frames, founder portrait, accordion and sticky navigation now match the measured reference dimensions. Page heights differ where Ckredence has a different number of actions, articles, people or questions. The attached UX audit sets the order and purpose of all 14 sections. [GreenPortfolio visual reference](https://greenportfolio.co/) · [Ckredence brand and content](https://ckredencewealth.com/)

## Visual evidence

Section 02 follows Grizzly’s “Websites your customers will thank you for.” The homepage-wide comparisons below record the earlier GreenPortfolio version. The services comparison records the grid before the switch to a white background. [Services grid comparison](visual-qa/grizzly-services.webp)

The comparison sheets pair all 14 Ckredence sections with the closest reference composition at the same browser width. Both sides of a row use the same scale. Longer sections show excerpts from their start. The footer comparison starts at the reference’s company details. The investment charts, community links, awards, and regulatory widget use analogues selected for their purpose.

- [Desktop comparison at 1440 × 900](visual-qa/desktop.webp)
- [Tablet comparison at 768 × 900](visual-qa/tablet.webp)
- [Mobile comparison at 390 × 844](visual-qa/mobile.webp)
- [Computed styles and dimensions](visual-qa/computed-styles.csv)
- [Destination checks](visual-qa/link-checks.csv)

Chrome rendered both homepages at 100% zoom. The inspection included navigation, the alert and market ticker, the press and trust sections, services, testimonials, consultation, the ratings strip, founders, editorial cards, FAQ, closing CTA, newsletter and footer. Chrome’s layout inspector supplied the boxes and computed styles. The dataset records x relative to the viewport and y relative to each region. Font metrics, padding, margins, backgrounds, borders, image fitting and transitions are included. Dynamic region heights describe the captured state.

## Measured matches

Each cell below gives the value in both homepages. The announcement and promotional banner are outside the hero-height measurement.

| Measurement | Desktop 1440 | Tablet 768 | Mobile 390 |
| --- | ---: | ---: | ---: |
| Content left edge | 72 px | 36 px | 16 px |
| Usable page width | 1296 px | 696 px | 358 px |
| Hero copy width | 746 px | 696 px | 358 px |
| Hero heading / italic size | 45 / 53 px | 32 / 36 px | 32 / 36 px |
| Rendered hero headline height | 181.2 px | 86.4 px | 163.2 px |
| Hero CTA | 280 × 54 px | 696 × 52 px | 358 × 52 px |
| Sticky navigation height, excluding secondary links | 82 px | 60 px | 60 px |
| Article image frame | 416 × 220 px | 336 × 220 px | 358 × 220 px |
| Profile portrait frame | 324 × 347 px | 336 × 360 px | 336 × 360 px |
| Accordion width | 746 px | 696 px | 358 px |

Three discrepancies in the incoming implementation affected more than one section. Its titles used negative tracking, its blog grid started 40 px after the heading rather than the reference’s 50 px, and its profile used a full-width bordered card. The reference actually renders a 324 px portrait at x108, followed by text at x472. The revised desktop profile uses those positions. The 768 px and 390 px layouts center a 336 px portrait above the manager’s details.

## Design tokens and components

Shared dimensions and responsive values live in the token stylesheet. The React Container applies the common page edges to headings, grids, navigation and semantic elements such as the statistics list. SectionHeading handles title alignment, optional original labels and emphasis. Action, StepControls, MotionButton and MovingGroup share the existing interaction patterns. [Design tokens](../src/design-tokens.css) · [Shared React components](../src/components/shared.jsx)

| Role | Reference evidence | Application |
| --- | --- | --- |
| Container | Outer steps of 540, 720, 960, 1140 and 1320 px. At 1440 px, the 1320 px outer box has 12 px inner gutters. | Twelve columns with a 24 px gutter. Desktop hero spans seven and five columns. The footer has a narrower 1120 px inner measure on wide screens. |
| Text groups | The hero’s introductory line finishes 8 px before the H1. The CTA group has 24 px above it. The service description has 30 px block margins. | The shared scale distinguishes label-to-title, text-to-action and layout gaps. Required titles and labels retain Ckredence’s wording. |
| Section rhythm | Services use 60 px on desktop and 30 px at 768 and 390. The trust feature uses 96 px above and 64 px below on desktop. Founders use 50 px desktop and 40 px phone. Blogs have 100 px above and a 50 px title gap on desktop, reducing to 50 and 35 px on phone. | Service, feature, profile and editorial spacing have separate responsive tokens. Ckredence’s blog collection also has 50 px below it before its dark awards section. |
| Type | Hero sans and italic line heights are 54 and 63.6 px on desktop, with tracking of +0.24 and +0.28 px. Desktop section headings use 36/43.2 px with 40/48 px emphasis. Blog and FAQ titles use 20/24 px at weight 600. Typical body is 16/25.6 px, article metadata 12.8/19.2 px. | Sora supplies headings, Inter supplies body and controls, and the existing Instrument Serif italic face supplies emphasis. H1 can wrap across the measured copy column. Existing phrases and family-specific letter shapes determine individual line breaks. The measured visible reference samples exposed no separate H4 style. |
| Cards and imagery | Desktop editorial cards use a 20 px text inset, 12 px corners and 16 px after metadata. A testimonial card is 636 px wide, has 16 px corners and puts its text 37 px inside its border. | Editorial images fill their 220 px frames. Desktop reviews use the combined 36 px inset and 1 px border. The profile and hero use their own framing. The hero preserves the source photograph’s aspect ratio inside the taller reference illustration area. |
| Surfaces and controls | A deep hero, white editorial sections and a pale testimonial surface create distinct transitions. The hero CTA has 8 px corners. On hover its fill and shadow change while the box stays fixed. A reference service selector has a 300 ms transition. | Ckredence uses its #0C93DB blue, #141414 ink, navy surfaces, blue tints and darker blue text accents. The primary CTA lightens on hover. Keyboard focus adds a 3 px outline. Carousel dots measure 10 px inside 44 px controls. |
| Responsive variations | The reference puts quick destinations in a separate narrow navigation row. Article columns step from three to two to one. At 768 px the reference service capture shows the selector header only. | Three existing investment destinations remain directly accessible in a mobile row. On smaller screens all four Ckredence service descriptions and destinations stay readable. The FAQ’s support copy and action precede the questions in the mobile reading order. |

## Application to the 14 sections

| # | Ckredence section | Composition and retained interaction |
| ---: | --- | --- |
| 01 | Announcement, navigation and hero | The ranking ticker precedes sticky navigation. A left-aligned headline and integrated Ckredence artwork share the dark hero. The contact CTA, blog link, promotional images, arrows and slide indicators retain their destinations and behavior. |
| 02 | Our Services | A left-aligned heading and four service shortcuts introduce a pinned reading column and a staggered image gallery. Scrolling reveals the four descriptions in their published order, each with its own “Know More” link. See the Grizzly measurements below. |
| 03 | PMS Investment Approaches | The reference trust feature supplies the heading-to-content separation. Ckredence’s four keyboard-accessible tabs lead into a selected strategy, detail CTA and two interactive charts. |
| 04 | PMS Key Statistics | A dark full-width band groups four figures. Tabular numerals, separators and a two-column phone layout keep scale and entry requirements readable. |
| 05 | Desk of Fund Manager | A centered title introduces the portrait and open editorial layout. Kartik Mehta’s name, experience, commentary and article link form one group. |
| 06 | Mutual Fund App | The app introduction and screen images take one desktop column. The rating, adoption figures, download links and additional screenshot share the other. |
| 07 | Latest Blogs | Three image-led cards establish the desktop row. The fourth article follows in a compact row with the library action. Tablet uses four equal cards across two rows. The first article uses its published business-sale cover. |
| 08 | Achievements & Awards | The 35-year introduction accompanies two tracks of dated recognitions. On narrow phones, entries move horizontally with enough width for a full award. Pause and reduced-motion modes expose the entries for reading. |
| 09 | Join Our Community | A centered heading introduces four topic-specific WhatsApp destinations. Two desktop columns become one list on phones. |
| 10 | General FAQs | The seven-column accordion and four-column support rail sit on the reference grid with one column between them. Seven questions appear initially with the first answer open. Show More reveals 27. The original introduction and Ask Question link remain available. |
| 11 | Client Testimonials | Two desktop card widths, pale background, reviewer details and consistent insets reproduce the reference grouping. Ckredence retains its own moving rows, photos, quotations and pause control. |
| 12 | Talk to an Expert | The closing contact panel uses 60 × 80 px desktop padding and 40 × 30 px on phone. It contains Ckredence’s invitation, three benefits, WhatsApp support action and reassurance. |
| 13 | Complaint Reports | A compact fixed control provides access to PMS, RIA and AIF reports. Escape closes it and returns focus. The comparison shows the reference’s floating help control as the visual analogue. |
| 14 | Footer | A dark, narrower inner container organizes office, entity, regulatory, contact and navigation details. The links retain their published destinations. |

## Validation and exceptions

The desktop hero is 675 px tall in both sites at 1440 × 900. At 390 px it is 713 px for Ckredence and 852 px for GreenPortfolio. GreenPortfolio has an additional supporting paragraph and a second hero action. Ckredence retains its single contact action. Its four services, four articles, one manager and 27 FAQs also produce different section heights. These comparisons validate individual measurements and composition at the captured sizes.

The production build passed. Browser checks covered 15 widths from 320 through 1920 px, including both sides of the main responsive breakpoints. All 14 sections appeared in order with zero horizontal page overflow. At desktop, tablet and phone sizes, checks exercised menu dismissal, banner controls, service discovery, the four strategies and both charts, all 27 FAQ answers, both pause controls, reduced motion and the complaint panel. Homepage images decoded successfully. Sticky navigation stayed at the top after scrolling. Hover checks preserved control dimensions and keyboard focus remained visible.

Of 53 public web destinations tested, 48 responded successfully, including all 33 Ckredence-hosted destinations. The published YouTube URL returned 404. BSE, LinkedIn and X restricted the requests, and NSE returned a connection error. Those four destinations remain unverified. The link inventory also includes three email actions, one telephone action, Home and Skip to content. [Destination results](visual-qa/link-checks.csv)

The published FAQ introduction mentions templates and purchasing. The app heading spells “Convenince.” The first promotion displays a podcast banner and links to the existing app-download destination. These are editorial review items. The comparison sheets and measurement files are review artifacts and are excluded from the Vite production bundle.

## Section 02 · Grizzly services reference

At 1200 px and above, Grizzly gives the section heading six grid columns and the introduction five. Below that row, the service description occupies four columns. An empty column separates it from a seven-column gallery. From 992 to 1199 px the gallery takes the remaining eight columns. Below 992 px the text pins above the images. Below 768 px the two images also stack. [Grizzly homepage](https://www.wearegrizzly.com/)

| Viewport width | Text left edge and width | First image left edge and size | Second image placement |
| --- | --- | --- | --- |
| 1440 px | 72 px, 416 px wide | 622 px, 361 × 440 px | 24 px across, 128 px lower |
| 1280 px | 82 px, 356 px wide | 557 px, 309 × 440 px | 24 px across, 128 px lower |
| 1024 px | 44 px, 296 px wide | 364 px, 296 × 350 px | 24 px across, 80 px lower |
| 768 px | 36 px, 696 px wide | 36 px, 336 × 224 px | 24 px across, 32 px lower |
| 390 px | 12 px, 366 px wide | 12 px, 366 × 244 px | Full width, 32 px below the first image |

Chrome measurements on both sites matched these widths, gutters, offsets and first-frame dimensions. Frames have 14 px corners and the gallery leaves 50 px between successive pairs. The desktop type scale is 56/70 px for the heading, 24/31.2 px for a service name and 18/27 px for body copy. Below 1200 px those values become 32/40, 20/26 and 16/24 px. The divider sits 24 px below the service name and the description starts 16 px below the divider. [Matched desktop, tablet and phone screenshots](visual-qa/grizzly-services.webp)

The reference pins the reading window 150 px from the top at 1440 and 1366 px, and 75 px from the top at 1024 px. The bottom edge of the image pair completes the handoff at 20% of the viewport height plus the 50 px gallery gap. Chrome measured a 384 px transition at all three desktop widths. At 768 and 390 px, the pin begins at 68 px with 16 px of top padding, and the first handoff runs over 163 and 235 px respectively. The position of the outgoing and incoming text was linear at quarter-scroll intervals and reversed immediately. The desktop gallery fades at the viewport edge over 120 px. [Grizzly homepage](https://www.wearegrizzly.com/)

Ckredence uses its four existing service names as shortcuts in the introductory column. The white background, navy and blue text, Sora and Inter type and outlined CTAs use the project’s brand styles. The pinned window stays at a fixed height throughout the sequence and is sized to the longest description and link at that viewport. Each description moves independently through it. At half of the 384 px desktop handoff, the outgoing panel is half a window above its resting position and the incoming panel is half a window below. The fourth service stays visible as the pin leaves the section. At 1024 px, the pin clears Ckredence’s 82 px header. On tablet and phone, the transition distance follows the outgoing panel height, bounded by the distance between image pairs. Reduced motion and short viewports show each article beside or above its corresponding images in reading order.

The gallery uses the existing portfolio poster and mutual fund app screen. Three companion illustrations come from Ckredence’s service pages. The RIA page provided a branded contact background and logo for the fourth pair. [Portfolio Management Service](https://ckredencewealth.com/pms) · [Mutual Fund](https://ckredencewealth.com/mutual-funds) · [Equity](https://ckredencewealth.com/equity) · [Registered Investment Adviser](https://ckredencewealth.com/ria)

Browser checks covered 1440, 1366, 1280, 1024, 768, 390 and 320 px widths plus an 844 × 390 landscape viewport. Checks exercised forward and reverse scrolling, the midpoint of the text transition, all four shortcuts and destinations, Tab and Shift+Tab, image decoding, reduced motion and horizontal overflow.

At 1366 × 561 the earlier build switched to the inline layout because the tallest service description could not fit. Short viewports now use a more compact text layout. At that size the built Ckredence section matches the measured 150 px pin, 384 px text window and 384 px forward and reverse scroll distance while retaining each full description and link.
