function binomial(n, k) {
  /*
   * Calculate the binomial coefficient, "n choose k," assuming n and k are
   *  positive integers. This function comes from
   *  http://www.w3resource.com/javascript-exercises/javascript-math-exercise-20.php
   */
  var result = 1;
  for (var x = n - k + 1; x <= n; x++) result *= x;
  for (x = 1; x <= k; x++) result /= x;
  return result;
}

function calculateProbability(k, n, p, x) {
  /*
   * Implement the formula for the probability of x success runs of length k,
   *   in n independent trials with success probability p, described in Theorem 3 of
   *   http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.9.4355
   */
  if ( isNaN(k) || isNaN(n) || isNaN(p) || isNaN(x) ) {
    return "Inputs must be numbers.";
  }
  if ( k < 0 || n < 0 || x < 0 ) {
    return "Inputs must be non-negative.";
  }
  if ( k <= 1 ) {
    return "Cannot have a run shorter than 2 successes.";
  }
  if ( k * x > n ) {
    return "Minimum run length is too long, or too many runs requested.";
  }
  if ( p < 0 || p > 1 ) {
    return "Success probability is not between 0 and 1.";
  }

  var mk = 0;
  var q = 1 - p;

  var maxCount = Math.floor((n + 1) / (k + 1));
  var result = 0;
  for (var m = maxCount; m >= x; m--) {
    mk = m * k;
    result += Math.pow(-1, m - x) * binomial(m, x) *
      Math.pow(p, mk) * Math.pow(q, m - 1) *
      (binomial(n - mk, m - 1) + q * binomial(n - mk, m));
  }

  return result;
}
