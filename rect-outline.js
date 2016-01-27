var GLArrayBuffer = require( 'nanogl/arraybuffer' );

var TMP_ARRAY = new Float32Array( 50 );

TMP_ARRAY[12] = TMP_ARRAY[22] = 1;
TMP_ARRAY[33] = TMP_ARRAY[23] = 1;
TMP_ARRAY[ 4] = TMP_ARRAY[14] = TMP_ARRAY[24] = TMP_ARRAY[34] = TMP_ARRAY[44] = 1;


function RectOutline( gl, x, y, w, h, thickness ){
  x = (x===undefined) ? -1.0 : x;
  y = (y===undefined) ? -1.0 : y;
  w = (w===undefined) ?  2.0 : w;
  h = (h===undefined) ?  2.0 : h;

  thickness = (thickness===undefined) ?  .1 : thickness;

  RectOutline.call( this, gl );

  var a = TMP_ARRAY;
  var b = y+h, r = x+w;

  a[ 0] = a[30] = a[40] = x;
  a[ 1] = a[11] = a[41] = y;

  a[ 5] = a[45] = a[35] = x+thickness;
  a[ 6] = a[46] = a[16] = y+thickness;

  a[10] = a[20] = r;
  a[21] = a[31] = b;

  a[15] = a[25] = r-thickness;
  a[26] = a[36] = b-thickness;

  var du = thickness/w;
  var dv = thickness/h;

  a[ 7] = a[47] = a[37] = du;
  a[17] = a[27] = 1-du;
  a[ 8] = a[48] = a[18] = dv;
  a[38] = a[28] = 1-dv;


  this.data( a );

  this.attrib( 'aPosition', 2, gl.FLOAT );
  this.attrib( 'aTexCoord', 2, gl.FLOAT );
  this.attrib( 'aSide'    , 1, gl.FLOAT );

}


RectOutline.prototype = Object.create( GLArrayBuffer.prototype );
RectOutline.prototype.constructor = RectOutline;

RectOutline.prototype.render = function(){
  this.drawTriangleStrip();
};