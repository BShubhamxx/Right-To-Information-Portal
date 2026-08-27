# RTI Online --- New Features Specification

## Purpose

This document defines the **new differentiating features** to be added
after feature parity with the existing RTI Online portal has been
achieved.

These features are not intended to replace the original RTI
capabilities. They form an additional **citizen-intelligence layer**
that helps users decide whether to file, where to file, how to structure
a request, and whether their request is ready.

The current RTI Online portal is primarily designed around filing,
payment, status, history, and appeals. It also explicitly warns that the
Central Government portal should not be used for State Government public
authorities. The new features should make these decisions easier before
a citizen spends time or money filing.

All intelligence in this prototype must use mock/demo data and must
never claim to be an official government determination.

------------------------------------------------------------------------

# 1. RTI Navigator

## Goal

Help citizens determine **where their RTI should be filed** before they
begin the application.

The citizen should not need to understand the difference between Central
Government, State Government, municipal, district, PSU, university, or
other public authorities.

## User problem

The current RTI Online portal is specifically for Central Government
public authorities and warns that State Government applications,
including NCT Delhi, should not be filed through it. A wrong State
Government submission can be returned without refund.

The redesigned experience should turn this warning into proactive
guidance.

## Experience

Citizen enters:

> "I want to know why property tax increased in Pune."

System analyzes the request and shows:

### We found the likely RTI route

**Likely jurisdiction** Maharashtra State Government / Local Government

**Likely authority** Pune Municipal Corporation

**Recommended route** State / Local RTI

### Why?

Your question appears to concern a local-government property-tax matter.

### Important

This is a recommendation based on demo authority data, not an official
determination.

Actions:

-   `Continue with this route`
-   `Search authorities`
-   `I think this is wrong`
-   `Learn about RTI jurisdictions`

## Central Government example

If the user asks:

> "How much was spent on Indian Railways station redevelopment?"

Show:

### This looks like a Central Government RTI

Suggested authority:

**Ministry / Department / Central Public Authority**

Then:

`Continue to RTI Builder`

## Requirements

-   Jurisdiction classification
-   Authority recommendation
-   Central vs State detection
-   Ministry/department detection
-   Local-government detection where supported by demo data
-   Searchable authority directory
-   Explanation of recommendation
-   User override
-   Clear disclaimer
-   No claim of legal certainty
-   No live government API dependency

## Mock data

Create authority records with:

-   authority name
-   jurisdiction type
-   state
-   district/city
-   ministry/department
-   category
-   keywords
-   description
-   demo routing URL where appropriate

## Success condition

A first-time user should be able to answer:

> "Where should I file this RTI?"

without manually browsing hundreds of public authorities.

------------------------------------------------------------------------

# 2. Check Before You File

## Goal

Prevent citizens from filing an RTI when the information may already be
publicly available.

## User problem

The current portal primarily starts from the filing workflow. The
redesigned experience should first help citizens determine whether an
RTI is actually necessary.

## Experience

Citizen asks:

> "How much money was spent on road repairs in Pune in 2025?"

Before opening the application form, show:

# You may already be able to find this information

### Possible match

**Road Development Expenditure --- FY 2025--26**

Illustrative demo information:

-   Budget allocated: ₹84.2 crore
-   Expenditure: ₹71.6 crore
-   Projects completed: 143

Actions:

`View available information`

`I still need more information`

`Build an RTI`

## If only part of the information is available

Show:

### We found some information

You can already see:

-   total allocation
-   total expenditure

But we could not find:

-   project-wise contractor details
-   work-order information

### An RTI may help you get the missing information.

`Request the missing information`

## Requirements

-   Search mock public-information database
-   Keyword matching
-   Topic matching
-   Authority matching
-   Year/date matching
-   Partial-result detection
-   "Information already available" state
-   "Partially available" state
-   "Not found" state
-   Continue-to-RTI CTA
-   Clearly mark all content as illustrative/demo data

## Important product principle

Do not make the user feel blocked from filing.

The feature should guide:

**Search → Discover → Decide**

not:

**Search → Prevent filing**

------------------------------------------------------------------------

# 3. RTI Readiness Score

## Goal

Help citizens improve their request before submission.

This is not a legal score and must never be presented as one.

## User problem

Citizens may submit questions that are:

-   too broad
-   missing a date
-   missing a location
-   asking for an explanation/opinion
-   combining unrelated requests
-   unclear about the information required

