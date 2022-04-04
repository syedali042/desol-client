import { CallPost } from "./index"

export async function CallPostDataFile(data) {
  const res = await CallPost("/api/app/data-file", data)
  return res
}

export async function CallPostSpikes(data) {
  const res = await CallPost("/api/app/spikes", data)
  return res
}

export async function CallPostPeakHours(data) {
  const res = await CallPost("/api/app/peak-hours", data)
  return res
}

export async function CallGetCaliforniaHourlyData(data){
  const res = await CallPost("/api/app/peak-hours", data)
  return res
}