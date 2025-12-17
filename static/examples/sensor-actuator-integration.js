// Sensor-Actuator Integration Example
// Demonstrates how sensor data influences actuator responses in a control system

class TemperatureControlSystem {
  constructor(targetTemp = 22) {
    this.targetTemp = targetTemp;
    this.currentTemp = 18 + Math.random() * 8; // Random starting temp between 18-26
    this.heaterPower = 0;
    this.outsideTemp = 10 + Math.random() * 10; // Random outside temp between 10-20
  }

  // Simulate sensor reading with some noise
  readTemperature() {
    // Add slight variation to simulate sensor noise
    const noise = (Math.random() - 0.5) * 0.5;
    return this.currentTemp + noise;
  }

  // Control algorithm - proportional-integral-derivative (PID) controller
  calculateHeaterResponse(measuredTemp) {
    // PID controller constants
    const kp = 2.0;  // Proportional gain
    const ki = 0.1;  // Integral gain
    const kd = 0.05; // Derivative gain

    // Calculate error
    const error = this.targetTemp - measuredTemp;

    // For simplicity, we'll use just proportional control
    // A full PID implementation would track integral and derivative over time
    let power = error * kp;

    // Safety constraints
    if (power > 100) power = 100;
    if (power < 0) power = 0;

    return Math.round(power);
  }

  // Simulate environment response to heater
  updateEnvironment() {
    // Simplified thermal dynamics
    const deltaTemp = (this.heaterPower - 50) * 0.05; // Heater effect
    const outsideInfluence = (this.outsideTemp - this.currentTemp) * 0.01; // Heat loss/gain

    this.currentTemp += deltaTemp + outsideInfluence;
  }

  runSimulation(duration = 10) {
    console.log(`Starting temperature control simulation (target: ${this.targetTemp}°C)`);
    console.log("Step\tTemp\tTarget\tHeater\tAction");
    console.log("----\t----\t------\t------\t------");

    for (let step = 1; step <= duration; step++) {
      const measuredTemp = this.readTemperature();
      this.heaterPower = this.calculateHeaterResponse(measuredTemp);
      
      console.log(`${step}\t${measuredTemp.toFixed(2)}°C\t${this.targetTemp}°C\t${this.heaterPower}%\tAdjusting temperature`);

      this.updateEnvironment();
    }
    
    const finalTemp = this.readTemperature();
    console.log(`\nFinal temperature: ${finalTemp.toFixed(2)}°C`);
    console.log(`Difference from target: ${(Math.abs(finalTemp - this.targetTemp)).toFixed(2)}°C`);
  }
}

// Run the simulation
const controller = new TemperatureControlSystem(22);
controller.runSimulation(15);