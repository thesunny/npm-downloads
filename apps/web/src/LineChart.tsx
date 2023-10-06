// LineChart.tsx
import { ResponsiveLine } from "@nivo/line"
import React from "react"

type DownloadsData = {
  downloads: number
  day: string
}

type PackageData = {
  package: string
  downloads: DownloadsData[]
}

type DataProps = {
  data: PackageData[]
}

export const LineChart: React.FC<DataProps> = ({ data }) => {
  // Transform data for Nivo
  const nivoData = data.map((pkg) => ({
    id: pkg.package,
    data: pkg.downloads.map((item) => ({
      x: item.day,
      y: item.downloads,
    })),
  }))

  return (
    <div style={{ height: "500px" }}>
      <ResponsiveLine
        data={nivoData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "time", format: "%Y-%m-%d", precision: "day" }}
        xFormat="time:%Y-%m-%d"
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        curve="monotoneX"
        axisBottom={{
          format: "%b %d",
          tickValues: "every 2 days",
          legend: "date",
          legendOffset: -12,
        }}
        axisLeft={{
          // orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "downloads",
          legendOffset: -40,
          legendPosition: "middle",
        }}
      />
    </div>
  )
}
