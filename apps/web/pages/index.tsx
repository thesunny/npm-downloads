import fs from "fs"
import { InferGetServerSidePropsType } from "next"
import Link from "next/link"
import path from "path"

export function getServerSideProps() {
  const basePath = path.join(process.cwd(), "../../data")
  const dirs = fs.readdirSync(basePath).filter((file) => {
    return fs.statSync(path.join(basePath, file)).isDirectory()
  })

  return {
    props: {
      dirs,
    },
  }
}

export default function IndexPage({
  dirs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div style={{ margin: "1em auto", maxWidth: 720 }}>
      <link rel="stylesheet" href="https://unpkg.com/chota@latest"></link>
      <h1>Index Page</h1>
      <ul>
        {dirs.map((dir) => {
          return (
            <li key={dir}>
              <Link href={`/${dir}`}>{dir}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
