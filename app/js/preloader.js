document.addEventListener("DOMContentLoaded", function () {
  const progressFill = document.querySelector('.progress_fill');
  const preloader = document.getElementById('preloader_wrapper');

  const images = Array.from(document.images);
  const links = Array.from(document.querySelectorAll("link[rel='stylesheet']"));
  const resources = [...images, ...links];

  let loadedCount = 0;
  const totalCount = resources.length || 1;

  const updateProgress = () => {
    loadedCount++;
    const percent = Math.round((loadedCount / totalCount) * 100);
    progressFill.style.width = percent + '%';

    // Smooth fill even if 100% was already passed
    if (loadedCount >= totalCount) {
      triggerPreloaderFade();
    }
  };

  const triggerPreloaderFade = () => {
    setTimeout(() => {
      preloader.style.transition = 'opacity 1s ease';
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1000); // match transition
    }, 1500); // 3 seconds wait at 100%
  };

  if (totalCount === 1) {
    updateProgress(); // minimal fallback
  } else {
    resources.forEach((res) => {
      if (res.complete || res.readyState === 'complete') {
        updateProgress();
      } else {
        res.addEventListener('load', updateProgress);
        res.addEventListener('error', updateProgress);
      }
    });
  }

  // Fallback: Ensure preloader fades out in case something silently hangs
  window.addEventListener('load', () => {
    if (loadedCount < totalCount) {
      loadedCount = totalCount;
      progressFill.style.width = '100%';
      triggerPreloaderFade();
    }
  });
});
