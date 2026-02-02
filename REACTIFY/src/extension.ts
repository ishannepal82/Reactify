import * as vscode from 'vscode';

const detectErrors = (event: any) => {
	for (const uri of event.uris) {
		const diagnostics = vscode.languages.getDiagnostics(uri);
		console.log(diagnostics);
		for (const diagnostic of diagnostics) {
			console.log(diagnostic);
		}
	}
};

const detectErrorsForActiveFile = (): [boolean, vscode.Diagnostic[]] | undefined => {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
		for (const diagnostic of diagnostics) {
			console.log(diagnostic);
			console.log(diagnostic.message);
		}
		const hasErrors = diagnostics.some((d) => d.severity === vscode.DiagnosticSeverity.Error);
		console.log(hasErrors);
		return [hasErrors, diagnostics];
	}
};

const handleChange = (event: vscode.TextDocumentChangeEvent) => { 
	const document = event.document;
	console.log(document.getText());
	console.log(document.languageId);
};

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('REACTIFY.helloWorld', async () => {
		const errors = detectErrorsForActiveFile();
		if (errors) {
			const diagnostics = errors[1];
			for (const error of diagnostics) {
				vscode.window.showErrorMessage(error.message);
			}
		}

		vscode.window.showInformationMessage('No errors found. Proceeding...');
	}));
}

export function deactivate() {}
