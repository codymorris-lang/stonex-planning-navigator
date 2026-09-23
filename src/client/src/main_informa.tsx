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
type ReadinessStatus = "Ready" | "Some Gaps" | "At Risk" | "Blocked";

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
    id: "cphi-frankfurt",
    name: "CPHi Frankfurt 2027",
    division: "Informa Markets",
    region: "Europe / Global growth markets",
    location: "Frankfurt, Germany",
    eventDate: "10 Aug 2027",
    campaignLaunch: "22 Feb 2027",
    objective: "Paid delegate registrations and attendee revenue growth",
    budget: "EUR 240,000",
    status: "Client Input Required",
    readiness: 64,
    risk: "High",
    complexity: "Complex",
    pmgLead: "Maya Patel",
    nextAction:
      "Confirm language strategy, regional market priority, pricing phases, and creative refresh requirements.",
    summary:
      "Large pharma exhibition and conference with clear revenue ambition, fixed budget, global growth markets, and unresolved creative, language, and measurement decisions.",
    gaps: [
      "Language expansion beyond English and German is open, but web translation resource is constrained.",
      "Americas underperformance requires a region-specific channel and creative recommendation.",
      "Six or more concurrent Informa campaigns may compete for the same audiences and geographies.",
      "Pricing phase dates and creative refresh requirements need confirmation before launch phasing is final.",
      "Ad platforms and Visit Cloud/UTM data do not yet create a single trusted measurement view.",
    ],
    strengths: [
      "Commercial targets are explicit: 8,470 paid registrations, EUR 770,000 revenue, and 320.8% ROAS.",
      "Historic revenue growth and performance-by-geo data are available for planning.",
      "Custom attendee data and a named tech stack create a strong planning base.",
    ],
    roles: [
      {
        role: "Media Planner",
        effort: "4 to 6 days",
        reason: "Build regional channel mix, budget phasing, and launch plan.",
      },
      {
        role: "Creative Strategist",
        effort: "2 to 3 days",
        reason:
          "Shape message hierarchy and creative refresh needs by audience and region.",
      },
      {
        role: "Analytics Specialist",
        effort: "1 to 2 days",
        reason: "Align platform, UTM, and registration reporting expectations.",
      },
      {
        role: "Local Market Specialist",
        effort: "1 to 2 days",
        reason:
          "Review German language and growth-market localisation choices.",
      },
      {
        role: "Senior Strategy Lead",
        effort: "Review required",
        reason:
          "High revenue target, fixed budget, and multi-market complexity.",
      },
    ],
    readinessAreas: [
      {
        label: "Business objective clarity",
        score: 86,
        explanation: "Revenue, registrations, CPA, and ROAS targets are clear.",
      },
      {
        label: "Audience definition",
        score: 74,
        explanation:
          "Audience sectors and seniority are defined, but regional growth priorities need sharper tradeoffs.",
      },
      {
        label: "Budget readiness",
        score: 82,
        explanation:
          "Budget is confirmed and fixed, which helps planning but limits optimisation flexibility.",
      },
      {
        label: "Creative readiness",
        score: 38,
        explanation:
          "Creative refresh, language expansion, and region-specific messaging are not yet resolved.",
      },
      {
        label: "Data and tracking readiness",
        score: 68,
        explanation:
          "GA4, Tag Manager, Treasure Data, and Visit Cloud exist, but source-of-truth alignment is still messy.",
      },
      {
        label: "Measurement readiness",
        score: 70,
        explanation:
          "Targets are specific, though channel-level conversion assumptions need validation.",
      },
      {
        label: "Governance readiness",
        score: 62,
        explanation:
          "Agency-led media is clear, but pricing dates and stakeholder sign-off need confirmation.",
      },
      {
        label: "Timeline feasibility",
        score: 45,
        explanation:
          "Long campaign window helps, but creative, pricing, and localisation decisions sit on the critical path.",
      },
    ],
  },
  {
    id: "antibody-europe",
    name: "Antibody Engineering & Therapeutics Europe",
    division: "Informa Connect",
    region: "Europe",
    location: "Basel, Switzerland",
    eventDate: "06 Oct 2025",
    campaignLaunch: "14 Feb 2025",
    objective: "Paid delegate registrations",
    budget: "GBP 12,000",
    status: "PMG Review",
    readiness: 76,
    risk: "Medium",
    complexity: "Standard",
    pmgLead: "Alex Morgan",
    nextAction:
      "Confirm ToF versus remarketing sequence and the responsive creative schedule.",
    summary:
      "Focused paid delegate campaign with a modest budget, supplied UTM links, known platform setup, approved PO, and a practical sequencing question.",
    gaps: [
      "Budget may not support a full-funnel campaign without tight prioritisation.",
      "Creative schedule and special ad requirements need final confirmation.",
      "Planner needs to decide whether to build ToF demand first or move quickly into remarketing.",
    ],
    strengths: [
      "GTM is present and UTM URLs have been supplied.",
      "Custom data is available for remarketing, email matching, and lookalikes.",
      "PO is approved and platform accounts are known.",
    ],
    roles: [
      {
        role: "Media Planner",
        effort: "1 to 2 days",
        reason: "Set a lean campaign sequence and budget allocation.",
      },
      {
        role: "Paid Social Specialist",
        effort: "1 day",
        reason: "Activate supplied audience data and responsive creative.",
      },
      {
        role: "Paid Search Specialist",
        effort: "0.5 to 1 day",
        reason: "Capture demand around event and competitor terms.",
      },
    ],
    readinessAreas: [
      {
        label: "Business objective clarity",
        score: 84,
        explanation: "Target registrations and CPA are clear.",
      },
      {
        label: "Audience definition",
        score: 80,
        explanation:
          "Job titles, departments, geographies, and competitors are supplied.",
      },
      {
        label: "Budget readiness",
        score: 72,
        explanation:
          "Budget and PO are in place, but the full-funnel ambition may exceed available spend.",
      },
      {
        label: "Creative readiness",
        score: 66,
        explanation:
          "Responsive ads are requested, with a schedule still to be attached.",
      },
      {
        label: "Data and tracking readiness",
        score: 82,
        explanation: "GTM and UTM links are available.",
      },
      {
        label: "Measurement readiness",
        score: 76,
        explanation:
          "CPA and registration target are clear, with a simple measurement path.",
      },
      {
        label: "Governance readiness",
        score: 78,
        explanation: "PO and billing details are supplied.",
      },
      {
        label: "Timeline feasibility",
        score: 70,
        explanation:
          "Timeline is workable if the campaign sequence is confirmed early.",
      },
    ],
  },
  {
    id: "finance-leaders",
    name: "Connect Finance Leaders Forum",
    division: "Informa Connect",
    region: "North America",
    location: "New York, USA",
    eventDate: "18 Nov 2026",
    campaignLaunch: "01 Sep 2026",
    objective: "Qualified lead generation",
    budget: "GBP 95,000",
    status: "Client Input Required",
    readiness: 42,
    risk: "Critical",
    complexity: "Enhanced",
    pmgLead: "Priya Shah",
    nextAction:
      "Confirm lead definition, CRM mapping, analytics owner, website access, and implementation timeline.",
    summary:
      "Lead generation campaign with CRM ambition but missing tracking and lead quality definitions.",
    gaps: [
      "Platform pixels are not configured.",
      "Lead quality definitions are unclear.",
      "Offline conversion feedback is not connected to optimisation platforms.",
    ],
    strengths: [
      "CRM platform exists.",
      "Budget is meaningful enough to justify specialist support.",
    ],
    roles: [
      {
        role: "Tracking Implementation Specialist",
        effort: "2 to 4 days",
        reason: "Configure and validate conversion tracking.",
      },
      {
        role: "CRM/Data Specialist",
        effort: "2 to 3 days",
        reason: "Map lead stages and offline feedback.",
      },
      {
        role: "Media Planner",
        effort: "2 days",
        reason: "Plan only once measurement prerequisites are clear.",
      },
    ],
    readinessAreas: [
      {
        label: "Business objective clarity",
        score: 58,
        explanation:
          "Lead volume is clear but quality definition is incomplete.",
      },
      {
        label: "Audience definition",
        score: 64,
        explanation: "Target accounts exist, but prioritisation is not final.",
      },
      {
        label: "Budget readiness",
        score: 76,
        explanation: "Budget is confirmed.",
      },
      {
        label: "Creative readiness",
        score: 62,
        explanation: "Creative routes are drafted but depend on final offer.",
      },
      {
        label: "Data and tracking readiness",
        score: 22,
        explanation: "Pixels and platform conversions are not configured.",
      },
      {
        label: "Measurement readiness",
        score: 30,
        explanation:
          "Lead quality and offline feedback cannot currently be validated.",
      },
      {
        label: "Governance readiness",
        score: 58,
        explanation: "CRM and analytics ownership need confirmation.",
      },
      {
        label: "Timeline feasibility",
        score: 38,
        explanation: "Implementation timing could block launch readiness.",
      },
    ],
  },
  {
    id: "food-festival",
    name: "City Food & Drink Festival",
    division: "Informa Festivals",
    region: "UK",
    location: "Manchester, UK",
    eventDate: "24 May 2026",
    campaignLaunch: "10 Mar 2026",
    objective: "Ticket sales",
    budget: "GBP 28,000",
    status: "Ready for Planning",
    readiness: 78,
    risk: "Medium",
    complexity: "Standard",
    pmgLead: "Sam Taylor",
    nextAction: "Confirm promotional periods and final creative adaptations.",
    summary:
      "Limited-budget ticket-sales campaign with a clear audience and streamlined planning needs.",
    gaps: [
      "Discount calendar needs final approval.",
      "Creative refresh is modest but still required.",
    ],
    strengths: [
      "Clear ticket-sales objective.",
      "Simple local audience.",
      "Limited channel set keeps delivery efficient.",
    ],
    roles: [
      {
        role: "Media Planner",
        effort: "1 day",
        reason: "Confirm lean plan and phasing.",
      },
      {
        role: "Paid Social Specialist",
        effort: "1 day",
        reason: "Set up local ticket-sales activity.",
      },
    ],
    readinessAreas: [
      {
        label: "Business objective clarity",
        score: 82,
        explanation: "Ticket-sales objective is straightforward.",
      },
      {
        label: "Audience definition",
        score: 76,
        explanation: "Local audience is clear enough for planning.",
      },
      {
        label: "Budget readiness",
        score: 80,
        explanation: "Budget is modest but workable.",
      },
      {
        label: "Creative readiness",
        score: 66,
        explanation: "Minor creative adaptations remain.",
      },
      {
        label: "Data and tracking readiness",
        score: 74,
        explanation: "Standard ticket tracking is expected.",
      },
      {
        label: "Measurement readiness",
        score: 78,
        explanation: "Ticket sales are easy to measure.",
      },
      {
        label: "Governance readiness",
        score: 78,
        explanation: "Approval path is simple.",
      },
      {
        label: "Timeline feasibility",
        score: 78,
        explanation: "Timeline is reasonable once promotions are confirmed.",
      },
    ],
  },
];

