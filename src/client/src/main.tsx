import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type BriefStatus =
  | "Draft"
  | "Client Input Required"
  | "PMG Review"
  | "Ready for Planning"
  | "Planning in Progress"
  | "Approved"
  | "Live";

type RiskLevel = "Low" | "Medium" | "High" | "Critical";
type Complexity =
  | "Standard"
  | "Enhanced"
  | "Complex"
  | "Transformation Required";

type ReadinessArea = {
  label: string;
  score: number;
  explanation: string;
};

type ResourceRequirement = {
  role: string;
  effort: string;
  reason: string;
};

type Brief = {
  id: string;
  name: string;
  division: string;
  region: string;
  location: string;
  eventDate: string;
  campaignLaunch: string;
  objective: string;
  budget: string;
  status: BriefStatus;
  readiness: number;
  risk: RiskLevel;
  complexity: Complexity;
  pmgLead: string;
  nextAction: string;
  summary: string;
  gaps: string[];
  strengths: string[];
  roles: ResourceRequirement[];
  readinessAreas: ReadinessArea[];
};

const statusOrder: BriefStatus[] = [
  "Draft",
  "Client Input Required",
  "PMG Review",
  "Ready for Planning",
  "Planning in Progress",
  "Approved",
  "Live",
];

const briefs: Brief[] = [
  {
    id: "institutional-futures-apac",
    name: "Institutional Futures Platform Launch",
    division: "Institutional",
    region: "Asia-Pacific",
    location: "Singapore, Hong Kong, Sydney",
    eventDate: "01 Dec 2026",
    campaignLaunch: "15 Aug 2026",
    objective: "Drive platform demos, trial adoption, and qualified customer acquisition among institutional traders",
    budget: "SGD 220,000",
    status: "Client Input Required",
    readiness: 56,
    risk: "High",
    complexity: "Complex",
    pmgLead: "Akira Tanaka",
    activityType: "agency-supported",
    mediaTypes: ["digital", "video", "display", "events"],
    funnelStage: "consideration-acquisition",
    nextAction: "Confirm platform feature messaging, regional sales resource alignment, demo scheduling workflow, and conversion tracking integration.",
    summary: "Multi-market institutional platform launch targeting hedge funds and asset managers in Singapore, Hong Kong, and Australia. Agency-supported digital and video campaigns with live demo events.",
    gaps: [
      "Regional sales team resource and demo-scheduling capacity needs clarification.",
      "Platform product messaging and competitive differentiation for APAC market not finalized.",
      "Sales-stage conversion criteria and sales-driven demo workflow not yet integrated.",
      "Website tracking for platform trial activation and demo request events not configured.",
    ],
    strengths: [
      "Existing institutional customer base in APAC available for account-based marketing.",
      "Competitive research on other futures platforms in region is underway.",
      "Sales and product teams are aligned on high-priority feature set.",
    ],
    roles: [
      { role: "Account-Based Marketing Manager", effort: "3 to 4 days", reason: "Design ABM strategy targeting top hedge funds and asset managers by geography." },
      { role: "Product Marketing Manager", effort: "2 to 3 days", reason: "Develop platform feature messaging and competitive positioning for APAC." },
      { role: "Sales Enablement Specialist", effort: "2 to 3 days", reason: "Build demo scheduling workflow, sales collateral, and product trial terms." },
      { role: "Digital & Events Manager", effort: "2 days", reason: "Coordinate virtual demo days, LinkedIn campaign, and regional event sponsorships." },
      { role: "Analytics & CRM Specialist", effort: "1 to 2 days", reason: "Integrate website tracking, demo request flow, and CRM opportunity creation." },
    ],
    readinessAreas: [
      { label: "Business objective clarity", score: 76, explanation: "Platform adoption targets are clear. Trial and demo conversion criteria need definition." },
      { label: "Audience definition", score: 78, explanation: "Hedge fund and asset manager segments identified. Company size and AUM thresholds need sharpening." },
      { label: "Budget readiness", score: 72, explanation: "Budget allocated. Regional sales support resource commitment unclear." },
      { label: "Creative readiness", score: 54, explanation: "Platform messaging framework exists. Regional competitive differentiation and demo content in development." },
      { label: "Data and tracking readiness", score: 62, explanation: "Website tagging and CRM foundations exist. Demo request workflow integration pending." },
      { label: "Measurement readiness", score: 64, explanation: "Top-of-funnel metrics clear. Demo attendance and trial-to-revenue conversion paths need definition." },
      { label: "Governance readiness", score: 68, explanation: "Budget approved. Sales resource alignment and demo-SLA agreement pending." },
      { label: "Timeline feasibility", score: 58, explanation: "4-month lead time tight given product messaging, sales enablement, and regional coordination needs." },
    ],
  },
  {
    id: "commercial-ag-webinar-us",
    name: "Agricultural Risk Management Webinar",
    division: "Commercial",
    region: "North America",
    location: "Virtual / US & Canada",
    eventDate: "20 Nov 2026",
    campaignLaunch: "01 Sep 2026",
    objective: "Educate producers on commodity hedging strategies, build brand consideration, and drive customer acquisition",
    budget: "USD 75,000",
    status: "PMG Review",
    readiness: 82,
    risk: "Low",
    complexity: "Standard",
    pmgLead: "James Chen",
    activityType: "owned-content",
    mediaTypes: ["digital", "display", "email", "audio"],
    funnelStage: "awareness-consideration",
    nextAction: "Finalize speaker lineup, confirm email list sourcing strategy, and lock creative for digital assets.",
    summary: "Thought leadership webinar series targeting US and Canadian grain and commodity producers. StoneX-owned educational content amplified through digital display, search, and agricultural media channels.",
    gaps: [
      "Email list sourcing strategy (direct farm contacts vs. agricultural cooperative partnerships) needs confirmation.",
      "Competitive speaker positioning relative to competitor agri-education programs pending.",
      "Post-webinar nurture sequence and customer acquisition offer terms need definition.",
    ],
    strengths: [
      "Target audience is well-defined via farm size, commodities, and geography.",
      "Historical webinar performance data available for conversion rate benchmarking.",
      "Direct relationships with agricultural cooperatives and publication channels.",
    ],
    roles: [
      { role: "Content & Thought Leadership Manager", effort: "2 to 3 days", reason: "Develop webinar content, manage speaker coordination, and oversee email nurture." },
      { role: "Digital Media Planner", effort: "1 to 2 days", reason: "Plan search and programmatic display strategy targeting farm operators." },
      { role: "Email & Marketing Operations", effort: "1 day", reason: "Manage email list sourcing, template production, and automation workflows." },
    ],
    readinessAreas: [
      { label: "Business objective clarity", score: 88, explanation: "Registrations, brand consideration, and customer acquisition targets are explicit." },
      { label: "Audience definition", score: 85, explanation: "Farm size, commodity focus, and regional targeting are well-defined." },
      { label: "Budget readiness", score: 84, explanation: "Budget allocated and realistic for owned educational content campaign." },
      { label: "Creative readiness", score: 78, explanation: "Speaker confirmed. Email and landing-page templates in production." },
      { label: "Data and tracking readiness", score: 80, explanation: "Historical webinar performance data and email platform integrations ready." },
      { label: "Measurement readiness", score: 82, explanation: "Registration, attendance, and customer acquisition metrics are traceable end-to-end." },
      { label: "Governance readiness", score: 80, explanation: "Budget approved. Product and sales alignment on acquisition offer confirmed." },
      { label: "Timeline feasibility", score: 84, explanation: "2-month lead time allows proper email list sourcing and creative production." },
    ],
  },
  {
    id: "payments-eu-lead-gen",
    name: "Global Payments Expansion",
    division: "Payments",
    region: "Europe",
    location: "London, Frankfurt, Amsterdam",
    eventDate: "15 Oct 2026",
    campaignLaunch: "15 Jul 2026",
    objective: "Generate qualified B2B leads for cross-border payment solutions among financial institutions and corporates",
    budget: "EUR 180,000",
    status: "Client Input Required",
    readiness: 68,
    risk: "Medium",
    complexity: "Enhanced",
    pmgLead: "Sarah O'Connor",
    activityType: "agency-supported",
    mediaTypes: ["digital", "display", "video", "print", "events"],
    funnelStage: "awareness-consideration",
    nextAction: "Confirm target institutions, lead quality definition, CRM mapping, and webinar content strategy.",
    summary: "Multi-channel Payments campaign targeting treasury and finance decision-makers across UK and EU institutions. Agency-supported digital, print, and event sponsorship strategy for qualified lead generation.",
    gaps: [
      "Target institution size and sector focus (mid-market corporates vs. large institutions) need definition.",
      "CRM lead score definition and handoff criteria are not yet established.",
      "Content refresh for webinar and direct-mail assets requires approval.",
      "Attribution model for contact-based lead tracking needs clarification.",
      "Competitive landscape research for messaging priority is in progress.",
    ],
    strengths: [
      "Explicit lead targets: 450 qualified leads, 12% conversion to sales-stage opportunity.",
      "Strong institutional customer database available for lookalike and custom audience building.",
      "Established LinkedIn and trade-publication relationships for audience access.",
    ],
    roles: [
      { role: "Media Planner", effort: "3 to 4 days", reason: "Build institutional channel mix, budget allocation, and campaign timeline." },
      { role: "Demand Gen Specialist", effort: "2 to 3 days", reason: "Design lead-nurture sequence and webinar promotion strategy." },
      { role: "Product Marketing Manager", effort: "2 days", reason: "Refine messaging and differentiation for Payments product suite." },
      { role: "CRM & Analytics Specialist", effort: "1 to 2 days", reason: "Define lead quality, scoring, and CRM handoff criteria." },
      { role: "Sales Development Manager", effort: "1 day", reason: "Align on lead quality expectations and sales-stage conversion criteria." },
    ],
    readinessAreas: [
      { label: "Business objective clarity", score: 82, explanation: "Lead targets and CPA are explicit. Sales-stage conversion criteria pending." },
      { label: "Audience definition", score: 76, explanation: "Treasury and finance director segments are defined; institution size/sector tradeoffs need sharpening." },
      { label: "Budget readiness", score: 80, explanation: "Budget confirmed and realistic for institutional channel mix." },
      { label: "Creative readiness", score: 62, explanation: "Webinar content outline exists; asset production and competitive messaging need approval." },
      { label: "Data and tracking readiness", score: 74, explanation: "Customer data available for lookalike building. UTM and landing-page tracking design in progress." },
      { label: "Measurement readiness", score: 70, explanation: "Lead and CPA targets are clear. CRM handoff and sales-stage conversion tracking needs definition." },
      { label: "Governance readiness", score: 78, explanation: "Budget approved. Sales and Marketing alignment on lead criteria pending." },
      { label: "Timeline feasibility", score: 72, explanation: "3-month lead time workable if creative content and CRM setup confirm early." },
    ],
  },
  {
    id: "retail-trading-uk-australia",
    name: "Self-Directed Trading Platform Awareness",
    division: "Self-Directed / Retail",
    region: "UK & Australia",
    location: "London, Sydney",
    eventDate: "22 Nov 2026",
    campaignLaunch: "01 Aug 2026",
    objective: "Build awareness of retail trading platform, drive customer sign-ups, and increase trading account activation",
    budget: "GBP 120,000",
    status: "Ready for Planning",
    readiness: 74,
    risk: "Medium",
    complexity: "Standard",
    pmgLead: "Emma Richardson",
    activityType: "agency-supported",
    mediaTypes: ["digital", "display", "OOH", "video", "streaming"],
    funnelStage: "awareness",
    nextAction: "Confirm platform feature narrative, sign-up offer terms, regional audience targeting, and measurement framework.",
    summary: "Consumer brand awareness campaign targeting retail traders and self-directed investors in UK and Australia. Agency-supported digital display, out-of-home, and streaming video strategy with platform trial offers.",
    gaps: [
      "Sign-up incentive offer and regulatory approval for consumer acquisition terms needs confirmation.",
      "Regional audience segmentation (first-time traders vs. experienced self-directed investors) not finalized.",
      "Out-of-home media placement strategy and creative concepts in development.",
      "Mobile and web landing-page experience and trial account flow not yet tested.",
    ],
    strengths: [
      "Clear retail investor segments available through data providers and lookalike modeling.",
      "Platform education content library available for repurposing in ads and landing pages.",
      "Established relationships with financial influencers and content creators for amplification.",
    ],
    roles: [
      { role: "Brand & Growth Marketing Manager", effort: "2 to 3 days", reason: "Oversee brand narrative, sign-up offer, and regional campaign customization." },
      { role: "Digital Media Planner", effort: "2 days", reason: "Build digital display and streaming video strategy targeting retail investors." },
      { role: "OOH & Outdoor Specialist", effort: "1 to 2 days", reason: "Plan out-of-home placements in key financial districts and trading hubs." },
      { role: "User Experience & Product Manager", effort: "1 day", reason: "Validate sign-up flow, trial account experience, and conversion funnel." },
    ],
    readinessAreas: [
      { label: "Business objective clarity", score: 80, explanation: "Awareness, sign-ups, and account activation targets clear. Regional traffic and conversion rates need benchmarking." },
      { label: "Audience definition", score: 76, explanation: "Retail investor segments well-defined by trading experience and platform familiarity." },
      { label: "Budget readiness", score: 78, explanation: "Budget allocated. Regional media mix and allocation not yet confirmed." },
      { label: "Creative readiness", score: 68, explanation: "Brand narrative framework exists. Out-of-home creative concepts in early development." },
      { label: "Data and tracking readiness", score: 72, explanation: "Website analytics and sign-up tracking configured. Cross-device and mobile tracking needs enhancement." },
      { label: "Measurement readiness", score: 70, explanation: "Awareness and sign-up metrics clear. Trial-to-funded-account conversion tracking not yet live." },
      { label: "Governance readiness", score: 74, explanation: "Budget approved. Regulatory compliance and offer terms pending legal/compliance review." },
      { label: "Timeline feasibility", score: 76, explanation: "3-month lead time workable if sign-up offer and OOH creative confirm by mid-August." },
    ],
  },
  {
    id: "commercial-commodities-brazil",
    name: "Commodities Brand Campaign",
    division: "Commercial",
    region: "Brazil",
    location: "São Paulo",
    eventDate: "01 Dec 2026",
    campaignLaunch: "01 Sep 2026",
    objective: "Establish StoneX brand in Brazil commodity trading market, increase awareness, and drive B2B customer acquisition",
    budget: "BRL 420,000",
    status: "Planning in Progress",
    readiness: 66,
    risk: "Medium",
    complexity: "Complex",
    pmgLead: "Carlos Oliveira",
    activityType: "agency-supported",
    mediaTypes: ["TV", "CTV", "digital", "display", "print", "events"],
    funnelStage: "awareness-consideration",
    nextAction: "Confirm Portuguese language strategy, finalize TV media buy, establish local influencer partnerships, and align regional product positioning.",
    summary: "Integrated brand awareness campaign in Brazil targeting commodity traders, agricultural exporters, and procurement professionals. Agency-supported TV, CTV, digital, and print with local events and influencer partnerships.",
    gaps: [
      "Portuguese and regional dialect strategy for creative execution needs approval.",
      "TV media buy and prime-time placement strategy not yet negotiated with local broadcasters.",
      "Local trading floor and commodity industry influencer partnerships in early discussion stage.",
      "Regional product bundling and pricing strategy for commodity traders not finalized.",
    ],
    strengths: [
      "Growing commodities trading market in Brazil with high international exposure.",
      "Existing customer relationships and market intelligence from StoneX trading desk.",
      "Relationships with agricultural export associations and trading organizations.",
    ],
    roles: [
      { role: "Regional Marketing Director", effort: "3 to 4 days", reason: "Lead regional positioning, language strategy, and local partnership coordination." },
      { role: "Media Planner (TV & Broadcast)", effort: "2 to 3 days", reason: "Negotiate TV and CTV media buys, optimize prime-time placement and frequency." },
      { role: "Digital & Social Marketing Manager", effort: "2 days", reason: "Build digital display, YouTube, and local social strategy for B2B traders." },
      { role: "Events & Sponsorships Manager", effort: "1 to 2 days", reason: "Identify commodity industry events and establish sponsorship opportunities." },
      { role: "Product & Market Intelligence Lead", effort: "1 day", reason: "Ensure regional product positioning and competitive messaging alignment." },
    ],
    readinessAreas: [
      { label: "Business objective clarity", score: 74, explanation: "Brand awareness and customer acquisition targets defined. Regional AUM or transaction targets need quantification." },
      { label: "Audience definition", score: 72, explanation: "Commodity trader and agricultural exporter segments identified. Company size and procurement authority not finalized." },
      { label: "Budget readiness", score: 70, explanation: "Budget allocated. TV media costs and regional media mix allocation preliminary." },
      { label: "Creative readiness", score: 58, explanation: "English brand assets exist. Portuguese localization, cultural adaptation, and TV production not started." },
      { label: "Data and tracking readiness", score: 62, explanation: "Website analytics available. Local market tracking providers and media verification partnerships not yet established." },
      { label: "Measurement readiness", score: 64, explanation: "Brand awareness lift and website traffic measurable. B2B lead sourcing and conversion tracking frameworks not yet live." },
      { label: "Governance readiness", score: 66, explanation: "Budget approved. Local regulatory compliance, content approval, and media partnership agreements pending." },
      { label: "Timeline feasibility", score: 56, explanation: "3-month lead time tight given Portuguese localization, TV negotiation, and local partnership development." },
    ],
  },
];

