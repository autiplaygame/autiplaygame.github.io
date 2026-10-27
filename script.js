const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menu' : 'Abrir menu');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/*
 * Cuando los instaladores finales esten listos:
 * 1. Copia el .exe a downloads/AutiPlay-Windows.exe
 * 2. Copia el .apk a downloads/AutiPlay-Android.apk
 * 3. Cambia el valor correspondiente a true en DOWNLOADS_READY.
 */
const DOWNLOADS_READY = {
  windows: true,
  android: true
};

const downloadDetails = {
  windows: {
    href: 'downloads/AutiPlay-Windows.exe',
    label: 'Descargar para Windows',
    status: 'Instalador listo para descargar.'
  },
  android: {
    href: 'downloads/AutiPlay-Android.apk',
    label: 'Descargar para Android',
    status: 'Instalador listo para descargar.'
  }
};

Object.entries(downloadDetails).forEach(([platform, detail]) => {
  const link = document.querySelector(`[data-download="${platform}"]`);
  const status = document.getElementById(`${platform}Status`);
  if (!link) return;

  if (DOWNLOADS_READY[platform]) {
    link.href = detail.href;
    link.textContent = detail.label;
    link.classList.remove('is-disabled');
    link.removeAttribute('aria-disabled');
    link.removeAttribute('tabindex');
    if (status) status.textContent = detail.status;
  } else {
    link.href = '#descargas';
    link.textContent = 'Instalador en preparación';
    link.classList.add('is-disabled');
    link.setAttribute('aria-disabled', 'true');
    link.setAttribute('tabindex', '-1');
  }
});
