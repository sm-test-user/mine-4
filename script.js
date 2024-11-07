let highestZ = 1;

class Paper {
  constructor(element, index) {
    this.paper = element;
    this.index = index;
    this.init();
  }

  init() {
    const screenWidth = window.innerWidth;

    this.currentX = screenWidth < 600 ? 0 : Math.random() * 150 - 75;
    this.currentY = Math.random() * 150 - 75;
    this.paper.style.transform = `translate(${this.currentX}px, ${
      this.currentY
    }px) rotateZ(${Math.random() * 20 - 10}deg)`;

    this.paper.addEventListener("mousedown", (e) => this.startMove(e));

    this.paper.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.startMove(e.touches[0]);
    });
  }

  startMove(e) {
    this.startX = e.pageX - this.currentX;
    this.startY = e.pageY - this.currentY;
    this.paper.style.zIndex = highestZ++;

    const move = (event) => this.move(event);
    const stop = () => this.stopMove(move, stop);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("touchend", stop);
  }

  move(e) {
    const pageX = e.pageX || (e.touches && e.touches[0].pageX);
    const pageY = e.pageY || (e.touches && e.touches[0].pageY);

    this.currentX = pageX - this.startX;
    this.currentY = pageY - this.startY;
    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
  }

  stopMove(move, stop) {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stop);
    document.removeEventListener("touchmove", move);
    document.removeEventListener("touchend", stop);
  }
}

// Initialize each paper element
document.querySelectorAll(".paper").forEach((paper, index) => {
  paper.style.setProperty("--index", index);
  new Paper(paper, index);
});
