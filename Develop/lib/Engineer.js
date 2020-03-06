const Employee = require("./Employee")

class Engineer extends Employee {
  getRole() {
        return "Engineer";
      }
      getGithub() {
        return this.github;
      }
}

module.exports = Engineer;
