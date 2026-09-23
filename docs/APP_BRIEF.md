# App Brief

## Overview

Duplicate and rebrand the Informa Planning Navigator into StoneX Planning Navigator for global financial services. Align implementation to a detailed StoneX brief covering markets, service lines, campaign types, and planning navigator features with full brief compliance.

## Deliverable

A React-based generative campaign planning navigator that helps StoneX teams:
- **Manage campaign briefs** across global financial product lines
- **Track readiness** through 8 assessment areas (creative, targeting, timing, budget, data, compliance, stakeholders, approvals)
- **Filter by region and service line** to focus on priority markets
- **Assess risk, complexity, and timeline feasibility** at a glance
- **See activity types** (owned-content vs. agency-supported) and media categorization
- **Map to funnel stages** (awareness, consideration, conversion, retention)

## Service Lines (5 Campaigns Implemented)

1. **Institutional** - Futures Platform Launch (APAC)
2. **Commercial** - Agricultural Risk Management Webinar (North America); Commodities Brand Campaign (Brazil)
3. **Payments** - Global Payments Expansion (Europe)
4. **Self-Directed/Retail** - Self-Directed Trading Platform Awareness (UK & Australia)

## Priority Markets

- APAC (Singapore, Hong Kong, Sydney)
- North America (US, Canada)
- Europe (London, Frankfurt, Amsterdam)
- UK & Australia
- Brazil

## Technical Specifications

- **Frontend**: React 18.3.1 with Vite 8.0.16 SPA
- **Backend**: Express 5.2.1 on Node 24
- **Language**: TypeScript 6.0.3 (strict mode)
- **Package Manager**: pnpm 11.7.0
- **Styling**: CSS with StoneX design system variables
- **Build Output**: 163KB gzipped JavaScript, 6.6KB gzipped CSS
- **Linting**: Biome 2.5.0
- **Deployment**: Single-container Alli App with health endpoint `/health`

## Key Features

- **Campaign Management Dashboard**: Browse, filter, and assess 5 brief-aligned campaigns
- **Readiness Scoring**: 8-area assessment framework (creative, targeting, timing, budget, data, compliance, stakeholders, approvals)
- **Multi-dimensional Filtering**: Region, service line, status, readiness percentage
- **Risk & Complexity Assessment**: Low/Medium/High/Critical risk levels
- **Timeline Feasibility**: FeasibilityScore tracking
- **Role-based Effort Estimation**: Estimated hours by Role (Creative, Strategy, Admin)
- **Activity Categorization**: Owned-content vs. agency-supported
- **Media Type Tagging**: Digital, video, display, events, email, audio, print, OOH, streaming, CTV, TV
- **Funnel Stage Mapping**: awareness, consideration, conversion, retention

## Confirmed at Setup

- **Language**: TypeScript
- **Capabilities**: Google Workspace, Persistent data, None or unsure
- **Deferred or unsupported**: None

## Deployment Ready

- ✅ Production build validated (163KB JS, 6.6KB CSS gzipped)
- ✅ TypeScript compilation passed (strict mode)
- ✅ Biome linting configuration complete
- ✅ All 5 campaigns with complete readiness assessment
- ✅ StoneX design system integrated
- ✅ Repository mode via managed GitHub (`pmg-vibecoding/stonex-planning-navigator`)
- ✅ Ready for Alli Apps deployment
