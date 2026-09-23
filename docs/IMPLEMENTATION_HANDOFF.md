# Informa Planning Navigator Implementation Handoff

## Destination

Build a polished responsive demo web application called **Informa Planning Navigator**. The app should demonstrate a scalable paid media planning operating system for Informa: consistent inputs, adaptive planning, earlier dependency detection, clearer PMG resourcing, and a universal planning service floor.

This is a pitch demo, not a production integration project.

## Locked Decisions

### Five-Minute Demo Story

The main demo should center on **CPHi Frankfurt 2027**, a high-priority event with clear commercial objectives but unresolved planning inputs around language expansion, regional channel and creative strategy, creative refresh, pricing-phase timing, campaign cannibalisation, and measurement source-of-truth expectations.

The user journey should show:

1. Dashboard overview across divisions, statuses, readiness, and risks.
2. Opening or creating the CPHi Frankfurt 2027 brief.
3. Adaptive questions appearing when creative, messaging, language, and regional planning gaps are identified.
4. Readiness assessment showing Creative Readiness and Timeline Feasibility at risk.
5. Complexity and role recommendations for PMG planning.
6. Universal Planning Standard, proving every event receives a service floor.
7. PMG Review Workspace with requested information, specialist assignments, and draft planning recommendation.
8. Summary and export view with a structured operating picture.

Audience belief at the end: PMG is not proposing another briefing template; it is proposing a scalable planning operating system that standardizes inputs, adapts planning depth to event need, and surfaces operational dependencies before media work begins.

### Readiness, Risk, and Complexity

Use a transparent weighted diagnostic model, not a black-box AI score.

Readiness areas and weights:

- Business objective clarity: 15%
- Audience definition: 12%
- Budget readiness: 10%
- Creative readiness: 18%
- Data and tracking readiness: 12%
- Measurement readiness: 10%
- Governance readiness: 10%
- Timeline feasibility: 13%

Area status labels:

- Ready: 80-100
- Some Gaps: 60-79
- At Risk: 35-59
- Blocked: 0-34

Risk labels: Low, Medium, High, Critical.

Complexity labels: Standard, Enhanced, Complex, Transformation Required.

Readiness and complexity must be separate outputs: an event can be complex but ready, or simple but blocked by a missing prerequisite. Scores should be explained in plain language and framed as structured diagnostics for planning conversations, not scientific precision.

### Adaptive Rule Families

Implement the minimum compelling rule set:

1. Creative and messaging incomplete.
2. Lead generation with tracking gaps.
3. New event.
4. New market or localisation.
5. Multiple objectives.
6. Compressed timeline.
7. Small event with limited budget.

The CPHi demo path should emphasize creative, messaging, language, regional planning, timing, and measurement ambiguity. The lead-gen tracking-gap branch should remain visible in seeded data as a secondary scenario.

### Product IA and Visual Direction

Use a premium enterprise command-center layout, not a marketing landing page.

Navigation:

- Dashboard
- New Brief
- Active Briefs
- Readiness
- Resources
- Global Standards
- Settings

Key screens:

- Dashboard: KPI strip, readiness/risk overview, upcoming launch dates, filterable event brief table.
- New Brief: guided stepper with contextual guidance and adaptive inline questions.
- Readiness: score summary, area bars, risk/dependency list, Universal Planning Standard.
- PMG Review: submitted brief and flagged gaps on the left; editable PMG recommendation, score overrides, role assignment, status controls, and next actions on the right.
- Summary/Export: polished brief summary with JSON download, copy summary, simulated PDF export, and dashboard return.
- Global Standards: Universal Requirements, Configurable Planning Elements, Local Flexibility, and Future Capabilities.

The design should feel calm, premium, practical, modern, and appropriate for a global marketing organisation. Use status badges, progress bars, compact cards, tables, tooltips, and restrained visual polish.

### Technical Shape

Build as a Vite React + TypeScript SPA served by the existing Alli Apps TypeScript Express container.

- Package manager: pnpm.
- Client-only demo state.
- Local typed mock data.
- Deterministic helper functions for scoring, adaptive rules, resourcing, risks, and next actions.
- No auth, backend data store, or live integrations for the demo.
- Real JSON download and copy summary actions.
- Simulated first-pass PDF export is acceptable.
- Simulated AI recommendation panels must be labelled as draft decision support, not automated approval.

Recommended app structure:

