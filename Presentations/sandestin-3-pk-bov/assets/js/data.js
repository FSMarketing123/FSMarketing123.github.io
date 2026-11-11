/* ==========================================================================
   BOV CONTENT DATA — Hotel Portfolio at Grand Boulevard Sandestin
   Source of truth: "P - Sandestin 3-Pk BOV - 11.05.2026 - draft 06.pdf"
   (HWE, November 2026). Every figure carries its source page in `p`.
   Edit figures here; the page renders from this file.
   Detailed operating tables live in tables.js (generated from the PDF by
   tools/build_tables.py — regenerate rather than hand-editing).
   ========================================================================== */
window.BOV = {
  meta: {
    title: "Hotel Portfolio at Grand Boulevard Sandestin",
    kicker: "Broker Selection RFP",
    subtitle: "Valuation & Disposition Analysis",
    location: "Destin / Miramar Beach, Florida",
    date: "November 2026",
    presentedTo: "Howard Group",
    preparedBy: "Hodges Ward Elliott",
    pdf: "downloads/Sandestin-3-Pk-BOV-November-2026.pdf",
    pdfLabel: "Sandestin 3-Pk BOV — November 2026 (draft 06)",
    printStamp: "Financial exhibits dated 11/4/2026 – 11/5/2026"
  },

  /* ---------------- Portfolio overview ---------------- */
  overview: {
    keys: 376, hotels: 3, // p26, p28
    value: 58000000, perKey: 154255, // p24–25
    t12: { occ: 76.2, adr: 149.21, revpar: 113.75, noi: 4308780, label: "T-12 ended Aug. 31, 2026", p: 26 },
    highlightOcc: "~76%", highlightRevpar: "$114", p: 17
  },

  hotels: [
    {
      id: "courtyard", name: "Courtyard Sandestin at Grand Boulevard", short: "Courtyard",
      brand: "Marriott", segment: "Select-service", keys: 173, opened: "Jun-06",
      openedNote: "Open date per BOV competitive-set exhibit (p32)",
      renovation: "Renovated 2023–2024 (with Residence Inn, ~$11.8M combined)",
      value: 27000000, perKey: 156069, allIn: 27886000, allInPerKey: 161191,
      t12: { occ: 76.2, adr: 142.81, revpar: 108.88, noi: 2165719 },
      revparIndexT12: 120.3, occRankT12: "1 of 7", revparRankT12: "2 of 7",
      loan: "Existing CMBS $16.25M · 5.90% fixed · interest-only · matures 7/1/2032",
      buyerCapex: "$346,000 ($2,000/key); no separate PIP",
      lev5: 18.5, unlev10: 11.7,
      gallery: "courtyard"
    },
    {
      id: "residence", name: "Residence Inn Sandestin at Grand Boulevard", short: "Residence Inn",
      brand: "Marriott", segment: "Extended-stay", keys: 119, opened: "Apr-06",
      openedNote: "Open date per BOV competitive-set exhibit (p44)",
      renovation: "Renovated 2023–2024 (with Courtyard, ~$11.8M combined)",
      value: 19000000, perKey: 159664, allIn: 19618000, allInPerKey: 164857,
      t12: { occ: 74.8, adr: 153.89, revpar: 115.10, noi: 1457937 },
      revparIndexT12: 137.3, occRankT12: "1 of 6", revparRankT12: "2 of 6",
      loan: "Existing CMBS $13.675M · 5.99% fixed · interest-only · matures 7/15/2032",
      buyerCapex: "$238,000 ($2,000/key); no separate PIP",
      lev5: 20.8, unlev10: 11.3,
      gallery: "residence"
    },
    {
      id: "hyatt", name: "Hyatt Place Sandestin at Grand Boulevard", short: "Hyatt Place",
      brand: "Hyatt", segment: "Select-service", keys: 84, opened: "Dec-18",
      openedNote: "Opened 2018 (p19); Dec-18 per competitive-set exhibit (p38)",
      renovation: "Opened 2018 · modest near-term capital needs",
      value: 12000000, perKey: 142857, allIn: 13500000, allInPerKey: 160714,
      t12: { occ: 78.3, adr: 155.72, revpar: 121.88, noi: 685124 },
      revparIndexT12: 114.6, occRankT12: "1 of 5", revparRankT12: "2 of 5",
      loan: "New loan assumed: $8.775M · SOFR + 300 bps (7.53% Yr 1) · interest-only 5 yrs",
      buyerCapex: "$1,260,000 ($15,000/key)",
      lev5: 16.8, unlev10: 11.6,
      gallery: "hyatt"
    }
  ],

  /* ---------------- Investment highlights (p16–20) ---------------- */
  highlights: [
    {
      id: "only", title: "The only hotels within Grand Boulevard", p: 16, img: "highlight-boulevard",
      body: "The three hotels are the only lodging within Grand Boulevard, the highest-end retail destination between Pensacola and Jacksonville, where retail sales average approximately $850 PSF heading to $1,000. With more than 200 events a year and Class A office on site, Grand Boulevard generates year-round demand for the hotels well beyond the beach season. A buyer would also gain a relationship with Howard Group and the potential to develop or co-develop an additional high-quality hotel within Grand Boulevard.",
      stats: [["~$850 PSF", "Average retail sales"], ["200+", "Events each year"], ["Class A", "Office on site"]]
    },
    {
      id: "perf", title: "Market-leading performance", p: 17, img: "highlight-performance",
      body: "All three hotels rank #1 in occupancy within their competitive sets and achieve RevPAR premiums of 15% to 37%. The Residence Inn leads with a RevPAR index of 137, up from 110 in 2022. Combined, the portfolio ran approximately 76% occupancy and $114 RevPAR over the trailing 12 months ended August 2026, with RevPAR projected to reach approximately $127 by Year Three (2029).",
      stats: [["#1", "Occupancy ranking — all three hotels"], ["15%–37%", "RevPAR premiums"], ["137", "Residence Inn RevPAR index (vs. 110 in 2022)"], ["~76%", "Portfolio occupancy"], ["$114", "Portfolio RevPAR"]]
    },
    {
      id: "market", title: "High-barrier, affluent market", p: 18, img: "highlight-market",
      body: "South Walton’s visitors are as affluent as its residents. Visitor households average $197,500 in income, and one-third earn more than $200,000. Miramar Beach sits within the most affluent stretch of the Florida Panhandle. Resident households average $170,339 in income, nearly double Fort Walton Beach ($89,319), only 15 miles west. That wealth supports premium rates and steady demand, and new competition is limited: protected land constrains development, and rooms under construction equal just 1.3% of submarket inventory.",
      stats: [["$197,500", "Average household income, South Walton visitors"], ["$170,339", "Resident household income, Miramar Beach"], ["$89,319", "Resident household income, Fort Walton Beach · 15 miles west"], ["1 in 3", "Visitor households earn more than $200,000"], ["1.3%", "Rooms under construction, share of submarket inventory"]]
    },
    {
      id: "capex", title: "Renovated, low-capex assets", p: 19, img: null,
      body: "The Residence Inn and Courtyard completed approximately $11.8 million in renovations in 2023–2024, and the Hyatt Place opened in 2018. All three are built-to-last concrete construction with minimal to modest (in the case of the Hyatt Place) near-term capital needs.",
      stats: [["~$11.8M", "Renovation investment · Residence Inn & Courtyard 2023–2024"], ["2023–2024", "Renovations completed"], ["2018", "Hyatt Place opened"], ["Concrete", "Built-to-last construction, all three hotels"], ["Minimal–Modest", "Near-term capital needs (modest at Hyatt Place)"]]
    },
    {
      id: "brand", title: "Brand diversity, management flexibility", p: 19, img: null,
      body: "The portfolio combines Marriott and Hyatt flags across extended-stay and select-service product. The two Marriott properties have near-term brand flexibility, giving a new owner the choice to commit to a long-term license and negotiate key money or to pursue a repositioning. All three hotels are unencumbered of management.",
      stats: [["Marriott + Hyatt", "Extended-stay and select-service"], ["Unencumbered", "of management — all three hotels"]]
    }
  ],
  upside: { p: 20, items: [
    "Consolidated operations: an estimated $300,000 in annual savings",
    "Courtyard repositioning to a lifestyle soft brand",
    "New revenue: parking and resort fees",
    "Seasonal beach shuttle",
    "Key money on brand renewals"
  ]},
  listing: { p: 20, text: "HWE proposes a commission of 1.5% of the gross sales price, plus reimbursement of marketing expenses up to $20,000. The listing period would be 12 months, renewing automatically month to month thereafter." },

  /* ---------------- Why HWE (p4–11, 22) ---------------- */
  hwe: {
    intro: "For more than 50 years, Hodges Ward Elliott (“HWE”) has been the premier hospitality capital markets advisor. The firm has closed approximately $100 billion in hotel transactions, including more than $50 billion since 2015, and has ranked among the nation’s top hotel brokers every year since 2019. Over that time, HWE has built extensive direct relationships with the family offices, private owner-operators, private equity funds and REITs that buy hotels. We work exclusively for sellers, and we use those relationships to create competition for every asset we bring to market. In Florida, that approach has set records, including the highest per-key hotel sale in Tampa history.",
    pillars: [
      "50+ years of experience. Approximately $100 billion in hotel transactions.",
      "Direct access to family offices, private owner-operators, private equity funds and REITs.",
      "Exclusive seller representation that creates competition with proven national and international reach.",
      "Clients return to Hodges Ward Elliott because our sales process consistently uncovers the highest sales price from top quality purchasers."
    ],
    services: ["Hotel Sales & Advisory","Commercial Sales & Advisory","Recapitalization","Collateral Valuation","Whole Loan Financing","Equity Placement","Mezzanine Debt / Preferred Equity","Runway Capital","Construction Financing","Loan / Note Sales","Loan Modification / Navigation","Workout Advisory"],
    history: [ // p6 — years read from the timeline connectors
      ["1975","Hodges-Ward Associates founded in Atlanta, GA"],
      ["1983","Mark Elliott joins the company"],
      ["1992","Firm becomes Hodges Ward Elliott"],
      ["2004","London office opens"],
      ["2006","HWE executes the $1.7B sale of the 100-hotel White Lodging Portfolio"],
      ["2011","HWE sells the Park Central Hotel (Manhattan) for $400MM"],
      ["2013","HWE advises on the $1.2B purchase of Apple REIT Six (66 hotels) by Blackstone"],
      ["2015","New York office opens"],
      ["2016","HWE launches the Capital Markets practice"],
      ["2018","HWE Capital Markets closed $10B of financings nationally"],
      ["2019","Dallas office opens"],
      ["2020","$3.7B closed in 2020"],
      ["2021","#1 Ranked Hotel Broker by Total Volume"],
      ["2022","HWE advises on the $3.8B Brookfield acquisition of Watermark Lodging Trust"],
      ["2023","Tampa office opens"],
      ["2024","Denver office opens"],
      ["2024","HWE sells 1 Hotel & Embassy Suites Nashville for $530MM"],
      ["2025","HWE sells W London Hotel for $350MM"],
      ["2026 YTD","HWE merges with Franklin St."]
    ],
    /* Office map (p5). x/y are % positions of the BOV marker dots (measured from vector page 5 by tools/build_assets.py)
       (assets/img/hwe-office-map.png). */
    offices: [
      { city: "Atlanta", x: 61.56, y: 68.08, type: "hotels", people: [["Pete Dannemiller","Executive Managing Director"],["Clint Hodges","Executive Managing Director"],["Nate Ries","Senior Director"],["Kevin Felmley","Financial Analyst"]] },
      { city: "Dallas", x: 40.94, y: 73.35, type: "hotels", people: [["Austin Brooks","Executive Managing Director"],["Michael Brandes","Senior Business Development Associate"],["Dawson Ovard","Financial Analyst"],["Harrison Fisher","Financial Analyst"]] },
      { city: "Denver", x: 27.7, y: 50.13, type: "hotels", people: [["Michael Tormey","Senior Director"]] },
      { city: "Nashville", x: 57.7, y: 61.77, type: "hotels", people: [["Zach Moore","Senior Director"]] },
      { city: "New York", x: 74.2, y: 40.35, type: "capital", people: [["Michael Britvan","Executive Managing Director"]] },
      { city: "Orlando", x: 66.95, y: 84.21, type: "hotels", people: [["Rudy Reudelhuber","Executive Managing Director"]] },
      { city: "Tampa", x: 65.36, y: 86.67, type: "hotels", people: [["Preston Reid","Executive Managing Director"],["Kyle Sahlsten","Senior Director"],["Celina Nowicki","Associate"]] },
      { city: "London", x: 93.75, y: 20.85, type: "hotels", people: [["Charles Human","Managing Director"],["Chris Martin","Senior Director"]] }
    ],
    cofounder: "William M. Hodges, Co-Founder",
    salesRecords: { p: 8, source: "Source: HWE-provided sales data. Values shown as provided. MM = million.", period: "Past 36 months", items: [
      ["Upscale Hotels Sold in U.S.", 52, "Sales", "$956.6MM"],
      ["Upscale Hotels Sold in Florida", 10, "Sales", "$263.2MM"],
      ["Upscale Hotels Sold in the Panhandle", 1, "Sale", "$30.3MM"],
      ["Portfolio Sold in Florida", 14, "Sales", "$253.7MM"],
      ["Residence Inn / Hyatt Place / Courtyard Sold in U.S.", 27, "Sales", "$452.5MM"]
    ],
      buyerTypes: [["Private / family owners", 79.0], ["Private equity firms", 16.0], ["Institutional investors", 2.5], ["Others", 2.5]],
      recent: { name: "Homewood Suites Destin", city: "Destin, FL", price: "$30,250,000", keys: 95, perKey: "$318k/key" }
    },
    transactions: [ // p9–11
      ["Homewood Suites Destin","Destin, FL",95,"Asset Sale","tx-homewood-destin"],
      ["Residence Inn Tampa Downtown","Tampa, FL",109,"Asset Sale","tx-ri-tampa-downtown"],
      ["Residence Inn Ft Myers Gulf Coast Town Center","Fort Myers, FL",116,"Asset Sale","tx-ri-fort-myers"],
      ["Beachcomber Beach Resort","St. Pete Beach, FL",102,"Asset Sale","tx-beachcomber"],
      ["Courtyard Bradenton Sarasota Riverfront","Bradenton, FL",153,"Asset Sale","tx-cy-bradenton"],
      ["Courtyard Tampa NW/Veterans Expressway","Tampa, FL",128,"Asset Sale","tx-cy-tampa-nw"],
      ["Four Points by Sheraton Suites Tampa Airport Westshore","Tampa, FL",261,"Asset Sale","tx-four-points-tampa"],
      ["Residence Inn Tampa Wesley Chapel","Wesley Chapel, FL",128,"Asset Sale","tx-ri-wesley-chapel"],
      ["Hyatt Place Daytona Beach Oceanfront","Daytona Beach, FL",143,"Pending Sale","tx-hp-daytona"],
      ["Courtyard Orlando Lake Buena Vista in the Marriott Village","Orlando, FL",312,"Asset Sale","tx-cy-orlando-lbv"],
      ["Fairfield Inn & Suites Orlando Lake Buena Vista in the Marriott Village","Orlando, FL",388,"Asset Sale","tx-ff-orlando-lbv"],
      ["SpringHill Suites Orlando Lake Buena Vista in the Marriott Village","Orlando, FL",400,"Asset Sale","tx-shs-orlando-lbv"]
    ],
    references: [ // p22
      ["Peachtree Group","Greg Friedman","ref-peachtree"],
      ["UniHost, Inc.","Richard Tyre",null],
      ["DEVEN Development Ventures Group","Thom Cunningham","ref-deven"],
      ["oto development","Stewart Heath","ref-oto"],
      ["Driftwood Capital","Carlos Rodriguez Jr.","ref-driftwood"]
    ]
  },

  team: [ // p7, p61
    { name: "Pete Dannemiller", title: "Executive Managing Director", office: "Atlanta", email: "pdannemiller@hodgeswardelliott.com", photo: "team-dannemiller",
      bio: "Pete Dannemiller is an Executive Managing Director in Hodges Ward Elliott’s Hotel Investment Advisory practice, based in the Atlanta office. Since joining HWE in 1996, he has become one of the firm’s leading producers and one of the most active advisors in hotel investment sales and financing. Over three decades, Mr. Dannemiller has closed more than $50 billion in hotel sales and financings, including over $5 billion in debt placement. Mr. Dannemiller holds a Bachelor of Science in Business from the University of North Carolina at Chapel Hill and an MBA from Emory University." },
    { name: "Rudy Reudelhuber", title: "Executive Managing Director", office: "Orlando", email: "rreudelhuber@hodgeswardelliott.com", photo: "team-reudelhuber",
      bio: "Rudy Reudelhuber is an Executive Managing Director at Hodges Ward Elliott and specializes in institutional-grade hotel and resort transactions throughout Florida, North America and Europe. Since joining HWE in 1998, he has established the firm’s London office and oversees its international capital markets activity. Before joining HWE, he was an investment banker in New York and Hong Kong. Mr. Reudelhuber earned an A.B. from Princeton University and was a Fulbright Scholar." },
    { name: "Preston Reid", title: "Executive Managing Director", office: "Tampa", email: "preid@hodgeswardelliott.com", photo: "team-reid",
      bio: "Preston Reid is an Executive Managing Director and opened Hodges Ward Elliott’s Tampa office in 2022 and has completed more than $7 billion of commercial real estate transactions over his 18-year career, mostly in the Sun Belt. He has led many of Tampa Bay’s most significant hotel sales and financings. Mr. Reid earned a Bachelor of Science in Finance from the University of Florida." },
    { name: "Kyle Sahlsten", title: "Senior Director", office: "Tampa", email: "ksahlsten@hodgeswardelliott.com", photo: "team-sahlsten",
      bio: "Kyle Sahlsten is a Senior Director in Hodges Ward Elliott’s Hospitality Investment Advisory practice, based in the Tampa office. He has completed 38 hotel transactions totaling more than $800 million. Before joining HWE in 2026, Mr. Sahlsten spent nearly five years at Berkadia, most recently as an Associate Director. Mr. Sahlsten earned a bachelor’s degree in accounting and a master’s in real estate from the University of Florida’s Warrington College of Business." },
    { name: "Celina Nowicki", title: "Associate", office: "Tampa", email: "cnowicki@hodgeswardelliott.com", photo: "team-nowicki",
      bio: "Celina Nowicki is a Senior Analyst in Hodges Ward Elliott’s Hospitality Investment Advisory practice. She has four years of experience in the hotel industry and has helped close more than $150 million in hotel sales. Before joining HWE in 2025, she was a Senior Analyst on the Investments team at Rockbridge Holdings. Ms. Nowicki earned a Bachelor of Science in Finance from Miami University." }
  ],

  /* ---------------- Sales strategy (p13–15, 21) ---------------- */
  strategy: {
    intro: "Grand Boulevard reflects decades of investment by Howard Group, and the right buyer for these hotels should reflect the same long-term ownership mentality and high-quality standard. HWE will target well-capitalized, quality-focused owners with the reputation and operating capability to run and maintain these hotels at a level comparable to the high standard of Grand Boulevard. Over the past 36 months, nearly 80% of HWE’s hotel sales have closed with private investors and family owner-operators. These are the buyers we know best.",
    primary: [
      ["Family Offices & Private Investors", "Long-term holders looking for stable, recently renovated real estate with a durable location advantage. Because two of the three hotels were renovated in 2023–2024, near-term capital needs are minimal to modest for the Hyatt Place, which suits a hold-oriented owner."],
      ["Established Owner-Operators", "Proven select-service and lifestyle operators with the reputation and operating depth to run all three hotels well and potentially move one or more to an up-market positioning in the future. These groups can also capture the efficiencies of operating the hotels together."]
    ],
    secondary: [["Institutional & Private Equity Capital", "Selectively invited to add competitive tension on price and terms. Each group will be evaluated on how well they fit with Howard Group’s vision."]],
    buyersNote: "HWE will market the portfolio broadly. The groups below represent some investors we view as most likely to pursue the opportunity.",
    approach: [
      ["Confidential, targeted launch", "Pre-qualified groups review the opportunity under confidentiality agreements, protecting the hotels’ associates and operations throughout the process."],
      ["Competition among the right buyers", "HWE will market to a broad but vetted group of qualified buyers, giving ownership real choice and pricing tension from groups it would be comfortable transacting with."],
      ["Portfolio and individual offers", "HWE will solicit offers on the full portfolio and on each hotel individually, so ownership can compare portfolio pricing against the sum of the parts."],
      ["Selection beyond price", "Howard Group will make the final buyer selection, weighing price, certainty of close, and each buyer’s reputation and operating track record."]
    ],
    timelineNote: "This represents a baseline timeline for a standard offering process but could be adjusted as needed.",
    timeline: [
      { phase: "Pre-Marketing", dur: "2 weeks", weeks: [2,2], tasks: ["Engagement / Kick-off Meeting","Complete Due Diligence & Underwriting","Ordering PIPs (If Applicable)","Prepare Investor List","Prepare Confidentiality Agreement","Finalize Marketing and Press Strategies","Prepare Offering Materials","Populate Diligence Site"] },
      { phase: "Marketing", dur: "6 weeks", weeks: [6,6], tasks: ["Distribute Teaser & Confidentiality Agreements (CAs)","Collect CAs / Allow Access to Diligence Site","Distribute Offering Memorandum","Follow-up with Potential Investors","Develop Financing Solutions for Buyers","Weekly Status Calls with Ownership","Collect Pricing Indicators"] },
      { phase: "Bid Process", dur: "1–3 weeks", weeks: [1,3], tasks: ["Call for Offers – Round 1","» Interview & Qualify Buyers","» Level Bids","Final Round – Round 2","» Make PSA Available to Final Round Bidders","» Due Diligence Questions / Tours"] },
      { phase: "Negotiation / Buyer Selection", dur: "1–2 weeks", weeks: [1,2], tasks: ["Negotiate Final Price & Terms","Select Buyer Considering Price, Terms, Certainty","Execute PSA","Obtain Non-refundable “Hard” Deposit"] },
      { phase: "Closing", dur: "60–90 days", weeks: [60/7, 90/7], tasks: ["Due Diligence","Monitor Closing Deliverables and Lender Timing","Finalize Closing Statement","Loan Assumptions Could Add an Additional 60–100 Days to Closing Timeline"] }
    ]
  },

  /* ---------------- Valuation (p24–52) ---------------- */
  valuation: {
    intro: "Hodges Ward Elliott (“HWE”) is pleased to provide the following Broker’s Opinion of Value (BOV) on the Hotel Portfolio at Grand Boulevard Sandestin. Our objective with the following internal analysis is to provide you with a baseline valuation that can be supported by disciplined underwriting. In a marketing effort, HWE’s underwriting would reflect more aggressive assumptions and target pricing at the upper end of the valuation curve.",
    curve: { p: 24, baseline: [56000000,148936], mid: [58000000,154255], target: [62000000,164894] },
    views: {
      portfolio: {
        label: "Portfolio (Consolidated)", sub: "Consolidation: Howard Group 3 Property Portfolio at Grand Boulevard", keys: 376, pages: "24–29", p: 25,
        metrics: {value: 58000000,perKey: 154255,capClose: 3004000,allIn: 61004000,allInPerKey: 162245,capTTM: 7.1,ebitdaTTM: "12.26 x",capF26: 7.2,ebitdaF26: "11.98 x",lev5: 18.8,unlev10: 11.6},
        sensHeads: ["All-In Purchase Price*","All-In Price per Key*","Cap Rate on Forecast 2026","Cap Rate on Proforma Year One"],
        sens: [[57004000,151606,7.8,8.7],[59004000,156926,7.5,8.5],[61004000,162245,7.2,8.2],[63004000,167564,7,7.9],[65004000,172883,6.8,7.7]],
        sensNOI: [4421386,4986384],
        assumptions: [
          "Assumes $1,844,000 ($4,904 per key) in renovation capital for a new buyer: $2,000 per key at Courtyard and Residence Inn; $15,000 per key at Hyatt Place.",
          "Unencumbered of Management & Management Fee equaling 3.0% of Total Revenue.",
          "FF&E Reserve equaling 4.0% of Total Revenue.",
          "Property insurance at the midpoint of Franklin Street’s high and low premium estimates for each hotel.",
          "Year One = 2027",
          "Acquisition financing assumes 63.4% blended LTC: existing Courtyard ($16.25M) and Residence Inn ($13.675M) CMBS loans plus a new $8.775M Hyatt Place loan (65% LTC).",
          "Closing costs equal to 2.0% of purchase price.",
          "Blended terminal capitalization rate equal to 8.50%.",
          "Perla Baking Co. lease: $41,309 minimum rent (+2%/yr) plus 8% of sales above $732,975; expires Oct. 2030 or later."
        ]
      },
      courtyard: {
        label: "Courtyard", sub: "Courtyard Sandestin at Grand Boulevard", keys: 173, pages: "30–35", p: 30,
        metrics: {value: 27000000,perKey: 156069,capClose: 886000,allIn: 27886000,allInPerKey: 161191,capTTM: 7.8,ebitdaTTM: "11.30 x",capF26: 8,ebitdaF26: "11.05 x",lev5: 18.5,unlev10: 11.7},
        sensHeads: ["All-In Purchase Price*","All-In Price per Key*","Cap Rate on Forecast 2026","Cap Rate on Proforma Year One"],
        sens: [[25436000,147029,8.7,9.5],[26661000,154110,8.3,9.1],[27886000,161191,8,8.7],[29111000,168272,7.6,8.3],[30336000,175353,7.3,8]],
        sensNOI: [2218778,2426484],
        assumptions: [
          "Assumes $346,000 ($2,000 per key) in renovation capital for a new buyer; no separate PIP.",
          "Unencumbered of Management & Management Fee equaling 3.0% of Total Revenue.",
          "FF&E Reserve equaling 4.0% of Total Revenue.",
          "Property insurance at the midpoint of Franklin Street’s high and low premium estimates.",
          "Year One = 2027",
          "Acquisition financing assumes 58.3% LTC: existing Courtyard CMBS loan of $16.25M at 5.90% fixed, interest only.",
          "Closing costs equal to 2.0% of purchase price.",
          "Terminal capitalization rate equal to 8.50%."
        ]
      },
      residence: {
        label: "Residence Inn", sub: "Residence Inn Sandestin at Grand Boulevard", keys: 119, pages: "42–47", p: 42,
        metrics: {value: 19000000,perKey: 159664,capClose: 618000,allIn: 19618000,allInPerKey: 164857,capTTM: 7.4,ebitdaTTM: "11.80 x",capF26: 7.5,ebitdaF26: "11.71 x",lev5: 20.8,unlev10: 11.3},
        sensHeads: ["All-In Purchase Price*","All-In Price per Key*","Cap Rate on Forecast 2026","Cap Rate on Proforma Year One"],
        sens: [[17868000,150151,8.2,9.3],[18743000,157504,7.8,8.8],[19618000,164857,7.5,8.4],[20493000,172210,7.2,8.1],[21368000,179563,6.9,7.7]],
        sensNOI: [1470528,1653061],
        assumptions: [
          "Assumes $238,000 ($2,000 per key) in renovation capital for a new buyer; no separate PIP.",
          "Unencumbered of Management & Management Fee equaling 3.0% of Total Revenue.",
          "FF&E Reserve equaling 4.0% of Total Revenue.",
          "Property insurance at the midpoint of Franklin Street’s high and low premium estimates.",
          "Year One = 2027",
          "Acquisition financing assumes 69.7% LTC: existing Residence Inn CMBS loan of $13.675M at 5.99% fixed, interest only.",
          "Closing costs equal to 2.0% of purchase price.",
          "Terminal capitalization rate equal to 8.50%."
        ]
      },
      hyatt: {
        label: "Hyatt Place", sub: "Hyatt Place Sandestin at Grand Boulevard", keys: 84, pages: "36–41", p: 36,
        metrics: {value: 12000000,perKey: 142857,capClose: 1500000,allIn: 13500000,allInPerKey: 160714,capTTM: 5.1,ebitdaTTM: "15.98 x",capF26: 5.4,ebitdaF26: "15.09 x",lev5: 16.8,unlev10: 11.6},
        sensHeads: ["All-In Purchase Price*","All-In Price per Key*","Cap Rate on Forecast 2026","Cap Rate on Proforma Year One"],
        sens: [[12700000,151190,5.8,7.1],[13100000,155952,5.6,6.9],[13500000,160714,5.4,6.7],[13900000,165476,5.3,6.5],[14300000,170238,5.1,6.3]],
        sensNOI: [732080,906839],
        assumptions: [
          "Assumes $1,260,000 ($15,000 per key) in renovation capital for a new buyer.",
          "Unencumbered of Management & Management Fee equaling 3.0% of Total Revenue.",
          "FF&E Reserve equaling 4.0% of Total Revenue.",
          "Property insurance at the midpoint of Franklin Street’s high and low premium estimates.",
          "Acquisition financing assumes 65% LTC: new $8.775M loan at SOFR + 300 bps (7.53% in Year One), interest only for 5 years.",
          "Closing costs equal to 2.0% of purchase price.",
          "Terminal capitalization rate equal to 8.50%.",
          "Perla Baking Co. lease: $41,309 minimum rent (+2%/yr) plus 8% of sales above $732,975; expires Oct. 2030 or later.",
          "Year One = 2027"
        ]
      },
      tribute: {
        label: "Courtyard → Tribute Portfolio", scenario: true, sub: "Courtyard Sandestin at Grand Boulevard – Conversion to Tribute Portfolio", keys: 173, pages: "48–52", p: 48,
        metrics: {value: 27000000,perKey: 156069,capClose: 7460000,allIn: 34460000,allInPerKey: 199191,capTTM: 6.3,ebitdaTTM: "13.96 x",capF26: null,ebitdaF26: null,cap2029: 10.1,ebitda2029: "8.80 x",lev5: 18.2,unlev10: 12.5},
        sensHeads: ["All-In Purchase Price*","All-In Price per Key*","Cap Rate on Forecast 2026","Cap Rate on Year Three (2029)"],
        sens: [[32010000,185029,6.9,10.9],[33235000,192110,6.7,10.5],[34460000,199191,6.4,10.1],[35685000,206272,6.2,9.8],[36910000,213353,6,9.5]],
        sensNOI: [2218778,3489747],
        assumptions: [
          "Assumes $6,920,000 ($40,000 per key) in renovation and conversion capital for a Tribute Portfolio conversion.",
          "Unencumbered of Management & Management Fee equaling 3.0% of Total Revenue.",
          "FF&E Reserve equaling 4.0% of Total Revenue.",
          "Property insurance at the midpoint of Franklin Street’s high and low premium estimates.",
          "Year One = 2027. Conversion displacement in 2028 (Year Two).",
          "Acquisition financing assumes 47.2% LTC: existing Courtyard CMBS loan of $16.25M at 5.90% fixed, interest only.",
          "Closing costs equal to 2.0% of purchase price.",
          "Terminal capitalization rate equal to 8.50%.",
          "Franchise fees of 12% of rooms revenue in 2027 (pre-conversion), then 9% in 2028 and 10% thereafter post-conversion (base 4% rising to 5%, 2% marketing, 3% loyalty)."
        ]
      }
    },
    sensNote: "* Includes Capex & Closing Costs. Metrics recorded at midpoint of value range presented.",

    /* Leveraged (5-yr) and unleveraged (10-yr) return analyses */
    returns: {
      portfolio: {p: [28,29],uses: [["Property Acquisition",58000000,154255],["Renovation",1844000,4904],["Closing Costs (2.0%)",1160000,3085],["Total Use of Funds",61004000,162245]],sources: [["First Mortgage (1)",38700000,"63%"],["Equity",22304000,"37%"],["Total Source of Funds",61004000,"100%"]],sourcesNote: "(1) Assumes the loans for the Courtyard and Residence Inn [footnote text truncated in source]",debt: {lines: [["Hyatt Place","$8,775,000 · Variable · Interest Only"],["Courtyard","$16,250,000 · 5.90% fixed · 10-yr term · Prepayment penalty (as of 9/2026) $806,178 · Matures July-32"],["Residence Inn","$13,675,000 · 5.99% fixed · 10-yr term · Prepayment penalty (as of 9/2026) $738,547 · Matures July-32"]],payment: [2438486,2456831,2455847,2453896,2457759],balance: 38700000},noi: [4986384,5428491,5590991,5692076,5794585,6048597],cfads: [2547897,2971660,3135144,3238180,3336827],debtYield: [12.9,14,14.4,14.7,15],dscr: [2.04,2.21,2.28,2.32,2.36],coc: [11.4,13.3,14.1,14.5],sale5: {noi6: 6048597,cap: 8.5,gross: 71159963,net: 69736764,perRoom: 189255,gain: 8732764,capLabel: "Terminal Cap Rate (Blended)"},netCF: [-22304000,2547897,2971660,3135144,3238180,34373590],irr: 18.8,em: "2.07 x",multiples: [["T-12 Room Rev. Multiple","3.72 x","3.91 x"],["FCST 2026 Room Rev. Multiple","3.69 x","3.88 x"],["Year One Room Rev. Multiple","3.63 x","3.81 x"]],capRates: [["YE 2025, All-In Cap Rate","6.7%"],["YE 2025, Acquisition Cap Rate","7.1%"],["T-12 2026, All-In Cap Rate","7.1%"],["T-12 2026, Acquisition Cap Rate","7.4%"],["FCST 2026, All-In Cap Rate","7.2%"],["FCST 2026, Acquisition Cap Rate","7.6%"],["FCST 2026, EBITDA Multiple","11.39 x"],["Year One, All-In Cap Rate","8.2%"],["Year One, Acquisition Cap Rate","8.6%"],["Year One, EBITDA Multiple","10.23 x"],["Year Two, All-In Cap Rate","8.9%"],["Year Two, Acquisition Cap Rate","9.4%"],["Year Two, EBITDA Multiple","9.44 x"]],unlev: {noi: [4986384,5428491,5590991,5692076,5794585,6048597,6313044,6588340,6874910,7173200,7483670],cap: 9,capLabel: "Terminal Cap Rate (Blended)",gross: 83151886,net: 81488848,gain: 20484848,perRoom: 221149,netCF: [-61004000,4986384,5428491,5590991,5692076,5794585,6048597,6313044,6588340,6874910,88662048],coc: [8.2,8.9,9.2,9.3,9.5,9.9,10.3,10.8,11.3],irr: 11.6,em: "2.33 x",residual: 44.8,cashflow: 55.2},loan: {rooms: 376,title: "Loan Terms",groups: [["Hyatt Place:",[["Mortgage Amount:","$8,775,000"],["Interest Rate:","Variable"],["Amortization Period:","Interest Only"]]],["Courtyard:",[["Mortgage Amount:","$16,250,000"],["Interest Rate (fixed):","5.90%"],["Term:","10 Years"],["Total Prepayment Penalty (as of 9/2026):","$806,178"],["Maturity Date:","July-32"]]],["Residence Inn:",[["Mortgage Amount:","$13,675,000"],["Interest Rate (fixed):","5.99%"],["Term:","10 Years"],["Total Prepayment Penalty (as of 9/2026):","$738,547"],["Maturity Date:","July-32"]]]]}},
      courtyard: {p: [34,35],uses: [["Property Acquisition",27000000,156069],["Renovation",346000,2000],["Closing Costs (2.0%)",540000,3121],["Total Use of Funds",27886000,161191]],sources: [["First Mortgage – Assumed",16250000,"58%"],["Equity",11636000,"42%"],["Total Source of Funds",27886000,"100%"]],debt: {lines: [["First Mortgage","$16,250,000 · Fixed 5.90% · Interest Only · 10-yr term · Prepayment penalty (as of 9/2026) $806,178 · Matures 7/1/2032"]],payment: [958750,958750,958750,958750,958750],balance: 16250000},noi: [2426484,2513145,2562139,2611978,2662670,2778380],cfads: [1467734,1554395,1603389,1653228,1703920],debtYield: [14.9,15.5,15.8,16.1,16.4],dscr: [2.53,2.62,2.67,2.72,2.78],coc: [12.6,13.4,13.8,14.2],sale5: {noi6: 2778380,cap: 8.5,gross: 32686822,net: 32033085,perRoom: 188941,gain: 4147085,capLabel: "Terminal Cap Rate"},netCF: [-11636000,1467734,1554395,1603389,1653228,17487005],irr: 18.5,em: "2.04 x",multiples: [["T-12 Room Rev. Multiple","3.93 x","4.06 x"],["FCST 2026 Room Rev. Multiple","3.90 x","4.03 x"],["Year One Room Rev. Multiple","3.79 x","3.91 x"]],capRates: [["YE 2025, All-In Cap Rate","7.4%"],["YE 2025, Acquisition Cap Rate","7.6%"],["T-12 2026, All-In Cap Rate","7.8%"],["T-12 2026, Acquisition Cap Rate","8.0%"],["FCST 2026, All-In Cap Rate","8.0%"],["FCST 2026, Acquisition Cap Rate","8.2%"],["FCST 2026, EBITDA Multiple","10.70 x"],["Year One, All-In Cap Rate","8.7%"],["Year One, Acquisition Cap Rate","9.0%"],["Year One, EBITDA Multiple","9.85 x"],["Year Two, All-In Cap Rate","9.0%"],["Year Two, Acquisition Cap Rate","9.3%"],["Year Two, EBITDA Multiple","9.52 x"]],unlev: {noi: [2426484,2513145,2562139,2611978,2662670,2778380,2898815,3024161,3154610,3290364,3431629],cap: 9,capLabel: "Terminal Cap Rate",gross: 38129212,net: 37366628,gain: 9480628,perRoom: 220400,netCF: [-27886000,2426484,2513145,2562139,2611978,2662670,2778380,2898815,3024161,3154610,40656992],coc: [8.7,9,9.2,9.4,9.5,10,10.4,10.8,11.3],irr: 11.7,em: "2.34 x",residual: 44.4,cashflow: 55.6},loan: {rooms: 173,title: "First Mortgage",left: [["Mortgage Amount","$16,250,000"],["Interest Rate","Fixed"],["Amortization Period","Interest Only"]],right: [["Term:","10 Years"],["Prepayment Penalty (as of 9/2026):","$806,178"],["Maturity Date:","7/1/2032"]],rates: [5.9,5.9,5.9,5.9,5.9]}},
      hyatt: {p: [40,41],uses: [["Property Acquisition",12000000,142857],["Renovation",1260000,15000],["Closing Costs (2.0%)",240000,2857],["Total Use of Funds",13500000,160714]],sources: [["First Mortgage",8775000,"65%"],["Equity",4725000,"35%"],["Total Source of Funds",13500000,"100%"]],debt: {lines: [["First Mortgage","$8,775,000 · Variable (SOFR + 3.00%) · Interest Only"],["SOFR base, Yr 1–5","4.53% · 4.74% · 4.73% · 4.70% · 4.75%"],["Annual rate, Yr 1–5","7.53% · 7.74% · 7.73% · 7.70% · 7.75%"]],payment: [660604,678949,677964,676014,679876],balance: 8775000},noi: [906839,1194949,1259062,1279421,1299972,1358859],cfads: [246235,516000,581098,603408,620096],debtYield: [10.3,13.6,14.3,14.6,14.8],dscr: [1.37,1.76,1.86,1.89,1.91],coc: [5.2,10.9,12.3,12.8],sale5: {noi6: 1358859,cap: 8.5,gross: 15986577,net: 15666846,perRoom: 190316,gain: 2166846,capLabel: "Terminal Cap Rate"},netCF: [-4725000,246235,516000,581098,603408,7511942],irr: 16.8,em: "2.00 x",multiples: [["T-12 Room Rev. Multiple","3.21 x","3.61 x"],["FCST 2026 Room Rev. Multiple","3.15 x","3.55 x"],["Year One Room Rev. Multiple","3.21 x","3.61 x"]],capRates: [["YE 2025, All-In Cap Rate","4.8%"],["YE 2025, Acquisition Cap Rate","5.4%"],["T-12 2026, All-In Cap Rate","5.1%"],["T-12 2026, Acquisition Cap Rate","5.7%"],["FCST 2026, All-In Cap Rate","5.4%"],["FCST 2026, Acquisition Cap Rate","6.1%"],["FCST 2026, EBITDA Multiple","13.41 x"],["Year One, All-In Cap Rate","6.7%"],["Year One, Acquisition Cap Rate","7.6%"],["Year One, EBITDA Multiple","11.25 x"],["Year Two, All-In Cap Rate","8.9%"],["Year Two, Acquisition Cap Rate","10.0%"],["Year Two, EBITDA Multiple","8.74 x"]],unlev: {noi: [906839,1194949,1259062,1279421,1299972,1358859,1420218,1484148,1550752,1620137,1692414],cap: 9,capLabel: "Terminal Cap Rate",gross: 18804598,net: 18428506,gain: 4928506,perRoom: 223864,netCF: [-13500000,906839,1194949,1259062,1279421,1299972,1358859,1420218,1484148,1550752,20048643],coc: [6.7,8.9,9.3,9.5,9.6,10.1,10.5,11,11.5],irr: 11.6,em: "2.36 x",residual: 45.6,cashflow: 54.4},loan: {rooms: 84,title: "First Mortgage",left: [["Mortgage Amount","$8,775,000"],["Interest Rate","Variable"],["Amortization Period","Interest Only"]],right: [],rates: [7.53,7.74,7.73,7.7,7.75]}},
      residence: {p: [46,47],uses: [["Property Acquisition",19000000,159664],["Renovation",238000,2000],["Closing Costs (2.0%)",380000,3193],["Total Use of Funds",19618000,164857]],sources: [["First Mortgage – Assumed",13675000,"70%"],["Equity",5943000,"30%"],["Total Source of Funds",19618000,"100%"]],debt: {lines: [["First Mortgage","$13,675,000 · Fixed 5.99% · Interest Only · 10-yr term · Prepayment penalty (as of 9/2026) $738,547 · Matures 7/15/2032"]],payment: [819133,819133,819133,819133,819133],balance: 13675000},noi: [1653061,1720398,1769789,1800678,1831943,1911358],cfads: [833928,901265,950657,981545,1012810],debtYield: [12.1,12.6,12.9,13.2,13.4],dscr: [2.02,2.1,2.16,2.2,2.24],coc: [14,15.2,16,16.5],sale5: {noi6: 1911358,cap: 8.5,gross: 22486564,net: 22036833,perRoom: 188963,gain: 2418833,capLabel: "Terminal Cap Rate"},netCF: [-5943000,833928,901265,950657,981545,9374643],irr: 20.8,em: "2.19 x",multiples: [["T-12 Room Rev. Multiple","3.80 x","3.92 x"],["FCST 2026 Room Rev. Multiple","3.80 x","3.92 x"],["Year One Room Rev. Multiple","3.70 x","3.83 x"]],capRates: [["YE 2025, All-In Cap Rate","7.1%"],["YE 2025, Acquisition Cap Rate","7.4%"],["T-12 2026, All-In Cap Rate","7.4%"],["T-12 2026, Acquisition Cap Rate","7.7%"],["FCST 2026, All-In Cap Rate","7.5%"],["FCST 2026, Acquisition Cap Rate","7.7%"],["FCST 2026, EBITDA Multiple","11.34 x"],["Year One, All-In Cap Rate","8.4%"],["Year One, Acquisition Cap Rate","8.7%"],["Year One, EBITDA Multiple","10.20 x"],["Year Two, All-In Cap Rate","8.8%"],["Year Two, Acquisition Cap Rate","9.1%"],["Year Two, EBITDA Multiple","9.81 x"]],unlev: {noi: [1653061,1720398,1769789,1800678,1831943,1911358,1994012,2080031,2169547,2262699,2359627],cap: 9,capLabel: "Terminal Cap Rate",gross: 26218075,net: 25693714,gain: 6075714,perRoom: 220320,netCF: [-19618000,1653061,1720398,1769789,1800678,1831943,1911358,1994012,2080031,2169547,27956412],coc: [8.4,8.8,9,9.2,9.3,9.7,10.2,10.6,11.1],irr: 11.3,em: "2.29 x",residual: 44.8,cashflow: 55.2},loan: {rooms: 119,title: "First Mortgage",left: [["Mortgage Amount","$13,675,000"],["Interest Rate","Fixed"],["Amortization Period","Interest Only"]],right: [["Term:","10 Years"],["Prepayment Penalty (as of 9/2026):","$738,547"],["Maturity Date:","7/15/2032"]],rates: [5.99,5.99,5.99,5.99,5.99]}},
      tribute: {p: [51,52],uses: [["Property Acquisition",27000000,156069],["Renovation & Conversion Costs",6920000,40000],["Closing Costs (2.0%)",540000,3121],["Total Use of Funds",34460000,199191]],sources: [["First Mortgage – Assumed",16250000,"47%"],["Equity",18210000,"53%"],["Total Source of Funds",34460000,"100%"]],debt: {lines: [["First Mortgage","$16,250,000 · Fixed 5.90% · Interest Only · 10-yr term · Prepayment penalty (as of 9/2026) $806,178 · Matures 7/1/2032"]],payment: [958750,958750,958750,958750,958750],balance: 16250000},noi: [2426484,2294477,3489747,3566806,3645573,3802321],cfads: [1467734,1335727,2530997,2608056,2686823],debtYield: [14.9,14.1,21.5,21.9,22.4],dscr: [2.53,2.39,3.64,3.72,3.8],coc: [8.1,7.3,13.9,14.3],sale5: {noi6: 3802321,cap: 8.5,gross: 44733191,net: 43838527,perRoom: 258573,gain: 9378527,capLabel: "Terminal Cap Rate"},netCF: [-18210000,1467734,1335727,2530997,2608056,30275350],irr: 18.2,em: "2.10 x",multiples: [["T-12 Room Rev. Multiple","3.93 x","5.01 x"],["FCST 2026 Room Rev. Multiple","3.90 x","4.98 x"],["Year One Room Rev. Multiple","3.79 x","4.83 x"]],capRates: [["YE 2025, All-In Cap Rate","6.0%"],["YE 2025, Acquisition Cap Rate","7.6%"],["T-12 2026, All-In Cap Rate","6.3%"],["T-12 2026, Acquisition Cap Rate","8.0%"],["FCST 2026, All-In Cap Rate","6.4%"],["FCST 2026, Acquisition Cap Rate","8.2%"],["FCST 2026, EBITDA Multiple","10.70 x"],["Year One, All-In Cap Rate","7.0%"],["Year One, Acquisition Cap Rate","9.0%"],["Year One, EBITDA Multiple","9.85 x"],["Year Three, All-In Cap Rate","10.1%"],["Year Three, Acquisition Cap Rate","12.9%"],["Year Three, EBITDA Multiple","6.90 x"]],unlev: {noi: [2426484,2294477,3489747,3566806,3645573,3802321,3965431,4135150,4311737,4495460,4686598],cap: 9,capLabel: "Terminal Cap Rate",gross: 52073311,net: 51031844,gain: 16571844,perRoom: 301002,netCF: [-34460000,2426484,2294477,3489747,3566806,3645573,3802321,3965431,4135150,4311737,55527304],coc: [7,6.7,10.1,10.4,10.6,11,11.5,12,12.5],irr: 12.5,em: "2.53 x",residual: 45.6,cashflow: 54.4},loan: {rooms: 173,title: "First Mortgage",left: [["Mortgage Amount","$16,250,000"],["Interest Rate","Fixed"],["Amortization Period","Interest Only"]],right: [["Term:","10 Years"],["Prepayment Penalty (as of 9/2026):","$806,178"],["Maturity Date:","7/1/2032"]],rates: [5.9,5.9,5.9,5.9,5.9]}}
    },
    disclaimer: "The financial projections and investment analyses represented herein contain estimates and assumptions based on our study of the current market conditions. Hodges Ward Elliott, LLC. neither warrants nor guarantees the results of these projections and analyses since unanticipated events and circumstances may occur.",
    cfFootnotes: ["(1) Management fees included on a pro forma basis at 3% of Total Revenue.","(2) Reserve for replacement included on a pro forma basis at 4% of Total Revenue.","(3) Forecast 2026 includes actuals through August + Budget September – December."],
    penFootnotes: ["(1) Historical results for the Competitive Set are derived from STR data. Projections for Years One through Five for the Hotel and the Competitive Set are based on our study of the current market conditions. HWE neither warrants nor guarantees the results of these projections and analyses since unanticipated events and circumstances may occur.","* Forecast 2026 percentage change is calculated from Year End 2025.","* Proforma Year 1 percentage change is calculated from Forecast 2026."],
    compsets: { // p32, 38, 44 (subject property NOT included)
      courtyard: { total: 665, members: [["Fairfield Inn & Suites Destin",100,"Feb-00"],["Holiday Inn Express & Suites Destin E - Commons Mall Area",74,"May-02"],["La Quinta Inn & Suites by Wyndham Miramar Beach-Destin",126,"Jan-20"],["Hilton Garden Inn Destin Miramar Beach",111,"May-20"],["Spark by Hilton Destin",137,"Oct-97"],["Tru by Hilton Destin",117,"Jul-23"]] },
      hyatt: { total: 419, members: [["Fairfield Inn & Suites Destin",100,"Feb-00"],["Hampton Inn & Suites Destin",134,"Jan-14"],["Hilton Garden Inn Destin Miramar Beach",111,"May-20"],["Holiday Inn Express & Suites Destin - Miramar Beach",74,"Jul-05"]] },
      residence: { total: 534, members: [["Fairfield Inn & Suites Destin",100,"Feb-00"],["Holiday Inn Express & Suites Destin E - Commons Mall Area",74,"May-02"],["SummerPlace Inn Destin (no data reported after Mar 2025)",72,"Jun-97"],["Extended Stay America Destin - US 98 - Emerald Coast Pkwy",101,"Jul-01"],["Candlewood Suites Destin-Sandestin Area",75,"Mar-08"],["Home2 Suites by Hilton Destin",112,"Dec-16"]] },
      supplyAddition: "Additions to supply: Drury Inn & Suites · opened May-26 · 116 keys · Open · 3 miles west"
    }
  },

  /* ---------------- Market (p53–60) ---------------- */
  market: {
    overview: { p: 55, body: [
      "South Walton is one of Florida’s premier leisure destinations and one of its most supply-constrained coastal resort markets. About 40% of the land south of Choctawhatchee Bay is protected, and the land between Grand Boulevard and the Gulf is largely golf course and protected land, which limits new coastal development. In Miramar Beach, activity is centered on Grand Boulevard, South Walton’s main mixed-use town center. Nearby are the area’s white-sand Gulf beaches, four golf courses (three open to public play), the Village of Baytowne Wharf, and the shopping, state parks and charter fishing of greater Destin.",
      "Population growth continues to expand the base. Population within five miles of Grand Boulevard grew 55.7% from 2020 to 2025 and is projected to grow a further 17.5% by 2030. Walton County grew 23.9% from 2020 to July 2025, reaching approximately 93,300 residents, and the Crestview–Fort Walton Beach–Destin MSA grew 10.4% to approximately 316,700 residents."
      ],
      tiles: [["~40%","Of land south of Choctawhatchee Bay is protected","Supply-constrained resort market"],["4","Golf courses (3 open to public) and protected land between Grand Boulevard and the Gulf limit new coastal development",""],["Grand Boulevard","Miramar Beach’s activity hub and South Walton’s main mixed-use town center",""],["Gulf beaches","White-sand beaches, Baytowne Wharf, Destin shopping, state parks and charter fishing","Premier leisure destination"]],
      growth: [["+55.7%","Population growth within 5 miles of Grand Boulevard","2020 to 2025"],["+17.5%","Further population growth within 5 miles of Grand Boulevard","2025 to 2030 (projected)"],["+23.9%","Walton County population · ~93,300 residents","2020 to July 2025"],["+10.4%","Crestview–Fort Walton Beach–Destin MSA · ~316,700 residents","2020 to July 2025"]]
    },
    tourism: { p: 56,
      body: [
        "In 2025, Walton County welcomed 4.5 million visitors, generating more than 3.9 million room nights, $3.9 billion in direct spending and $4.7 billion in total economic impact. Visitors stay an average of 6.4 nights, 95% plan to return, and more than 34% have visited 10 or more times.",
        "South Walton is primarily a drive-to destination: 74% of visitors arrive by car, or roughly 3.3 million drive-in visitors a year. Miramar Beach sits on US Highway 98, Florida’s main east–west Gulf Coast corridor, which carries nearly 48,000 vehicles per day past Grand Boulevard. Approximately 16 million people live within a five-hour drive and more than 84 million within ten hours, with Birmingham, New Orleans and Atlanta each within five hours. Roughly 68% of visitors come from the Southeast.",
        "The largest source markets are Atlanta, Nashville, Dallas–Fort Worth, Birmingham, Houston and Memphis.",
        "South Walton’s visitors are as affluent as its residents. Visitor households average $197,500 in income, and one-third earn more than $200,000. Residential values reflect the same profile: South Walton communities post the highest residential prices per square foot on the Emerald Coast, and Sandestin and Miramar Beach average more than $500 per SF, above Destin and Panama City Beach."
      ],
      stats: [["4.5M","Visitors"],["3.9M+","Room nights"],["$3.9B","Direct spending"],["$4.7B","Total economic impact"],["6.4","Nights per average stay"],["95%","Plan to return"],["34%+","Have visited 10+ times"],["~3.3M","Drive-in visitors per year"]],
      origins: [["Georgia",13.1],["Tennessee",12.8],["Texas",12.3],["Alabama",10.6],["Mississippi",7.7]],
      southeast: 68
    },
    boulevard: { p: 57,
      body: [
        "Grand Boulevard is a $500 million mixed-use lifestyle center and the highest-end retail destination between Pensacola and Jacksonville. Retail sales average approximately $850 per square foot and are trending toward $1,000. A full-time events department programs the center year-round, including the 30A Songwriters Festival, the South Walton Beaches Wine & Food Festival, holiday events and live concerts.",
        "Grand Boulevard’s tenant mix sets it apart from any other retail destination on the Emerald Coast. The center brings together national luxury and premium brands, including Anthropologie, Arhaus, Lululemon, Peter Millar, Pottery Barn, Williams Sonoma and Lilly Pulitzer, alongside established regional operators. Tommy Bahama operates a full-concept store and restaurant on the Boulevard, reportedly one of the brand’s highest-grossing locations.",
        "The quality of this roster creates a halo effect across Miramar Beach. Premium brands draw an affluent, destination-driven customer, raise the profile of the surrounding submarket and support premium room rates at nearby hotels. That same customer defines South Walton’s visitor base. Howard Group also plans additional retail development on land adjacent to the Hyatt Place, further integrating the hotels into the retail core."
      ],
      stats: [["~$850 PSF","Retail sales, trending toward $1,000 PSF"],["765,000 SF","Of retail, restaurant and hotel space, planned to exceed 1 million SF"],["185,000 SF","Of Class A office space"],["200+","Events annually"],["500","Residences planned"]],
      tenants: ["Anthropologie","Arhaus Studio","Bricktops","J.McLaughlin","Kendra Scott","bluemercury","lululemon","Peter Millar","Lilly Pulitzer","Pottery Barn","Williams Sonoma","Warby Parker"]
    },
    airlift: { p: 58,
      bullets: [
        ["Destin–Fort Walton Beach Airport (VPS)","The closest to Miramar Beach. VPS handled 2.58 million passengers over the 12 months ended September 2026, up 4.0% year over year, following a record 2025. Allegiant, American, Delta and Southwest have expanded service there, connecting the market to origin cities across the Southeast, Midwest and Northeast."],
        ["Northwest Florida Beaches International Airport (ECP)","Surpassed 2 million TTM passengers for the first time in July 2026 and has broken ground on an $85 million North Terminal expansion."],
        ["Pensacola International Airport (PNS)","Set a record with 3.1 million passengers in 2025 and is building a $113 million terminal expansion."]
      ],
      /* Chart values are NOT printed in the BOV. They are measured from the
         bar geometry of the source chart artwork (regional-airport-passenger-
         statistics.pdf) and rounded to 0.01M. PNS 2025 (3.12M) reconciles to
         the 3.1M stated in the text. */
      years: [2018,2019,2020,2021,2022,2023,2024,2025],
      series: { VPS: [1.41,1.67,0.95,2.00,2.01,2.28,2.38,2.49], ECP: [1.06,1.28,0.82,1.60,1.52,1.66,1.88,1.94], PNS: [2.10,2.20,1.38,2.08,2.44,2.65,3.03,3.12] }
    },
    submarket: { p: 59,
      body: "The Fort Walton Beach submarket includes Destin and Miramar Beach. It is the largest of the Florida Panhandle’s five submarkets, with approximately 13,000 hotel rooms. Over the trailing 12 months it achieved an ADR of $177 and RevPAR of $105, the highest in the Panhandle and a 17% and 15% premium, respectively, to the market overall. RevPAR grew 2.6%, compared with 1.2% for the Panhandle.",
      cols: ["Occ.","% Δ","ADR","% Δ","RevPAR","% Δ","Supply","% Δ","Demand","% Δ"],
      rows: [
        ["2000",56.7,null,94.95,null,53.86,null,2999943,null,1701592,null],
        ["2001",55.3,-2.5,95.82,0.9,52.98,-1.6,3121870,4.1,1726241,1.4],
        ["2002",56.6,2.3,98.56,2.9,55.78,5.3,3210795,2.8,1817058,5.3],
        ["2003",59.0,4.2,100.65,2.1,59.34,6.4,3269199,1.8,1927455,6.1],
        ["2004",62.7,6.4,103.25,2.6,64.76,9.1,3251454,-0.5,2039395,5.8],
        ["2005",65.4,4.3,109.97,6.5,71.95,11.1,3176212,-2.3,2077921,1.9],
        ["2006",59.1,-9.7,121.62,10.6,71.87,-0.1,3347215,5.4,1978024,-4.8],
        ["2007",54.4,-7.9,128.38,5.6,69.85,-2.8,3499722,4.6,1904165,-3.7],
        ["2008",48.8,-10.3,127.87,-0.4,62.40,-10.7,3573357,2.1,1743760,-8.4],
        ["2009",47.0,-3.7,119.32,-6.7,56.04,-10.2,3686529,3.2,1731564,-0.7],
        ["2010",49.4,5.2,107.49,-9.9,53.10,-5.3,3596717,-2.4,1776680,2.6],
        ["2011",53.7,8.6,116.40,8.3,62.46,17.6,3562421,-1.0,1911627,7.6],
        ["2012",55.6,3.7,123.37,6.0,68.63,9.9,3495058,-1.9,1944333,1.7],
        ["2013",55.8,0.3,126.18,2.3,70.42,2.6,3361041,-3.8,1875682,-3.5],
        ["2014",57.1,2.2,132.67,5.1,75.70,7.5,3501250,4.2,1997853,6.5],
        ["2015",58.2,1.9,138.72,4.6,80.68,6.6,3565599,1.8,2073712,3.8],
        ["2016",60.0,3.2,143.48,3.4,86.14,6.8,3585002,0.5,2152104,3.8],
        ["2017",60.4,0.6,148.06,3.2,89.40,3.8,3772019,5.2,2277564,5.8],
        ["2018",64.1,6.2,150.88,1.9,96.76,8.2,3830644,1.6,2456572,7.9],
        ["2019",62.8,-2.0,152.98,1.4,96.13,-0.6,3909748,2.1,2456858,0.0],
        ["2020",48.8,-22.4,141.41,-7.6,68.96,-28.3,3987885,2.0,1944732,-20.8],
        ["2021",63.1,29.5,192.58,36.2,121.59,76.3,4133666,3.7,2609808,34.2],
        ["2022",60.7,-3.8,189.15,-1.8,114.88,-5.5,4178633,1.1,2537851,-2.8],
        ["2023",59.1,-2.7,181.28,-4.2,107.18,-6.7,4214904,0.9,2491960,-1.8],
        ["2024",58.3,-1.4,173.07,-4.5,100.94,-5.8,4348455,3.2,2536105,1.8],
        ["2025",57.9,-0.7,176.85,2.2,102.37,1.4,4425882,1.8,2561974,1.0],
        ["TTM Sep 2026",59.2,null,177.35,null,104.93,null,4554409,null,2694630,null]
      ],
      ytd: [["YTD Sep 2025",62.2,null,187.93,null,116.81,null,3296202,null,2048746,null],["YTD Sep 2026",63.7,2.5,187.88,0.0,119.67,2.5,3424729,3.9,2181402,6.5]],
      cagr: [["2000–2019",57.1,2.5,3.1,1.4,2.0],["2000–2009",56.5,2.6,0.4,2.3,0.2],["2009–2025",57.2,2.5,3.8,1.1,2.5]],
      cagrHeads: ["Period","Avg. Occ.","ADR CAGR","RevPAR CAGR","Supply CAGR","Demand CAGR"]
    },
    comps: { p: 53, intro: "Over the past 12 months, the Fort Walton Beach submarket recorded $49.6 million in hotel sales.",
      rows: [
        ["Oct-26","Home2 Suites by Hilton Destin","Destin",112,22000000,196429],
        ["Jul-26","Hyatt Place Pensacola Airport","Pensacola",127,11000000,86614],
        ["Jul-26","Courtyard by Marriott Panama City","Panama City",84,8800000,104762],
        ["May-26","Staybridge Suites Miramar Beach","Miramar Beach",116,19165000,165216],
        ["Nov-25","Residence Inn by Marriott","Pensacola",86,17100000,198837],
        ["Jun-25","Fairfield Inn & Suites Destin","Fort Walton Beach",100,15000000,150000],
        ["May-25","Fairfield Inn & Suites Shalimar","Shalimar",92,10000000,108696],
        ["Jan-25","Fairfield Inn & Suites - Fort Walton Beach","Fort Walton Beach",74,11200000,151351],
        ["May-24","Courtyard Pensacola Downtown","Pensacola",120,21500000,179167],
        ["Apr-24","Residence Inn by Marriott Pensacola Downtown","Pensacola",78,11000000,141026],
        ["Apr-24","Best Western Sugar Sands Inns & Suites","Fort Walton Beach",137,18980000,138540],
        ["Dec-23","Homewood Suites by Hilton Destin","Destin",95,30250000,318421],
        ["Jan-22","Hilton Garden Inn","Miramar Beach",111,30000000,270270]
      ]
    },
    supply: { p: 60,
      body: "Construction activity in the competitive market is limited. Of the 6 hotels (666 rooms) in the Destin, Miramar Beach and Grayton Beach pipeline, only the 76-room Series by Marriott, about 11 miles east, is under construction. The closest project, the 115-room Moxy, is controlled by Howard Group and not expected to open soon. The other 9 hotels (850 rooms) are 18 to 22 miles away in Freeport, Fort Walton Beach and Shalimar, outside the competitive market.",
      rows: [
        ["MOXY Destin",115,"Final Planning","400 Grand Blvd",0.3],
        ["Holiday Inn Express Santa Rosa Beach FL",100,"Proposed","4858 US Highway 98",4.0],
        ["Hampton Inn and Suites by Hilton Santa Rosa Beach",125,"Final Planning","4379 U.S. 98 W",4.3],
        ["Fairfield by Marriott Inn & Suites Santa Rosa Beach",100,"Final Planning","4850 US Highway 98",4.4],
        ["SpringHill Suites by Marriott Destin",150,"Proposed","NWQ Vinings Way Blvd & Emerald Coast Pkwy",5.8],
        ["Series by Marriott Grayton Beach",76,"Under Construction","207 Grayton Village Rd",11.4],
        ["LivSmart Studios by Hilton Fort Walton Beach",120,"Final Planning","206 Perry Ave SE",17.8],
        ["Home2 Suites by Hilton Fort Walton Beach Okaloosa Island",105,"Proposed","TBD Miracle Strip Pky SE",17.9],
        ["Home2 Suites by Hilton Freeport",126,"Proposed","Hwy 331 & State Rd 3280",19.3],
        ["Holiday Inn Express & Suites Freeport FL",115,"Proposed","County Hwy 3280 & Hwy 331",19.3],
        ["Sleep Inn Freeport",46,"Proposed","16704 US 331 Highway",19.3],
        ["MainStay Suites Freeport",46,"Proposed","16704 US 331 Highway",19.3],
        ["Hampton Inn by Hilton Fort Walton Beach Eglin Air Force Base",84,"Under Construction","730 Eglin Pky NE",19.7],
        ["StudioRes by Marriott Shalimar",105,"Final Planning","51 3rd St",22.1],
        ["Staybridge Suites Shalimar FL",103,"Proposed","51 3rd St",22.1]
      ]
    }
  }
};
