 // Marca activa en tabs y TOC según sección visible
 (function(){
    const sections = document.querySelectorAll('section.block[id]');
    const tocLinks = Array.from(document.querySelectorAll('.toc a'));
    const tabLinks = Array.from(document.querySelectorAll('.tabs .tab'));

    const map = {};
    sections.forEach(s => {
        map['#'+s.id] = {
            toc: tocLinks.find(a => a.getAttribute('href') === '#'+s.id),
            tab: tabLinks.find(a => a.getAttribute('href') === '#'+s.id)
        };
    });

    const updateActive = (hash) => {
        tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href')===hash));
        tabLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href')===hash));
    };

    const io = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const id = '#'+entry.target.id;
                if(map[id]) updateActive(id);
            }
        });
    }, {rootMargin:'-35% 0px -55% 0px', threshold:[0, .2, .6]});

    sections.forEach(s => io.observe(s));

    // realzar al hacer clic
    [...tocLinks, ...tabLinks].forEach(a=>{
        a.addEventListener('click', ()=>updateActive(a.getAttribute('href')));
    });
})();

// Control menú hamburguesa: toggle, cierre al clic fuera y escape
(function(){
    const btn = document.getElementById('hamburgerBtn');
    const menu = document.getElementById('menuDropdown');
    if(!btn || !menu) return;

    const ensureItems = () => {
        // agregar opción Gastronomía si no existe un enlace con ese href
        if(!menu.querySelector('a[href="gastronomia.html"]')){
            const a = document.createElement('a');
            a.id = 'menu-item-gastronomia';
            a.href = 'gastronomia.html';
            a.textContent = 'Gastronomía';
            a.className = 'menu-item';
            a.setAttribute('role','menuitem');
            a.tabIndex = 0;
            a.addEventListener('click', () => close());
            menu.appendChild(a);
        }
        // agregar opción Historia si no existe un enlace con ese href
        if(!menu.querySelector('a[href="index.html"]')){
            const a = document.createElement('a');
            a.id = 'menu-item-historia';
            a.href = 'index.html';
            a.textContent = 'Historia';
            a.className = 'menu-item';
            a.setAttribute('role','menuitem');
            a.tabIndex = 0;
            a.addEventListener('click', () => close());
            menu.appendChild(a);
        }
    };

    const open = () => { ensureItems(); btn.setAttribute('aria-expanded','true'); menu.hidden = false; document.body.classList.add('menu-open'); btn.classList.add('open'); }
    const close = () => { btn.setAttribute('aria-expanded','false'); menu.hidden = true; document.body.classList.remove('menu-open'); btn.classList.remove('open'); }
    const toggle = () => { (btn.getAttribute('aria-expanded')==='true') ? close() : open() }

    btn.addEventListener('click', (e)=>{ e.stopPropagation(); toggle(); });

    // cerrar al hacer click fuera
    document.addEventListener('click', (e)=>{
        if(!menu.hidden && !menu.contains(e.target) && e.target !== btn) close();
    });

    // cerrar con Escape
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
})();