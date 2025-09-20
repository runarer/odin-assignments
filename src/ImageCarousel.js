const css = [
  ".image-carousel { display: flex; flex-direction: column;}",
  ".image-view { height: 100%; width: 100%; display: flex; justify-content: space-between; position: relative; overflow: hidden; }",
  ".image-select-bar { width: 100%; height: 50px; display: flex; align-items: center; justify-content: center; gap: 5px; }",
  ".left-side-bar, .right-side-bar { background: lightgray; opacity: 0; height: 100%; width: 10%; display: flex; align-items: center; justify-content: center;}",
  ".left-side-bar:hover, .right-side-bar:hover { opacity: 0.5;}",
  ".image-selector { border: 1px solid gray; background: lightgray; height: 50%; aspect-ratio: 1 / 1; border-radius: 50%;}",
  ".image-selector.current-image { background-color: gray;}",
  ".images { position: absolute; display: flex; justify-content: space-between; align-items: center; height: 100%;}",
  ".image { height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; }",
];

function addCSS() {
  const stylesheet = document.styleSheets[0];
  css.forEach((rule) =>
    stylesheet.insertRule(rule, stylesheet.cssRules.length),
  );
}
class ImageCarousel {
  width = 0;
  currentImage = 0;
  nImages = 0;
  images = undefined;
  circles = [];

  constructor(baseElement) {
    this.baseElement = baseElement;
    this.width = this.baseElement.clientWidth;
    console.log(this.width);

    this.addHTML();
  }

  setCurrentImageDot() {
    this.circles.forEach((circle) => circle.classList.remove("current-image"));
    this.circles[this.currentImage].classList.add("current-image");
  }

  setCurrentImage() {
    this.images.style.left = -this.currentImage * this.width + "px";
    this.setCurrentImageDot();
  }

  selectImage(n) {
    this.currentImage = n;
    this.setCurrentImage();
  }

  moveLeft() {
    this.currentImage--;
    if (this.currentImage < 0) this.currentImage = this.nImages - 1;
    this.setCurrentImage();
  }

  moveRight() {
    this.currentImage++;
    if (this.currentImage >= this.nImages) this.currentImage = 0;
    this.setCurrentImage();
  }

  addSideBars(element) {
    const leftSideBar = document.createElement("div");
    leftSideBar.classList.add("left-side-bar");
    leftSideBar.addEventListener("click", () => this.moveLeft());
    element.appendChild(leftSideBar);

    const rightSideBar = document.createElement("div");
    rightSideBar.classList.add("right-side-bar");
    rightSideBar.addEventListener("click", () => this.moveRight());
    element.appendChild(rightSideBar);
  }

  addImages(imgs, element) {
    this.images = document.createElement("div");
    this.images.classList.add("images");
    this.images.style.width = this.width * this.nImages + "px";

    imgs.forEach((e) => {
      const image = document.createElement("div");
      image.classList.add("image");
      image.style.width = this.width + "px";

      image.appendChild(e);
      this.images.appendChild(image);
    });

    element.appendChild(this.images);
  }

  addSelectBar() {
    const imageSelectBar = document.createElement("div");
    imageSelectBar.classList.add("image-select-bar");

    for (let i = 0; i < this.nImages; i++) {
      const circle = document.createElement("div");
      circle.classList.add("image-selector");
      if (i == this.currentImage) circle.classList.add("current-image");
      circle.addEventListener("click", () => this.selectImage(i));
      imageSelectBar.appendChild(circle);

      this.circles.push(circle);
    }

    this.baseElement.appendChild(imageSelectBar);
  }

  addHTML() {
    //Get and remove images
    const imgs = Array.from(this.baseElement.getElementsByTagName("img"));
    this.nImages = imgs.length;
    this.baseElement.replaceChildren();

    //add images
    const imageView = document.createElement("div");
    imageView.classList.add("image-view");
    this.addImages(imgs, imageView);

    this.baseElement.appendChild(imageView);

    //add sidebars
    this.addSideBars(imageView);

    //add bottom nav
    this.addSelectBar();
  }

  countDown(seconds) {
    setInterval(() => {
      this.moveRight();
    }, seconds * 1000);
  }
}
function createImageCarousel() {
  addCSS();

  const carousels = document.getElementsByClassName("image-carousel");
  for (let i = 0; i < carousels.length; i++) {
    const ic = new ImageCarousel(carousels[i]);
    ic.countDown(5);
  }
}

export default createImageCarousel;
