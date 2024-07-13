"use client";

import Editor from "@monaco-editor/react";

const monacoOptions: any = {
  //   renderLineHighlight: "none",
  quickSuggestions: false,
  glyphMargin: false,
  lineDecorationsWidth: 0,
  folding: false,
  fixedOverflowWidgets: true,
  acceptSuggestionOnEnter: "on",
  hover: {
    delay: 100,
  },
  roundedSelection: false,
  contextmenu: false,
  cursorStyle: "line-thin",
  occurrencesHighlight: false,
  links: false,
  minimap: { enabled: false },
  // see: https://github.com/microsoft/monaco-editor/issues/1746
  wordBasedSuggestions: false,
  // disable `Find`
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: "never",
    seedSearchStringFromSelection: "never",
  },
  fontSize: 12,
  fontWeight: "normal",
  wordWrap: "off",
  //   lineNumbers: "off",
  lineNumbersMinChars: 0,
  overviewRulerLanes: 0,
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  scrollBeyondLastColumn: 0,
  scrollbar: {
    horizontal: "hidden",
    vertical: "hidden",
    // avoid can not scroll page when hover monaco
    alwaysConsumeMouseWheel: false,
    handleMouseWheel: false,
  },
};

export default function CodeEditor({
  value,
  height = "650px",
}: {
  value: string;
  height?: string;
}) {
  return (
    <Editor
      options={monacoOptions}
      height={height}
      defaultLanguage="javascript"
      defaultValue={value}
    />
  );
}