The current portal provides the form and instructions, but the citizen
is responsible for constructing the request. The current portal limits
application text to 3,000 characters and permits longer content through
a supporting PDF.

## Experience

After drafting:

# Your RTI is almost ready

### Readiness

**4 / 5 checks passed**

✓ Information requested\
✓ Time period specified\
✓ Location specified\
✓ Relevant authority identified\
⚠ Question asks for a reason rather than a specific record

### Recommended improvement

Instead of:

> "Why are the roads in my area so bad?"

Try:

> "Please provide details of funds sanctioned and expenditure incurred
> for road repair and maintenance projects in \[area\] during FY
> 2025--26, including project-wise sanctioned amount, expenditure,
> contractor details and current status."

Actions:

`Use suggested wording`

`Edit myself`

## Readiness checks

At minimum evaluate:

1.  Is the requested information clear?
2.  Is a time period specified?
3.  Is the location specified where relevant?
4.  Is a relevant authority identified?
5.  Does the request ask for existing records/information?
6.  Is the request within 3,000 characters?
7.  Are multiple unrelated questions combined?
8.  Are important entities identifiable?
9.  Are supporting documents required?
10. Is the request likely to require clarification?

## Scoring

Use a simple human-readable system rather than a fake percentage.

Examples:

-   `Ready to submit`
-   `Almost ready`
-   `Needs a few details`
-   `Needs clarification`

Avoid presenting the score as a probability of approval or legal
validity.

## Intelligence Layer

Do NOT use any external AI API for this prototype.

Do NOT require:

- OpenAI API
- Anthropic API
- Any paid or free external AI API
- Any API key for intelligence features

All intelligent behavior must be implemented locally using deterministic logic, structured datasets, keyword/entity matching, rules, templates, and scoring algorithms.

The goal is to make the experience feel intelligent without depending on an external model.

## Deterministic Intelligence Architecture

Every intelligent feature must work entirely without an API key.

Create a dedicated local intelligence layer.

Suggested structure:

/lib/intelligence/
  navigator.ts
  public-info-search.ts
  readiness.ts
  decomposition.ts
  knowledge.ts
  eligibility.ts
  entities.ts
  rules.ts
  index.ts

The UI should call typed service functions rather than implementing business logic directly inside components.

Examples:

- analyzeRTIQuestion()
- determineJurisdiction()
- recommendAuthority()
- searchPublicInformation()
- calculateReadiness()
- decomposeQuestion()
- findRelatedKnowledge()
- runEligibilityCheck()

Use deterministic logic such as:

- keyword matching
- phrase matching
- entity extraction
- location dictionaries
- ministry/department dictionaries
- authority keyword mappings
- jurisdiction rules
- information-type classification
- question-pattern detection
- conjunction/numbered-list detection
- date/year extraction
- character-count validation
- rule-based scoring
- curated templates

Example:

Input:

"How much money was spent on road repairs in Pune in 2025?"

Output:

Topic:
Road repairs

Location:
Pune

Year:
2025

Information type:
Expenditure

Possible jurisdiction:
Maharashtra / Local Government

Possible authority:
Matched from the demo authority dataset

The system should explain that these are suggestions based on the prototype's rules and demo data.

---

## Fallback

There is no external AI fallback because no external AI is being used.

The deterministic intelligence layer IS the primary implementation.

The application must therefore work fully with:

- no API keys
- no external AI services
- no AI network requests
- no paid AI services

This makes the demo predictable and eliminates dependency on API quotas or network availability.

------------------------------------------------------------------------

# 5. RTI Knowledge Library

## Goal

Help citizens learn from **similar RTI questions and reusable
information-request patterns**.

This should not become a social network.

## User problem

A first-time citizen often does not know what a good RTI question looks
like.

Instead of reading a long manual, they can explore examples.

## Main page

# RTI Knowledge Library

Search:

> "What are you trying to find out?"

Categories:

-   Government spending
-   Contracts
-   Recruitment
-   Employees
-   Education
-   Healthcare
-   Infrastructure
-   Transport
-   Public schemes
-   Complaints
-   Project status
-   Rules & policies
-   Meetings & decisions
-   Records & documents

## Example

Search:

> "road construction"

Results:

### Road project expenditure

**Information requested**

Project-wise sanctioned amount, expenditure and current status.

**Useful for**

Understanding how public infrastructure funds were spent.

`Use as starting point`

