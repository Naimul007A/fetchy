import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });
NProgress.setColor = (color) => {
    const style = document.createElement('style')
    style.textContent = `
  #nprogress .bar {
    background: ${color} !important;
  }
  `
    document.body.appendChild(style)
}

export default NProgress;