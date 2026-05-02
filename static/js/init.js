'use strict';

// Don't prompt for confirmation when the user clicks "Clear authorship colors".
//
// Earlier revisions of this plugin replaced the editbar's click handler
// with a direct `ace.callWithAce(... performDocumentApplyAttributesToCharRange
// ..., 'clearAuthorship', true)` call. That bypassed core's clearauthorship
// command-call-stack (registered in pad_editbar.ts via `registerAceCommand`),
// which is what records the operation in the undo history. Result: the
// clear happened, but undo no longer restored authorship — breaking
// clear_authorship_color.spec.ts:38 and undo_clear_authorship.spec.ts.
//
// Cleaner approach: leave core's handler intact and intercept the click
// in the capture phase to neutralise just the `window.confirm` call.
// Core then proceeds through the normal `ace_performDocumentApplyAttributesToCharRange`
// path inside its proper undo-aware call stack.
//
// We restore window.confirm right after the bubble-phase click runs so
// other confirm prompts in the pad UI (import overwrite, delete pad) are
// untouched.
exports.postAceInit = () => {
  const li = $('.buttonicon-clearauthorship').parent().parent()[0];
  if (!li) return;
  li.addEventListener('click', () => {
    const original = window.confirm;
    window.confirm = () => true;
    // Restore on the next microtask — long enough for core's bubble-phase
    // click handler (which calls window.confirm synchronously) to see the
    // stub, short enough that no later confirm dialog catches it.
    Promise.resolve().then(() => { window.confirm = original; });
  }, true /* capture phase: runs before core's bubble-phase handler */);
};
