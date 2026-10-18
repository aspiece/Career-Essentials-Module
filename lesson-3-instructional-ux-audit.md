# CTE module quality report · Lesson 3 instructional and UX audit

Review date: October 18, 2026

## Decision

- Status: Audit complete; targeted revision recommended before approving the local preview for release.
- No critical instructional failure found. The revised application already provides a strong model → guided revision → independent planning → draft → review sequence.
- Priority repairs: clarify the evidence required in the submitted draft; replace the inactive Finish control; strengthen formative feedback and selected assessment items.
- This is a read-only review of the current local lesson and assessment source. No lesson code, scoring policy, Google Form, repository, or hosted content was changed by this audit.
- The earlier `lesson-3-scaffolding-review.md` describes a narrower implementation review. This audit extends that review to the whole lesson and adjacent assessment; previously resolved blank-draft and disconnected-editor issues are not reopened as current defects.

## Scope and method

Reviewed `lessons/lesson-3.html`, `assets/lesson-3.js`, `assets/lesson-3.css`, shared styles, blueprint, assessment, form verification record, manifest, and prior scaffolding review. An independent instructional/assessment reviewer reviewed source while the primary reviewer tested browser interactions.

The browser test used a separate `localhost:8766` origin to avoid modifying learner work saved under `127.0.0.1:8766`. Test notes and drafts were cleared through the lesson's own control after testing. Existing user drafts were not cleared.

## Validation summary

| Lane | Result | Evidence | Owner |
|---|---|---|---|
| Source fidelity | Main teaching concepts preserved; records incomplete | All five SMART dimensions and distinct accountability concept remain. Manifest does not yet inventory Lesson 3 media or assessment. | Source review |
| Instructional alignment | Strong application; one submission-readiness ambiguity | Annotated six-part model, guided repair, own-task planner, original draft, and handoff exist. Checklist permits submitted-response requirements to be evidenced only in notes. | Independent reviewer / primary reviewer |
| Assessment quality | Targeted revision recommended | All-SMART item lacks context to establish A/R; achievable item supplies no resource facts; distractors are often plainly undesirable or implausible. Partial-credit boundaries need calibration. | Independent reviewer / primary reviewer |
| Reading level | Below target screen; human review acceptable | Required script reports FK 6.67, 2,291 words, no prohibited institutional terms. Short prompts and labels contribute to the low estimate; do not inflate difficulty merely to raise the score. | Automated screen / human review |
| Accessibility and UDL | Tested interactions pass; full conformance not established | Dialog opens with Enter, Escape closes it and returns focus; step handoff focuses the heading; labels and hints present; text-based route exists. Full assistive-technology and actual 200% browser zoom checks remain unverified. | Browser / source |
| Program coverage | Existing examples present; completeness provisional | Sixteen named program pathways plus Other. Learners can use a familiar program or supervised practice task without having a job. Current canonical list and field-specific procedures were not certified. | Source review |
| Media and graphics | SMART player loads; captions observed; trust transcript confirmed | YouTube player displayed captions and about 2:46 runtime. WinningWise provider page contains the trust transcript and describes a one-minute video. Full caption accuracy and Vimeo playback were not audited. | Browser / provider source |
| Evergreen language | Pass for learner HTML screen | No forbidden terms detected. Generic workplace roles and student-chosen context are retained. | Automated / human review |
| Visual and responsive QA | Pass for tested 320px views; completion defect | Comparison cards, vocabulary, model table, and planner remain contained. Finish label is misleading because its click handler has no final-step action. | Browser / code |

## Prioritized findings

