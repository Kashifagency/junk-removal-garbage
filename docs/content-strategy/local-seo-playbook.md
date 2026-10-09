# Local SEO playbook — Google Business Profile, citations, reviews, tracking

In the UAE, **Google Local Services Ads are not available** (source: Google's LSA help country list, see research-notes.md). For "junk removal near me" and "[service] dubai" searches, the competition is the **Map Pack (Google Business Profile)**, organic results and Google Ads. The Map Pack is the fastest free lead channel.

## 1. Google Business Profile (week 1, then weekly)

**Profile setup**
- **Business name:** exactly the real registered or trading name. Do **not** add keywords to the name; Google suspends profiles for that.
- **Primary category:** *Waste management service* or *Rubbish removal service* (choose whichever exists in the UAE category list; check which category the top Map Pack competitors use).
- **Secondary categories:** add the relevant ones available, such as junk removal, garbage collection, demolition / debris removal, recycling centre. Only add categories that match services you actually provide.
- **Service area business:** if customers don't visit the Al Quoz office, hide the address and list service areas: Dubai Marina, JVC, Palm Jumeirah, Downtown Dubai, Business Bay, Al Barsha, Al Quoz, Arabian Ranches, The Meadows, The Springs, Umm Suqeim, Al Sufouh, and Dubai overall.
- **Phone:** +971 55 103 1255, the same as the website. **Website:** https://junkremovalgarbage.com/
- **WhatsApp:** enable chat or messaging if available.
- **Hours:** the real hours. Don't claim 24/7 unless it's true.
- **Services:** add each service with a 1–2 sentence description that mirrors the service pages: household junk removal, furniture & appliance disposal, construction waste removal, commercial waste management, garden waste cleanup, sofa disposal, mattress disposal, office clearance, house / villa clearance.
- **Description (750 characters):** what you remove, who you serve (homes, villas, apartments, offices), areas, same-day availability, recycling, and the contact. No URLs or prices.
- **Photos:** 15+ at launch, then 3–5 a week. Use real trucks, crew and before/after photos of jobs. Geotagging isn't required, but real and recent photos matter.

**Weekly**
- **One Google post:** a job of the week (before/after), a seasonal tip (moving-out season, renovation debris), or a link to a new article.
- **Reviews:** reply to every review within 48 hours. Thank the customer and mention the service and area naturally, e.g. "Glad we could clear your JVC apartment".
- **Questions & answers:** seed real common questions (from the site FAQ) and answer them.

## 2. Reviews (genuine only)
- After **every** job, send this on WhatsApp: "Thanks for choosing Shanan Junk Removal! If you were happy, a quick Google review helps us a lot: [review link]". Get the link from GBP → "Ask for reviews".
- In the first two weeks, contact every customer from the last 3 months.
- **Never** buy reviews, write them yourself, offer discounts for reviews, or ask staff or family to post them. That breaks Google's policy and the content rules (content-rules.md §2).
- **Target:** 20 new genuine reviews in 60 days. Recency and steady growth matter more than a burst.

## 3. Citations (consistent business details everywhere)
Use exactly the same details everywhere:
```
Shanan Junk Removal
Al Quoz 4, Dubai, United Arab Emirates
+971 55 103 1255
https://junkremovalgarbage.com/
```
**Batch 1 (week 2):** Bing Places, Apple Business Connect, Facebook page, Instagram profile, Yellow Pages UAE (confirm the correct official domain first), Connect.ae.
**Batch 2 (week 4):** Dubai Chamber directory (if you're a member), YallaBanana, ExpatWoman directory, Yalwa UAE, 123UAE, GetListedAE, Foursquare.
**Classifieds (lead channels):** dubizzle services listing, mourjan.com (Arabic classifieds, removal-services category).
**Editorial outreach:** Property Finder, Bayut and Dubizzle publish junk-removal and bulky-waste guides that list providers. Email their editors with accurate details and photos and ask to be included.

Record every listing (URL, login, date) in a shared spreadsheet. Update all of them if the phone or address changes.

## 4. Lead tracking (week 1 — without it you can't prove the 60-day result)
- **Analytics:** enable Vercel Web Analytics (Vercel dashboard → Analytics), or add GA4.
- **Conversions to track:**
  1. `tel:` link clicks: header, mobile bar, contact section, article CTAs
  2. `wa.me` link clicks
  3. contact form submissions: success state, and the Resend email arrives
- **Source tagging:**
  - The website's WhatsApp links pre-fill "Hi, I need junk removal in Dubai."
  - On GBP and social profiles, use a different greeting, e.g. "Hi, I found you on Google Maps", so you can tell where WhatsApp chats come from.
- **Lead log:** one row per lead with date, source (website / GBP / social / referral), channel (call / WhatsApp / form), service, area, won or lost, job value. Review it weekly against the KPIs in lead-plan-60-days.md.
- **Developer to-do:** add click events (`track('call_click')`, `track('whatsapp_click')`, `track('form_submit')`) once the analytics tool is chosen.

## 5. Search Console routine
- **Weekly:** Performance → Queries (new impressions, low-CTR queries to fix with better titles and descriptions), Pages → Not indexed.
- **After publishing:** URL Inspection → Request indexing.
- **Monthly:** compare against the keyword roadmap and re-prioritise from real impressions.

## 6. Google Ads (optional, the fastest bridge)
If budget allows, run a Search campaign while SEO builds.
- **Keywords:** exact and phrase match on cluster A (junk removal dubai, furniture removal dubai, sofa disposal dubai, construction waste removal dubai, office clearance dubai, junk removal [area]).
- **Landing pages:** the matching service or area page, not the homepage.
- **Assets:** call assets with your phone number, plus location assets.
- **Exclude:** "jobs", "salary", "free" (unless you're targeting the bulky-waste guide), "buy", "sell", "second hand".
- **Tracking:** the same conversions as section 4.
