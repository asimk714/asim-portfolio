/**
 * ReviewFlow Live Experience - Interactive demo
 * Deterministic mode: loads historical AI outputs from the regression test set
 */
(function () {
  'use strict';

  var form = document.getElementById('rf-form');
  var emptyState = document.getElementById('rf-empty-state');
  var resultsContent = document.getElementById('rf-results-content');
  var evaluationPanel = document.getElementById('rf-evaluation-panel');
  var shortDisplay = document.getElementById('rf-short-display');
  var detailedDisplay = document.getElementById('rf-detailed-display');
  var shortEdit = document.getElementById('rf-short-edit');
  var detailedEdit = document.getElementById('rf-detailed-edit');
  var shortStars = document.getElementById('rf-short-stars');
  var detailedStars = document.getElementById('rf-detailed-stars');
  var sourceNote = document.getElementById('rf-source-note');
  var caseIdDisplay = document.getElementById('rf-case-id-display');
  var evalCaseRef = document.getElementById('rf-eval-case-ref');
  var transparencyContent = document.getElementById('rf-transparency-content');
  var marketingEvalText = document.getElementById('rf-eval-marketing-text');
  var generateBtn = document.getElementById('rf-generate-btn');
  var clearBtn = document.getElementById('rf-clear-btn');
  var regenerateBtn = document.querySelector('.rf-regenerate-btn');

  // Case data from regression fixtures (c01-c15)
  // These are real historical AI outputs from 2026-09-10,
  // stored in tests/regression/fixtures/saved-outputs.json
  var cases = {
    c01: {
      rating: 5,
      visitType: 'Haircut',
      stoodOut: 'The stylist actually listened to what I wanted instead of pushing their own idea.',
      tellOthers: 'Book ahead on weekends — they fill up fast. Worth the price for the quality you get.',
      staffName: 'Ananya',
      context: 'I have been coming here for 3 years.',
      short: 'Ananya gave me exactly the cut I asked for — no pitching, no upselling. Worth booking ahead on weekends.',
      detailed: 'I have been coming to this salon for 3 years, and Ananya is consistently the best stylist here. She actually listened to what I wanted instead of pushing her own idea, which is rare. The cut turned out exactly as I described it. Book ahead on weekends — they fill up fast. Worth the price for the quality you get.'
    },
    c02: {
      rating: 4,
      visitType: 'Hair Color',
      stoodOut: 'The color came out closer to what I wanted than the photos suggested. Stylist explained the process clearly.',
      tellOthers: 'If you are coming for color, bring reference photos and ask about the upkeep.',
      staffName: '',
      context: 'Second time here.',
      short: 'Color came out closer to what I wanted than the photos suggested. Stylist explained the process clearly. Bring reference photos if you are coming for color.',
      detailed: 'This was my second visit here, and the color consultation was much better than last time. The stylist explained the process clearly and the color came out closer to what I wanted than the photos suggested. If you are coming for color, bring reference photos and ask about the upkeep — it helped me plan.'
    },
    c03: {
      rating: 4,
      visitType: 'Keratin / Smoothing',
      stoodOut: 'Felt noticeably smoother after the treatment. The salon was calm and not rushed.',
      tellOthers: 'Good for frizz control. Results last a few weeks — not permanent.',
      staffName: '',
      context: 'First time trying keratin.',
      short: 'Felt noticeably smoother after the keratin treatment. Salon was calm and not rushed. Good for frizz control — results last a few weeks.',
      detailed: 'This was my first time trying keratin, and I was pleasantly surprised. My hair felt noticeably smoother after the treatment, and the salon environment was calm and not rushed, which made the experience much better. Good option for frizz control — just keep in mind the results last a few weeks, not permanent.'
    },
    c04: {
      rating: 3,
      visitType: 'Haircut',
      stoodOut: 'The cut was fine overall but the stylist was rushed and did not explain much.',
      tellOthers: 'Not bad, but not exceptional. Mid-range pricing for a decent cut.',
      staffName: '',
      context: 'Walked in without an appointment.',
      short: 'The cut was fine overall but the stylist was rushed and did not explain much. Not bad, not exceptional — mid-range pricing for a decent cut.',
      detailed: 'I walked in without an appointment and got a cut that was fine overall, but the experience was underwhelming. The stylist seemed rushed and did not explain much about what they were doing or what would work for my hair type. Not bad, not exceptional — mid-range pricing for a decent cut, but I would not prioritize this over other options nearby.'
    },
    c05: {
      rating: 2,
      visitType: 'Hair Color',
      stoodOut: 'The color did not match what I asked for. Faded quickly.',
      tellOthers: 'Be very specific with color requests here. I would consider other options for color work.',
      staffName: '',
      context: 'Third visit, first time for color.',
      short: 'Color did not match what I asked for and faded quickly. Be very specific with color requests here — I would consider other options for color work.',
      detailed: 'This was my third visit here but first time trying color, and I was disappointed. The color did not match what I asked for — it came out noticeably different from the reference photo I brought. It also faded faster than I expected. Be very specific with color requests here and manage expectations. I would consider other options for color work.'
    },
    c06: {
      rating: 1,
      visitType: 'Haircut',
      stoodOut: 'Bad cut, did not listen, charged extra without telling me upfront.',
      tellOthers: 'Do not recommend. Found a better salon nearby the same week.',
      staffName: '',
      context: 'One-time visit, will not return.',
      short: 'Bad cut, did not listen to what I wanted, and charged extra without telling me upfront. Do not recommend — found a better salon nearby the same week.',
      detailed: 'This was a one-time visit and I will not be returning. The stylist gave me a bad cut, did not listen to what I wanted, and charged extra without telling me upfront — I found out at the register. Do not recommend this place. I found a better salon nearby the same week and have not looked back.'
    },
    c07: {
      rating: 4,
      visitType: 'Styling / Makeover',
      stoodOut: 'The stylist was creative but still followed my direction. Felt like collaboration, not a takeover.',
      tellOthers: 'If you want a makeover but want a say in it, this is a good place.',
      staffName: 'Meera',
      context: 'Special occasion — wedding guest.',
      short: 'Meera was creative but still followed my direction — felt like collaboration, not a takeover. Good if you want a makeover but want a say in it.',
      detailed: 'I went here for a special occasion — wedding guest styling — and Meera did a really good job. She was creative but still followed my direction, which made it feel like a collaboration rather than a takeover. The final look was polished and appropriate for the event. If you want a makeover but want a say in it, this is a good place to go.'
    },
    c08: {
      rating: 5,
      visitType: 'Facial / Cleanup',
      stoodOut: 'Very relaxing, no pressure to buy products afterward.',
      tellOthers: 'Great for a quiet reset. Clean, calm, no hard sell.',
      staffName: '',
      context: 'Huge work stress week — needed a reset.',
      short: 'Very relaxing facial with no pressure to buy products afterward. Clean, calm, no hard sell. Great for a quiet reset during a stressful week.',
      detailed: 'I came in during a huge work stress week and just needed a reset. The facial was very relaxing, the environment was clean and calm, and there was no pressure to buy products afterward — which honestly surprised me and made the experience better. Great option if you want a quiet reset without the hard sell.'
    },
    c09: {
      rating: 3,
      visitType: 'Manicure / Pedicure',
      stoodOut: 'Neat result, but the space was a bit cramped and noisy.',
      tellOthers: 'Decent manicure, but the atmosphere is not the best. Go when it is quiet if you can.',
      staffName: '',
      context: 'Regular monthly visit.',
      short: 'Neat manicure result, but the space was a bit cramped and noisy. Decent, but the atmosphere is not the best — go when it is quiet if you can.',
      detailed: 'This is a regular monthly visit for me, and the manicure itself is always neat. However, the space is a bit cramped and can get noisy, which makes it less relaxing than it could be. Decent result for the price, but the atmosphere is not the best. Go when it is quiet if you can.'
    },
    c10: {
      rating: 5,
      visitType: 'Makeup',
      stoodOut: 'Makeup looked natural and lasted all day. Artist understood the event and what I wanted.',
      tellOthers: 'Great for events where you want to look polished but not overdone.',
      staffName: 'Deepa',
      context: 'Conference presentation day.',
      short: 'Deepa did natural-looking makeup that lasted all day — understood the event and what I wanted. Great for events where you want to look polished but not overdone.',
      detailed: 'I went here for a conference presentation day and Deepa did an excellent job. The makeup looked natural and lasted all day, which was important since I was on stage for hours. She understood the event and what I wanted — polished but not overdone. Great option if you have an event where you want to look put together without looking like you are wearing a lot of makeup.'
    },
    c11: {
      rating: 2,
      visitType: 'Hair Color',
      stoodOut: 'Color was uneven and the salon was disorganized — had to wait much longer than quoted.',
      tellOthers: 'Not reliable for color work. Wait times are not accurate.',
      staffName: '',
      context: 'One visit, dissatisfied.',
      short: 'Color came out uneven and the salon was disorganized — I ended up waiting much longer than quoted. Not reliable for color work, and wait times are not accurate here.',
      detailed: 'I had one visit here for color and was dissatisfied. The color came out uneven — noticeably so under indoor light — and the salon was disorganized. I ended up waiting much longer than the time they quoted when I booked. Not reliable for color work, and the wait times they give are not accurate. I would look elsewhere.'
    },
    c12: {
      rating: 2,
      visitType: 'Keratin / Smoothing',
      stoodOut: 'Result was underwhelming — hair still frizzy after a few days. Felt overpriced for what it did.',
      tellOthers: 'Manage expectations. This did not work well for my hair type.',
      staffName: '',
      context: 'Was hoping for a big change, did not get it.',
      short: 'The keratin treatment was underwhelming — hair was still frizzy after a few days. Felt overpriced for what it actually did. Manage expectations and be aware it may not work for your hair type.',
      detailed: 'I was hoping for a big change with the keratin treatment, but the result was underwhelming. My hair was still frizzy after a few days, which was disappointing given the cost. It felt overpriced for what it actually did. If you are considering this, manage your expectations — it may not work well for your hair type, and the price does not always match the result.'
    },
    c13: {
      rating: 1,
      visitType: 'Manicure / Pedicure',
      stoodOut: 'Cuticles were handled roughly and one nail bled slightly. Unpleasant experience overall.',
      tellOthers: 'Not comfortable recommending this for nail work. Found a gentler place nearby.',
      staffName: '',
      context: 'One visit, will not return.',
      short: 'Cuticles were handled roughly and one nail bled slightly — unpleasant experience overall. Not comfortable recommending this for nail work. Found a gentler place nearby.',
      detailed: 'I had one visit here for a manicure and it was an unpleasant experience. The cuticles were handled roughly and one nail bled slightly, which was uncomfortable and unnecessary. I left feeling more stressed than when I arrived. Not comfortable recommending this for nail work — I found a gentler place nearby and switched.'
    },
    c14: {
      rating: 3,
      visitType: 'Haircut',
      stoodOut: 'Decent cut but the consultation was minimal. Got what I asked for, just nothing memorable.',
      tellOthers: 'Fine for a straightforward cut. Not a place I would go for a complex style change.',
      staffName: '',
      context: 'Maintenance cut, expected nothing fancy.',
      short: 'Decent maintenance cut — got what I asked for, but the consultation was minimal and nothing memorable. Fine for a straightforward cut, not for a complex style change.',
      detailed: 'I went in for a maintenance cut and got exactly what I asked for — nothing more, nothing less. The cut was decent, but the consultation was minimal and the experience was forgettable. Fine for a straightforward cut like this, but not a place I would go for a complex style change where I would want more guidance.'
    },
    c15: {
      rating: 4,
      visitType: 'Hair Color',
      stoodOut: 'Good color result and the stylist was patient with my questions. Slight fade after two weeks but expected.',
      tellOthers: 'Good color work. Ask about fade expectations upfront so you know what to expect.',
      staffName: 'Kavya',
      context: 'Second color visit, more confident this time.',
      short: 'Kavya gave a good color result and was patient with my questions. Slight fade after two weeks but expected. Good color work — ask about fade expectations upfront.',
      detailed: 'My second color visit here and I was more confident this time. Kavya gave a good color result and was patient with all my questions, which made the consultation much better. There was a slight fade after two weeks, but that was expected and discussed upfront. Good color work — just ask about fade expectations upfront so you know what to expect going in.'
    }
  };

  var selectedRating = null;
  var selectedCaseId = null;

  function setRating(rating) {
    selectedRating = rating;
    var buttons = document.querySelectorAll('.rf-star-btn');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var btnRating = parseInt(btn.getAttribute('data-rating'), 10);
      if (btnRating <= rating) {
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('rf-star-btn--selected');
        btn.style.background = 'var(--accent)';
        btn.style.borderColor = 'var(--accent)';
        btn.style.color = 'var(--text-inverse)';
      } else {
        btn.removeAttribute('aria-pressed');
        btn.classList.remove('rf-star-btn--selected');
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }
    }
    var hint = document.querySelector('.rf-rating-hint');
    if (hint) {
      hint.textContent = rating + ' star' + (rating === 1 ? '' : 's') + ' selected';
    }
  }

  // Init: first star selected by default
  setRating(1);

  // Star button handlers
  var starButtons = document.querySelectorAll('.rf-star-btn');
  for (var i = 0; i < starButtons.length; i++) {
    starButtons[i].addEventListener('click', function () {
      var rating = parseInt(this.getAttribute('data-rating'), 10);
      setRating(rating);
    });
  }

  // Load a test case
  function loadCase(caseId) {
    var c = cases[caseId];
    if (!c) return;

    selectedCaseId = caseId;
    var visitTypeSelect = document.getElementById('rf-visit-type');
    var stoodOutArea = document.getElementById('rf-stood-out');
    var tellOthersArea = document.getElementById('rf-tell-others');
    var staffNameInput = document.getElementById('rf-staff-name');
    var contextArea = document.getElementById('rf-context');

    if (visitTypeSelect) visitTypeSelect.value = c.visitType;
    if (stoodOutArea) stoodOutArea.value = c.stoodOut;
    if (tellOthersArea) tellOthersArea.value = c.tellOthers;
    if (staffNameInput) staffNameInput.value = c.staffName || '';
    if (contextArea) contextArea.value = c.context || '';

    setRating(c.rating);
    generateDraft(c, true);
  }

  // Load case buttons
  var loadCaseButtons = document.querySelectorAll('.rf-load-case-btn');
  for (var i = 0; i < loadCaseButtons.length; i++) {
    loadCaseButtons[i].addEventListener('click', function () {
      var caseId = this.getAttribute('data-case-id');
      loadCase(caseId);
    });
  }

  // Generate draft
  function generateDraft(data, isHistorical) {
    if (!data) {
      var formData = getFormData();
      if (!formData || !formData.rating) {
        generateBtn.textContent = 'Please select a rating';
        setTimeout(function () { generateBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0;"><path d="M12 3v12m0 0-4-4m4 4 4-4"/><path d="M4 11h16"/></svg> Draft My Review'; }, 2000);
        return;
      }
      data = formData;
    }

    var shortDraft = data.short;
    var detailedDraft = data.detailed;
    var rating = data.rating;

    shortDisplay.textContent = shortDraft;
    detailedDisplay.textContent = detailedDraft;
    shortEdit.value = shortDraft;
    detailedEdit.value = detailedDraft;

    var starsHtml = '';
    for (var s = 0; s < 5; s++) {
      starsHtml += (s < rating) ? '★' : '☆';
    }
    shortStars.innerHTML = starsHtml;
    detailedStars.innerHTML = starsHtml;

    emptyState.style.display = 'none';
    resultsContent.style.display = 'flex';

    if (isHistorical && selectedCaseId) {
      sourceNote.style.display = 'block';
      caseIdDisplay.textContent = selectedCaseId;
      evalCaseRef.textContent = selectedCaseId;
      transparencyContent.textContent = 'Rating: ' + rating + ' star' + (rating === 1 ? '' : 's') + '. Visit type: ' + (data.visitType || 'not specified') +
        '. Stood out: ' + (data.stoodOut || 'not specified') +
        '. Tell others: ' + (data.tellOthers || 'not specified') +
        (data.staffName ? '. Staff: ' + data.staffName : '') +
        (data.context ? '. Context: ' + data.context : '') +
        '. This draft is a real AI output from regression case ' + selectedCaseId + ', generated on 2026-09-10.';
    } else {
      sourceNote.style.display = 'block';
      caseIdDisplay.textContent = 'custom';
      evalCaseRef.textContent = 'custom input';
      transparencyContent.textContent = 'Draft generated from your current form inputs. No historical case matched — this is a live composition, not a regression test output.';
    }

    showEvaluation(rating, isHistorical, selectedCaseId);
  }

  function getFormData() {
    var rating = selectedRating;
    var visitType = document.getElementById('rf-visit-type').value;
    var stoodOut = document.getElementById('rf-stood-out').value.trim();
    var tellOthers = document.getElementById('rf-tell-others').value.trim();
    var staffName = document.getElementById('rf-staff-name').value.trim();
    var context = document.getElementById('rf-context').value.trim();

    if (!stoodOut || !tellOthers) {
      return null;
    }

    return {
      rating: rating,
      visitType: visitType,
      stoodOut: stoodOut,
      tellOthers: tellOthers,
      staffName: staffName,
      context: context,
      short: buildShortDraft(rating, stoodOut, tellOthers, staffName, context),
      detailed: buildDetailedDraft(rating, stoodOut, tellOthers, staffName, context, visitType)
    };
  }

  function buildShortDraft(rating, stoodOut, tellOthers, staffName, context) {
    var prefix = staffName ? staffName + ' ' : '';
    var ratingPhrase = getRatingPhrase(rating);
    if (staffName && rating >= 4) {
      return ratingPhrase.short + ' ' + prefix + 'gave me ' + stoodOut.toLowerCase() + '. ' + tellOthers;
    }
    return ratingPhrase.short + ' ' + stoodOut + '. ' + tellOthers;
  }

  function buildDetailedDraft(rating, stoodOut, tellOthers, staffName, context, visitType) {
    var ratingPhrase = getRatingPhrase(rating);
    var staffRef = staffName ? ' ' + staffName + ' ' : ' The ';
    var ctxRef = context ? ' ' + context : '';
    return ratingPhrase.detailed + staffRef + stoodOut.toLowerCase() + '. ' + tellOthers + (visitType ? ' (Service: ' + visitType + ')' : '') + ctxRef;
  }

  function getRatingPhrase(rating) {
    switch (rating) {
      case 1: return { short: 'Disappointing experience.', detailed: 'I was disappointed with this visit.' };
      case 2: return { short: 'Not great.', detailed: 'This was not a great experience.' };
      case 3: return { short: 'An okay experience.', detailed: 'This was an okay experience overall.' };
      case 4: return { short: 'Pretty good.', detailed: 'I had a pretty good experience here.' };
      case 5: return { short: 'Really happy with this.', detailed: 'I was really happy with this visit.' };
      default: return { short: 'Mixed feelings.', detailed: 'My feelings about this visit are mixed.' };
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    generateDraft(null, false);
  });

  clearBtn.addEventListener('click', function () {
    form.reset();
    selectedRating = null;
    selectedCaseId = null;
    var buttons = document.querySelectorAll('.rf-star-btn');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].removeAttribute('aria-pressed');
      buttons[i].classList.remove('rf-star-btn--selected');
      buttons[i].style.background = '';
      buttons[i].style.borderColor = '';
      buttons[i].style.color = '';
    }
    var hint = document.querySelector('.rf-rating-hint');
    if (hint) hint.textContent = 'Select your rating';
    emptyState.style.display = 'flex';
    resultsContent.style.display = 'none';
    evaluationPanel.style.display = 'none';
    sourceNote.style.display = 'none';
  });

  regenerateBtn.addEventListener('click', function () {
    generateDraft(null, false);
  });

  var copyButtons = document.querySelectorAll('.rf-copy-btn');
  for (var i = 0; i < copyButtons.length; i++) {
    copyButtons[i].addEventListener('click', function () {
      var variant = this.getAttribute('data-variant');
      var text = variant === 'short' ? shortDisplay.textContent : detailedDisplay.textContent;
      copyToClipboard(text, this);
    });
  }

  var copyGoogleButtons = document.querySelectorAll('.rf-copy-google-btn');
  for (var i = 0; i < copyGoogleButtons.length; i++) {
    copyGoogleButtons[i].addEventListener('click', function () {
      var variant = this.getAttribute('data-variant');
      var text = variant === 'short' ? shortDisplay.textContent : detailedDisplay.textContent;
      copyToClipboard(text, this);
      setTimeout(function () {
        window.open('https://www.google.com/search?q=write+a+google+review', '_blank');
      }, 600);
    });
  }

  function copyToClipboard(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { flashCopied(btn); }).catch(function () { fallbackCopy(text, btn); });
    } else {
      fallbackCopy(text, btn);
    }
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); flashCopied(btn); } catch (e) {}
    document.body.removeChild(ta);
  }

  function flashCopied(btn) {
    var orig = btn.innerHTML;
    btn.classList.add('copied');
    var label = btn.querySelector('.rf-copy-label');
    if (label) label.textContent = 'Copied';
    setTimeout(function () {
      btn.classList.remove('copied');
      if (label) label.textContent = 'Copy';
    }, 1800);
  }

  var toggleEditButtons = document.querySelectorAll('.rf-toggle-edit-btn');
  for (var i = 0; i < toggleEditButtons.length; i++) {
    toggleEditButtons[i].addEventListener('click', function () {
      var variant = this.getAttribute('data-variant');
      var display = variant === 'short' ? shortDisplay : detailedDisplay;
      var edit = variant === 'short' ? shortEdit : detailedEdit;
      if (display.style.display === 'none') {
        display.style.display = 'block';
        edit.style.display = 'none';
        this.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5 13.5 7.5 12 9l-2 2 2 2 1.5 1.5 2-2L13.5 11 18.5 6 18.5 2.5 11 10.5 12 11l-2-2-2 2 6-6 2 2-6 6-2-2 2-2-1.5-1.5 2-2 5-5 2 2z"/></svg> Edit';
      } else {
        display.style.display = 'none';
        edit.style.display = 'block';
        edit.focus();
        this.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0;"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg> Done';
      }
    });
  }

  var variantButtons = document.querySelectorAll('.rf-variant-btn');
  for (var i = 0; i < variantButtons.length; i++) {
    variantButtons[i].addEventListener('click', function () {
      var variant = this.getAttribute('data-variant');
      variantButtons.forEach(function (b) { b.classList.remove('rf-variant-btn--active'); });
      this.classList.add('rf-variant-btn--active');
      var shortCard = document.querySelector('.rf-review-card');
      if (shortCard) { shortCard.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  }

  function showEvaluation(rating, isHistorical, caseId) {
    evaluationPanel.style.display = 'block';
    if (isHistorical && caseId) {
      marketingEvalText.innerHTML = 'Historical outputs show marketing/superlative language appears in some drafts — this is what the corrected evaluator measures. The current output is from case <strong>' + caseId + '</strong>. See the <a href="https://github.com/asimk714/salon-review-bot/blob/main/tests/regression/ai-quality-report.md" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: none;">AI Output Quality Measurement Report</a> for per-case results.';
    } else {
      marketingEvalText.innerHTML = 'For custom inputs, marketing/superlative tone is not pre-evaluated — the draft is composed from your inputs in real time. The product\'s evaluator would run this against the same 247 deterministic checks used in the regression set.';
    }
  }

  emptyState.style.display = 'flex';
  resultsContent.style.display = 'none';
  evaluationPanel.style.display = 'none';
})();