| ID / severity | Location and evidence | Learner impact | Recommendation | Status |
|---|---|---|---|---|
| 1 · Significant | `lessons/lesson-3.html:142–148` allows evidence “in your draft or planning notes” for every checklist statement. Assessment prompt at `lesson-3-assessment.md:14` requires action, measure, deadline, and accountability in the response itself. | A learner can check required details based on notes, then submit a draft that omits them. The checklist is honestly unscored, but its evidence location is ambiguous. | State that S, M, T, and accountability must be visible in the final draft. A/R can be supported by planning notes, adding details to the final wording when needed. Preserve the existing scoring construct. | Proposed; independently confirmed |
| 2 · Significant UX | `assets/lesson-3.js:23–25` labels the final control “Finish lesson ✓” but acts only when `current < steps.length - 1`. Enter on Finish leaves Step 3.5 unchanged with no completion guidance. | The control implies an action and completion state that never occurs, immediately after students have been told this page does not submit their quiz. | Match Lesson 2's revised approach: “Review submission steps” opens and focuses a concise panel explaining copy → open assigned course quiz → paste → submit → await instructor grading. Never imply the local page submits or records a grade. | Reproduced in browser |
| 3 · Moderate assessment | `lesson-3-assessment.md:51–57` asks which goal is achievable without giving time, resources, workload, or access to a mentor. `:72–91` asks which includes **all** SMART parts, while the keyed rationale establishes action, measure, deadline, and follow-through, without evidence for A/R. | Students can select the obvious best option without demonstrating how they judge feasibility or relevance. The B key is strongest, but the all-parts claim exceeds the supplied evidence. | Supply a short workplace context establishing purpose, available time, tools, support, and task scope. Ask students to select or revise a feasible target using those facts. For the all-SMART item, substantiate all five dimensions or narrow the stem; accountability remains an additional plan component. | Proposed; all-parts concern independently confirmed |
| 4 · Moderate feedback | `assets/lesson-3.js:29` supplies the same wrong-answer feedback for all six formative items. Selecting “Choose the easiest task only” for relevance returns “Choose the response that helps the worker and team follow through.” | Feedback does not explain why ease differs from relevance, or help diagnose a missing SMART component. | Add response-specific feedback to each distractor. Example: “An easy task may still be unrelated to the team's needs. Choose a task that supports a real work purpose.” Keep the current truthful, non-grading planner feedback. | Reproduced in browser |
| 5 · Moderate learning evidence | Step 3.1 asks students to **explain** how accountability supports a team (`lesson-3.html:28`); checks at `:58–60` and assessment Questions 1–3 primarily ask students to identify responsible actions. The final response creates a plan, rather than necessarily explaining the consequence for a team. | The lesson can show recognition and goal construction without eliciting a causal explanation of accountability's team benefit. | Add one short, unscored scenario response: identify an early update and explain how it changes what the team can do. Connect that explanation to the learner's follow-through plan. Do not add a new graded requirement without revising the assessment plan. | Proposed alignment improvement |
| 6 · Moderate assessment advisory | `lesson-3-assessment.md:99–101` gives 1 point for a goal missing one essential element, while 0 also covers an “incomplete” response; multiple missing elements have no explicit boundary. | Different instructors may score a partially developed response differently. | Clarify score boundaries and add brief 2/1/0 anchor responses. Preserve 2 total points; treat any wording change as an assessment revision requiring review before transfer to the Form. | Independent reviewer finding; no scored samples available |
| 7 · Advisory model quality | `assets/lesson-3.js:56–60` reuses the same generic trust response and improvement explanation for every field. Career goals provide action/evidence/review points, then ask learners to consider missing feasibility/purpose context. The complete generic model at `lesson-3.html:94–102` handles all six parts well. | The stronger generic model carries most of the explanation. Students may treat a field example as fully established SMART without seeing what assumptions support A/R. | Reuse the successful annotation approach: show the phrases for S/M/T/accountability; name the facts or assumptions needed to judge A/R. Label partially specified examples appropriately. Use a different task for independent transfer if retaining a complete field-specific model. | Proposed refinement; no need to rebuild the current planner |
| 8 · Advisory interaction | `assets/lesson-3.js:116–123` resets every self-review box when any planning note changes. Browser test: changing support notes cleared an already-checked specific-action box. | Revising one decision creates avoidable rechecking of unrelated evidence. This is conservative review invalidation, not data loss. | Clear all draft-based checks when draft wording changes; invalidate the affected criterion when a planning note changes, or clearly explain why a full recheck is required. Keep the learner's draft intact. | Reproduced in browser |
| 9 · Advisory source / media | The text alternatives at `lesson-3.html:48,72` are concise summaries labeled “transcript-based,” not complete verbatim transcripts. WinningWise's external page supplies its complete transcript. Lesson 3 media and assessment are absent from `course-manifest.json` source/media/assessment records. The make-up label says “Ethics and Accountability,” while the blueprint calls it the Rock Wall make-up assignment. | Reviewers cannot fully trace media, alternatives, assessment, and make-up context from the manifest. The makeup naming mismatch may be legitimate, but was not verified against the destination. | Add exact Lesson 3 source locators and verified accessibility status. Label short readings as instructional summaries; distinguish them from full transcripts. Verify the make-up destination/title before renaming anything. | Verification and documentation follow-up |

