# Local SEO playbook (without Google Business Profile)

**Decision:** the business does **not** use Google Business Profile. Local visibility therefore comes from:
1. ranking area and service pages
2. consistent business details on directories
3. editorial and classified listings
4. real testimonials on the site
5. optionally, Google Ads

Google Local Services Ads aren't available in the UAE either (research-notes.md).

## 1. On-site local signals (built in)
- **43 area pages:** each has unique local content, its own FAQ (with FAQ structured data), a map, nearby-area links and a "Guides" section.
- **Service structured data on every area page**, naming the area served.
- **LocalBusiness structured data site-wide:** name, address (Al Quoz 4, Dubai), phone, email, service catalogue and contact point.
- **Business details in the footer of every page**, matching the structured data exactly.
- **Keep it consistent:**
  - When you add an area page, use `content/area-list.json` and `content/area-pages.json`, with unique content and no near-duplicates.
  - Add its image to the permanent area prompt list.

## 2. Business details (identical everywhere)
```
Shanan Junk Removal
Al Quoz 4, Dubai, United Arab Emirates
+971 55 103 1255
https://junkremovalgarbage.com/
```
Use exactly this on every directory, social profile and listing. Record each listing (URL, login, date) in a spreadsheet, and update all of them if anything changes.

## 3. Directories and listings (no Google profile needed)
- **Batch 1:** Yellow Pages UAE (confirm the official domain first), Connect.ae, YallaBanana, ExpatWoman directory, your Facebook and Instagram business pages.
- **Batch 2:** Yalwa UAE, 123UAE, GetListedAE, Foursquare, and the Dubai Chamber directory if you're a member.
- **Classifieds** (direct lead channels):
  - dubizzle services listings
  - mourjan.com, the Arabic removal-services category
  - OpenSooq

  Link each listing to the most relevant area or service page.
- **Editorial outreach:** Property Finder, Bayut and Dubizzle publish junk-removal and bulky-waste guides that list providers. Email the editors with accurate details and photos and ask to be included. These links carry real authority.

## 4. Testimonials (genuine only)
- After each job, ask on WhatsApp whether you can quote the customer's feedback (first name and area only) on the website.
- **Only publish real, permitted testimonials.** Never invent, edit the meaning of, or pay for testimonials (content-rules.md §2). Once there are 5 or more, they can be added to the home and area pages. That's a developer task.

## 5. Lead tracking (built in)
- **Vercel Web Analytics:** enable it in the Vercel dashboard → Analytics.
- **Events:** the site sends `call_click`, `whatsapp_click` and `form_submit` (each with the page, and the service for forms). See them in Vercel → Analytics → Events. Custom events need Vercel Pro.
- **Source tagging:** website WhatsApp links pre-fill "Hi, I need junk removal in Dubai." On directories and classifieds, use a different greeting (e.g. "Hi, I found you on dubizzle") so you can tell where WhatsApp chats come from.
- **Lead log:** one row per lead with date, source, channel, service, area, won or lost, and job value.

## 6. Search Console routine
- **Weekly:**
  - Performance → Queries and Pages. Filter by area slugs to see which area pages are gaining.
  - Pages → Not indexed.
- **After publishing or adding pages:** URL Inspection → Request indexing.
- **Monthly:** re-prioritise the keyword roadmap and article queue from real impressions.

## 7. Google Ads (optional, the fastest bridge)
Without the map pack, Search ads are the quickest way to appear for "junk removal near me" and "[service] dubai" while organic pages build. See lead-plan-60-days.md for the setup: exact and phrase money keywords, area and service landing pages, call assets, and negative keywords.
