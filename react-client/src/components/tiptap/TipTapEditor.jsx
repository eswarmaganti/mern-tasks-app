import React from "react";

import BoldIcon from "@mui/icons-material/FormatBoldRounded";
import ItalicIcon from "@mui/icons-material/FormatItalicRounded";
import UnderlineIcon from "@mui/icons-material/FormatUnderlinedRounded";
import StrikeIcon from "@mui/icons-material/FormatStrikethroughRounded";
import OLIocn from "@mui/icons-material/FormatListBulletedRounded";
import ULIcon from "@mui/icons-material/FormatListNumberedRounded";
import CodeIcon from "@mui/icons-material/CodeRounded";
import SaveIcon from "@mui/icons-material/SaveRounded";

import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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

const TipTapEditor = () => {
  return (
    <Box my="1rem" component={Paper} p="1rem">
      <EditorProvider
        extensions={extensions}
        slotBefore={<MenuBar />}
        slotAfter={<ActionComponent />}
      ></EditorProvider>
    </Box>
  );
};

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <ToggleButtonGroup size="small" fullWidth sx={{ mb: "1rem" }}>
      <ToggleButton>
        <BoldIcon sx={{ fontSize: 20 }} />
      </ToggleButton>
      <ToggleButton>
        <ItalicIcon sx={{ fontSize: 20 }} />
      </ToggleButton>
      <ToggleButton>
        <UnderlineIcon sx={{ fontSize: 20 }} />
      </ToggleButton>
      <ToggleButton>
        <StrikeIcon sx={{ fontSize: 20 }} />
      </ToggleButton>
      <ToggleButton>
        <OLIocn sx={{ fontSize: 20 }} />
      </ToggleButton>
      <ToggleButton>
        <ULIcon sx={{ fontSize: 20 }} />
      </ToggleButton>
      <ToggleButton>
        <CodeIcon sx={{ fontSize: 20 }} />
      </ToggleButton>
      <ToggleButton>H1</ToggleButton>
      <ToggleButton>H2</ToggleButton>
      <ToggleButton>H3</ToggleButton>
      <ToggleButton>H4</ToggleButton>
      <ToggleButton>H5</ToggleButton>
      <ToggleButton>H6</ToggleButton>
    </ToggleButtonGroup>
  );
};

const ActionComponent = () => {
  return (
    <Stack justifyContent="flex-end" alignItems="end" mt="1rem">
      <Button variant="contained" endIcon={<SaveIcon />}>
        Save
      </Button>
    </Stack>
  );
};

export default TipTapEditor;
