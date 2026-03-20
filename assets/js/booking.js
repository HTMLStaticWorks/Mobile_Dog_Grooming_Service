document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.wizard-step');
  const nextBtns = document.querySelectorAll('.next-btn');
  const prevBtns = document.querySelectorAll('.prev-btn');
  const form = document.getElementById('booking-form');
  const progressFill = document.getElementById('progress-fill');
  
  // Set minimum date for booking input to today
  const dateInput = document.getElementById('booking-date');
  if(dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Handle CSS for time slot radios
  const timeRadios = document.querySelectorAll('input[name="time"]');
  timeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.time-slot').forEach(slot => {
        slot.style.borderColor = 'var(--border-color)';
        slot.style.backgroundColor = 'transparent';
        slot.style.color = 'var(--text-main)';
      });
      if(e.target.checked) {
        const parent = e.target.nextElementSibling;
        parent.style.borderColor = 'var(--primary)';
        parent.style.backgroundColor = 'var(--primary-light)';
        parent.style.color = 'var(--primary)';
      }
    });
  });

  // Navigation Logic
  function showStep(stepIndex) {
    steps.forEach(step => step.classList.remove('active'));
    document.getElementById(`step-${stepIndex}`).classList.add('active');
    
    // Update progress bar
    if(stepIndex <= 3) {
      const percentage = ((stepIndex - 1) / 2) * 100;
      progressFill.style.width = `${percentage}%`;
      
      // Update indicators
      for(let i = 1; i <= 3; i++) {
        const indicator = document.getElementById(`step${i}-indicator`);
        if(i < stepIndex) {
          indicator.classList.add('completed');
          indicator.classList.remove('active');
          indicator.innerHTML = '<i class="fas fa-check"></i>';
        } else if(i === parseInt(stepIndex)) {
          indicator.classList.add('active');
          indicator.classList.remove('completed');
          indicator.innerHTML = i;
        } else {
          indicator.classList.remove('active', 'completed');
          indicator.innerHTML = i;
        }
      }
    }
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nextId = btn.getAttribute('data-next');
      // Simple validation mock
      const currentStep = btn.closest('.wizard-step');
      const inputs = currentStep.querySelectorAll('input[required], select[required]');
      let valid = true;
      inputs.forEach(input => {
        if(!input.value) valid = false;
      });
      
      if(nextId === '3') {
        // Check if time is selected
        const timeSelected = document.querySelector('input[name="time"]:checked');
        if(!timeSelected) valid = false;
      }
      
      if(valid) {
        showStep(nextId);
      } else {
        alert('Please fill out all required fields.');
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prevId = btn.getAttribute('data-prev');
      showStep(prevId);
    });
  });

  // Form Submit
  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Hide progress bar and show success step
      document.querySelector('.progress-bar').style.display = 'none';
      steps.forEach(step => step.classList.remove('active'));
      document.getElementById('step-success').classList.add('active');
    });
  }
});
