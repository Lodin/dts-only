export class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

export function run(): void {
  let greeter = new Greeter("world");

  let button = document.createElement('button');
  button.textContent = "Say Hello";
  button.onclick = function() {
    alert(greeter.greet());
  }

  document.body.appendChild(button);
}