------------------------------------------------------------------------

### Road contracts

**Information requested**

Contractor name, work order, tender value and completion status.

`Use as starting point`

## Important

The library should provide **patterns and examples**, not claim that the
examples are official templates or guaranteed successful applications.

Clearly label seeded content as:

"Illustrative example"

or, if using actual public records later:

"Publicly available reference"

## Features

-   Search
-   Categories
-   Popular topics
-   Related examples
-   Use as starting point
-   Copy into RTI Builder
-   Edit before submission
-   Similar-question suggestions
-   Authority category
-   Information type

## Data model

Create:

knowledge_items

Fields:

-   id
-   title
-   category
-   topic
-   information_type
-   example_question
-   example_request
-   authority_category
-   keywords
-   explanation
-   source_type
-   demo_only
-   created_at
-   updated_at

------------------------------------------------------------------------

# 6. Can I Actually File This?

## Goal

Provide a final pre-flight check before the citizen commits time and
money.

This should combine the previous features into a single understandable
decision.

## Experience

Before payment:

# You're ready to file

### Eligibility & request check

✓ You appear eligible to use this Central Government RTI route\
✓ A relevant public authority has been identified\
✓ Your request asks for information/records\
✓ Your request contains the required context\
✓ Your request is within the 3,000-character limit\
✓ Required supporting documents are present / not required\
✓ Your application fee is calculated correctly

Then:

### Important

This is a prototype guidance check and not a legal determination.

## Possible outcomes

### Ready

Everything required for this prototype workflow is complete.

`Continue to review`

### Needs information

Example:

> We need the financial year before continuing.

`Add financial year`

### Possible wrong route

Example:

> This appears to concern a State Government authority rather than a
> Central Government authority.

`Review route`

### Needs better wording

Example:

> Your question asks why something happened. Consider requesting the
> records that explain it.

`Improve request`

### Supporting document required

`Upload document`

## Design

This should feel like a calm government-service checklist.

Do not use:

-   gamified scores
-   large AI graphics
-   red "failure" screens
-   intimidating legal language

Use:

-   checkmarks
-   clear warnings
-   concise explanations
-   direct action buttons

------------------------------------------------------------------------

# 7. Combined Pre-Filing Journey

The six features should work as one coherent journey rather than six
disconnected pages.

Recommended flow:

## Step 1 --- Ask

Citizen enters:

> "How much money was spent on road repairs in Pune in 2025?"

## Step 2 --- Check Before You File

Search mock public information.

Result:

Some information already exists.

Citizen chooses:

`Request missing information`

## Step 3 --- RTI Navigator

Determine:

Central / State / Local

Recommended authority:

Demo Public Works Authority

## Step 4 --- Question Decomposition

Analyze the request.

Identify:

-   budget
-   expenditure
-   contractors
-   project status

Citizen reviews the grouping.

## Step 5 --- RTI Builder

Generate a structured request.

## Step 6 --- RTI Readiness

Show:

`4 / 5 checks passed`

Improve the missing part.

## Step 7 --- Can I Actually File This?

Final pre-flight check.

Show:

`Ready to submit`

## Step 8 --- Existing RTI flow

Continue into the existing parity features:

-   Applicant details
-   BPL
-   Supporting documents
-   Review
-   Payment
-   Submission
-   Registration number

------------------------------------------------------------------------

# 8. Knowledge Library Integration

The Knowledge Library should not be isolated.

Use it contextually.

When the citizen enters:

> "Road repair"

show:

### Need inspiration?

Similar RTI examples:

-   Road expenditure
-   Road contracts
-   Project completion
-   Contractor details
-   Road complaints

`Explore examples`

This should appear as a small contextual panel, not an intrusive
interruption.

------------------------------------------------------------------------

# 9. Feature Priority

Implement in this order:

### P0 --- Must have

1.  RTI Navigator
2.  Check Before You File
3.  RTI Readiness
4.  Can I Actually File This

These form the primary pre-filing intelligence layer.

### P1 --- High value

5.  Question Decomposition
6.  RTI Knowledge Library

These make the system smarter and more educational.

------------------------------------------------------------------------

# 10. Technical Implementation

## Backend

Use Supabase PostgreSQL.

Create tables:

-   authorities
-   authority_keywords
-   public_information
-   knowledge_items
-   rti_analysis
-   rti_readiness_checks

Existing RTI application tables should remain unchanged except where
relationships are required.

