(() => {
  const steps = [...document.querySelectorAll('.step')];
  const progress = document.querySelector('progress');
  const label = document.querySelector('#step-status');
  const makeupNotice = document.querySelector('#makeup-notice');
  const dialog = document.querySelector('#definition-dialog');
  const title = document.querySelector('#definition-title');
  const text = document.querySelector('#definition-text');
  const context = document.querySelector('#definition-context');
  const example = document.querySelector('#definition-example');
  const definitions = {
    trust: { meaning: 'Confidence that a person will act responsibly and follow through.', context: 'Teams work more smoothly when people can depend on one another.', example: 'Example: You tell your supervisor early that a task may be delayed and explain your next step.' },
    accountability: { meaning: 'Owning your actions, results, and follow-through.', context: 'Accountability helps a team solve problems instead of hiding them or blaming others.', example: 'Example: “I missed the inventory count. I will finish it by 11:00 and send the results.”' },
    reliable: { meaning: 'Consistently doing what you said you would do.', context: 'Reliability makes it easier for others to plan their own work.', example: 'Example: You complete your assigned setup task before the shift begins, as promised.' },
    smart: { meaning: 'A goal that is specific, measurable, achievable, relevant, and time-bound.', context: 'SMART goals turn a general hope into a plan you can track.', example: 'Example: “By Friday, I will complete the daily equipment checklist for five shifts and review it with my supervisor.”' },
    specific: { meaning: 'Names the exact action, skill, or result.', context: 'A specific goal tells you what to do first.', example: 'Example: “Learn the opening checklist” is more specific than “do better at work.”' },
    measurable: { meaning: 'Includes evidence that lets you check progress.', context: 'A measure shows whether you reached the goal.', example: 'Example: Complete the checklist correctly for five shifts.' },
    achievable: { meaning: 'Can be completed with the time, skills, and support available.', context: 'An achievable goal is challenging but realistic.', example: 'Example: Practice one new task with a trainer before doing it independently.' },
    relevant: { meaning: 'Connects to the work, team, customer, or career goal.', context: 'Relevant goals use effort on something that matters.', example: 'Example: Improving safety checks supports the team and the people it serves.' },
    timebound: { meaning: 'Includes a deadline or check-in date.', context: 'A time-bound goal creates a clear point to review progress.', example: 'Example: “I will show my completed checklist to my supervisor every Friday this month.”' }
  };
  let current = Math.max(0, Math.min(steps.length - 1, Number(new URLSearchParams(location.search).get('step')) - 1 || 0));
  function show(index, moveFocus = false) { current = index; steps.forEach((step, i) => step.classList.toggle('active', i === index)); makeupNotice.classList.toggle('active', index === 0); progress.value = index + 1; label.textContent = `Step 3.${index + 1} · ${index + 1} of ${steps.length}`; history.replaceState(null, '', `?step=${index + 1}`); document.querySelector('#previous-step').disabled = index === 0; document.querySelector('#next-step').textContent = index === steps.length - 1 ? 'Review submission steps' : 'Next step →'; if (moveFocus) { const heading = steps[index].querySelector('h1'); heading.tabIndex = -1; heading.focus({ preventScroll: true }); } window.scrollTo({ top: 0, behavior: 'auto' }); }
  document.querySelector('#previous-step').addEventListener('click', () => show(current - 1, true));
  document.querySelector('#next-step').addEventListener('click', () => {
    if (current < steps.length - 1) { show(current + 1, true); return; }
    const submission = document.querySelector('#submission-steps');
    submission.hidden = false;
    submission.focus();
    submission.scrollIntoView({ block: 'start', behavior: 'auto' });
  });
  document.querySelectorAll('[data-definition]').forEach(trigger => trigger.addEventListener('click', event => { event.preventDefault(); const definition = definitions[trigger.dataset.definition]; title.textContent = trigger.textContent; text.textContent = definition.meaning; context.textContent = definition.context; example.textContent = definition.example; dialog.showModal(); }));
  document.querySelector('#close-definition').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.querySelectorAll('[data-check]').forEach(box => box.querySelector('button').addEventListener('click', () => { const picked = box.querySelector('input:checked'); const feedback = box.querySelector('.feedback'); if (!picked) { feedback.textContent = 'Choose an answer, then check it.'; feedback.className = 'feedback try'; return; } const good = picked.dataset.correct === 'true'; feedback.textContent = `${good ? 'Correct.' : 'Review your choice.'} ${picked.dataset.feedback}`; feedback.className = `feedback ${good ? 'good' : 'try'}`; }));
  document.querySelectorAll('[data-check]').forEach(box => box.querySelectorAll('input').forEach(input => input.addEventListener('change', () => { const feedback = box.querySelector('.feedback'); feedback.textContent = ''; feedback.className = 'feedback'; })));
  const scenarios = {
    agriscience: { focus: 'Complete the animal-care checklist before afternoon visitors arrive.', before: 'I want to be better with the animals.', after: 'By Friday, I will complete the animal-care checklist before 1:30 p.m. for five shifts and review it with the animal-care lead.' },
    automotive: { focus: 'Complete a safety inspection before a customer pickup.', before: 'I will try to do inspections better.', after: 'By next Friday, I will complete the safety-inspection checklist for five vehicles and ask the service lead to review one checklist with me.' },
    aviation: { focus: 'Complete a preflight checklist before a training flight.', before: 'I want to be more careful before flights.', after: 'For the next five training flights, I will complete the preflight checklist before the flight block and ask the instructor to verify one item with me.' },
    computer: { focus: 'Test a website update before an event registration opens.', before: 'I will get better at fixing website problems.', after: 'Before Friday’s registration launch, I will test every form link on a phone and computer, record the results, and share them with the web lead.' },
    construction: { focus: 'Prepare a safe work area before the crew arrives.', before: 'I will be better about safety.', after: 'For the next five shifts, I will complete the work-area safety check before the crew arrives and report any hazard to the site lead immediately.' },
    cosmetology: { focus: 'Prepare a client station before an appointment.', before: 'I will try to be more prepared.', after: 'For the next five appointments, I will prepare my station 15 minutes early using the setup list and ask my instructor to check one setup.' },
    culinary: { focus: 'Prepare a catering order before pickup.', before: 'I will do better with food orders.', after: 'For the next three catering orders, I will use the packing checklist, verify allergy labels, and report completion to the kitchen lead before pickup.' },
    education: { focus: 'Prepare make-up materials before the next class period.', before: 'I will be better at helping students.', after: 'For the next five make-up requests, I will prepare the materials before the next class period and confirm completion with the teacher.' },
    health: { focus: 'Restock an exam-room supply shelf before appointments.', before: 'I will pay more attention to supplies.', after: 'For the next two weeks, I will restock the exam-room shelf by 2:00 p.m. each day and initial the supply log after checking it.' },
    hvac: { focus: 'Complete a routine HVAC unit inspection before class.', before: 'I will try to check units more often.', after: 'For the next five inspections, I will check the filter and thermostat settings before 1:00 p.m. and report any concern to the supervisor the same day.' },
    marketing: { focus: 'Review a social media post before publication.', before: 'I will improve my posts.', after: 'For the next five event posts, I will check the date, location, image credit, and registration link before 3:00 p.m. and ask the marketing lead to review one post.' },
    mechatronics: { focus: 'Reset a training cell before the next class.', before: 'I will be better at resetting the machine.', after: 'For the next five class changes, I will reset the training cell using the startup checklist before class and log any issue for the instructor.' },
    safety: { focus: 'Inspect a first-aid kit before a community event.', before: 'I will be more responsible with safety kits.', after: 'Before the next community event, I will inspect the first-aid kit, list any missing item, and report the list to the safety lead by 4:00 p.m.' },
    jrotc: { focus: 'Prepare a uniform display before an open house.', before: 'I will help more with displays.', after: 'Before Friday’s open house, I will arrange the uniform display by size, check the name cards, and ask the team lead to approve it by 4:30 p.m.' },
    welding: { focus: 'Set up a welding booth before the next lab group.', before: 'I will get the booth ready better.', after: 'For the next five lab groups, I will inspect Welding Booth 3, replace needed wire, and report the completed setup to the instructor before the group arrives.' },
    forensics: { focus: 'Prepare an evidence kit before a lab activity.', before: 'I will be more organized with evidence kits.', after: 'For the next three lab activities, I will prepare the evidence kit using the supply list and confirm that forms and labels are included before 10:30 a.m.' },
    other: { focus: 'Choose a familiar workplace task that requires reliable follow-through.', before: 'I will do better at this task.', after: 'By [date], I will [specific action], measure progress by [evidence], and share the result with [person or role].' }
  };
  const careerField = document.querySelector('#career-field');
  const applicationCareer = document.querySelector('#application-career-field');
  applicationCareer.replaceChildren(...[...careerField.options].map(option => new Option(option.text, option.value)));
  const modelNotes = {
    agriscience: ['complete the animal-care checklist', 'five shifts', 'By Friday', 'review it with the animal-care lead'],
    automotive: ['complete the safety-inspection checklist', 'five vehicles', 'By next Friday', 'ask the service lead to review one checklist with me'],
    aviation: ['complete the preflight checklist', 'next five training flights', 'before the flight block', 'ask the instructor to verify one item with me'],
    computer: ['test every form link on a phone and computer', 'record the results', 'Before Friday’s registration launch', 'share them with the web lead'],
    construction: ['complete the work-area safety check', 'next five shifts', 'before the crew arrives', 'report any hazard to the site lead immediately'],
    cosmetology: ['prepare my station', 'next five appointments', '15 minutes early', 'ask my instructor to check one setup'],
    culinary: ['use the packing checklist', 'next three catering orders', 'before pickup', 'report completion to the kitchen lead'],
    education: ['prepare the materials', 'next five make-up requests', 'before the next class period', 'confirm completion with the teacher'],
    health: ['restock the exam-room shelf', 'initial the supply log', 'For the next two weeks', 'The log records work; add who will review it and when.'],
    hvac: ['check the filter and thermostat settings', 'next five inspections', 'before 1:00 p.m.', 'report any concern to the supervisor the same day'],
    marketing: ['check the date, location, image credit, and registration link', 'next five event posts', 'before 3:00 p.m.', 'ask the marketing lead to review one post'],
    mechatronics: ['reset the training cell using the startup checklist', 'next five class changes', 'before class', 'log any issue for the instructor'],
    safety: ['inspect the first-aid kit', 'list any missing item', 'by 4:00 p.m.', 'report the list to the safety lead'],
    jrotc: ['arrange the uniform display by size', 'check the name cards', 'by 4:30 p.m.', 'ask the team lead to approve it'],
    welding: ['inspect Welding Booth 3', 'next five lab groups', 'before the group arrives', 'report the completed setup to the instructor'],
    forensics: ['prepare the evidence kit using the supply list', 'next three lab activities', 'before 10:30 a.m.', 'Add who will review the prepared kit and when.'],
    other: ['[specific action]', '[evidence]', '[date]', '[person or role] — also add when you will share the result.']
  };
  function updateModelNotes(value) {
    const body = document.querySelector('#career-goal-evidence');
    body.replaceChildren();
    if (!scenarios[value]) return;
    const notes = modelNotes[value];
    const rows = [
      ['S · Action', notes[0]], ['M · Evidence to check', notes[1]], ['T · Review point', notes[2]], ['Accountability · Follow-through', notes[3]],
      ['A · Check feasibility', 'Before using this target, confirm the task size, practice time, tools, permissions, and required supervision. Reduce the target if those are not available.'],
      ['R · Check purpose', `Explain who benefits when you ${scenarios[value].focus.charAt(0).toLowerCase() + scenarios[value].focus.slice(1).replace(/\.$/, '')}. Connect the task to a real need in your setting.`]
    ];
    rows.forEach(([part, evidence]) => { const row = document.createElement('tr'); const heading = document.createElement('th'); heading.scope = 'row'; heading.textContent = part; const cell = document.createElement('td'); cell.textContent = evidence; row.append(heading, cell); body.append(row); });
  }
  function updateCareer(value) {
    careerField.value = value;
    applicationCareer.value = value;
    const scenario = scenarios[value];
    document.querySelector('#trust-before').textContent = scenario ? '“I may get to this task later. Someone else can handle it if I do not.”' : 'Choose a career field to view a workplace response.';
    document.querySelector('#trust-after').textContent = scenario ? `“I will ${scenario.focus.charAt(0).toLowerCase() + scenario.focus.slice(1)} If a problem could delay it, I will update my supervisor early and ask for help.”` : 'Choose a career field to view a stronger workplace response.';
    document.querySelector('#goal-before').textContent = scenario ? scenario.before : 'Choose a career field to view a vague workplace goal.';
    document.querySelector('#goal-after').textContent = scenario ? scenario.after : 'Choose a career field to view a more specific draft.';
    document.querySelector('#goal-improvement').textContent = scenario ? 'This is a draft to evaluate, not a verified SMART plan. Use the evidence guide to check what is stated and what still needs context. Follow your program’s safety rules and required supervision.' : 'Choose a career field in Step 3.2 to see an example. The complete worked model in Step 3.4 shows all five SMART parts and accountability.';
    updateModelNotes(value);
    document.querySelector('#career-scenario').textContent = scenario ? `Example task: ${scenario.focus}` : 'Example task: Choose a career field for an example, or plan a familiar workplace task of your own.';
  }

  const savedFields = [...document.querySelectorAll('[data-goal-field]')];
  const goalEditor = document.querySelector('#smart-goal');
  const finalGoal = document.querySelector('#final-goal');
  const storageKey = 'career-essentials.lesson-3.goal-planner.v1';
  const review = document.querySelector('[data-plan-check]');
  const reviewFeedback = review.querySelector('.feedback');
  const plannerFeedback = document.querySelector('#planner-feedback');
  const handoffFeedback = document.querySelector('#handoff-feedback');
  const suggestionPanel = document.querySelector('#goal-suggestion-panel');
  const suggestion = document.querySelector('#suggested-goal');
  const planParts = [
    { id: 'goal-action', error: 'action-error', label: 'specific action', prompt: 'Name an action someone could observe.' },
    { id: 'goal-measure', error: 'measure-error', label: 'evidence of progress', prompt: 'Name a count, target, or finished product you can check.' },
    { id: 'goal-support', error: 'support-error', label: 'realistic support', prompt: 'Name the time, tools, practice, or support available to you.' },
    { id: 'goal-purpose', error: 'purpose-error', label: 'workplace purpose', prompt: 'Explain how this task helps your work, team, customer, or career.' },
    { id: 'goal-deadline', error: 'deadline-error', label: 'deadline or review point', prompt: 'Give a date or a clear point when you will review progress.' },
    { id: 'accountability-plan', error: 'accountability-error', label: 'follow-through plan', prompt: 'Name what you will share, with whom, and when.' }
  ];
  function storageMessage(message) { document.querySelectorAll('.draft-storage-status').forEach(node => { if (node.textContent !== message) node.textContent = message; }); }
  function saveWork() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ career: careerField.value, fields: Object.fromEntries(savedFields.map(field => [field.id, field.value])) }));
      storageMessage('Practice notes and your draft are saved in this browser on this device. Copy your response before you leave a shared device. Nothing here is sent to the quiz.');
    } catch {
      storageMessage('Browser saving is unavailable. Your work stays in this open tab. Copy your response before you close or reload it.');
    }
  }
  function resetReview() {
    review.querySelectorAll('input').forEach(input => { input.checked = false; });
    reviewFeedback.textContent = '';
    reviewFeedback.className = 'feedback';
  }
  function clearPartError(part) {
    document.getElementById(part.id).removeAttribute('aria-invalid');
    const error = document.getElementById(part.error);
    error.textContent = '';
    error.hidden = true;
  }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && typeof saved === 'object') {
      savedFields.forEach(field => { if (typeof saved.fields?.[field.id] === 'string') field.value = saved.fields[field.id]; });
      // Both editors show one response; prefer the final editor when restoring older saved copies.
      goalEditor.value = finalGoal.value || goalEditor.value;
      finalGoal.value = goalEditor.value;
      updateCareer(Object.hasOwn(scenarios, saved.career) ? saved.career : '');
    }
    storageMessage('Practice notes and your draft save in this browser on this device. Copy your response before you leave a shared device. Nothing here is sent to the quiz.');
  } catch {
    storageMessage('Saved work could not be restored. Copy your response before you close this tab.');
  }
  [careerField, applicationCareer].forEach(select => select.addEventListener('change', () => { updateCareer(select.value); resetReview(); saveWork(); }));
  savedFields.forEach(field => field.addEventListener('input', () => {
    if (field === goalEditor) finalGoal.value = field.value;
    if (field === finalGoal) goalEditor.value = field.value;
    const part = planParts.find(item => item.id === field.id);
    if (part && field.value.trim()) clearPartError(part);
    if (field === goalEditor || field === finalGoal) resetReview();
    else if (part) {
      const criterion = { 'goal-action': 'specific', 'goal-measure': 'measurable', 'goal-support': 'achievable', 'goal-purpose': 'relevant', 'goal-deadline': 'timebound', 'accountability-plan': 'accountability' }[part.id];
      review.querySelector(`input[value="${criterion}"]`).checked = false;
      reviewFeedback.textContent = '';
    }
    if (part) { suggestionPanel.hidden = true; plannerFeedback.textContent = ''; }
    handoffFeedback.textContent = '';
    saveWork();
  }));
  document.querySelector('#build-goal').addEventListener('click', () => {
    const missing = planParts.filter(part => !document.getElementById(part.id).value.trim());
    planParts.forEach(part => {
      clearPartError(part);
      if (missing.includes(part)) {
        document.getElementById(part.id).setAttribute('aria-invalid', 'true');
        const error = document.getElementById(part.error);
        error.textContent = part.prompt;
        error.hidden = false;
      }
    });
    if (missing.length) {
      suggestionPanel.hidden = true;
      plannerFeedback.textContent = `Add notes for: ${missing.map(part => part.label).join('; ')}. You can also write your own draft without using this helper.`;
      plannerFeedback.className = 'feedback try';
      document.getElementById(missing[0].id).focus();
      return;
    }
    const note = id => document.getElementById(id).value.trim().replace(/[.!?]+$/, '');
    const deadline = note('goal-deadline').replace(/^by\s+/i, '');
    const action = note('goal-action').replace(/^I will\s+/i, '');
    const accountability = note('accountability-plan').replace(/^I will\s+/i, '');
    suggestion.value = `By ${deadline}, I will ${action}. I will track progress using ${note('goal-measure')}. To show follow-through, I will ${accountability}.`;
    suggestionPanel.hidden = false;
    plannerFeedback.textContent = 'Starting draft created. Compare it with your support and purpose notes. Your draft editor has not changed.';
    plannerFeedback.className = 'feedback';
    suggestion.focus();
  });
  document.querySelector('#use-goal-suggestion').addEventListener('click', () => {
    goalEditor.value = suggestion.value;
    finalGoal.value = suggestion.value;
    resetReview();
    handoffFeedback.textContent = '';
    plannerFeedback.textContent = 'The starting draft is now in your editor. Revise it for your own task, then review all six statements below.';
    saveWork();
    goalEditor.focus();
  });
  const reviewPrompts = {
    specific: 'Name one action someone could observe.', measurable: 'Add evidence or a target you can check.',
    achievable: 'Check your time, tools, and support; reduce the task if needed.', relevant: 'Explain how the task helps your work, team, customer, or career.',
    timebound: 'Give a clear deadline or review point.', accountability: 'Say what you will share, with whom, and when.'
  };
  review.querySelector('button').addEventListener('click', () => {
    if (!goalEditor.value.trim()) {
      reviewFeedback.textContent = 'Write your goal and accountability plan in the draft editor first. The checklist does not create or score a response.';
      reviewFeedback.className = 'feedback try';
      goalEditor.focus();
      return;
    }
    const missing = [...review.querySelectorAll('input')].filter(input => !input.checked);
    reviewFeedback.textContent = missing.length ? `Review these parts: ${missing.map(input => reviewPrompts[input.value]).join(' ')}` : 'You marked all six review statements. Reread the words that support each choice and revise anything vague. This checklist does not score or verify your goal; your instructor evaluates the response.';
    reviewFeedback.className = 'feedback';
  });
  review.querySelectorAll('input').forEach(input => input.addEventListener('change', () => { reviewFeedback.textContent = ''; }));
  document.querySelector('#prepare-goal').addEventListener('click', () => {
    if (!goalEditor.value.trim()) {
      reviewFeedback.textContent = 'Write a draft in the editor before moving it to assessment preparation.';
      goalEditor.focus();
      return;
    }
    show(4, true);
    handoffFeedback.textContent = 'Your current draft is here. Read it once more, then copy it. Submit it in the course quiz when assigned.';
  });
  document.querySelector('#copy-goal').addEventListener('click', async () => {
    if (!finalGoal.value.trim()) { handoffFeedback.textContent = 'Write your final response before copying it.'; finalGoal.focus(); return; }
    let copyTimeout;
    try { await Promise.race([navigator.clipboard.writeText(finalGoal.value), new Promise((_, reject) => { copyTimeout = setTimeout(() => reject(new Error('Copy timed out')), 2500); })]); handoffFeedback.textContent = 'Response copied. Paste it into the opening response question in the course quiz, then submit the quiz there.'; }
    catch { finalGoal.focus(); finalGoal.select(); handoffFeedback.textContent = 'Your browser could not copy automatically. Your response is selected. Use your device’s Copy command, then paste it into the course quiz.'; }
    finally { clearTimeout(copyTimeout); }
  });
  document.querySelectorAll('[data-clear-goal-work]').forEach(button => button.addEventListener('click', () => {
    savedFields.forEach(field => { field.value = ''; });
    updateCareer(''); resetReview(); planParts.forEach(clearPartError); suggestionPanel.hidden = true; suggestion.value = ''; plannerFeedback.textContent = ''; handoffFeedback.textContent = '';
    try { localStorage.removeItem(storageKey); storageMessage('Your saved practice work was cleared from this browser. Any copies saved elsewhere and quiz responses are unchanged.'); }
    catch { storageMessage('The visible practice work is clear, but browser storage could not be cleared. Use your browser settings to remove saved site data.'); }
    (current === 4 ? finalGoal : applicationCareer).focus();
  }));
  show(current);
})();
