// import { ResponsiveLine } from "@nivo/line"

import ckeditorData from "../../../.data/@ckeditor--ckeditor5-engine.json"
import tiptapData from "../../../.data/@tiptap--core.json"
import draftData from "../../../.data/draft-js.json"
import froalaData from "../../../.data/froala-editor.json"
import prosemirror from "../../../.data/prosemirror.json"
import prosemirrorMarkdown from "../../../.data/prosemirror-markdown.json"
import quill from "../../../.data/quill.json"
import slate from "../../../.data/slate.json"
import summernote from "../../../.data/summernote.json"
import tinymce from "../../../.data/tinymce.json"
import trix from "../../../.data/trix.json"
import { LineChart } from "../src/LineChart"

const data = [
  ckeditorData,
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

// interface DownloadData {
//   downloads: number
//   day: string
// }

// const AVERAGED_DAYS = 28

// const transformData = (data: DownloadData[]): DownloadData[] => {
//   // Starting from the 7th day (index 6)
//   return data.slice(AVERAGED_DAYS - 1).map((entry, index) => {
//     // Adjusted index due to the slice
//     const adjustedIndex = index + AVERAGED_DAYS - 1

//     // Calculate the start of the window (7 days back)
//     const start = adjustedIndex - AVERAGED_DAYS + 1

//     // Sum the downloads for the last 7 days
//     const downloads = data
//       .slice(start, adjustedIndex + 1)
//       .reduce((sum, curr) => sum + curr.downloads, 0)

//     return {
//       day: entry.day,
//       downloads,
//     }
//   })
// }

// const nextData = data.map((entry) => {
//   return {
//     package: entry.package,
//     data: transformData(entry.downloads),
//   }
// })

// const chartColors: string[] = [
//   "#E57373", // Red
//   "#81C784", // Green
//   "#64B5F6", // Blue
//   "#FFD54F", // Yellow
//   "#A1887F", // Brown
//   "#7986CB", // Indigo
//   "#4FC3F7", // Light Blue
//   "#4DB6AC", // Teal
//   "#FF8A65", // Deep Orange
//   "#9575CD", // Deep Purple
//   "#F06292", // Pink
//   "#4DD0E1", // Cyan
//   "#FFB74D", // Orange
//   "#AED581", // Light Green
//   "#DCE775", // Lime
//   "#90A4AE", // Blue Grey
//   "#BA68C8", // Purple
//   "#FFD600", // Amber
//   "#B2FF59", // Light Green Accent
//   "#69F0AE", // Teal Accent
// ]

// const nextDraftData = transformData(draftData.downloads)
// const nextFroalaData = transformData(froalaData.downloads)

// export default function Hello() {
//   return (
//     <div style={{ width: 1024 }}>
//       <VictoryChart padding={{ left: 200 }}>
//         {nextData.map((entry, index) => {
//           return (
//             <VictoryLine
//               key={entry.package}
//               data={entry.data}
//               x="day"
//               y="downloads"
//               style={{ data: { stroke: chartColors[index] } }}
//             />
//           )
//         })}
//         <VictoryLegend
//           x={0}
//           y={10}
//           title="Rich Text Editors"
//           centerTitle
//           orientation="vertical"
//           gutter={20}
//           style={{
//             border: { stroke: "black" },
//             title: { fontSize: 12 },
//             labels: { fontSize: 8 },
//           }}
//           data={data.map((entry, index) => {
//             return {
//               name: entry.package,
//               symbol: { fill: chartColors[index], type: "minus" },
//             }
//           })}
//           // data={[
//           //   { name: "Line 1", symbol: { fill: "blue", type: "minus" } },
//           //   { name: "Line 2", symbol: { fill: "red", type: "minus" } },
//           // ]}
//         />
//       </VictoryChart>
//       {/* {JSON.stringify(draftData, null, 2)} */}
//     </div>
//   )
// }
function App() {
  return (
    <div className="App">
      <LineChart data={data} />
    </div>
  )
}

export default App
