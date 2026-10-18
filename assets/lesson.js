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

  function show(n) {
    current = n;
    steps.forEach((step, index) => step.classList.toggle('active', index === n));
    makeupNotice?.classList.toggle('active', n === 0);
    progress.value = n + 1;
    label.textContent = `Step 2.${n + 1} · ${n + 1} of ${steps.length}`;
    history.replaceState(null, '', `?step=${n + 1}`);
    document.querySelector('#previous-step').disabled = n === 0;
    document.querySelector('#next-step').textContent = n === steps.length - 1 ? 'Finish lesson ✓' : 'Next step →';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelector('#previous-step').addEventListener('click', () => show(current - 1));
  document.querySelector('#next-step').addEventListener('click', () => { if (current < steps.length - 1) show(current + 1); });
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
    feedback.textContent = good ? `Correct. ${picked.dataset.feedback}` : 'Try again. Look for the choice that helps the receiver understand and act.';
    feedback.className = `feedback ${good ? 'good' : 'try'}`;
  }));

  const scenarios = {
    agriscience: { task: 'The animal care area needs attention before afternoon visitors arrive.', vague: 'Can someone check the animals later?', exemplar: 'Hi Morgan, please check the animal care area before 1:30 p.m. Refill the water containers and report any concerns before the afternoon visitors arrive. Please reply when it is complete. Thank you.' },
    automotive: { task: 'A customer vehicle needs a safety inspection before the 3:00 p.m. pickup.', vague: 'Can someone handle that car soon?', exemplar: 'Hi Jordan, please complete the safety inspection on the blue sedan before the 3:00 p.m. pickup. Check the tires, brakes, and exterior lights, then let me know when it is ready. Thank you.' },
    aviation: { task: 'A training aircraft needs a preflight inspection before the next flight block.', vague: 'Can somebody get the plane ready?', exemplar: 'Hi Taylor, please complete the preflight inspection for the training aircraft before the 1:00 p.m. flight block. Check the fuel level, control surfaces, and required documents. Reply when the aircraft is ready. Thank you.' },
    computer: { task: 'The school website has a broken registration link before an evening event.', vague: 'Can someone deal with the website problem?', exemplar: 'Hi Alex, please repair the registration link on the school website before 4:00 p.m. Test the link on both a phone and computer, then reply when visitors can register successfully. Thank you.' },
    construction: { task: 'A work area needs to be prepared before the afternoon crew arrives.', vague: 'Can someone fix that area?', exemplar: 'Hi Casey, please prepare the south work area before the 1:00 p.m. crew arrival. Remove loose materials, place the safety barriers, and check that the pathway is clear. Let me know when it is ready. Thank you.' },
    cosmetology: { task: 'A client station must be prepared before the next appointment.', vague: 'Can someone help with the client?', exemplar: 'Hi Riley, please prepare Station 4 before the 2:30 p.m. client appointment. Sanitize the tools, restock towels, and set out the color supplies listed on the service card. Reply when the station is ready. Thank you.' },
    culinary: { task: 'A catering order needs final preparation before pickup.', vague: 'Can someone deal with the food order?', exemplar: 'Hi Sam, please finish the catering order before the 11:45 a.m. pickup. Pack the sandwiches, label the allergy-safe meals, and include napkins and utensils. Let me know when the order is ready. Thank you.' },
    education: { task: 'A student needs make-up materials before the next class period.', vague: 'Can someone take care of that student issue?', exemplar: 'Hi Chris, please prepare the make-up materials for Jordan before third period. Print the assignment, include the directions, and place it in the student folder. Reply when the materials are ready. Thank you.' },
    health: { task: 'The exam-room supply shelf is low before afternoon appointments.', vague: 'Can someone take care of the supply shelf sometime today?', exemplar: 'Hi Jordan, please check the exam-room supply shelf before 2:00 p.m. Refill gloves, gauze pads, and disinfecting wipes from Storage Room B. Reply when it is ready for the afternoon appointments. Thank you.' },
    hvac: { task: 'An HVAC unit needs a routine check before the afternoon class session.', vague: 'Can someone deal with the air unit later?', exemplar: 'Hi Devon, please inspect the HVAC unit serving Classroom 214 before the 1:00 p.m. class. Check the filter and thermostat settings, then report any concerns to the supervisor. Reply when the inspection is complete. Thank you.' },
    marketing: { task: 'A social media post needs review before it is published.', vague: 'Can someone work on that post?', exemplar: 'Hi Avery, please review the event post before it is published at 3:00 p.m. Check the event date, location, image credit, and registration link. Reply when the post is ready to publish. Thank you.' },
    mechatronics: { task: 'A training cell needs to be reset before the next class.', vague: 'Can someone get the machine ready?', exemplar: 'Hi Cameron, please reset the training cell before the 12:30 p.m. class. Return the components to their labeled bins, inspect the safety guard, and run the startup check. Let me know when it is ready. Thank you.' },
    safety: { task: 'A safety kit needs inspection before a community event.', vague: 'Can someone check the safety kit?', exemplar: 'Hi Devon, please inspect the first-aid kit before the 4:00 p.m. community event. Replace used supplies, check the expiration dates, and report any missing items. Reply when the kit is ready. Thank you.' },
    jrotc: { task: 'A uniform display needs preparation before an open house.', vague: 'Can someone get the display ready?', exemplar: 'Hi Lee, please prepare the uniform display before the 5:00 p.m. open house. Arrange the uniforms by size, add the name cards, and check that the display area is clean. Let me know when it is ready. Thank you.' },
    welding: { task: 'A welding booth needs setup before the next lab group.', vague: 'Can someone set up the booth?', exemplar: 'Hi Parker, please set up Welding Booth 3 before the 1:15 p.m. lab group. Inspect the cables, replace the welding wire, and clear the work surface. Reply when the booth is ready. Thank you.' },
    forensics: { task: 'An evidence kit needs preparation before a lab activity.', vague: 'Can someone get the evidence kit ready?', exemplar: 'Hi Quinn, please prepare the evidence kit before the 10:30 a.m. lab activity. Include gloves, evidence bags, labels, and the chain-of-custody forms. Let me know when the kit is ready. Thank you.' },
    other: { task: 'Choose a familiar workplace task that needs to be completed before a deadline.', vague: 'Can someone handle this later?', exemplar: 'Hi [Name], please complete [specific task] before [time]. Use [needed materials or location], then reply when the task is complete. Thank you.' }
  };
  const careerField = document.querySelector('#career-field');
  const careerScenario = document.querySelector('#career-scenario');
  const careerBefore = document.querySelector('#career-before');
  const careerAfter = document.querySelector('#career-after');
  const careerImprovement = document.querySelector('#career-improvement');
  const careerExemplar = document.querySelector('#career-exemplar');
  const careerFieldName = document.querySelector('#career-field-name');
  const audiencePlan = document.querySelector('#audience-plan');
  const taskPlan = document.querySelector('#task-plan');
  const revision = document.querySelector('#revision');
  careerField?.addEventListener('change', () => {
    const scenario = scenarios[careerField.value];
    if (!scenario) return;
    careerScenario.innerHTML = `<strong>Workplace task:</strong> ${scenario.task}<br><br><strong>Original message:</strong> ${scenario.vague}`;
    careerBefore.textContent = scenario.vague;
    careerAfter.textContent = scenario.exemplar;
    careerImprovement.textContent = 'The After message is clearer because it names the task. It is concrete and complete because it includes specific actions and a deadline. Its respectful tone is courteous.';
    careerExemplar.innerHTML = `<strong>Exemplar:</strong> ${scenario.exemplar}`;
    careerFieldName.textContent = careerField.options[careerField.selectedIndex].text;
    audiencePlan.placeholder = 'Name the appropriate person or role who should receive this message.';
    taskPlan.placeholder = 'State the exact task the person needs to complete.';
    revision.placeholder = 'Write a clear, complete, and courteous message for this workplace task. Include details, a deadline, and a request for confirmation.';
  });
  document.querySelectorAll('[data-cs-check]').forEach(box => box.querySelector('button').addEventListener('click', () => {
    const picked = [...box.querySelectorAll('input:checked')];
    const feedback = box.querySelector('.feedback');
    if (picked.length !== 4) { feedback.textContent = 'Choose exactly four Cs, then check your selections.'; feedback.className = 'feedback try'; return; }
    const good = picked.every(choice => choice.dataset.correct === 'true');
    feedback.textContent = good ? 'Correct. The exemplar is clear, concrete, complete, and courteous.' : 'Try again. Look for the Cs shown by the specific task and details, deadline and reply, and respectful tone.';
    feedback.className = `feedback ${good ? 'good' : 'try'}`;
  }));
  document.querySelectorAll('[data-message-check]').forEach(box => box.querySelector('button').addEventListener('click', () => {
    const picked = box.querySelectorAll('input:checked').length;
    const feedback = box.querySelector('.feedback');
    if (picked !== 4) { feedback.textContent = 'Review your draft and complete each of the four message components before opening the exemplar.'; feedback.className = 'feedback try'; return; }
    feedback.textContent = 'Your message includes the key components. Open the exemplar and use it to make one final improvement.';
    feedback.className = 'feedback good';
  }));
  show(current);
})();
