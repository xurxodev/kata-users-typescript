import * as readline from "readline";
import { stdin as input, stdout as output } from "process";
import { UsersTerminalView } from "./presentation/UsersTerminalView";

async function main() {
    const rl = readline.createInterface({ input, output });

    const view = new UsersTerminalView(rl);

    view.show();
}

main();
