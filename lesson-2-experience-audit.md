# Lesson 2 Experience and Instructional Audit

**Scope:** `lessons/lesson-2.html`, `assets/styles.css`, and `assets/lesson.js`.

**Decision:** Strong instructional foundation. Address the two significant flow/accessibility issues before final student release.

## What is working

- The five-step sequence is easy to follow: orient, learn, model, apply, and assess.
- The lesson makes the workplace purpose visible early and uses authentic, career-field-specific scenarios.
- Video, direct link, and text alternative support learner choice.
- Checks provide immediate feedback, and the final response asks students to transfer the skill to a career context.
- Student-facing text passes the automated reading screen at Flesch–Kincaid grade 7.52. Human review finds the language direct and appropriate for grades 7–8.

## Priority findings

| Priority | Finding | Evidence | Recommendation |
|---|---|---|---|
| Significant | The last navigation button changes to **Finish lesson ✓**, but its click handler does nothing on the final step. | `lesson.js` changes the label but advances only when another step exists. | Replace it with a clear completion action: show a completion panel, move focus to it, and restate the course-quiz next step. |
| Significant | Custom interactive controls do not have an explicit keyboard-focus style. | CSS styles hover and the skip link’s focus state, but not buttons, links, selects, textareas, summaries, or radio/checkbox controls. | Add a high-contrast `:focus-visible` treatment for all interactive controls. |
| Advisory | The lesson promises that the learner’s “place” is saved, but only the step number is stored in the URL. Written responses and selections are not saved. | Final page note and `history.replaceState` in `lesson.js`. | Change the note to “The page address opens this step again,” or add local storage for learner work. |
| Advisory | Step 2.4 asks for substantial writing before learners can see the exemplar, but completion is not checked. | The self-check counts selected boxes; it cannot evaluate the entered message. | Keep the self-check, but label it as a learner checklist. Add a short reminder that the instructor scores the final message in the course quiz. |
| Advisory | The final step tells students to return to the course quiz but does not show a completion state or a place for the instructor’s course-quiz link. | Step 2.5 has directions only. | Add a configurable “Open the assessment” link area or a clearly labeled instructor-provided link placeholder. |

## Flow and user experience

| Area | Result | Evidence |
|---|---|---|
| Orientation | Pass | Learning targets, timing, key vocabulary, and the make-up path appear before instruction. |
| Pace and chunking | Pass | One visible step at a time reduces overload; estimated times total about 48 minutes. |
| Wayfinding | Pass with one revision | Step count and progress bar update, but the final navigation behavior is incomplete. |
| Student control | Pass | Learners can use previous/next buttons, read instead of watch, and open the video separately. |
| Career relevance | Pass | Students select a career field and receive a matched workplace scenario and exemplar. |
| Cognitive load | Pass with one revision | Directions are short and sequenced; the first step could frame the full workplace-message challenge before students encounter it in Step 2.4. |

## Merrill’s First Principles of Instruction

| Principle | Result | Evidence | Next improvement |
|---|---|---|---|
| Problem-centered | Developing | The career-field message revision is authentic, but it appears after two content steps. | Open the overview with the vague workplace message challenge and explain that students will produce a usable message by the end. |
| Activation | Pass | Students recall a time they received confusing instructions before viewing the video. | Ask learners to record one needed detail in a brief text field or carry that example into the model comparison. |
| Demonstration | Pass | The video/text alternative, 7 Cs definitions, and before/after model show the skill in use. | Keep the model and annotate it with the four criteria students will later use for scoring. |
| Application | Pass with advisory | Six checks and a career-specific revision task give learners guided and independent practice. | Clarify that the checkbox self-check supports revision but does not automatically evaluate the draft. |
| Integration | Pass with advisory | Reflection and a scored final message support transfer. | Add a final prompt asking where the learner could use this message structure in a real workplace setting. |

## Accessibility review

| Check | Result | Evidence |
|---|---|---|
| Semantic structure | Pass | Page uses `main`, `header`, `footer`, sections with headings, fieldsets, legends, and labels. |
| Keyboard path | Pass with revision | A skip link and native controls support keyboard use; explicit `:focus-visible` styling is missing. |
| Screen-reader updates | Pass | Step status and feedback messages use `aria-live="polite"`; the career scenario also announces updates. |
| Video alternative | Pass | Required video has a title, direct link, concise text alternative, and directions for the provider transcript. |
| Color and contrast | Pass in code review | Text, panels, and feedback use color plus written feedback; no essential distinction depends on color alone. |
| Reflow and small screens | Pass in code review | Grids use responsive columns, the video uses a proportional container, and navigation stacks below 620px. |
| Zoom and browser testing | Pending visual verification | Code supports flexible layout, but 200% zoom and keyboard-only operation should be checked in a browser before release. |

## Validation evidence

- Student-facing text screen: Flesch–Kincaid grade 7.52; passed the 7.0–8.5 target.
- Evergreen-language screen: passed.
- JavaScript syntax: passed (`node --check assets/lesson.js`).
- Manual code inspection: completed for focus handling, landmarks, labels, live regions, responsive rules, and final-step flow.

## Recommended revision sequence

1. Repair the final-step completion behavior and focus management.
2. Add visible keyboard focus styling.
3. Correct the “saved” wording or add response persistence.
4. Add a configurable assessment-link area and one final integration prompt.
5. Preview at 200% zoom and complete a keyboard-only pass.

## Approval gate

**Next decision:** Approve the recommended revision sequence before changing the student-facing lesson.
