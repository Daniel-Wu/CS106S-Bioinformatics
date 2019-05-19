// File: safe-maps.js
// Description: Javascript file controlling functionality of GWAS Bioinformatics lesson for
// CS106S Workshop.
// Last Updated: Spring '19

/**************		Global Variables		****************/
// In the html file, we've loaded in the global variables:
// matrix = a 102 x 12533 matrix of people by expression scores for each gene
// genes = a 12533 list of the name of the gene in the matrix
// labels = a 102 list of whether the patient has prostate cancer (1) or not (0)

//var temp = require([])
//var jsregression = require(['jsregression']);

/************** 1. Initialization ****************/
/*	Function: initialize()
 *	Called upon website loading. This creates everything that the user sees.
 */
function initialize() {

}


/************** 	2. UX	 ****************/
// These helper functions are used to aid in the use of the app.


/*	Function: reset()
 *	Called when user clicks on "Reset" button. Clears the map and all settings.
 *	DO NOT EDIT
 */
function reset() {
  
}


function norm(arr) {
    //Find mean
    var total = 0
    var min = 1000000
    var max = -1000000
    for (var i = 0; i < arr.length; i++) {
        total += arr[i]
        if (arr[i] < min) {
            min = arr[i]
        }
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    var mean = total / arr.length

    console.log(min)
    console.log(max)

    //Find std 
    var variance = 0
    for (var i = 0; i < arr.length; i++) {
        variance += Math.pow(arr[i] - mean, 2)
    }
    var std = Math.sqrt(variance / arr.length)
    //return arr.map(x => (x - mean) / variance)
    return arr.map(x => (x-min)/(max - min))
}

function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) { return r[c]; });
    });
}

/*	Function: calcFastestRoute()
 *	Called when user clicks "Get Directions" button. Calculates routes and returns fastest routes to user.
 */
function calcRoute(safest) {
    // Augment data with labels
    console.log(matrix[0])
    matrix = transpose(matrix)
    matrix = matrix.map(norm)
    matrix = transpose(matrix)
    console.log(matrix[0])
    var aug_data = Array.from(matrix)
    for (var i = 0; i < aug_data.length; i++) {
        aug_data[i].push(labels[i])
    }
    console.log(aug_data)
    console.log(matrix)
    //Do the linear regression
    var regression = new jsregression.LinearRegression({
        alpha: 0.0001,
        iterations: 10,
        lambda: 0.0,
        trace: true,
    });
    var model = regression.fit(aug_data)
    console.log(model)
}