const statusColors: Record<BriefStatus, string> = {
  Draft: "#e0e8f0",
  "Client Input Required": "#ffeee6",
  "PMG Review": "#e6f2ff",
  "Ready for Planning": "#e6f7e6",
  "Planning in Progress": "#f0e6ff",
  Approved: "#b3e5b3",
  Live: "#66cc66",
};

function App() {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState<{
    division: string;
    region: string;
    status: string;
  }>({
    division: "",
    region: "",
    status: "",
  });

  const divisions = React.useMemo(
    () => [...new Set(briefs.map((b) => b.division))].sort(),
    [],
  );
  const regions = React.useMemo(
    () => [...new Set(briefs.map((b) => b.region))].sort(),
    [],
  );

  const filtered = React.useMemo(() => {
    return briefs.filter((brief) => {
      if (filters.division && brief.division !== filters.division) return false;
      if (filters.region && brief.region !== filters.region) return false;
      if (filters.status && brief.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const byCampaignLaunchDate = React.useMemo(() => {
    const map: Record<string, Brief[]> = {};
    filtered.forEach((b) => {
      if (!map[b.campaignLaunch]) map[b.campaignLaunch] = [];
      map[b.campaignLaunch].push(b);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const totalReadiness =
    filtered.length > 0
      ? Math.round(
          filtered.reduce((sum, b) => sum + b.readiness, 0) / filtered.length,
        )
      : 0;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">SX</div>
        <h2>StoneX Planning</h2>
        <p>Campaign readiness & planning</p>
        <nav>
          <a href="#overview" className="nav-link">
            Overview
          </a>
          <a href="#campaigns" className="nav-link active">
            Campaigns
          </a>
        </nav>
        <footer>
          <p>Financial services campaign planning.</p>
        </footer>
      </aside>
      <main className="main-content">
        <header className="app-header">
          <div>
            <h1>Financial Product Campaigns</h1>
            <p>
              StoneX global Payments, Institutional, and Commercial service
              campaigns across Payments, Commodities, Futures, and Risk
              Management.
            </p>
          </div>
        </header>
        <section className="filters">
          <label>
            Service Line
            <select
              value={filters.division}
              onChange={(e) =>
                setFilters({ ...filters, division: e.target.value })
              }
            >
              <option value="">All divisions</option>
              {divisions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label>
            Market Region
            <select
              value={filters.region}
              onChange={(e) =>
                setFilters({ ...filters, region: e.target.value })
              }
            >
              <option value="">All regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All statuses</option>
              {statusOrder.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </section>
        <section className="summary">
          <div className="summary-card">
            <span className="label">Total Readiness</span>
            <span className="value">{totalReadiness}%</span>
          </div>
          <div className="summary-card">
            <span className="label">Campaigns in View</span>
            <span className="value">{filtered.length}</span>
          </div>
        </section>
        <section className="campaigns">
          {byCampaignLaunchDate.map(([launchDate, campaignsOnDate]) => (
            <div key={launchDate} className="launch-group">
              <h2 className="launch-date">Launch: {launchDate}</h2>
              {campaignsOnDate.map((brief) => (
                <div
                  key={brief.id}
                  className="brief-card"
                  onClick={() =>
                    setExpandedId(expandedId === brief.id ? null : brief.id)
                  }
                  style={{
                    backgroundColor: statusColors[brief.status],
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div className="brief-header">
                    <div>
                      <h3>{brief.name}</h3>
                      <p className="meta">
                        {brief.division} • {brief.region}
                      </p>
                    </div>
                    <div className="brief-kpis">
                      <div className="kpi">
                        <span className="label">Readiness</span>
                        <span className="value">{brief.readiness}%</span>
                      </div>
                      <div className="kpi">
                        <span className="label">Risk</span>
                        <span className="value">{brief.risk}</span>
                      </div>
                      <div className="kpi">
                        <span className="label">Status</span>
                        <span className="value">{brief.status}</span>
                      </div>
                    </div>
                  </div>
                  {expandedId === brief.id && (
                    <div className="brief-details">
                      <p>{brief.summary}</p>
                      <div className="section">
                        <h4>Next Action</h4>
                        <p>{brief.nextAction}</p>
                      </div>
                      <div className="section">
                        <h4>Budget</h4>
                        <p>{brief.budget}</p>
                      </div>
                      <div className="section">
                        <h4>Team & Effort</h4>
                        <ul>
                          {brief.roles.map((role) => (
                            <li key={role.role}>
                              <strong>{role.role}</strong> – {role.effort} (
                              {role.reason})
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="section">
                        <h4>Readiness Areas</h4>
                        {brief.readinessAreas.map((area) => (
                          <div key={area.label} className="readiness-area">
                            <p>
                              <strong>{area.label}</strong> – {area.score}%
                            </p>
                            <p className="explanation">{area.explanation}</p>
                          </div>
                        ))}
                      </div>
                      <div className="section">
                        <h4>Gaps to Close</h4>
                        <ul>
                          {brief.gaps.map((gap) => (
                            <li key={gap}>{gap}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="section">
                        <h4>Strengths</h4>
                        <ul>
                          {brief.strengths.map((strength) => (
                            <li key={strength}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="section">
                        <h4>Campaign Details</h4>
                        <p>
                          <strong>PMG Lead:</strong> {brief.pmgLead}
                        </p>
                        <p>
                          <strong>Campaign Launch:</strong>{" "}
                          {brief.campaignLaunch}
                        </p>
                        <p>
                          <strong>Event/Promotion Date:</strong>{" "}
                          {brief.eventDate}
                        </p>
                        <p>
                          <strong>Location:</strong> {brief.location}
                        </p>
                        <p>
                          <strong>Objective:</strong> {brief.objective}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
