// Physical AI Prototype Example
// A simple robot navigation system that demonstrates sensing, decision-making, and actuation

class RobotNavigator {
  constructor() {
    // Environment representation (0 = free space, 1 = obstacle)
    this.environment = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    ];
    
    this.robot = { x: 1, y: 1 }; // Starting position
    this.goal = { x: 8, y: 8 };  // Goal position
  }

  // Sensor: detect obstacles in adjacent cells
  senseEnvironment() {
    const adjacent = [
      { x: this.robot.x, y: this.robot.y - 1, dir: 'up' },    // up
      { x: this.robot.x, y: this.robot.y + 1, dir: 'down' },  // down
      { x: this.robot.x - 1, y: this.robot.y, dir: 'left' },  // left
      { x: this.robot.x + 1, y: this.robot.y, dir: 'right' }  // right
    ];
    
    return adjacent.map(cell => ({
      ...cell,
      isObstacle: this.isObstacle(cell.x, cell.y)
    }));
  }

  // Check if position has an obstacle
  isObstacle(x, y) {
    if (x < 0 || x >= this.environment[0].length || y < 0 || y >= this.environment.length) {
      return true; // Treat out of bounds as obstacle
    }
    return this.environment[y][x] === 1;
  }

  // Decision-making: choose next move based on sensors and goal
  decideNextMove(sensorData) {
    // Simple algorithm: move toward goal if possible, avoid obstacles
    const dx = this.goal.x - this.robot.x;
    const dy = this.goal.y - this.robot.y;
    
    // Prioritize direction toward goal
    if (Math.abs(dx) > Math.abs(dy)) {
      // Try to move horizontally
      if (dx > 0) {
        const rightCell = sensorData.find(cell => cell.dir === 'right');
        if (rightCell && !rightCell.isObstacle) return rightCell;
      } else {
        const leftCell = sensorData.find(cell => cell.dir === 'left');
        if (leftCell && !leftCell.isObstacle) return leftCell;
      }
      
      // If horizontal move blocked, try vertical
      if (dy > 0) {
        const downCell = sensorData.find(cell => cell.dir === 'down');
        if (downCell && !downCell.isObstacle) return downCell;
      } else {
        const upCell = sensorData.find(cell => cell.dir === 'up');
        if (upCell && !upCell.isObstacle) return upCell;
      }
    } else {
      // Try to move vertically
      if (dy > 0) {
        const downCell = sensorData.find(cell => cell.dir === 'down');
        if (downCell && !downCell.isObstacle) return downCell;
      } else {
        const upCell = sensorData.find(cell => cell.dir === 'up');
        if (upCell && !upCell.isObstacle) return upCell;
      }
      
      // If vertical move blocked, try horizontal
      if (dx > 0) {
        const rightCell = sensorData.find(cell => cell.dir === 'right');
        if (rightCell && !rightCell.isObstacle) return rightCell;
      } else {
        const leftCell = sensorData.find(cell => cell.dir === 'left');
        if (leftCell && !leftCell.isObstacle) return leftCell;
      }
    }
    
    // If no direct path, try alternatives
    for (const cell of sensorData) {
      if (!cell.isObstacle) return cell;
    }
    
    // No valid moves
    return null;
  }

  // Actuator: move the robot
  executeMove(nextCell) {
    if (nextCell) {
      this.robot.x = nextCell.x;
      this.robot.y = nextCell.y;
      return true;
    }
    return false;
  }

  // Main navigation loop
  navigate() {
    console.log("Starting robot navigation task...");
    console.log(`Goal: (${this.goal.x}, ${this.goal.y})`);
    console.log(`Starting position: (${this.robot.x}, ${this.robot.y})`);
    console.log("Legend: R=Robot, G=Goal, #=Obstacle, .=Free space");
    
    // Print initial environment
    this.printEnvironment();
    
    let steps = 0;
    const maxSteps = 50;
    
    while (steps < maxSteps) {
      // Sensing phase
      const sensorData = this.senseEnvironment();
      console.log(`\nStep ${steps + 1}: Robot at (${this.robot.x}, ${this.robot.y})`);
      
      // Check if reached goal
      if (this.robot.x === this.goal.x && this.robot.y === this.goal.y) {
        console.log("Goal reached!");
        return true;
      }
      
      // Decision-making phase
      const nextCell = this.decideNextMove(sensorData);
      
      // Actuation phase
      if (nextCell && this.executeMove(nextCell)) {
        console.log(`Moving ${nextCell.dir} to (${this.robot.x}, ${this.robot.y})`);
        this.printEnvironment();
      } else {
        console.log("No valid moves available! Stopping navigation.");
        return false;
      }
      
      steps++;
    }
    
    console.log("Maximum steps reached. Goal not reached.");
    return false;
  }

  // Visualization helper
  printEnvironment() {
    const visEnv = this.environment.map(row => [...row]);
    
    // Mark goal
    visEnv[this.goal.y][this.goal.x] = 'G';
    
    // Mark robot
    visEnv[this.robot.y][this.robot.x] = 'R';
    
    // Print visualization
    for (let y = 0; y < visEnv.length; y++) {
      let rowStr = '';
      for (let x = 0; x < visEnv[y].length; x++) {
        switch (visEnv[y][x]) {
          case 0: rowStr += '. '; break;
          case 1: rowStr += '# '; break;
          case 'G': rowStr += 'G '; break;
          case 'R': rowStr += 'R '; break;
        }
      }
      console.log(rowStr);
    }
  }
}

// Run the prototype
const navigator = new RobotNavigator();
navigator.navigate();