## Intelligence Layer

Do NOT use any external AI API for this prototype.

Do NOT require:

- OpenAI API
- Anthropic API
- Any paid or free external AI API
- Any API key for intelligence features

All intelligent behavior must be implemented locally using deterministic logic, structured datasets, keyword/entity matching, rules, templates, and scoring algorithms.

The goal is to make the experience feel intelligent without depending on an external model.

## Deterministic Intelligence Architecture

Every intelligent feature must work entirely without an API key.

Create a dedicated local intelligence layer.

Suggested structure:

/lib/intelligence/
  navigator.ts
  public-info-search.ts
  readiness.ts
  decomposition.ts
  knowledge.ts
  eligibility.ts
  entities.ts
  rules.ts
  index.ts

The UI should call typed service functions rather than implementing business logic directly inside components.

Examples:

- analyzeRTIQuestion()
- determineJurisdiction()
- recommendAuthority()
- searchPublicInformation()
- calculateReadiness()
- decomposeQuestion()
- findRelatedKnowledge()
- runEligibilityCheck()

Use deterministic logic such as:

- keyword matching
- phrase matching
- entity extraction
- location dictionaries
- ministry/department dictionaries
- authority keyword mappings
- jurisdiction rules
- information-type classification
- question-pattern detection
- conjunction/numbered-list detection
- date/year extraction
- character-count validation
- rule-based scoring
- curated templates

Example:

Input:

"How much money was spent on road repairs in Pune in 2025?"

Output:

Topic:
Road repairs

Location:
Pune

Year:
2025

Information type:
Expenditure

Possible jurisdiction:
Maharashtra / Local Government

Possible authority:
Matched from the demo authority dataset

The system should explain that these are suggestions based on the prototype's rules and demo data.

---

## Fallback

There is no external AI fallback because no external AI is being used.

The deterministic intelligence layer IS the primary implementation.

The application must therefore work fully with:

- no API keys
- no external AI services
- no AI network requests
- no paid AI services

This makes the demo predictable and eliminates dependency on API quotas or network availability.

------------------------------------------------------------------------

# 11. Important Guardrails

These features are guidance, not official government decisions.

Never say:

-   "This RTI will be accepted."
-   "This authority is legally responsible."
-   "Your application is legally valid."
-   "You are guaranteed a response."
-   "This information is definitely exempt."
-   "You will win an appeal."

Prefer:

-   "Suggested authority"
-   "This appears to concern..."
-   "Based on demo data..."
-   "This request may benefit from..."
-   "Consider requesting..."
-   "You may want to review..."

------------------------------------------------------------------------

# 12. Demo Scenario

The complete hackathon demo should use:

> "How much money was spent repairing roads in Pune in 2025, which
> contractors received the work, and how many projects were completed?"

The system should demonstrate:

1.  Check Before You File
2.  Partial information found
3.  RTI Navigator
4.  Suggested authority
5.  Question Decomposition
6.  3--4 information groups
7.  Knowledge Library suggestions
8.  RTI Builder
9.  Readiness checks
10. "Can I actually file this?"
11. Ready-to-submit state
12. Continue into existing RTI submission flow

The demo should make the innovation obvious:

**The platform doesn't just provide a form. It helps the citizen figure
out what to ask, whether they need to ask, where to ask, and whether the
request is ready.**

------------------------------------------------------------------------

# 12A. NO-API INTELLIGENCE PRINCIPLE

This prototype intentionally does not use an external AI provider.

Do not add API-key requirements later unless explicitly requested.

The intelligent experience must come from:

- carefully designed rules
- structured RTI domain data
- authority mappings
- keyword/entity matching
- deterministic classification
- scoring
- curated examples
- reusable request templates

The implementation should feel intelligent to the citizen while remaining:

- free to run
- deterministic
- fast
- reproducible
- reliable during the hackathon demo
- independent of external AI quotas

Do not market the product as "AI-powered."

Use product language such as:

"Smart Suggestions"
"RTI Navigator"
"Request Check"
"Readiness Check"
"Suggested authority"
"Suggested wording"
"Similar RTI examples"

# 13. Product Principle

The original portal helps a citizen:

> **File an RTI.**

The new layer should help a citizen:

> **Make a better information request.**

The transformation is:

**Question** → **Check** → **Route** → **Decompose** → **Learn** →
**Improve** → **Validate** → **File**

This is the core new product capability.
