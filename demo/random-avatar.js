var RandomAvatar = DOMClass({
  name: 'random-avatar',
  constructor: function (width) {
    this.textContent = '';
    var
      canvas = (this.ownerDocument || document).createElement('canvas'),
      context = canvas.getContext('2d'),
      pr = window.devicePixelRatio || 1,
      size = width || parseFloat(this.getAttribute('size')),
      diameter = size * pr,
      radius = diameter / 2,
      lineWidth = (size * .06) * pr,
      random = Math.random
    ;
    canvas.width = canvas.height = diameter;
    canvas.style.cssText = ''.concat(
      'width:', size, 'px;',
      'height:', size, 'px;'
    );
    context.beginPath();
    context.arc(radius, radius, radius - lineWidth, 0, 2 * Math.PI, false);
    // background
    context.fillStyle = 'rgb('.concat(
      [
        random() * 256 | 0,
        random() * 256 | 0,
        random() * 256 | 0
      ].join(','),
      ')'
    );
    context.fill();
    // border
    context.lineWidth = lineWidth;
    context.strokeStyle = 'rgb('.concat(
      [
        random() * 256 | 0,
        random() * 256 | 0,
        random() * 256 | 0
      ].join(','),
      ')'
    );
    context.stroke();
    // text
    context.fillStyle = context.strokeStyle;
    context.font = (radius | 0) + 'px sans-serif';
    context.textAlign = 'center';
    context.fillText(
      String.fromCharCode(48 + (random() * 75 | 0)),
      radius,
      radius + radius / 3
    );
    context.closePath();
    if (canvas.toDataURL) {
      this.appendChild(new Image(size, size)).src = canvas.toDataURL();
    } else {
      this.append(canvas);
    }
  }
});