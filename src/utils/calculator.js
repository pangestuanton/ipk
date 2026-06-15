export const GRADE_WEIGHTS = {
  'A': 4.00,
  'AB': 3.50,
  'B': 3.00,
  'BC': 2.50,
  'C': 2.00,
  'D': 1.00,
  'E': 0.00
};

export const calculateIPS = (courses) => {
  let totalSKS = 0;
  let totalPoints = 0;

  courses.forEach(course => {
    const sks = parseFloat(course.sks) || 0;
    const weight = GRADE_WEIGHTS[course.grade] || 0;
    totalSKS += sks;
    totalPoints += (sks * weight);
  });

  return {
    ips: totalSKS > 0 ? (totalPoints / totalSKS).toFixed(2) : "0.00",
    totalSKS,
    totalPoints
  };
};

export const calculateIPK = (semesters) => {
  let cumulativeSKS = 0;
  let cumulativePoints = 0;

  semesters.forEach(semester => {
    const { totalSKS, totalPoints } = calculateIPS(semester.courses);
    cumulativeSKS += totalSKS;
    cumulativePoints += totalPoints;
  });

  return {
    ipk: cumulativeSKS > 0 ? (cumulativePoints / cumulativeSKS).toFixed(2) : "0.00",
    cumulativeSKS,
    cumulativePoints
  };
};
