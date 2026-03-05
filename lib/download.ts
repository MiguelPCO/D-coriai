/**
 * Downloads a remote image as a file by fetching it as a blob,
 * creating a temporary object URL, and triggering a programmatic click.
 * This bypasses the browser's cross-origin restriction on the `download` attribute.
 */
export async function downloadImage(url: string, filename: string): Promise<void> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Error al descargar: ${response.statusText}`)
  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)

  const anchor = document.createElement("a")
  anchor.href = objectUrl
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)

  setTimeout(() => URL.revokeObjectURL(objectUrl), 100)
}
