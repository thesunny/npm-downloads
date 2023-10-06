import {
  VictoryAxis,
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryTheme,
} from "victory"

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

const commercial = ["@ckeditor/ckeditor5-engine", "@tiptap/core", "tinymce"]

interface DownloadData {
  downloads: number
  day: string
}

const AVERAGED_DAYS = 28

const transformData = (data: DownloadData[]): DownloadData[] => {
  // Starting from the 7th day (index 6)
  return data.slice(AVERAGED_DAYS - 1).map((entry, index) => {
    // Adjusted index due to the slice
    const adjustedIndex = index + AVERAGED_DAYS - 1

    // Calculate the start of the window (7 days back)
    const start = adjustedIndex - AVERAGED_DAYS + 1

    // Sum the downloads for the last 7 days
    const downloads =
      data
        .slice(start, adjustedIndex + 1)
        .reduce((sum, curr) => sum + curr.downloads, 0) /
      (AVERAGED_DAYS / 7)

    return {
      day: entry.day,
      downloads,
    }
  })
}

const nextData = data.map((entry) => {
  return {
    package: entry.package,
    data: transformData(entry.downloads),
  }
})

const chartColors: string[] = [
  "#E57373", // Red
  "#81C784", // Green
  "#64B5F6", // Blue
  "#FFD54F", // Yellow
  "#A1887F", // Brown
  "#7986CB", // Indigo
  "#4FC3F7", // Light Blue
  "#4DB6AC", // Teal
  "#FF8A65", // Deep Orange
  "#9575CD", // Deep Purple
  "#F06292", // Pink
  "#4DD0E1", // Cyan
  "#FFB74D", // Orange
  "#AED581", // Light Green
  "#DCE775", // Lime
  "#90A4AE", // Blue Grey
  "#BA68C8", // Purple
  "#FFD600", // Amber
  "#B2FF59", // Light Green Accent
  "#69F0AE", // Teal Accent
]

const isCommercial = (name: string) => commercial.includes(name)

export default function Hello() {
  return (
    <div style={{ width: 1024 }}>
      <VictoryChart
        padding={{ left: 280 }}
        width={720}
        height={480}
        theme={VictoryTheme.material}
        domain={{ y: [0, 1300000] }}
      >
        {nextData.map((entry, index) => {
          return (
            <VictoryLine
              key={entry.package}
              data={entry.data}
              x="day"
              y="downloads"
              style={{
                data: {
                  stroke: chartColors[index],
                  strokeDasharray: commercial.includes(entry.package)
                    ? "4,4"
                    : "none",
                },
              }}
            />
          )
        })}
        <VictoryAxis dependentAxis />
        {/* <VictoryAxis
          style={{
            axis: { stroke: "black" }, // This will show the x-axis line
          }}
        /> */}
        <VictoryLegend
          title="Rich Text Editors"
          data={data.map((entry, index) => {
            return {
              name: entry.package,
              symbol: { fill: chartColors[index], type: "minus" },
            }
          })}
        />
      </VictoryChart>
      {/* {JSON.stringify(draftData, null, 2)} */}
    </div>
  )
}
