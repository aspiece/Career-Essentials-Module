(() => {
  const steps = [...document.querySelectorAll('.step')];
  const progress = document.querySelector('progress');
  const label = document.querySelector('#step-status');
  const makeupNotice = document.querySelector('#makeup-notice');
  const definitionDialog = document.querySelector('#definition-dialog');
  const definitionTitle = document.querySelector('#definition-title');
  const definitionText = document.querySelector('#definition-text');
  const definitionContext = document.querySelector('#definition-context');
  const definitionExample = document.querySelector('#definition-example');
  const closeDefinition = document.querySelector('#close-definition');
  const definitions = {
    audience: { meaning: 'The person or group receiving a message.', context: 'At work, the audience affects the details and tone you choose.', example: 'Example: A message to a shift supervisor may name a deadline; a message to a customer may explain the next step.' },
    tone: { meaning: 'The attitude a message communicates.', context: 'A professional tone helps coworkers feel respected and ready to respond.', example: 'Example: “Please reply when the task is complete. Thank you.” sounds respectful and work-ready.' },
    clear: { meaning: 'State the main point in plain language.', context: 'A clear message tells the receiver what you need without making them guess.', example: 'Example: “Please restock gloves in Cabinet B by 2:00 p.m.” is clearer than “Handle the supplies soon.”' },
    concise: { meaning: 'Use only the words needed to make the point.', context: 'Keeping a message concise helps a busy coworker find the important information quickly.', example: 'Example: “Meet in Room 204 at 1:00 p.m.” gives the needed details without extra background.' },
    concrete: { meaning: 'Use specific facts, dates, times, places, or actions.', context: 'Concrete details make a workplace task easier to complete correctly.', example: 'Example: “Inspect the blue sedan’s tires and brakes before 3:00 p.m.” gives a specific vehicle, task, and deadline.' },
    correct: { meaning: 'Check names, facts, grammar, and directions.', context: 'Correct information prevents mistakes and shows that you are dependable.', example: 'Example: Confirm the room number, customer name, and due time before sending the message.' },
    coherent: { meaning: 'Put ideas in a logical order.', context: 'A coherent message usually names the task first, then gives details and a next step.', example: 'Example: Ask for the task, list what is needed, state the deadline, then request a reply.' },
    complete: { meaning: 'Include what the receiver needs to act.', context: 'A complete message gives enough information so the receiver does not need to ask follow-up questions.', example: 'Example: Include the task, needed materials, deadline, and how the person should confirm completion.' },
    courteous: { meaning: 'Use a respectful, professional tone.', context: 'Courtesy helps build trust with coworkers, supervisors, and customers.', example: 'Example: “Could you please update the schedule by noon? Thank you.” is courteous and direct.' }
  };
  let current = Math.max(0, Math.min(steps.length - 1, Number(new URLSearchParams(location.search).get('step')) - 1 || 0));

  function show(n, moveFocus = false) {
    current = n;
    steps.forEach((step, index) => step.classList.toggle('active', index === n));
    makeupNotice?.classList.toggle('active', n === 0);
    progress.value = n + 1;
    label.textContent = `Step 2.${n + 1} · ${n + 1} of ${steps.length}`;
    history.replaceState(null, '', `?step=${n + 1}`);
    document.querySelector('#previous-step').disabled = n === 0;
    document.querySelector('#next-step').textContent = n === steps.length - 1 ? 'Review submission steps' : 'Next step →';
    if (moveFocus) { const heading = steps[n].querySelector('h1'); heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  document.querySelector('#previous-step').addEventListener('click', () => show(current - 1, true));
  document.querySelector('#next-step').addEventListener('click', () => {
    if (current < steps.length - 1) show(current + 1, true);
    else { const summary = document.querySelector('#submission-steps'); summary.hidden = false; summary.focus(); summary.scrollIntoView({ block: 'start', behavior: 'auto' }); }
  });
  document.querySelectorAll('[data-definition]').forEach(trigger => trigger.addEventListener('click', event => {
    event.preventDefault();
    const term = trigger.dataset.definition;
    const definition = definitions[term];
    definitionTitle.textContent = trigger.textContent;
    definitionText.textContent = definition.meaning;
    definitionContext.textContent = definition.context;
    definitionExample.textContent = definition.example;
    definitionDialog.showModal();
  }));
  closeDefinition?.addEventListener('click', () => definitionDialog.close());
  definitionDialog?.addEventListener('click', event => { if (event.target === definitionDialog) definitionDialog.close(); });
  document.querySelectorAll('[data-check]').forEach(box => box.querySelector('button').addEventListener('click', () => {
    const picked = box.querySelector('input:checked');
    const feedback = box.querySelector('.feedback');
    if (!picked) { feedback.textContent = 'Choose an answer, then check it.'; feedback.className = 'feedback try'; return; }
    const good = picked.dataset.correct === 'true';
    feedback.textContent = `${good ? 'Correct.' : 'Try again.'} ${picked.dataset.feedback || 'Look for the choice that helps the receiver understand and act.'}`;
    feedback.className = `feedback ${good ? 'good' : 'try'}`;
  }));
  document.querySelectorAll('[data-check] input').forEach(input => input.addEventListener('change', () => { const feedback = input.closest('[data-check]').querySelector('.feedback'); feedback.textContent = ''; feedback.className = 'feedback'; }));

  const scenarios = {
  "agriscience": {
    "id": "lesson-2-agriscience-v2",
    "model": {
      "recipient": "Morgan",
      "action": "check the animal-care area",
      "details": "Refill the water containers and report any concerns",
      "deadline": "1:30 p.m., before afternoon visitors arrive",
      "confirmation": "reply to me when the area is ready",
      "original": "Can someone check the animals later?"
    },
    "practice": {
      "recipient": "Avery",
      "action": "prepare the afternoon feed-record sheet",
      "details": "Copy the six animal IDs from the supplied roster and leave a check space beside each one",
      "deadline": "noon today",
      "confirmation": "show the sheet to the animal-care lead for review",
      "original": "Can someone sort out the feed paperwork?"
    }
  },
  "automotive": {
    "id": "lesson-2-automotive-v2",
    "model": {
      "recipient": "Jordan",
      "action": "complete the safety-inspection checklist for the blue sedan",
      "details": "Use the assigned checklist for tires, brakes, and exterior lights",
      "deadline": "the 3:00 p.m. customer pickup",
      "confirmation": "reply to the service lead when the checklist is complete",
      "original": "Can someone handle that car soon?"
    },
    "practice": {
      "recipient": "Casey",
      "action": "prepare the appointment confirmation list",
      "details": "Use the booking sheet to list the four afternoon customer names and pickup times",
      "deadline": "11:00 a.m. today",
      "confirmation": "send the list to the service adviser for a fact check",
      "original": "Can someone deal with those bookings?"
    }
  },
  "aviation": {
    "id": "lesson-2-aviation-v2",
    "model": {
      "recipient": "Taylor",
      "action": "review the training aircraft preflight checklist with the instructor",
      "details": "Use the assigned checklist for fuel, control surfaces, and documents",
      "deadline": "the 1:00 p.m. flight block",
      "confirmation": "report checklist completion to the instructor",
      "original": "Can somebody get the plane ready?"
    },
    "practice": {
      "recipient": "Jordan",
      "action": "organize the ground-school briefing packets",
      "details": "Make eight sets, each containing the supplied weather sheet and lesson outline",
      "deadline": "10:00 a.m. today",
      "confirmation": "tell the instructor how many complete sets are ready",
      "original": "Can someone sort the flight-class papers?"
    }
  },
  "computer": {
    "id": "lesson-2-computer-v2",
    "model": {
      "recipient": "Alex",
      "action": "repair the registration link on the practice website",
      "details": "Test the link on a phone and computer",
      "deadline": "4:00 p.m., before the evening event",
      "confirmation": "reply to me with the test results",
      "original": "Can someone deal with the website problem?"
    },
    "practice": {
      "recipient": "Riley",
      "action": "document the login error on the practice website",
      "details": "Record three steps that reproduce the error and the browser name on the test-report form",
      "deadline": "2:30 p.m. today",
      "confirmation": "send the report to the web lead for review",
      "original": "Can someone write up that login issue?"
    }
  },
  "construction": {
    "id": "lesson-2-construction-v2",
    "model": {
      "recipient": "Casey",
      "action": "prepare the south work area for the afternoon crew",
      "details": "Use the assigned area checklist to identify loose materials and a clear pathway",
      "deadline": "the 1:00 p.m. crew arrival",
      "confirmation": "report the completed checklist to the crew lead",
      "original": "Can someone fix that area?"
    },
    "practice": {
      "recipient": "Taylor",
      "action": "update the material-delivery list",
      "details": "Record 12 boards and two boxes of fasteners for the north work area from the delivery slip",
      "deadline": "2:00 p.m. today",
      "confirmation": "show the list to the crew lead before it is used",
      "original": "Can someone fix the delivery paperwork?"
    }
  },
  "cosmetology": {
    "id": "lesson-2-cosmetology-v2",
    "model": {
      "recipient": "Riley",
      "action": "prepare Station 4 for the next client",
      "details": "Use the approved setup list for tools, towels, and service-card supplies",
      "deadline": "the 2:30 p.m. appointment",
      "confirmation": "reply to the instructor when the station is ready",
      "original": "Can someone help with the client?"
    },
    "practice": {
      "recipient": "Alex",
      "action": "restock the consultation-card holder at the front desk",
      "details": "Add 20 blank consultation cards from the labeled office box",
      "deadline": "1:00 p.m. today",
      "confirmation": "reply to the instructor with the number added",
      "original": "Can someone sort out the front desk?"
    }
  },
  "culinary": {
    "id": "lesson-2-culinary-v2",
    "model": {
      "recipient": "Sam",
      "action": "pack the catering order",
      "details": "Use the packing list for sandwiches, labeled meals, napkins, and utensils",
      "deadline": "the 11:45 a.m. pickup",
      "confirmation": "tell the kitchen lead when the packed order is ready for review",
      "original": "Can someone deal with the food order?"
    },
    "practice": {
      "recipient": "Morgan",
      "action": "count the serving trays for the afternoon event",
      "details": "Record the count on the event sheet; the event requires 12 trays",
      "deadline": "1:30 p.m. today",
      "confirmation": "tell the kitchen lead the count and any shortage",
      "original": "Can someone check the event stuff?"
    }
  },
  "education": {
    "id": "lesson-2-education-v2",
    "model": {
      "recipient": "Chris",
      "action": "prepare the make-up packet for Jordan",
      "details": "Include the assignment and directions, and place them in the student folder",
      "deadline": "the start of third period",
      "confirmation": "reply to the teacher when the packet is ready",
      "original": "Can someone take care of that student issue?"
    },
    "practice": {
      "recipient": "Sam",
      "action": "prepare the reading-activity packs",
      "details": "Make 12 packs, each with the supplied story sheet and two question cards",
      "deadline": "the start of second period",
      "confirmation": "reply to the teacher with the number of complete packs",
      "original": "Can someone get those class activities ready?"
    }
  },
  "health": {
    "id": "lesson-2-health-v2",
    "model": {
      "recipient": "Jordan",
      "action": "restock the exam-room supply shelf",
      "details": "Use gloves, gauze pads, and disinfecting wipes from Storage Room B",
      "deadline": "2:00 p.m., before afternoon appointments",
      "confirmation": "reply to me when the shelf is stocked",
      "original": "Can someone take care of the supply shelf sometime today?"
    },
    "practice": {
      "recipient": "Taylor",
      "action": "complete the Room 2 supply-count sheet",
      "details": "Count the sealed glove boxes and gauze packs on the shelf and record both totals",
      "deadline": "11:30 a.m. today",
      "confirmation": "show the sheet to the clinical instructor for review",
      "original": "Can someone sort out the Room 2 records?"
    }
  },
  "hvac": {
    "id": "lesson-2-hvac-v2",
    "model": {
      "recipient": "Devon",
      "action": "complete the routine HVAC inspection record for Classroom 214",
      "details": "Use the assigned checklist for the filter and thermostat settings",
      "deadline": "the 1:00 p.m. class",
      "confirmation": "report the record and any concern to the supervisor",
      "original": "Can someone deal with the air unit later?"
    },
    "practice": {
      "recipient": "Riley",
      "action": "update the filter-inventory sheet",
      "details": "Count the labeled 16-by-20 and 20-by-25 filter packs in Storage A and record each total",
      "deadline": "2:00 p.m. today",
      "confirmation": "send the inventory totals to the supervisor",
      "original": "Can someone handle the filter list?"
    }
  },
  "marketing": {
    "id": "lesson-2-marketing-v2",
    "model": {
      "recipient": "Avery",
      "action": "review the event social-media post",
      "details": "Check the event date, location, image credit, and registration link against the event brief",
      "deadline": "the 3:00 p.m. publication review",
      "confirmation": "reply to the marketing lead with any needed corrections",
      "original": "Can someone work on that post?"
    },
    "practice": {
      "recipient": "Casey",
      "action": "proofread the printed open-house poster",
      "details": "Compare the date, start time, and location with the supplied event brief; mark any mismatch",
      "deadline": "noon today",
      "confirmation": "return the marked proof to the designer before printing",
      "original": "Can someone check that poster?"
    }
  },
  "mechatronics": {
    "id": "lesson-2-mechatronics-v2",
    "model": {
      "recipient": "Cameron",
      "action": "complete the training-cell reset checklist",
      "details": "Use the assigned checklist for labeled component bins and safety-guard status",
      "deadline": "the 12:30 p.m. class",
      "confirmation": "show the checklist to the instructor before equipment is used",
      "original": "Can someone get the machine ready?"
    },
    "practice": {
      "recipient": "Avery",
      "action": "prepare the training-kit inventory sheet",
      "details": "Record the quantities in the labeled sensor, cable, and bracket bins using the supplied form",
      "deadline": "10:45 a.m. today",
      "confirmation": "show the completed sheet to the instructor",
      "original": "Can someone sort the kit paperwork?"
    }
  },
  "safety": {
    "id": "lesson-2-safety-v2",
    "model": {
      "recipient": "Devon",
      "action": "inspect the event first-aid kit",
      "details": "Use the supply list to record missing, used, or expired items",
      "deadline": "the 4:00 p.m. community event",
      "confirmation": "send the findings to the safety lead",
      "original": "Can someone check the safety kit?"
    },
    "practice": {
      "recipient": "Lee",
      "action": "prepare the event radio sign-out sheet",
      "details": "Copy the six radio ID numbers from the supplied equipment list and leave spaces for names",
      "deadline": "3:00 p.m. today",
      "confirmation": "show the sheet to the event lead before check-out begins",
      "original": "Can someone get the radio paperwork ready?"
    }
  },
  "jrotc": {
    "id": "lesson-2-jrotc-v2",
    "model": {
      "recipient": "Lee",
      "action": "prepare the uniform display",
      "details": "Arrange uniforms by size and add the supplied name cards",
      "deadline": "the 5:00 p.m. open house",
      "confirmation": "tell the team lead when the display is ready",
      "original": "Can someone get the display ready?"
    },
    "practice": {
      "recipient": "Devon",
      "action": "prepare the team attendance sheet",
      "details": "Use the supplied roster to list the 12 team members and leave an attendance check space",
      "deadline": "the 2:00 p.m. rehearsal",
      "confirmation": "give the sheet to the team lead before roll call",
      "original": "Can someone sort out the team list?"
    }
  },
  "welding": {
    "id": "lesson-2-welding-v2",
    "model": {
      "recipient": "Parker",
      "action": "complete the Welding Booth 3 setup checklist",
      "details": "Use the assigned checklist for cables, wire, and work-surface condition",
      "deadline": "the 1:15 p.m. lab group",
      "confirmation": "show the checklist to the instructor before any equipment is used",
      "original": "Can someone set up the booth?"
    },
    "practice": {
      "recipient": "Quinn",
      "action": "prepare the consumables inventory sheet",
      "details": "Record the number of labeled wire spools and contact-tip packs using the supplied form",
      "deadline": "noon today",
      "confirmation": "show the inventory sheet to the welding instructor",
      "original": "Can someone get that supply list done?"
    }
  },
  "forensics": {
    "id": "lesson-2-forensics-v2",
    "model": {
      "recipient": "Quinn",
      "action": "prepare the evidence kit for the mock lab",
      "details": "Include gloves, evidence bags, labels, and blank chain-of-custody forms",
      "deadline": "the 10:30 a.m. lab activity",
      "confirmation": "tell the instructor when the kit is ready for review",
      "original": "Can someone get the evidence kit ready?"
    },
    "practice": {
      "recipient": "Chris",
      "action": "prepare the mock-lab evidence log sheets",
      "details": "Print eight blank log sheets and place one on each labeled lab table",
      "deadline": "10:00 a.m. today",
      "confirmation": "tell the instructor when all eight tables have a sheet",
      "original": "Can someone handle the lab records?"
    }
  },
  "other": {
    "id": "lesson-2-other-v2",
    "model": {
      "recipient": "Morgan",
      "action": "prepare the front-desk welcome packets",
      "details": "Include the event map and schedule in each of 12 packets",
      "deadline": "3:00 p.m., before visitor check-in",
      "confirmation": "reply to me with the number of completed packets",
      "original": "Can someone handle those packets later?"
    },
    "practice": {
      "recipient": "Jordan",
      "action": "prepare the workshop sign-in station",
      "details": "Place 15 blank sign-in sheets and three pens on the front table",
      "deadline": "1:00 p.m. today",
      "confirmation": "reply to the workshop lead when the station is ready",
      "original": "Can someone get things ready for the workshop?"
    }
  }
};
  const careerField = document.querySelector('#career-field');
  const applicationCareer = document.querySelector('#application-career-field');
  applicationCareer.replaceChildren(...[...careerField.options].map(option => new Option(option.text, option.value)));
  const modelFacts = document.querySelector('#model-facts');
  const practiceFacts = document.querySelector('#career-scenario');
  const finalFacts = document.querySelector('#final-work-order');
  const revision = document.querySelector('#revision');
  const finalMessage = document.querySelector('#final-message');
  const guidedRevision = document.querySelector('#guided-revision');
  const fields = [...document.querySelectorAll('[data-message-field]')];
  const selfCheck = document.querySelector('[data-message-check]');
  const reviewFeedback = selfCheck.querySelector('.feedback');
  const evidenceFeedback = document.querySelector('#evidence-feedback');
  const exemplarFeedback = document.querySelector('#exemplar-feedback');
  const exemplar = document.querySelector('#career-exemplar');
  const copyFeedback = document.querySelector('#copy-feedback');
  const storageKey = 'career-essentials.lesson-2.message-work.v1';
  let currentCareer = '';
  let workByCareer = Object.create(null);
  function writeMessage(order) {
    return `Hi ${order.recipient}, please ${order.action}. ${order.details}. Please finish by ${order.deadline}, then ${order.confirmation}. Thank you.`;
  }
  function renderFacts(target, order, heading) {
    target.replaceChildren();
    if (!order) { const text = document.createElement('p'); text.textContent = 'Choose a career field to see its fictional work-order facts.'; target.append(text); return; }
    const title = document.createElement('h3'); title.textContent = heading;
    const list = document.createElement('dl');
    for (const [name, value] of [['Recipient', order.recipient], ['Task', order.action], ['Details to include', order.details], ['Deadline', order.deadline], ['Confirmation', order.confirmation], ['Original request', order.original]]) {
      const term = document.createElement('dt'); term.textContent = name;
      const detail = document.createElement('dd'); detail.textContent = value;
      list.append(term, detail);
    }
    target.append(title, list);
  }
  function renderModel(order) {
    document.querySelector('#career-before').textContent = order ? order.original : 'Choose a career field to view a vague workplace message.';
    document.querySelector('#career-after').textContent = order ? writeMessage(order) : 'Choose a career field to view an improved workplace message.';
    document.querySelector('#career-improvement').textContent = order ? 'The revision uses facts from the work order to identify a recipient, explain the task, and make completion easy to confirm. Open the explanation below to connect these decisions to the 7 Cs.' : 'The improved message will use the supplied facts to explain what to do, when to finish, and how to confirm.';
    const annotations = document.querySelector('#model-annotations');
    annotations.hidden = !order; annotations.open = false;
    const body = document.querySelector('#model-evidence'); body.replaceChildren();
    if (!order) return;
    const rows = [
      ['Clear', `“Please ${order.action}” names the action the receiver should take.`],
      ['Concise', 'The writer keeps task details and leaves out unrelated background. A useful message can be longer than a vague one; concise does not mean removing facts the receiver needs.'],
      ['Concrete', `“${order.details}” and “${order.deadline}” give specific details.`],
      ['Correct', `The recipient (${order.recipient}), details, and deadline match the supplied work order. In real work, verify missing facts; this practice does not certify a technical procedure.`],
      ['Coherent', 'The message moves from recipient and task to details, then deadline and confirmation. The reader does not have to rearrange it.'],
      ['Complete', `“${order.confirmation}” explains how to show completion, alongside the task, details, and deadline.`],
      ['Courteous', 'The greeting, “please,” and “Thank you” support a respectful, direct tone.']
    ];
    for (const [name, explanation] of rows) {
      const row = document.createElement('tr'); const th = document.createElement('th'); th.scope = 'row'; th.textContent = name;
      const td = document.createElement('td'); td.textContent = explanation; row.append(th, td); body.append(row);
    }
  }
  function resetReview() {
    selfCheck.querySelectorAll('input').forEach(input => { input.checked = false; });
    [reviewFeedback, evidenceFeedback, exemplarFeedback, copyFeedback].forEach(node => { node.textContent = ''; node.className = 'feedback'; });
    exemplar.hidden = true;
    document.querySelector('#submission-steps').hidden = true;
  }
  function invalidateDraftReview() {
    selfCheck.querySelectorAll('input').forEach(input => { input.checked = false; });
    [reviewFeedback, evidenceFeedback, copyFeedback].forEach(node => { node.textContent = ''; node.className = 'feedback'; });
    document.querySelector('#submission-steps').hidden = true;
  }
  function cacheCurrentWork() {
    workByCareer[currentCareer] = { workOrderId: scenarios[currentCareer]?.id || '', fields: Object.fromEntries(fields.map(field => [field.id, field.value])) };
  }
  function saveStatus(message) {
    document.querySelectorAll('.message-save-status').forEach(node => { if (node.textContent !== message) node.textContent = message; });
  }
  function saveWork() {
    cacheCurrentWork();
    try {
      localStorage.setItem(storageKey, JSON.stringify({ version: 1, career: currentCareer, guided: guidedRevision.value, workByCareer }));
      saveStatus('Your notes and drafts for each career field are saved in this browser on this device. Nothing here is sent to the quiz. Save a copy elsewhere and clear practice work before leaving a shared device.');
    } catch {
      saveStatus('Browser saving is unavailable. Keep this tab open and copy your response somewhere safe before you close or reload it. Nothing here has been sent to the quiz.');
    }
  }
  function chooseCareer(value, restore = false) {
    if (!restore) cacheCurrentWork();
    currentCareer = Object.hasOwn(scenarios, value) ? value : '';
    careerField.value = currentCareer; applicationCareer.value = currentCareer;
    const scenario = scenarios[currentCareer];
    const saved = workByCareer[currentCareer];
    fields.forEach(field => { field.value = typeof saved?.fields?.[field.id] === 'string' ? saved.fields[field.id] : ''; });
    finalMessage.value = revision.value;
    renderFacts(modelFacts, scenario?.model, 'Worked example: supplied facts');
    renderModel(scenario?.model);
    renderFacts(practiceFacts, scenario?.practice, 'Your new work order');
    renderFacts(finalFacts, scenario?.practice, 'Facts for your final message');
    document.querySelector('#final-career-name').textContent = scenario ? careerField.options[careerField.selectedIndex].text : 'Choose a career field in Step 2.4.';
    exemplar.textContent = scenario ? writeMessage(scenario.practice) : '';
    resetReview();
    if (!restore) saveWork();
  }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved?.version === 1 && saved.workByCareer && typeof saved.workByCareer === 'object' && !Array.isArray(saved.workByCareer)) {
      for (const name of ['', ...Object.keys(scenarios)]) {
        if (Object.hasOwn(saved.workByCareer, name) && typeof saved.workByCareer[name]?.fields === 'object') workByCareer[name] = saved.workByCareer[name];
      }
      if (typeof saved.guided === 'string') guidedRevision.value = saved.guided;
      chooseCareer(saved.career, true);
    } else chooseCareer('', true);
    saveStatus('Notes and drafts save in this browser on this device. Nothing here is submitted to the quiz. Keep a copy elsewhere before leaving a shared device.');
  } catch {
    chooseCareer('', true);
    saveStatus('Saved work could not be restored. Copy your response somewhere safe before you close this tab.');
  }
  [careerField, applicationCareer].forEach(select => select.addEventListener('change', () => chooseCareer(select.value)));
  fields.forEach(field => field.addEventListener(field.tagName === 'SELECT' ? 'change' : 'input', () => {
    if (field === revision) { finalMessage.value = field.value; invalidateDraftReview(); }
    if (['evidence-c', 'evidence-quote', 'evidence-explanation'].includes(field.id)) evidenceFeedback.textContent = '';
    saveWork();
  }));
  finalMessage.addEventListener('input', () => { revision.value = finalMessage.value; invalidateDraftReview(); saveWork(); });
  guidedRevision.addEventListener('input', saveWork);
  const reviewPrompts = {
    audience: 'Name the recipient from the work order.', task: 'State the specific action.', facts: 'Check details and deadline against the supplied facts.',
    reply: 'Request the confirmation named in the work order.', tone: 'Organize the message, remove unrelated words, and use a respectful tone.'
  };
  selfCheck.querySelector('button').addEventListener('click', () => {
    if (!revision.value.trim()) { reviewFeedback.textContent = 'Write a draft first. Checking boxes does not create or evaluate a message.'; reviewFeedback.className = 'feedback try'; revision.focus(); return; }
    const missing = [...selfCheck.querySelectorAll('input')].filter(input => !input.checked);
    reviewFeedback.textContent = missing.length ? `Review these parts: ${missing.map(input => reviewPrompts[input.value]).join(' ')}` : 'You marked all five statements. Reread your draft and point to the words that show each one. This self-check does not score or verify your message; your instructor evaluates it.';
    reviewFeedback.className = 'feedback';
  });
  selfCheck.querySelectorAll('input').forEach(input => input.addEventListener('change', () => { reviewFeedback.textContent = ''; }));
  document.querySelector('#review-evidence').addEventListener('click', () => {
    const choice = document.querySelector('#evidence-c'); const quote = document.querySelector('#evidence-quote'); const explanation = document.querySelector('#evidence-explanation');
    const missing = [revision, choice, quote, explanation].find(field => !field.value.trim());
    if (missing) { evidenceFeedback.textContent = 'Add a draft, choose a C, copy a phrase from that draft, and explain how it helps the receiver.'; evidenceFeedback.className = 'feedback try'; missing.focus(); return; }
    const normalize = text => text.trim().replace(/\s+/g, ' ').toLowerCase();
    if (!normalize(revision.value).includes(normalize(quote.value))) { evidenceFeedback.textContent = 'The quoted words do not match your current draft. Copy an exact phrase from the draft, or revise your draft before reviewing again.'; evidenceFeedback.className = 'feedback try'; quote.focus(); return; }
    evidenceFeedback.textContent = 'Your selected C, draft phrase, and explanation are present. Now judge whether the phrase really demonstrates that C and helps the receiver. This practice check does not grade your reasoning.';
    evidenceFeedback.className = 'feedback';
  });
  document.querySelector('#show-exemplar').addEventListener('click', () => {
    if (!currentCareer) { exemplarFeedback.textContent = 'Choose a career field to receive the facts for this task.'; applicationCareer.focus(); return; }
    if (!revision.value.trim()) { exemplarFeedback.textContent = 'Try a draft using your work-order facts before comparing a possible response.'; revision.focus(); return; }
    exemplar.hidden = false;
    exemplarFeedback.textContent = 'Compare the facts and communication choices. Your own wording can meet the same criteria; revise your editor if you find a useful improvement.';
  });
  document.querySelector('#prepare-message').addEventListener('click', () => {
    if (!currentCareer) { reviewFeedback.textContent = 'Choose a career field and use its work-order facts before preparing your message for the quiz. Your existing writing is kept.'; applicationCareer.focus(); return; }
    if (!revision.value.trim()) { reviewFeedback.textContent = 'Write your message before moving it to assessment preparation.'; revision.focus(); return; }
    show(4, true);
  });
  document.querySelector('#copy-message').addEventListener('click', async () => {
    if (!currentCareer) { show(3, true); reviewFeedback.textContent = 'Choose a career field and review its work-order facts before copying a quiz response. Your existing writing is kept.'; applicationCareer.focus(); return; }
    if (!finalMessage.value.trim()) { copyFeedback.textContent = 'Write your final message before copying it.'; finalMessage.focus(); return; }
    let copyTimeout;
    try {
      await Promise.race([navigator.clipboard.writeText(finalMessage.value), new Promise((_, reject) => { copyTimeout = setTimeout(() => reject(new Error('Copy timed out')), 2500); })]);
      copyFeedback.textContent = 'Message copied. Paste it into the final-message question in the course quiz, then submit the quiz there.';
    } catch { finalMessage.focus(); finalMessage.select(); copyFeedback.textContent = 'Automatic copying was unavailable. Your message is selected. Use your device’s Copy command, then paste it into the course quiz.'; }
    finally { clearTimeout(copyTimeout); }
  });
  document.querySelectorAll('[data-clear-message-work]').forEach(button => button.addEventListener('click', () => {
    workByCareer = Object.create(null); fields.forEach(field => { field.value = ''; }); finalMessage.value = ''; guidedRevision.value = '';
    chooseCareer('', true);
    try { localStorage.removeItem(storageKey); saveStatus('All saved Lesson 2 practice was cleared from this browser. Copies saved elsewhere and quiz responses are unchanged.'); }
    catch { saveStatus('Visible practice work is clear, but saved site data could not be removed. Clear this site’s data in browser settings before leaving a shared device.'); }
    (current === 4 ? finalMessage : applicationCareer).focus();
  }));
  show(current);
})();
