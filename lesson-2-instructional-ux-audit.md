# CTE module quality report · Lesson 2 instructional and UX audit

## Decision

- Scope: the open local page, Lesson 2 Step 2.3, **The 7 Cs in Action**, with Steps 2.2, 2.4, and 2.5 reviewed to assess prerequisites, transfer, and submission preparation.
- Method: independent instructional/assessment source review plus browser inspection and controlled tests in a separate tab. The original open page and lesson source were preserved.
- Overall judgment: strong visual and contextual foundation; significant feedback, question-validity, and transfer-design issues should be corrected before treating this as a polished learning experience.
- Blocking release findings: none established for page loading or basic navigation. The high-priority learning-quality findings below warrant correction before instructional release.
- Significant findings: misleading self-check feedback, ambiguous formative questions, repeated model/application answers, missing task facts, and fragile draft handoff.
- Advisory findings: lower-value interactions, keyboard transition orientation, narrow-layout containment, and comparison styling.

The impact descriptions are expert judgments about likely learner difficulty. No student usability sessions or response analytics were available, so this audit does not claim observed learning gains or a formal accessibility certification.

## What is working

- The title, step number, pacing estimate, and immediate directions make the page easy to orient to visually.
- Consistent teal branding, restrained panels, readable typography, and a predictable page structure support scanning.
- Career selection makes the concept relevant across the existing program pathways. The underlying communication construct remains consistent.
- The Before/After approach is appropriate for teaching revision, and short definitions reduce terminology barriers.
- Vocabulary dialogs have accessible names, open with Enter, close with Escape, and return focus to the triggering word in the tested browser.
- Field labels, fieldsets/legends, visible focus styling, and live feedback regions provide a useful accessibility foundation.
- The automated full-HTML reading screen estimated FK **7.77**, within the specified 7.0–8.5 target, and found no prohibited institutional terms. This is a screen, not proof of comprehension.

## Validation summary

| Lane | Result | Evidence | Owner |
|---|---|---|---|
| Source fidelity | Scoped review only | Existing learner content and assessment rubric inspected; original video transcript fidelity not re-audited. | Root reviewer |
| Instructional alignment | Significant revisions recommended | Recognition → model → application sequence exists, but application repeats the demonstrated answer and does not expose all revision decisions. | Independent instructional reviewer |
| Assessment quality | Significant revisions recommended | Several formative stems/keys do not isolate one defensible answer; four-Cs task supplies its own answers. | Independent assessment reviewer |
| Reading level | Screen pass | FK 7.77; human review found generally concise, age-appropriate workplace language. | Automated / root reviewer |
| Accessibility and UDL | Partial pass | Dialog keyboard behavior verified; step transition focus remains on the bottom navigation; narrow comparison containment needs adjustment. | Browser checks |
| Program coverage | Provisional | Existing 16 examples plus Other preserved; canonical program list not refreshed for this audit. | Source inspection |
| Media and graphics | Not revalidated | No media changes requested. Existing video text alternative remains available. | Scope limitation |
| Evergreen language | Pass | No prohibited terms found by the required screen. | Automated |
| Visual and responsive QA | Mostly sound, two defects | Both comparison cards use the same green border. At 320px, 250px cards exceed their approximately 228px container. | Browser checks |

## Prioritized findings

### 1. High · The self-check can falsely validate an empty message

**Evidence:** `assets/lesson.js:110–115` counts four selected checkboxes and never reads the draft. In the browser, all writing fields were blank; checking four boxes produced: “Your message includes the key components.” The result is styled as successful feedback.

**Learner impact:** Students can mistake self-report for an evaluation of their writing. The page encourages confidence without evidence.

**Recommended change:** Check for nonempty draft text, then frame the interaction honestly as evidence-based self-review. Do not use keyword checks to claim the message is well written.

**Replacement feedback:** “You marked all four components. Reread your draft and point to the words that show each one. This self-check does not score your message.”

**Acceptance check:** An empty draft never receives affirmative content feedback. Editing a reviewed draft clears or invalidates the previous self-review state.

### 2. High · Some formative questions can penalize defensible reasoning

**Evidence:** `lessons/lesson-2.html:107` keys “Please handle this before closing” as courteous and complete. It still uses an unspecified “this,” and no prior task context is supplied. The other options also use “Please.” The keyed feedback asserts completeness from a deadline alone. At `:108`, the inventory question tests an unstated work procedure: reporting before restocking can be reasonable, but is rejected. Adjacent Step 2.2 at `:81` rejects “Both people confirm understanding” for a two-way communication question.

