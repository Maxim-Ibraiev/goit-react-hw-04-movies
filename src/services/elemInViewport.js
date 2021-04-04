export default function elemInViewport(elem, full) {
  const box = elem.getBoundingClientRect();
  const top = box.top;
  const left = box.left;
  const bottom = box.bottom;
  const right = box.right;
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  let maxWidth = 0;
  let maxHeight = 0;
  if (full) {
    maxWidth = right - left;
    maxHeight = bottom - top;
  }
  return (
    Math.min(height, bottom) - Math.max(0, top) >= maxHeight &&
    Math.min(width, right) - Math.max(0, left) >= maxWidth
  );
}