```text
src/client/src/
  app/
  components/
    layout/
    ui/
  features/
    dashboard/
    brief/
    readiness/
    review/
    summary/
    standards/
  data/
    seedBriefs.ts
  domain/
    types.ts
    scoring.ts
    adaptiveRules.ts
    resourcing.ts
  styles/
```

## Seeded Briefs

### CPHi Frankfurt 2027

Use as the main demo scenario.

- Division: Informa Markets
- Region: Europe / global growth markets
- Event type: Exhibition & Conference, in-person, paid entry
- Event date: 10/08/2027
- Campaign dates: 22/02/2027 to 08/10/2027
- Budget: EUR 240,000, fixed
- Objective: paid delegate registrations and attendee revenue growth
- Targets: 8,470 paid media registrations, EUR 770,000 paid media revenue, 320.8% ROAS, EUR 28.33 blended CPA
- Status: Client Input Required
- Readiness: 64/100
- Risk: High
- Complexity: Complex
- Key gaps: language expansion, region-specific channel and creative strategy, fixed budget flexibility, campaign cannibalisation across concurrent Informa events, pricing-phase dates, creative refresh requirements, Americas underperformance, source-of-truth and UTM reliability expectations
- Strengths: clear commercial targets, strong historic performance, custom attendee data, named tech stack, defined audience and market lists, known competitor set
- Roles: Media Planner, Paid Search Specialist, Paid Social Specialist, Programmatic Specialist, Analytics Specialist, Creative Strategist, Local Market Specialist, Project Manager, Senior Strategy Lead
- Next action: confirm language strategy, regional priority markets, creative/message refresh requirements, pricing phase dates, channel test appetite, and measurement source-of-truth expectations

### Antibody Engineering & Therapeutics Europe

Use as the smaller-event Universal Planning Standard proof.

- Division: Informa Connect
- Region: Europe
- Event type: Hybrid Exhibition & Conference, paid entry
- Event date: 06/10/2025
- Campaign dates: 14/02/2025 to 06/10/2025
- Budget: GBP 12,000, possibly flexible
- Objective: paid delegate registrations
- Targets: 40 registrations, GBP 350 CPA
- Status: PMG Review or Ready for Planning
- Readiness: 76/100
- Risk: Medium
- Complexity: Standard
- Key gaps: budget may not support full-funnel activity, creative schedule requires confirmation, ToF versus remarketing sequencing needs recommendation
- Strengths: GTM present, UTM URLs supplied, platform accounts known, PO approved, custom data available, remarketing/email matching/lookalike request supplied, audience and competitor inputs supplied
- Roles: Media Planner, Paid Social Specialist, Paid Search Specialist
- Next action: confirm whether budget should prioritize ToF lead building, remarketing, or a phased combination; confirm creative schedule and responsive ad requirements

### Connect Finance Leaders Forum

Secondary invented lead-generation tracking-gap scenario.

- Division: Informa Connect
- Region: North America
- Objective: qualified lead generation
- Budget: GBP 95,000
- Status: Client Input Required
- Readiness: 42/100
- Risk: Critical
- Complexity: Enhanced
- Gap: CRM exists but platform pixels are not configured, lead quality definitions are unclear, and offline conversion feedback is not connected
- Roles: Media Planner, Paid Search Specialist, Paid Social Specialist, Analytics Specialist, Tracking Implementation Specialist, CRM/Data Specialist
- Next action: confirm lead definition, CRM mapping, analytics owner, website access, and implementation timeline

### City Food & Drink Festival

Secondary invented limited-budget ticket-sales scenario.

- Division: Informa Festivals
- Region: UK
- Objective: ticket sales
- Budget: GBP 28,000
- Status: Ready for Planning
- Readiness: 78/100
- Risk: Medium
- Complexity: Standard
- Gap: modest creative refresh and final discount calendar
- Roles: Media Planner, Paid Social Specialist
- Next action: confirm promotional periods and final creative adaptations

## Universal Planning Standard

Every submitted event should visibly receive:

- Validated media brief
- Objective and KPI review
- Audience review
- Tracking and measurement assessment
- Budget and timeline feasibility check
- Campaign governance review
- Minimum QA standard
- Performance monitoring
- Access to escalation support
- Post-campaign learning capture

Operating principle: **A universal service floor, with differentiated strategic depth and dynamic escalation.**

## Source Wayfinder

Planning map: https://github.com/pmg-vibecoding/informa-planning-navigator/issues/1
