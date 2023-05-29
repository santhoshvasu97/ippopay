// Function to calculate the absolute difference between two numbers
function getAbsoluteDifference(a, b) {
    return Math.abs(a - b);
  }
  
  // Function to recursively partition the array and calculate the minimum absolute difference
  function partitionArray(nums, n, index, sum1, sum2, dp) {
    // Base case: all elements have been processed
    if (index === 2 * n) {
      return getAbsoluteDifference(sum1, sum2);
    }
  
    // Check if the result is already computed
    if (dp[index][sum1] !== -1) {
      return dp[index][sum1];
    }
  
    // Recursively partition the array by including the current element in the first or second array
    const diff1 = partitionArray(nums, n, index + 1, sum1 + nums[index], sum2, dp);
    const diff2 = partitionArray(nums, n, index + 1, sum1, sum2 + nums[index], dp);
  
    // Store the computed result to avoid recomputation
    dp[index][sum1] = Math.min(diff1, diff2);
  
    return dp[index][sum1];
  }
  
  // Function to solve the problem and return the minimum possible absolute difference
  function minPartitionDifference(nums) {
    const n = nums.length >> 1; // Calculate the length of each array
  
    // Create a 2D array to store computed results
    const dp = Array.from({ length: 2 * n }, () => Array(n + 1).fill(-1));
  
    // Calculate the minimum absolute difference using dynamic programming
    return partitionArray(nums, n, 0, 0, 0, dp);
  }
  
  // Unit tests
  console.log(minPartitionDifference([3, 9, 7, 3])); // Output: 2
  console.log(minPartitionDifference([-36, 36])); // Output: 72
  console.log(minPartitionDifference([2, -1, 0, 4, -2, -9])); // Output: 0