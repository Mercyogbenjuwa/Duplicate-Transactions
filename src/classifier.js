function classifier(input) {
    let sortedInput = sortInput(input);
    let groups = groupAge(sortedInput);
    const outputs = mapGroup(groups);
    return (outputs)
  }
  // Find student age
  function findAge(year) {
    const baseYear = 2019;
    return baseYear - new Date(year).getFullYear();
  }
  // Sort the input given by age
  function sortInput(input) {
    return [...input].sort((a, b) => findAge(a.dob) - findAge(b.dob))
  }
  // Group Age 
  function groupAge(sortedInput) {
    let groups = [];
    let latestGroup = [];
    let firstAdded;
    sortedInput.forEach((e) => {
      const age = findAge(e.dob);
      e.age = age;
      if (!firstAdded) {
        firstAdded = e;
      }
      if (latestGroup.length == 3 || e.age - firstAdded.age > 5) {
        groups.push(latestGroup);
        latestGroup = [];
        firstAdded = e;
      }
      latestGroup.push(e);
    });
    if (latestGroup.length > 0) {
      groups.push(latestGroup);
    }
    return groups;
  }
  // Map group to the outPut
  function mapGroup(groups) {
    let output = {
      noOfGroups: 0,
    };
    groups.forEach((e, i) => {
      output.noOfGroups += 1;
      let members = [];
      let oldest = 0;
      let sum = 0;
      let regNos = [];
      e.forEach(g => {
        members.push(g);
        oldest = Math.max(oldest, g.age);
        sum += g.age;
        regNos.push(parseInt(g.regNo));
      })
      regNos.sort((a, b) => {
        return a - b;
      });
      output[`group${i + 1}`] = { members, sum, oldest, regNos };
    });
    return output;
  }

export default classifier;