Severity reflects this whole-lesson audit. The independent reviewer rated Finding 1 moderate in the narrower scaffolding context; this report prioritizes it for submission readiness. Finding 6 is an advisory assessment improvement, not a reason to discard the already approved scoring construct.

## What should be retained

- The complete annotated station-opening model and small supported revision.
- Six concise planning decisions, including achievable support and workplace purpose.
- Optional draft generation with an explicit adoption step. The generated test response was coherent and included action, evidence, deadline, and accountability.
- Honest helper wording: it combines notes and does not judge feasibility or quality. Support/purpose are intentionally planning evidence; omission from the generated starter is not itself a bug.
- One mirrored draft across Steps 3.4–3.5, browser persistence, a copy fallback, and shared-device cleanup.
- A familiar-task option and supervision reminders, so students without employment can participate.
- Visible labels, persistent hints, disclosure help, keyboard dialog behavior, and the current responsive layout.
- The three-attempt instruction. Prior form verification records manual instructor management of additional attempts and a manually scored opening response; this audit did not reopen or recheck live Form settings.

## Browser and technical evidence

- Empty starter-helper request listed all six missing decisions and focused `goal-action`.
- Entered a computer-science task with six distinct notes. Starter creation used the intended four response components; adoption was separate from generation.
- Application draft appeared in the final editor; handoff focused `assessment-title`. Reload restored the latest draft and selected field.
- Enter on Finish left the URL and final content unchanged; source confirms no final-step branch.
- Wrong relevance answer returned the generic follow-through message.
- At 320 CSS pixels, document scroll width was 305px. Step 3.3 comparison cards and vocabulary were approximately 228px wide. Step 3.4 model table and planner were approximately 228px; planner textareas approximately 195px. No page horizontal overflow in these views.
- Enter opened the Specific definition; Escape closed it and returned focus to the trigger.
- JavaScript syntax check passed. Manifest validator passed its schema checks; it does not verify completeness of per-lesson source inventories.
- Readability screen flagged 6.67 below the 7.0–8.5 band; evergreen screen passed. Human review found concise, age-appropriate directions rather than a need to make the prose harder.
- Screenshots: `C:/Users/aspie/.codex/visualizations/2026/10/18/01a1507b-ed01-7502-a859-31a20d65eaa1/lesson-3-audit-finish.png` and `lesson-3-audit-mobile.png` in the same folder.

Media source checked: [WinningWise trust video and complete transcript](https://winningwise.com/insights/how-to-build-trust-video/). The local summary covers its principal competence, follow-through, advice-seeking, and relationship themes. [Mindtools SMART-goals video](https://www.youtube.com/watch?v=OXA6gfzFA24) was inspected through the embedded player; full caption accuracy was not certified.

## Recommended revision sequence

1. Repair final-draft evidence directions and final navigation; retain the working planner and persistence.
2. Add feedback that teaches the selected misconception and one brief explanation task connecting accountability to team outcomes.
3. Review feasible-target and all-SMART assessment items plus partial-credit anchors. Keep lesson and Form wording aligned; do not silently change live keys or points.
4. Improve field-model annotations, source records, media labels, and make-up destination verification.
5. Retest affected interactions, keyboard flow, actual 200% zoom, narrow reflow, and final media access before presenting the revised preview.

## Approval record and release boundaries

- Audit authorized by: “I would like to do a similar audit for lesson 3.”
- Implementation: recommendations only; not applied during this audit.
- Next decision: review and approve the recommended revision scope. A request to apply these recommendations authorizes local implementation; revised assessment wording should be presented for review before live transfer.
- Preview/publishing approval: not granted by this audit request. No repository, DNS, hosting, or Google Form changes were made.
- Limitations: no full screen-reader study, native 200% zoom verification, full caption-quality audit, canonical-program certification, or observed student usability study. Pacing remains a plausible 54-minute estimate, not a measured completion time.
