1. ------------------------------------Two Sum------------------------------------------

// brutforce

var twoSum = function(nums, target) {
    for(let i=0; i<nums.length; i++){
        for(let j=i+1; j<nums.length; j++){
            if(nums[i]+nums[j]===target){
                return [i,j]
            }
        }
    }
    return []
};

// best method

var twoSum = function (nums, target) {
    let map = new Map()

    for (let i = 0; i < nums.length; i++) {
        const value = target - nums[i];

        if (map.has(value)) {
            return [map.get(value), i]
        }

        map.set(nums[i], i)
    }

    return []
};



2. ------------------------------------Two Sum------------------------------------------