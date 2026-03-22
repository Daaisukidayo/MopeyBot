export default {
  name: 'isImageValid',
  params: [
    {
      name: "url",
      required: true,
    }
  ],
  code: `
    $return[$js[
      async function isImageValid(url) {
        try {
          const response = await fetch(url, { method: 'HEAD' })
          
          if (!response.ok) return false

          const contentType = response.headers.get('content-type')
          return contentType && contentType.startsWith('image/')
        } catch {
          return false
        }
      }

      isImageValid("$env[url]")]]
  `
}