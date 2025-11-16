// handle left nav switching
document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // active button
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // show section
      const id = btn.dataset.section;
      sections.forEach(s => s.classList.toggle('active', s.id === id));
      // scroll top of main for better UX
      document.querySelector('.main').scrollTop = 0;
    });
  });

  // Certificates: click to open full image
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.dataset.src;
      const title = card.querySelector('.cert-title')?.innerText || '';
      if (!src) return;
      openImgModal(src, title);
    });
  });

  // allow escape to close image modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeImgModal();
  });
});

function openImgModal(src, title){
  const modal = document.getElementById('imgModal');
  const img = document.getElementById('imgModalImg');
  const cap = document.getElementById('imgModalTitle');
  img.src = src;
  cap.textContent = title;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  // close on backdrop click
  modal.addEventListener('click', function onBackdrop(e){
    if (e.target === modal) {
      closeImgModal();
      modal.removeEventListener('click', onBackdrop);
    }
  });
}

function closeImgModal(){
  const modal = document.getElementById('imgModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  const img = document.getElementById('imgModalImg');
  img.src = '';
}

// Demo contact form function
function sendMessage(){
  const name = document.getElementById('nameIn').value.trim();
  const email = document.getElementById('emailIn').value.trim();
  const msg = document.getElementById('msgIn').value.trim();
  const status = document.getElementById('formStatus');
  if (!name || !email || !msg) {
    status.textContent = 'Please fill name, email and message.';
    return;
  }
  status.textContent = 'Demo: message copied to clipboard (no backend).';
  const payload = `From: ${name} <${email}>\n\n${msg}`;
  try { navigator.clipboard.writeText(payload); status.textContent += ' (copied)'; }
  catch(e){ /* ignore */ }
}

