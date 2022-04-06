// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Event} from 'vscode';

interface ExtensionAPI {
    /**
     * An event which fires on live process is connected. Payload is processKey.
     */
	 readonly onDidLiveProcessConnect: Event<string>

	 /**
	  * An event which fires on live process is disconnected. Payload is processKey.
	  */
	 readonly onDidLiveProcessDisconnect: Event<string>
 
	 /**
	  * An event which fires on live process data change. Payload is processKey.
	  */
	 readonly onDidLiveProcessUpdate: Event<string>
 }

interface LiveProcessDataQuery {
    /**
     * unique identifier of a connected live process.
     */
    processKey: string;
}

interface SimpleQuery extends LiveProcessDataQuery {
    endpoint: "mappings" | "contextPath" | "port" | "properties";
}

interface BeansQuery extends LiveProcessDataQuery {
    endpoint: "beans";
    /**
     * if provided, return corresponding beans via name.
     */
    beanName?: string;
    dependingOn?: string;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const springBootExtension : vscode.Extension<ExtensionAPI> | undefined= vscode.extensions.getExtension('Pivotal.vscode-spring-boot');
	const api = springBootExtension?.exports;
	console.log('Got springBootApi', api);

	if (api) {
		api.onDidLiveProcessConnect((connected) => {
			console.log("Connected live process: ", connected);
		});
		api.onDidLiveProcessDisconnect((disconnected) => {
			console.log("Disconnected live process: ", disconnected);
		});
		api.onDidLiveProcessUpdate((update) => {
			console.log("Update live process: ", update);
		})
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-boot-api-tester.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vscode-boot-api-tester!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
