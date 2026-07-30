document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.hexo-apple-gallery');
    if (galleries.length === 0) {
        return;
    }

    let currentImageIndex = 0;
    let currentGalleryImages = [];

    // --- 创建灯箱和其内部元素 ---
    const lightbox = document.createElement('div');
    lightbox.id = 'gallery-lightbox';
    lightbox.classList.add('gallery-lightbox');
    document.body.appendChild(lightbox);

    const lightboxImage = document.createElement('img');
    lightboxImage.classList.add('gallery-lightbox-image');
    lightbox.appendChild(lightboxImage);

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('lightbox-control', 'lightbox-close');
    closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    lightbox.appendChild(closeBtn);

    const prevBtn = document.createElement('button');
    prevBtn.classList.add('lightbox-control', 'lightbox-prev');
    prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
    lightbox.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('lightbox-control', 'lightbox-next');
    nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
    lightbox.appendChild(nextBtn);
    
    const thumbnailsContainer = document.createElement('div');
    thumbnailsContainer.classList.add('lightbox-thumbnails');
    lightbox.appendChild(thumbnailsContainer);

    // --- 功能函数 ---
    function showImage(index) {
        lightboxImage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            lightboxImage.src = currentGalleryImages[index];
            lightboxImage.style.transform = 'scale(1)';
        }, 150);

        const thumbnails = thumbnailsContainer.querySelectorAll('.lightbox-thumbnail');
        thumbnails.forEach((thumb, thumbIndex) => {
            if (thumbIndex === index) {
                thumb.classList.add('active');
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    function showNextImage(event) {
        event.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
        showImage(currentImageIndex);
    }

    function showPrevImage(event) {
        event.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        showImage(currentImageIndex);
    }

    function closeLightbox() {
        lightbox.classList.remove('visible');
    }

    // --- 事件监听 ---
    galleries.forEach(gallery => {
        const links = Array.from(gallery.querySelectorAll('.gallery-link'));
        links.forEach((link, index) => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                
                currentGalleryImages = links.map(a => a.href);
                currentImageIndex = index;
                
                thumbnailsContainer.innerHTML = '';
                currentGalleryImages.forEach((imageUrl, thumbIndex) => {
                    const thumb = document.createElement('img');
                    thumb.src = imageUrl;
                    thumb.classList.add('lightbox-thumbnail');
                    thumb.addEventListener('click', (e) => {
                        e.stopPropagation();
                        currentImageIndex = thumbIndex;
                        showImage(currentImageIndex);
                    });
                    thumbnailsContainer.appendChild(thumb);
                });

                showImage(currentImageIndex);
                lightbox.classList.add('visible');
            });
        });

        // "More" / "Hide" 按钮的切换逻辑
        const moreBtn = gallery.querySelector('.gallery-more-btn');
        if (moreBtn) {
            // [核心修改] 根据浏览器语言设置按钮文本
            const lang = navigator.language.slice(0, 2).toLowerCase();
            const showMoreText = lang === 'zh' ? '更多' : 'More';
            const showLessText = lang === 'zh' ? '隐藏' : 'Hide';

            // 设置初始按钮文本
            moreBtn.textContent = showMoreText;

            moreBtn.addEventListener('click', function() {
                const hiddenItems = gallery.querySelectorAll('.gallery-item.initially-hidden');
                
                // 通过检查按钮当前的文本来判断状态
                const isExpanded = this.textContent === showLessText;

                if (isExpanded) {
                    // 如果当前是展开状态，则收起
                    hiddenItems.forEach(item => {
                        item.style.display = 'none'; // 直接设置内联样式来隐藏
                    });
                    this.textContent = showMoreText;
                } else {
                    // 如果当前是收起状态，则展开
                    hiddenItems.forEach(item => {
                        item.style.display = 'block'; // 直接设置内-联样式来显示
                    });
                    this.textContent = showLessText;
                }
            });
        }
    });

    lightbox.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    lightboxImage.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('visible')) {
            if (e.key === 'ArrowRight') {
                showNextImage(e);
            } else if (e.key === 'ArrowLeft') {
                showPrevImage(e);
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});

