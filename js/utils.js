// var hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){
// 	    if (x1 + w1 > x2)
//         if (x1 < x2 + w2)
//             if (y1 + h1 > y2)
//                 if (y1 < y2 + h2)
//                     return true;
//             }
var hitTest = function(r1, r2){
	var x1 = r1.x, 
		x2 = r2.x,
		y1 = r1.y, 
		y2 = r2.y,
		w1 = r1.width,
		w2 = r2.width,
		h1 = r1.height,
		h2 = r2.height;
	if (x1 + w1 > x2)
		if (x1 < x2 + w2)
			if (y1 + h1 > y2)
				if (y1 < y2 + h2)
					return true;
    return false;
};