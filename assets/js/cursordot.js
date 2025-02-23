// Modify cursorDot function
const cursorDot = ({
  diameter = 90,
  borderWidth = 3,
  borderColor = "#fff",
  easing = 4,
  background = "#fff",
} = {}) => {
  const $$ = (s) => Array.prototype.slice.call(document.querySelectorAll(s));
  const isEl = (obj) => obj instanceof HTMLElement;
  const isStr = (obj) => Object.prototype.toString.call(obj) === "[object String]";

  let inited = false;
  const alt = { x: 0, y: 0, o: 1, d: diameter };
  const cur = { x: 0, y: 0, o: 0, d: diameter };
  const dot = document.createElement("div");

  // Create inner red dot
  const innerDot = document.createElement("div");
  innerDot.style.position = "absolute";
  innerDot.style.top = "50%";
  innerDot.style.left = "50%";
  innerDot.style.width = "10px";  // Adjust size of red dot
  innerDot.style.height = "10px";
  innerDot.style.background = "#18d26e";
  innerDot.style.borderRadius = "50%";
  innerDot.style.transform = "translate(-50%, -50%)";
  innerDot.style.opacity = "0"; // Initially hidden
  innerDot.style.transition = "opacity 0.3s ease-in-out";

  dot.classList.add("cursor-dot");
  dot.style.height = diameter + "px";
  dot.style.width = diameter + "px";
  dot.style.background = background;
  dot.style.border = `${borderWidth}px solid ${borderColor}`;
  dot.style.position = "fixed";
  dot.style.top = "0";
  dot.style.left = "0";
  dot.style.borderRadius = "100%";
  dot.style.pointerEvents = "none";
  dot.style.opacity = "0";
  dot.style.zIndex = "11";
  dot.style.mixBlendMode = "difference";
  dot.style.transition = "background 0.27s, border 0.27s";

  // Append inner dot to main cursor
  dot.appendChild(innerDot);

  document.addEventListener("mousemove", (e) => {
    alt.x = e.clientX;
    alt.y = e.clientY;
    dot.style.opacity = 1;
    if (!inited) {
      document.body.appendChild(dot);
      cur.x = alt.x;
      cur.y = alt.y;
      inited = true;
      draw();
    }
  });

  const draw = () => {
    const dX = alt.x - cur.x;
    const dY = alt.y - cur.y;
    cur.x += dX / easing;
    cur.y += dY / easing;
    const t3d = `translate3d(${cur.x - cur.d / 2}px,${cur.y - cur.d / 2}px,0)`;
    dot.style.transform = t3d;

    const dO = alt.o - cur.o;
    cur.o += dO / easing;
    dot.style.opacity = cur.o;

    const dD = alt.d - cur.d;
    cur.d += dD / easing;
    dot.style.height = cur.d + "px";
    dot.style.width = cur.d + "px";

    requestAnimationFrame(draw);
  };

  dot.over = (any, style) => {
    const fn = (el) => {
      el.addEventListener("mouseover", () => {
        if (style.background) dot.style.backgroundColor = style.background;
        if (style.borderColor) dot.style.borderColor = style.borderColor;
        if (style.scale) alt.d = diameter * style.scale;
        if (style.innerDot) innerDot.style.opacity = "1"; // Show red dot on hover
      });
      el.addEventListener("mouseout", () => {
        if (style.background) dot.style.backgroundColor = background;
        if (style.borderColor) dot.style.borderColor = borderColor;
        if (style.scale) alt.d = diameter;
        if (style.innerDot) innerDot.style.opacity = "0"; // Hide red dot on leave
      });
    };
    if (isEl(any)) fn(any);
    else if (isStr(any)) $$(any).forEach(fn);
  };

  return dot;
};

// Initialize the cursor
document.addEventListener("DOMContentLoaded", () => {
  const cursor = cursorDot({
    easing: 4,
  });

  // Add hover effect for nav-links (show red dot inside cursor)
  cursor.over(".nav-link, .resumeModalbutton", { 
    scale: 0.5,
    borderColor: "rgba(255,255,255,.38)",
    background: "transparent",
    innerDot: true  // Enable red dot on hover
  });
  
});

