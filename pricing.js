// Pricing page functionality
document.addEventListener('DOMContentLoaded', () => {
  // Handle billing toggle
  const billingToggle = document.getElementById('billing-toggle');
  const monthlyLabel = document.querySelector('.toggle-label:first-child');
  const annualLabel = document.querySelector('.toggle-label:last-child');
  
  if (billingToggle) {
    billingToggle.addEventListener('change', () => {
      const isAnnual = billingToggle.checked;
      
      // Update toggle labels
      monthlyLabel.classList.toggle('active', !isAnnual);
      annualLabel.classList.toggle('active', isAnnual);
      
      // Update pricing
      const pricingElements = document.querySelectorAll('.pricing-price');
      
      pricingElements.forEach(el => {
        const monthlyPrice = el.getAttribute('data-monthly');
        const annualPrice = el.getAttribute('data-annual');
        
        if (isAnnual) {
          // Display annual pricing
          const currencyEl = el.querySelector('.currency');
          const amountEl = el.querySelector('.amount');
          const periodEl = el.querySelector('.period');
          
          if (annualPrice) {
            const match = annualPrice.match(/\$(\d+(\.\d+)?)/);
            if (match && match[1]) {
              amountEl.textContent = match[1];
              periodEl.textContent = '/month per user (billed annually)';
            }
          }
        } else {
          // Display monthly pricing
          const currencyEl = el.querySelector('.currency');
          const amountEl = el.querySelector('.amount');
          const periodEl = el.querySelector('.period');
          
          if (monthlyPrice) {
            const match = monthlyPrice.match(/\$(\d+(\.\d+)?)/);
            if (match && match[1]) {
              amountEl.textContent = match[1];
              periodEl.textContent = monthlyPrice.includes('user') ? '/month per user' : '/month';
            }
          }
        }
      });
    });
  }
  
  // Initialize FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
});