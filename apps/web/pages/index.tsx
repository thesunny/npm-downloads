import ckeditorData from "../../../data/editors/@ckeditor--ckeditor5-engine.json"
import editorjsData from "../../../data/editors/@editorjs--editorjs.json"
import tiptapData from "../../../data/editors/@tiptap--core.json"
import draftData from "../../../data/editors/draft-js.json"
import froalaData from "../../../data/editors/froala-editor.json"
import prosemirrorMarkdown from "../../../data/editors/prosemirror-markdown.json"
import prosemirror from "../../../data/editors/prosemirror-model.json"
import quill from "../../../data/editors/quill.json"
import slate from "../../../data/editors/slate.json"
import summernote from "../../../data/editors/summernote.json"
import tinymce from "../../../data/editors/tinymce.json"
import trix from "../../../data/editors/trix.json"
import { DownloadsChart } from "../components/DownloadsChart"

const data = [
  ckeditorData,
  editorjsData,
  tiptapData,
  draftData,
  froalaData,
  prosemirror,
  prosemirrorMarkdown,
  quill,
  slate,
  summernote,
  tinymce,
  trix,
]

const secondaryPackageNames = [
  "@ckeditor/ckeditor5-engine",
  "@tiptap/core",
  "tinymce",
]

export default function IndexPage() {
  return <DownloadsChart data={data} secondary={secondaryPackageNames} />
}
