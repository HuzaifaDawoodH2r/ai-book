// Physical AI Simulation Example
// This code demonstrates the basic Physical AI loop: perception, processing, action

// Define environment
const environment = {
  width: 100,
  height: 100,
  objects: [
    { id: 1, x: 25, y: 25, type: 'obstacle' },
    { id: 2, x: 75, y: 75, type: 'target' }
  ]
};

// Define sensor function
function detectObjects(robotPosition, env) {
  const detectionRadius = 10;
  return env.objects.filter(obj => {
    const distance = Math.sqrt(
      Math.pow(obj.x - robotPosition.x, 2) + 
      Math.pow(obj.y - robotPosition.y, 2)
    );
    return distance <= detectionRadius;
  });
}

// Define action function
function navigateToTarget(robot, target) {
  // Simple navigation algorithm
  if (target.x > robot.x) robot.x += 1;
  else if (target.x < robot.x) robot.x -= 1;
  
  if (target.y > robot.y) robot.y += 1;
  else if (target.y < robot.y) robot.y -= 1;
  
  return robot;
}

// Simulation loop
let robot = { x: 10, y: 10 };
const maxSteps = 50;

for (let step = 0; step < maxSteps; step++) {
  // Perception
  const detectedObjects = detectObjects(robot, environment);
  console.log(`Step ${step + 1}: Robot at (${robot.x}, ${robot.y})`);
  
  // Processing and Action
  const targets = detectedObjects.filter(obj => obj.type === 'target');
  if (targets.length > 0) {
    robot = navigateToTarget(robot, targets[0]);
    console.log(`  -> Moving toward target at (${targets[0].x}, ${targets[0].y})`);
  } else {
    // Random walk if no target detected
    robot.x += Math.random() * 2 - 1;
    robot.y += Math.random() * 2 - 1;
    
    // Keep robot in bounds
    robot.x = Math.max(0, Math.min(environment.width, robot.x));
    robot.y = Math.max(0, Math.min(environment.height, robot.y));
  }
  
  // Check if reached target
  if (Math.abs(robot.x - 75) < 2 && Math.abs(robot.y - 75) < 2) {
    console.log(`Target reached at step ${step + 1}!`);
    break;
  }
}

console.log("Simulation completed.");