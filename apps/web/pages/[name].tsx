import fs from "fs"
import path from "path"

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
import { DownloadsChart, PackageData } from "../components/DownloadsChart"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import Link from "next/link"

// const data = [
//   ckeditorData,
//   editorjsData,
//   tiptapData,
//   draftData,
//   froalaData,
//   prosemirror,
//   prosemirrorMarkdown,
//   quill,
//   slate,
//   summernote,
//   tinymce,
//   trix,
// ]

const secondaryPackageNames = [
  "@ckeditor/ckeditor5-engine",
  "@tiptap/core",
  "tinymce",
]

// {"start":"2022-10-05","end":"2023-10-04","package":"blueimp-file-upload","downloads":[{"downloads":14751,"day":"2022-10-05"},{"downloads":15000,"day":"2022-10-0

export function getServerSideProps(context: GetServerSidePropsContext) {
  const subdir = context.params?.name as string
  const dir = path.join(process.cwd(), "../../data", subdir)
  const files = fs.readdirSync(dir)
  const data = files.map((file) => {
    const filePath = path.join(dir, file)
    const fileData = fs.readFileSync(filePath, "utf8")
    const parsedData = JSON.parse(fileData)
    return parsedData as PackageData
  })
  console.log(data)

  return {
    props: {
      title: subdir,
      data,
    },
  }
}

export default function IndexPage({
  title,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div style={{ margin: "1em auto", maxWidth: 1024 }}>
      <link rel="stylesheet" href="https://unpkg.com/chota@latest"></link>
      <div>
        <Link href="/">Back to home</Link>
      </div>
      <h1>{title}</h1>
      <DownloadsChart
        data={data}
        secondary={secondaryPackageNames}
        max={1300000}
      />
    </div>
  )
}
