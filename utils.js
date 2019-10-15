var UTILS = (function() {

    return {
        shuffle: function(a) {
            // return a;
            // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
            return a;
        },

        havePointerLock(doc) {
            return ( 'pointerLockElement' in doc
                    || 'mozPointerLockElement' in doc
                    || 'webkitPointerLockElement' in doc);
        },

        lockPounter(doc) {
            doc.requestPointerLock = doc.requestPointerLock || doc.mozRequestPointerLock || doc.webkitRequestPointerLock;
            doc.requestPointerLock();
        },

        simpleEaseIn(x, y, p) {
            return ( x + ( ( y - x) * p) );
        },


        getRandomIntInclusive(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
        }

    }
}());
