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