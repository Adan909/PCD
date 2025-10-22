// Delegación para botones de imagen (lightbox local; la página es base y no enlaza a otras)
        const lb = document.getElementById('lightbox');
        const lbImage = document.getElementById('lbImage');
        const lbTitle = document.getElementById('lbTitle');
        const lbDesc = document.getElementById('lbDesc');
        const closeBtn = document.getElementById('closeLightbox');

        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.img-btn');
            if (btn) {
                const img = btn.getAttribute('data-img');
                const title = btn.getAttribute('data-title') || '';
                const desc = btn.getAttribute('data-desc') || '';
                lbImage.src = img;
                lbImage.alt = title;
                lbTitle.textContent = title;
                lbDesc.textContent = desc;
                lb.classList.add('open');
                lb.setAttribute('aria-hidden','false');
                document.body.style.overflow = 'hidden';
            }
        });

        closeBtn.addEventListener('click', closeLightbox);
        lb.addEventListener('click', (e) => {
            if (e.target === lb) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox();
        });

        function closeLightbox(){
            lb.classList.remove('open');
            lb.setAttribute('aria-hidden','true');
            lbImage.src = '';
            document.body.style.overflow = '';
        }