import blueimpFileUploadData from "../../../data/uploaders/blueimp-file-upload.json"
import dropzoneData from "../../../data/uploaders/dropzone.json"
import filepondData from "../../../data/uploaders/filepond.json"
import ngxFileDropDatal from "../../../data/uploaders/ngx-file-drop.json"
import reactDropzone from "../../../data/uploaders/react-dropzone.json"
import svelteFileDropzone from "../../../data/uploaders/svelte-file-dropzone.json"
import uppy from "../../../data/uploaders/uppy.json"
import vueFilepond from "../../../data/uploaders/vue-filepond.json"
import { DownloadsChart } from "../components/DownloadsChart"

const data = [
  blueimpFileUploadData,
  dropzoneData,
  filepondData,
  ngxFileDropDatal,
  reactDropzone,
  svelteFileDropzone,
  uppy,
  vueFilepond,
]

const secondaryPackageNames: string[] = []

export default function IndexPage() {
  return <DownloadsChart data={data} secondary={secondaryPackageNames} />
}
