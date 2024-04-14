import React, { useState } from "react";

import BoldIcon from "@mui/icons-material/FormatBoldRounded";
import ItalicIcon from "@mui/icons-material/FormatItalicRounded";
import UnderlineIcon from "@mui/icons-material/FormatUnderlinedRounded";
import StrikeIcon from "@mui/icons-material/FormatStrikethroughRounded";
import OLIocn from "@mui/icons-material/FormatListBulletedRounded";
import ULIcon from "@mui/icons-material/FormatListNumberedRounded";
import CodeIcon from "@mui/icons-material/CodeRounded";
import SaveIcon from "@mui/icons-material/SaveRounded";
import BlockQuoteIcon from "@mui/icons-material/FormatQuoteRounded";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRuleRounded";
import UndoIcon from "@mui/icons-material/UndoRounded";
import RedoIcon from "@mui/icons-material/RedoRounded";

import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CircularProgress } from "@mui/material";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Placeholder.configure({
    placeholder: "Write task updates here...",
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const TipTapEditor = ({ isLoading, onSubmit }) => {
  return (
    <Box my="1rem" component={Paper} p="1rem">
      <EditorProvider
        extensions={extensions}
        slotBefore={<MenuBar />}
        slotAfter={
          <ActionComponent isLoading={isLoading} onSubmit={onSubmit} />
        }
      ></EditorProvider>
    </Box>
  );
};

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }

  const [activeFormats, setActiveFormats] = useState([]);
  const [activeTextSelections, setActiveTextSelections] = useState(["P"]);

  return (
    <Stack direction="row" gap={1}>
      <ToggleButtonGroup
        size="small"
        sx={{ mb: "1rem" }}
        value={activeFormats}
        onChange={(e, newFormats) => setActiveFormats(newFormats)}
      >
        <ToggleButton
          color="primary"
          value="bold"
          disabled={!editor.can().chain().focus().toggleBold().run()}
          onClick={(e) => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <BoldIcon sx={{ fontSize: 20 }} />
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <ItalicIcon sx={{ fontSize: 20 }} />
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="underline"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <BlockQuoteIcon sx={{ fontSize: 20 }} />
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <StrikeIcon sx={{ fontSize: 20 }} />
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="ol"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <OLIocn sx={{ fontSize: 20 }} />
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="ul"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <ULIcon sx={{ fontSize: 20 }} />
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="code"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <CodeIcon sx={{ fontSize: 20 }} />
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="horizontalrule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <HorizontalRuleIcon sx={{ fontSize: 20 }} />
        </ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        size="small"
        sx={{ mb: "1rem" }}
        exclusive
        value={activeTextSelections}
        onChange={(e, newSelection) => setActiveTextSelections(newSelection)}
      >
        <ToggleButton
          color="primary"
          value="P"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          P
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="h1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="h2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="h3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="h4"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="h5"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="h6"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          H6
        </ToggleButton>
      </ToggleButtonGroup>

      <ButtonGroup size="small" sx={{ mb: "1rem" }}>
        <Button
          variant="outlined"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <UndoIcon sx={{ fontSize: 20 }} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <RedoIcon sx={{ fontSize: 20 }} />
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const ActionComponent = ({ isLoading, onSubmit }) => {
  const { editor } = useCurrentEditor();

  return (
    <Stack justifyContent="flex-end" alignItems="end" mt="1rem">
      <Button
        size="small"
        variant="contained"
        disabled={isLoading}
        endIcon={!isLoading ? <SaveIcon /> : <CircularProgress />}
        onClick={() => {
          console.log(editor.getHTML());
          onSubmit(editor.getHTML());
        }}
      >
        Save
      </Button>
    </Stack>
  );
};

export default TipTapEditor;