**Learner impact:** Students may receive corrective feedback for sound communication reasoning and infer inaccurate definitions of complete/coherent communication.

**Recommended change:** Give each question a complete context and assess one clear construct. For the ending question, state that the task and location are already named, then ask which ending supplies a precise deadline and a requested reply. For coherence, compare differently organized versions of the same message rather than assuming a universal inventory workflow. Rewrite the two-way-process item around confirmation and clarification with one unambiguously best answer.

**Acceptance check:** A reviewer can explain why the key is best and why each distractor fails using only the supplied context. Choices retain parallel grammar and appropriate length balance after revision.

### 3. High · The “independent” application repeats the model answer

**Evidence:** `assets/lesson.js:92–96` uses the same `scenario.vague` and `scenario.exemplar` for Step 2.3's comparison and Step 2.4's task/exemplar. The model's After answer is visible before the instruction to draft independently and compare afterward.

**Learner impact:** Reproduction of the model can look like transfer. Students have little reason to make new decisions about audience, needed details, or organization.

**Recommended change:** Keep one worked example in Step 2.3. Follow it with a short partially completed revision. Give students a different, similarly demanding request in Step 2.4, preserving their career selection but changing the actual task and facts.

**Acceptance check:** Copying the Step 2.3 answer cannot satisfy the Step 2.4 request. Students can transfer the same communication criteria to a new message.

### 4. High · Students are asked to supply facts that only the exemplar knows

**Evidence:** The automotive scenario at `assets/lesson.js:62` supplies a vehicle inspection and pickup time; the exemplar adds a named recipient, blue sedan, and specific inspection tasks. At `:92`, application receives only the short task and vague message. The page then asks students to write actionable details (`lesson-2.html:119–121`). The final rubric correctly says to assess communication, not specialized technical knowledge.

**Learner impact:** Students must invent facts, rely on outside technical knowledge, or copy the exemplar. This undermines the “correct” C and can blur the distinction between communication practice and a real technical procedure.

**Recommended change:** Provide a compact fictional work-order box: recipient role, exact task, item/location, verified deadline, and how to confirm completion. Mark any optional choices students may reasonably make. Teach students to ask for or verify missing facts rather than guess. Keep technical tasks within required supervision.

**Acceptance check:** Every detail required to write an accurate message is supplied, explicitly chosen, or identified as a clarification question. Exemplar facts match the work order.

### 5. High · Draft work is fragile and disconnected from assessment preparation

**Evidence:** Browser testing showed that the Step 2.4 revision remains in memory during navigation, but Step 2.5's `final-message` editor opens blank. A refresh clears both the written draft and selected career field. The source contains no draft storage or editor transfer (`assets/lesson.js`; `lesson-2.html:121,133`).

**Learner impact:** Students can lose substantial work, retype it unnecessarily, or submit an earlier version. The message about saving the place in the page address does not save student writing.

**Recommended change:** Use one editable response across drafting and final preparation. Save locally with an accurate saving notice, a fallback when saving is unavailable, a copy control, and explicit shared-device cleanup. Never overwrite a student's revised draft when changing an example.

**Acceptance check:** Final edits survive navigation and refresh; the selected scenario restores; copying works or offers a truthful manual fallback; cleanup removes only the intended local practice work.

### 6. Medium · The model does not reveal the revision decisions

**Evidence:** `lesson-2.html:94,97,103–104` presents seven definitions and asks students to notice changes. `assets/lesson.js:95` gives one generic explanation of four Cs without identifying the exact supporting words. Concise, correct, and coherent receive definitions but no explicit evidence in this comparison.

**Learner impact:** Novices must infer the process while keeping seven overlapping terms in memory. Reading a strong result does not show them how to build it.

**Recommended change:** Add a brief think-aloud and a three- to five-row evidence table beside/below the example. For example: “named recipient → audience,” “exact item and location → concrete,” “deadline plus reply → complete.” Explain how the same wording may support more than one C. Identify the four emphasized Cs while keeping the other three in the final review.

**Acceptance check:** Students can connect an exact phrase to a communication purpose and use that reasoning on a different message.

### 7. Medium · The four-Cs interaction adds clicks without evidence of reasoning

**Evidence:** `lesson-2.html:127` tells students to choose clear, concrete, complete, and courteous, then checks exactly those selections. `assets/lesson.js:102–108` evaluates selection, not analysis.

