import { useEffect } from "react";

const useSmoothScroll = () => {
  useEffect(() => {
    const smoothScroll = (targetElement: HTMLElement, duration: number) => {
      const startPosition = window.pageYOffset;
      const targetPosition = targetElement.getBoundingClientRect().top;
      const startTime = performance.now();

      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startPosition + targetPosition * ease);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.tagName === "A" &&
        (target.getAttribute("href")?.startsWith("#") ||
          target.getAttribute("href")?.startsWith("/"))
      ) {
        event.preventDefault();
        const href = target.getAttribute("href");
        const targetId = href?.startsWith("#") ? href.substring(1) : null;
        const targetElement = targetId
          ? document.getElementById(targetId)
          : null;

        if (targetElement) {
          smoothScroll(targetElement, 1500);
        } else if (href?.startsWith("/")) {
          window.location.href = href;
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
};

export default useSmoothScroll;
