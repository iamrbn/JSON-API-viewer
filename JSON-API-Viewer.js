// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: file-code;

// ============== EXAMPLE APIs ===============
//'https://www.tagesschau.de/api2/homepage/'
//'https://status.slack.com/api/v2.0.0/current'
//'https://status.slack.com/api/v2.0.0/history'
// ===========================================

if (Pasteboard.pasteString().includes('https://')) pasteStr = Pasteboard.pasteString();
else pasteStr = null;

let nAlert = new Alert();
    nAlert.title = 'ENTER API URL';
    nAlert.addTextField('https://example.com/api/', pasteStr);
    nAlert.addAction('Get JSON');
    nAlert.addDestructiveAction('Cancel');
    let idx = await nAlert.presentAlert();
    if (idx == 0) inputURL = nAlert.textFieldValue(0);
    else throw new Error("User Clicked Cancel")


if (pasteStr == null || inputURL.length < 12) {
    await errorAlert("No Valid Input Detected", `Please Check The API URL:\n"${inputURL}"`)
} else {
   try {
    res = await new Request(inputURL).loadJSON();
    QuickLook.present(res, false);
 } catch(err) {
    await errorAlert("Couldn’t Fetch Datas From API", "No Or Broken Response")
  }
};

function errorAlert(title, message) {
  let errAlert = new Alert();
      errAlert.title = title
      errAlert.message = message
      errAlert.addCancelAction('OK');
      errAlert.presentAlert()
};
