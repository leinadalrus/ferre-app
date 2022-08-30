function MarkdownEditor ({ documents }) {
  return (
    <body>
      {documents.map(controller => (
        <div>{controller.action.id}</div>
      ))}
    </body>
  )
}

// export async function getStaticProps () {
//   const response = await fetch('https://.../documents')
//   const request = await response.json()

//   return {
//     props: {
//       documents
//     }
//   }
// }

export async function getStaticPaths () {
  const response = await fetch('https://.../documents')
  const documents = await response.json()

  const paths = documents.map(docs => {
    params: {
      id: docs.id
    }
  })

  return { paths, fallback: false }
}

export default MarkdownEditor
