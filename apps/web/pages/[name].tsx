import fs from "fs"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import Link from "next/link"
import path from "path"

import { DownloadsChart, PackageData } from "../components/DownloadsChart"

const secondaryPackageNames = [
  "@ckeditor/ckeditor5-engine",
  "@tiptap/core",
  "tinymce",
]

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