**Learner impact:** Success demonstrates following supplied directions rather than recognizing communication quality. It can imply that effective messages have only four Cs.

**Recommended replacement:** “Choose one C you improved. Copy the words from your message that show it, then explain how those words help the receiver.” Alternatively, ask students to revise one missing feature in a short new message.

**Acceptance check:** The interaction requires evidence from a message and produces a useful revision decision, rather than repeating named answers.

### 8. Medium · Navigation changes the visual page without moving reading focus

**Evidence:** `assets/lesson.js:25–38` changes active sections and scrolls to the top but does not focus the new heading. Browser testing confirmed focus remains on `next-step` after transition. At the final step, the same button says “Finish lesson ✓” but its handler does nothing when already on the last section.

**Learner impact:** Keyboard and screen-reader users can lose orientation. The final control suggests a completion action that does not occur.

**Recommended change:** On intentional step changes, focus the new heading; honor reduced-motion preferences. Replace the final no-op with a clearly described destination or a truthful completion summary. Explain that page progress is not quiz submission or an LMS completion record.

**Acceptance check:** Enter on Next moves focus to the next heading. The last control performs the action stated in its label. No unannounced completion/grade claim is made.

### 9. Low · Before and After use the same positive color treatment

**Evidence:** Both message cards have computed top-border color `rgb(24, 135, 84)`. In `assets/styles.css:1`, `.compare .message:last-child` matches both nested message boxes; the intended first-child selector does not identify the Before box.

**Learner impact:** The visual cue does not distinguish the example being revised from its improvement. Text labels still communicate Before/After, so color is not the only cue and this is not established as a color-accessibility failure.

**Recommended change:** Target the comparison columns or explicit Before/After classes. Keep textual labels and add visible revision annotations rather than relying on color.

### 10. Low · Comparison cards exceed their container at a narrow width

**Evidence:** At a 320px viewport, the comparison container measured approximately 228px while a card remained 250px wide. The card's right edge extended about 22px beyond the container because of `minmax(250px,1fr)`. The document itself did not exceed the viewport in this test.

**Learner impact:** The card breaks the intended panel alignment and uses up the reading margin at narrow widths or comparable magnification.

**Recommended change:** At small widths, use a single flexible column with a zero minimum, or a minimum capped by the available container width. Confirm message text and controls remain contained.

## Recommended lesson flow

1. **Orient:** “You will revise a message so another person can act without guessing.” Show a compact overview of the seven Cs.
2. **Model:** Present a complete work-order fact set, a vague request, and an annotated revision. Explain the decisions, including verification of facts.
3. **Guide:** Let students add a missing deadline or confirmation request to a partially completed message, then compare a possible solution.
4. **Transfer:** Supply a different request in their selected career field with all needed facts. Students plan the recipient/task and write one complete message.
5. **Review:** Students identify evidence for a C, revise one weak detail, and use an honest self-review checklist.
6. **Prepare submission:** Carry the same editable response forward, preserve it, and provide clear copying/submission instructions.

Fix the high-priority feedback and validity issues first. Next improve the model/application distinction and draft handoff. Finish with navigation and visual polish. Preserve the established branding and useful career contexts.

## Evidence and limitations

- Browser tests used a separate local tab with audit-only selections and sample writing; the user's original open page was not changed.
- Reproduced: false positive on blank writing; draft loss on reload; empty final editor despite a prior draft; bottom-navigation focus retention; matching comparison-border colors; narrow-container overflow.
- Verified: basic page loading, career selection updates, dialog naming and Enter/Escape behavior, focus restoration after the dialog, and available persistent field labels.
- Not verified: a full assistive-technology audit, actual browser zoom at 200%, provider captions/transcript accuracy, district network access, current canonical program completeness, or student learning outcomes.
- Evidence screenshot: `C:/Users/aspie/.codex/visualizations/2026/10/18/01a1507b-ed01-7502-a859-31a20d65eaa1/lesson-2-audit-blank-draft-feedback.jpg`.

## Approval record

- Audit authorized by the user's request for instructional-design and UX review.
- No lesson, assessment, repository, or live Form changes were made during this audit.
- Next recommended artifact: a revised Lesson 2 blueprint addressing the prioritized findings, followed by an implemented preview if authorized.

## Release and recovery

- Audit output: this report only.
- Publishing: none performed; no recovery action required.
