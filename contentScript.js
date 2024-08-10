chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const { type, value, videoId } = obj;
  const button = document.getElementsByClassName("ytp-subtitles-button")[0];
  const isPressed = button.getAttribute("aria-pressed");
  if (isPressed) {
    function applyStyleToCaptions() {
      const captionLine = document.getElementById("caption-window-1");
      if (captionLine) {
        captionLine.setAttribute(
          "style",
          "touch-action: none !important; background-color: rgba(255, 0, 0, 0) !important; bottom: 2% !important; left: 21.2% !important"
        );
      }
      const subtitles = document.getElementsByClassName("ytp-caption-segment");
      for (let i = 0; i < subtitles.length; i++) {
        subtitles[i].setAttribute(
          "style",
          "background-color: rgba(255, 0, 0, 0) !important; font-weight:bold !important; font-size: 35px !important; text-shadow: 2px 2px 4px rgba(0, 0, 0, .9);"
        );
      }
    }
    applyStyleToCaptions();
    const observer = new MutationObserver(() => {
      applyStyleToCaptions();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  if (type === "NEW") {
    currentVideo = videoId;
    newVideoLoaded();
  }
});
