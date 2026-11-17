/* Modo claro / oscuro. Se carga en el <head> para aplicar el tema antes de pintar la página. */
(function () {
  var CLAVE = 'tema';
  var raiz = document.documentElement;
  var guardado = null;
  try { guardado = localStorage.getItem(CLAVE); } catch (e) {}
  var sistemaOscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  aplicar(guardado === 'dark' || guardado === 'light' ? guardado : (sistemaOscuro ? 'dark' : 'light'));

  function aplicar(tema) {
    raiz.setAttribute('data-theme', tema);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', tema === 'dark' ? '#141613' : '#f5f4ef');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var boton = document.querySelector('.tema-btn');
    if (!boton) return;
    function sincronizar() {
      var oscuro = raiz.getAttribute('data-theme') === 'dark';
      boton.setAttribute('aria-pressed', oscuro ? 'true' : 'false');
      boton.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      boton.title = oscuro ? 'Modo claro' : 'Modo oscuro';
    }
    aplicar(raiz.getAttribute('data-theme'));
    sincronizar();
    boton.addEventListener('click', function () {
      var nuevo = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      aplicar(nuevo);
      try { localStorage.setItem(CLAVE, nuevo); } catch (e) {}
      sincronizar();
    });
  });
})();