const navigation = [
  "Dashboard",
  "New Brief",
  "Active Briefs",
  "Readiness",
  "Resources",
  "Global Standards",
  "Settings",
];

const universalStandard = [
  "Validated media brief",
  "Objective and KPI review",
  "Audience review",
  "Tracking and measurement assessment",
  "Budget and timeline feasibility check",
  "Campaign governance review",
  "Minimum QA standard",
  "Performance monitoring",
  "Escalation support",
  "Post-campaign learning capture",
];

function getReadinessStatus(score: number): ReadinessStatus {
  if (score >= 80) return "Ready";
  if (score >= 60) return "Some Gaps";
  if (score >= 35) return "At Risk";
  return "Blocked";
}

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: string;
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="score-bar" title={`Score ${score} out of 100`}>
      <span style={{ width: `${score}%` }} />
    </div>
  );
}

function KpiCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="kpi-card">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{note}</span>
    </article>
  );
}

function Dashboard({
  selectedBrief,
  onSelectBrief,
}: {
  selectedBrief: Brief;
  onSelectBrief: (brief: Brief) => void;
}) {
  const readyCount = briefs.filter(
    (brief) => brief.status === "Ready for Planning",
  ).length;
  const actionCount = briefs.filter(
    (brief) => brief.status === "Client Input Required",
  ).length;
  const riskCount = briefs.filter((brief) =>
    ["High", "Critical"].includes(brief.risk),
  ).length;
  const averageReadiness = Math.round(
    briefs.reduce((total, brief) => total + brief.readiness, 0) / briefs.length,
  );

  return (
    <section className="screen" aria-labelledby="dashboard-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Global planning view</p>
          <h1 id="dashboard-title">Brief readiness across Informa events</h1>
        </div>
        <button className="primary-button" type="button">
          Create new brief
        </button>
      </div>

      <div className="kpi-grid">
        <KpiCard
          label="Active briefs"
          value={String(briefs.length)}
          note="Across four divisions"
        />
        <KpiCard
          label="Ready for planning"
          value={String(readyCount)}
          note="Can move into channel planning"
        />
        <KpiCard
          label="Client action needed"
          value={String(actionCount)}
          note="Missing planning inputs"
        />
        <KpiCard
          label="Tracking or readiness risk"
          value={String(riskCount)}
          note="High or critical risk"
        />
        <KpiCard
          label="Average readiness"
          value={`${averageReadiness}/100`}
          note="Diagnostic, not a guarantee"
        />
      </div>

      <div className="filter-row">
        {[
          "Division",
          "Region",
          "Status",
          "Risk level",
          "Event date",
          "Campaign objective",
        ].map((filter) => (
          <button className="filter-chip" type="button" key={filter}>
            {filter}
          </button>
        ))}
      </div>

      <div className="table-card">
        <div className="table-title">
          <h2>Current and recent event briefs</h2>
          <span>Upcoming launch: {selectedBrief.campaignLaunch}</span>
        </div>
        <div className="brief-table">
          <div className="brief-row brief-header">
            <span>Event</span>
            <span>Division</span>
            <span>Objective</span>
            <span>Budget</span>
            <span>Status</span>
            <span>Readiness</span>
            <span>Risk</span>
            <span>Next action</span>
          </div>
          {briefs.map((brief) => (
            <button
              className={`brief-row ${brief.id === selectedBrief.id ? "selected" : ""}`}
              type="button"
              key={brief.id}
              onClick={() => onSelectBrief(brief)}
            >
              <span>
                <strong>{brief.name}</strong>
                <small>{brief.eventDate}</small>
              </span>
              <span>{brief.division}</span>
              <span>{brief.objective}</span>
              <span>{brief.budget}</span>
              <span>
                <Badge tone="status">{brief.status}</Badge>
              </span>
              <span>
                <strong>{brief.readiness}</strong>
                <ScoreBar score={brief.readiness} />
              </span>
              <span>
                <Badge tone={brief.risk.toLowerCase()}>{brief.risk}</Badge>
              </span>
              <span>{brief.nextAction}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewBriefDemo({ brief }: { brief: Brief }) {
  return (
    <section className="screen split-screen" aria-labelledby="brief-title">
      <div>
        <p className="eyebrow">Guided brief</p>
        <h1 id="brief-title">Adaptive inputs before adaptive plans</h1>
        <div className="stepper">
          {[
            "Event",
            "Objectives",
            "Audience",
            "Budget",
            "Media & Creative",
            "Measurement",
            "Governance",
            "Review",
          ].map((step, index) => (
            <span className={index <= 4 ? "complete" : ""} key={step}>
              {step}
            </span>
          ))}
        </div>
        <div className="form-card">
          <div className="form-grid">
            <label>
              Campaign message confirmed
              <select defaultValue="No">
                <option>No</option>
                <option>Partially</option>
                <option>Yes</option>
              </select>
            </label>
            <label>
              Creative assets available
              <select defaultValue="Partial">
                <option>Partial</option>
                <option>None</option>
                <option>Complete</option>
              </select>
            </label>
            <label>
              Localisation required
              <select defaultValue="English and German confirmed; expansion open">
                <option>English and German confirmed; expansion open</option>
                <option>No</option>
                <option>Yes, fully scoped</option>
              </select>
            </label>
            <label>
              Budget flexibility
              <select defaultValue="Fixed">
                <option>Fixed</option>
                <option>Flexible within range</option>
                <option>Recommendation requested</option>
              </select>
            </label>
          </div>
          <div className="adaptive-panel">
            <Badge tone="high">Adaptive guidance</Badge>
            <h2>Creative and regional planning inputs need confirmation</h2>
            <p>
              Media planning can begin directionally, but channel
              recommendations, launch timing, and performance expectations may
              change until messaging, language, and creative assets are
              confirmed.
            </p>
            <ul>
              <li>
                Which audience proposition should lead for high-value pharma
                decision makers?
              </li>
              <li>
                Should Americas receive a distinct message, channel mix, or
                creative route?
              </li>
              <li>
                Who owns German-language assets and any additional market
                translations?
              </li>
              <li>
                When will pricing phase dates and creative refresh requirements
                be approved?
              </li>
            </ul>
          </div>
        </div>
      </div>
      <aside className="guidance-card">
        <p className="eyebrow">AI-assisted draft</p>
        <h2>Brief completeness summary</h2>
        <p>{brief.summary}</p>
        <h3>Suggested follow-up</h3>
        <ol>
          <li>
            Confirm regional planning priorities and language expansion
            appetite.
          </li>
          <li>
            Align creative refresh with pricing phases and audience value
            segments.
          </li>
          <li>
            Clarify whether platform reporting or Visit Cloud/UTM data is the
            planning source of truth.
          </li>
        </ol>
      </aside>
    </section>
  );
}

function ReadinessView({ brief }: { brief: Brief }) {
  return (
    <section className="screen" aria-labelledby="readiness-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Planning readiness assessment</p>
          <h1 id="readiness-title">{brief.name}</h1>
        </div>
        <div className="score-orb">
          <strong>{brief.readiness}</strong>
          <span>/100</span>
        </div>
      </div>
      <p className="diagnostic-note">
        This score is a structured diagnostic to support planning conversations.
        It is not a scientific forecast or automatic approval.
      </p>
      <div className="readiness-grid">
        <div className="area-list">
          {brief.readinessAreas.map((area) => (
            <article className="area-card" key={area.label}>
              <div>
                <h3>{area.label}</h3>
                <p>{area.explanation}</p>
              </div>
              <div className="area-score">
                <strong>{area.score}</strong>
                <Badge
                  tone={getReadinessStatus(area.score)
                    .toLowerCase()
                    .replace(" ", "-")}
                >
                  {getReadinessStatus(area.score)}
                </Badge>
                <ScoreBar score={area.score} />
              </div>
            </article>
          ))}
        </div>
        <aside className="standard-card">
          <Badge tone={brief.risk.toLowerCase()}>{brief.risk} risk</Badge>
          <h2>Universal Planning Standard</h2>
          <p>
            A universal service floor, with differentiated strategic depth and
            dynamic escalation.
          </p>
          <ul>
            {universalStandard.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

function ResourceView({ brief }: { brief: Brief }) {
  return (
    <section className="screen" aria-labelledby="resources-title">
      <p className="eyebrow">PMG review and resourcing</p>
      <h1 id="resources-title">Complexity: {brief.complexity}</h1>
      <div className="resource-grid">
        {brief.roles.map((role) => (
          <article className="resource-card" key={role.role}>
            <span>{role.effort}</span>
            <h2>{role.role}</h2>
            <p>{role.reason}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReviewWorkspace({ brief }: { brief: Brief }) {
  return (
    <section className="screen review-layout" aria-labelledby="review-title">
      <div className="review-column">
        <p className="eyebrow">Submitted brief</p>
        <h1 id="review-title">PMG Review Workspace</h1>
        <h2>{brief.name}</h2>
        <p>{brief.summary}</p>
        <h3>Flagged gaps</h3>
        <ul className="gap-list">
          {brief.gaps.map((gap) => (
            <li key={gap}>{gap}</li>
          ))}
        </ul>
        <h3>Planning strengths</h3>
        <ul className="strength-list">
          {brief.strengths.map((strength) => (
            <li key={strength}>{strength}</li>
          ))}
        </ul>
      </div>
      <div className="review-column recommendation">
        <p className="eyebrow">PMG Planning Recommendation</p>
        <label>
          Recommended planning approach
          <textarea defaultValue="Proceed with directional planning while client confirms regional language strategy, message hierarchy, creative refresh scope, and measurement source-of-truth expectations. Build a phased plan around pricing windows once dates are confirmed." />
        </label>
        <label>
          Immediate prerequisites
          <textarea defaultValue={brief.nextAction} />
        </label>
        <div className="control-row">
          <label>
            Status
            <select defaultValue={brief.status}>
              {statusOrder.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label>
            Complexity
            <select defaultValue={brief.complexity}>
              {[
                "Standard",
                "Enhanced",
                "Complex",
                "Transformation Required",
              ].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>
        <button className="primary-button" type="button">
          Request missing information
        </button>
      </div>
    </section>
  );
}

function SummaryExport({ brief }: { brief: Brief }) {
  const copySummary = () =>
    navigator.clipboard?.writeText(
      `${brief.name}\n${brief.summary}\nNext action: ${brief.nextAction}`,
    );
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(brief, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${brief.id}-brief.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="screen summary-card" aria-labelledby="summary-title">
      <p className="eyebrow">Brief summary and export</p>
      <h1 id="summary-title">{brief.name}</h1>
      <p>{brief.summary}</p>
      <div className="summary-grid">
        <div>
          <span>Division</span>
          <strong>{brief.division}</strong>
        </div>
        <div>
          <span>Budget</span>
          <strong>{brief.budget}</strong>
        </div>
        <div>
          <span>Readiness</span>
          <strong>{brief.readiness}/100</strong>
        </div>
        <div>
          <span>Complexity</span>
          <strong>{brief.complexity}</strong>
        </div>
      </div>
      <h2>Risks and dependencies</h2>
      <ul className="gap-list">
        {brief.gaps.map((gap) => (
          <li key={gap}>{gap}</li>
        ))}
      </ul>
      <h2>Required PMG team</h2>
      <div className="role-row">
        {brief.roles.map((role) => (
          <Badge tone="role" key={role.role}>
            {role.role}
          </Badge>
        ))}
      </div>
      <div className="action-row">
        <button className="primary-button" type="button">
          Export summary as PDF
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick={downloadJson}
        >
          Download brief as JSON
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick={copySummary}
        >
          Copy summary
        </button>
        <button className="secondary-button" type="button">
          Return to dashboard
        </button>
      </div>
    </section>
  );
}

function StandardsView() {
  return (
    <section className="screen" aria-labelledby="standards-title">
      <p className="eyebrow">Global standards</p>
      <h1 id="standards-title">
        Consistency without one-size-fits-all planning
      </h1>
      <div className="standards-grid">
        <article>
          <h2>Universal Requirements</h2>
          <ul>
            {universalStandard.slice(0, 8).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>Configurable Planning Elements</h2>
          <ul>
            {[
              "Channel mix",
              "Budget phasing",
              "Creative approach",
              "Reporting cadence",
              "Testing depth",
              "Market strategy",
              "Senior oversight",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>Local Flexibility</h2>
          <ul>
            {[
              "Language",
              "Local platforms",
              "Cultural context",
              "Local partnerships",
              "Market-specific audiences",
              "Regional regulations",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>Future Capabilities</h2>
          <ul>
            {[
              "CRM systems",
              "Analytics platforms",
              "Media platforms",
              "Finance systems",
              "Resource management",
              "AI-assisted planning",
              "Historical benchmarks",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function App() {
  const [selectedBrief, setSelectedBrief] = React.useState(briefs[0]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">IPN</div>
        <div>
          <h2>Informa Planning Navigator</h2>
          <p>Powered by PMG</p>
        </div>
        <nav aria-label="Primary navigation">
          {navigation.map((item, index) => (
            <a
              className={index === 0 ? "active" : ""}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              key={item}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>
      <main className="workspace">
        <header className="topbar">
          <div>
            <span>Selected brief</span>
            <strong>{selectedBrief.name}</strong>
          </div>
          <div className="topbar-actions">
            <Badge tone={selectedBrief.risk.toLowerCase()}>
              {selectedBrief.risk} risk
            </Badge>
            <Badge tone="status">{selectedBrief.status}</Badge>
          </div>
        </header>
        <Dashboard
          selectedBrief={selectedBrief}
          onSelectBrief={setSelectedBrief}
        />
        <NewBriefDemo brief={selectedBrief} />
        <ReadinessView brief={selectedBrief} />
        <ResourceView brief={selectedBrief} />
        <ReviewWorkspace brief={selectedBrief} />
        <SummaryExport brief={selectedBrief} />
        <StandardsView />
      </main>
    </div>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
