const scheduleData = {
  1: { name: 'Måndag', open: '09:30', close: '19:00' },
  2: { name: 'Tisdag', open: '09:30', close: '19:00' },
  3: { name: 'Onsdag', open: '09:30', close: '19:00' },
  4: { name: 'Torsdag', open: '09:30', close: '19:00' },
  5: { name: 'Fredag', open: '09:30', close: '19:00' },
  6: { name: 'Lördag', open: '09:30', close: '16:30' },
  0: { name: 'Söndag', open: null, close: null },
};

function asMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

function updateOpenStatus() {
  const statusElement = document.querySelector('#open-status');
  if (!statusElement) return;

  const now = new Date();
  const today = now.getDay();
  const current = scheduleData[today];

  document.querySelectorAll('.schedule .row').forEach((row) => {
    const dayName = row.querySelector('span')?.textContent;
    row.classList.toggle('today', dayName === current.name);
  });

  if (!current.open || !current.close) {
    statusElement.textContent = 'Stängt idag';
    return;
  }

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const opens = asMinutes(current.open);
  const closes = asMinutes(current.close);

  if (nowMinutes >= opens && nowMinutes < closes) {
    statusElement.textContent = `Öppet nu · stänger ${current.close}`;
  } else {
    statusElement.textContent = `Stängt nu · öppnar ${current.open} (${current.name})`;
  }
}

updateOpenStatus();


function updateStickyHeader() {
  const stickyHeader = document.querySelector('.sticky-header');
  if (!stickyHeader) return;

  const shouldShow = window.scrollY > 80;
  stickyHeader.classList.toggle('visible', shouldShow);
}

window.addEventListener('scroll', updateStickyHeader, { passive: true });
updateStickyHeader();
